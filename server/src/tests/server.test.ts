import Reckwest from '../libs/Reckwest'

const UUID = Date.now()
const URL = 'http://localhost:8080'

test('Signup', async () => {
  const reck = new Reckwest(URL, { 
    params: { query: `mutation { signUp(user: { firstName: "Testing", lastName: "Testerson", email: "testing+${UUID}@testerson.com", password: "testing123123"}) { token } }`}, 
    method: 'POST'})
  const results = await reck.west()
  expect(results.data.signUp.token).toContain('.')
})

test('SignIn Wrong', async () => {
  const reck = new Reckwest(URL, { 
    params: { query: 'mutation { signIn(user: { email: "bad@wrong.com", password: "wrong123123"}) { token } }'}, 
    method: 'POST'})
  const results = await reck.west()
  expect(results.errors[0].message).toBe('User not found, or password is incorrect.')
})

test('SignIn Good', async () => {
  const reck = new Reckwest(URL, { 
    params: { query: `mutation { signIn(user: { email: "testing+${UUID}@testerson.com", password: "testing123123" }) { token } }`}, 
    method: 'POST'})
  const results = await reck.west()
  expect(results.data.signIn.token).toContain('.')
})

test('Update User No Auth', async () => {
  const reck = new Reckwest(URL, { 
    params: { query: 'mutation { updateSelf (user: { password: "jz123123" } ) { token } }'}, 
    method: 'POST'})
  const results = await reck.west()
  expect(results.errors[0].message).toContain('Session not active.')
})

test('Update User Password', async () => {
  const reckSignin = new Reckwest(URL, { 
    params: { query: `mutation { signIn(user: { email: "testing+${UUID}@testerson.com", password: "testing123123" }) { token } }`}, 
    method: 'POST'})
  const token = (await reckSignin.west()).data.signIn.token
  const reckUpdateSelf = new Reckwest(URL, {
    headers: { 'Authorization': `Bearer ${token}` },
    params: { query: 'mutation { updateSelf (user: { password: "testing321321" } ) { token } }'}, 
    method: 'POST'})
  const resultsUpdateSelf = await reckUpdateSelf.west()
  expect(resultsUpdateSelf.data.updateSelf.token).toContain('.')

  const reckSigninBad = new Reckwest(URL, {
    params: { query: `mutation { signIn(user: { email: "testing+${UUID}@testerson.com", password: "testing123123" }) { token } }`}, 
    method: 'POST'})
  const resultSigninBad = await reckSigninBad.west()
  expect(resultSigninBad.errors[0].message).toBe('User not found, or password is incorrect.')

  const reckSigninGood = new Reckwest(URL, { 
    params: { query: `mutation { signIn(user: { email: "testing+${UUID}@testerson.com", password: "testing321321" }) { token } }`}, 
    method: 'POST'})
  const resultSigninGood = await reckSigninGood.west()
  expect(resultSigninGood.data.signIn.token).toContain('.')
})

test('Get Self', async () => {
  const token = (await (new Reckwest(URL, {
    params: { query: `mutation { signIn(user: { email: "testing+${UUID}@testerson.com", password: "testing321321" }) { token } }`}, 
    method: 'POST'}).west())).data.signIn.token
  const reck = new Reckwest(URL, { 
    headers: { 'Authorization': `Bearer ${token}` },
    params: { query: 'query { self { _id firstName lastName email createdAt updatedAt}}'}, 
    method: 'POST'})
  const results = await reck.west()
  expect(results.data.self.firstName).toBe('Testing')
})

test('Forgot Password', async () => {
  const reck = new Reckwest(URL, { 
    params: { query: `mutation { forgotPassword (user: { email: "testing+${UUID}@testerson.com" }) { message } }`},
    method: 'POST'})
  const results = await reck.west()
  expect(results.data.forgotPassword.message).toBe('Email with password reset link sent. Link expires in 5 mins.')
})

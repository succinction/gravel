import Store from '../../../lib/Store'
import { base64Decode } from '../../../lib/helpers'
import { alertStore } from '../../../common/alerts/stores/AlertStore'

export interface IUser {
  _id: string
  email?: string
  firstName?: string
  lastName?: string
  password?: string
  salt?: string
  auth?: string[]
  active?: boolean
  createdAt?: number
  updatedAt?: number
  deletedAt?: number
}

export interface IUserStore {
  self: IUser
}

class UserStore extends Store<IUserStore> {

  constructor() {
    super({
      self: {
        _id: '',
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        salt: '',
        auth: ['user'],
        active: false,
        createdAt: 0,
        updatedAt: 0,
        deletedAt: 0
      }
    })
  }

  /**
   * Get Self From Token
   */
  getSelfFromToken(): IUser {
    const token = localStorage.getItem('token')
    if(token)
      return JSON.parse(base64Decode(token.split('.')[1]))
    return this.default.self
  }

  /**
   * Load Token
   */
  loadToken(): void {
    const self = this.getSelfFromToken()
    this.set({ self }, 'loadToken')
  }

  /**
   * ValidateAuth
   */
   validateAuth(auth = 'user') {
    if(!this.get().self._id || !this.get().self.auth.includes(auth)) {
      this.signOut()
    }
  }

  /**
   * Update
   */
  async updateSelf({ firstName, lastName, email, password }: Pick<IUser, 'firstName' | 'lastName' | 'email' | 'password'>) {
    const { data, errors } = await this.graphQl<{updateSelf?: { token: string }}>(
    `mutation updateSelf($firstName: NonEmptyString!, $lastName: NonEmptyString!, $email: Email!, $password: Password)
      { updateSelf(user: { firstName: $firstName, lastName: $lastName, email: $email, password: $password}) { token }}
    `,
    { firstName, lastName, email, password })
    if(errors) alertStore.add(errors)
    if(data?.updateSelf?.token) {
      localStorage.setItem('token', data.updateSelf.token)
      const self = this.getSelfFromToken()
      this.set({ self }, 'updateSelf.success')
    }
  }

  /**
   * Sign Up
   */
  async signUp({ firstName, lastName, email, password }: Pick<IUser, 'firstName' | 'lastName' | 'email' | 'password'>) {
    const { data, errors } = await this.graphQl<{signUp?: { token: string }}>(
    `mutation signUp($firstName: NonEmptyString!, $lastName: NonEmptyString!, $email: Email!, $password: Password!)
      { signUp(user: { firstName: $firstName, lastName: $lastName, email: $email, password: $password}) { token }}
    `,
    { firstName, lastName, email, password })
    if(errors) alertStore.add(errors)
    if(data?.signUp?.token) {
      localStorage.setItem('token', data.signUp.token)
      const self = this.getSelfFromToken()
      this.set({ self }, 'signUp.success')
    }
  }

  /**
   * Sign Out
   */
  signOut() {
      localStorage.removeItem('token')
      this.set(this.default, 'signOut.success')
  }

  /**
   * Sign In
   */
  async signIn({ email, password }: Pick<IUser, 'email' | 'password'>) {
    const { data, errors } = await this.graphQl<{signIn?: { token: string }}>(
    'mutation signIn($email: Email!, $password: Password!){ signIn(user: { email: $email, password: $password}) { token }} ',
    { email, password })
    if(errors) alertStore.add(errors)
    if(data?.signIn?.token) {
      localStorage.setItem('token', data.signIn.token)
      const self = this.getSelfFromToken()
      this.set({ self }, 'signIn.success')
    }
  }

  /**
   * Forgot Password
   */
   async forgotPassword({ email }: Pick<IUser, 'email'>) {
    const { data, errors } = await this.graphQl<{forgotPassword?: { message: string }}>(
    'mutation forgotPassword($email: Email!){ forgotPassword(user: { email: $email}) { message }} ',
    { email })
    if(errors) alertStore.add(errors)
    if(data?.forgotPassword?.message)
      alertStore.add({message: data.forgotPassword.message})
  }

}

export const userStore = new UserStore()
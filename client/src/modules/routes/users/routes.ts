import SigninPage from './pages/SigninPage.svelte'
import SignupPage from './pages/SignupPage.svelte'
import AccountPage from './pages/AccountPage.svelte'

export default [
    { path: '/users/account', component: AccountPage },
    { path: '/users/signin', component: SigninPage },
    { path: '/users/signup', component: SignupPage }
]

import SigninPage from './pages/SigninPage.svelte'
import SignupPage from './pages/SignupPage.svelte'
import AccountPage from './pages/AccountPage.svelte'
import ForgotPasswordPage from './pages/ForgotPasswordPage.svelte'
import ResetPasswordPage from './pages/ResetPasswordPage.svelte'


export default [
    { path: '/users/account', component: AccountPage },
    { path: '/users/signin', component: SigninPage },
    { path: '/users/signup', component: SignupPage },
    { path: '/users/forgotPassword', component: ForgotPasswordPage },
    { path: '/users/resetPassword', component: ResetPasswordPage }
]

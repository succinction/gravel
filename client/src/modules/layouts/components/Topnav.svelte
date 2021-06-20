<script lang="ts" >
  import { onMount } from 'svelte'
  import page from 'page'
  import { userStore } from '../../routes/users/stores/UserStore'
  import Dropdown from '../../common/dropdown/components/Dropdown.svelte'
  import { subscribe } from '../../lib/helpers'
  import Alerts from '../../common/alerts/components/Alerts.svelte'

  subscribe(userStore, onSignOutSuccess, 'signOut.success')

  onMount(() => {
  userStore.loadToken()
  })

  function onSignOutSuccess() {
  page('/users/signin')
  }

  function handleSignOut(){
  userStore.signOut()
  }
  
</script>

<Alerts />
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container">
    <div class="navbar-header">
      <a class="navbar-brand" href="/">
      <img class="logo" alt="gravel" src="/images/logo.png" /> gravel
      </a>
    </div>
    {#if !$userStore.self._id}
      <ul class="nav navbar-nav">
        <li>
        <button class="btn btn-default" on:click={() => page('/users/signin')}>Sign In</button>
        <button class="btn btn-primary margin-left-sm" on:click={() => page('/users/signup')}>Sign Up</button>
        </li>
      </ul>
    {:else}
      <ul class="nav navbar-nav main-menu">
        <li>
        <Dropdown
          trigger={{label: $userStore.self.firstName}}
          links={[
          {label: 'Account', to: '/users/account'},
          {divider: true},
          {label: 'Sign Out', handleClick: handleSignOut}
          ]}
        />
        </li>
      </ul>
    {/if}
  </div>
</nav>

<style>
  .logo {
  height: 32px;
  }

  .navbar {
  padding-top: 0;
  }
  .navbar-brand {
  font-size: 30px;
  }

  .navbar-header {
  margin-top: 10px;
  }

  .navbar-brand > img {
    display: inline;
  }

  .navbar-header {
    float: left;
  }

  .navbar-nav {
    float: right !important;
    margin: 0;
    margin-top: 15px;
  }

  /*
  * Media KEEP AT BOTTOM!
  */

  @media (max-width: 768px){
    .container {
      padding-left: 5px;
      padding-right: 5px;
    }
    .logo {
      height: 35px;
    }
    .navbar-brand{
      font-size: 25px;
      line-height: 25px;
      padding: 14px 20px;
    }
  }
</style>
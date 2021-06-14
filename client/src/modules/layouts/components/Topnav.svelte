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
<nav class="navbar navbar-default navbar-static-top top-shade">
  <div class="container">
    <div class="navbar-header">
      <a class="navbar-brand" href="/">
        <img class="logo" alt="gravel" src="/images/logo.png" /> gravel
      </a>
    </div>
    {#if !$userStore.self._id}
      <div class="container">
        <ul class="nav navbar-nav">
          <li>
            <button class="btn btn-default" on:click={() => page('/users/signin')}>Sign In</button>
            <button class="btn btn-primary margin-left-sm" on:click={() => page('/users/signup')}>Sign Up</button>
          </li>
        </ul>
      </div>
    {:else}
      <div class="container">
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
      </div>
    {/if}
    </div>
</nav>

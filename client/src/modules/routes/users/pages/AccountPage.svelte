<script lang="ts">
  import { onMount } from 'svelte'
  import page from 'page'
  import { userStore } from '../stores/UserStore'
  import type { IUser } from '../stores/UserStore'
  import { subscribe } from '../../../lib/helpers'

  let form: Partial<IUser> = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  }

  subscribe(userStore, onUpdateSelfSuccess, 'updateSelf.success')

  onMount(() => {
    userStore.validateAuth()
    form = userStore.get().self
  })

  function onUpdateSelfSuccess() {
    page('/')
  }

  function handleSubmit() {
    userStore.updateSelf(form)
  }

</script>

<div class="container">
  <div class="page-header" >
    <h1>Account</h1>
  </div>
  <form class="margin-bottom-lg" on:submit|preventDefault={handleSubmit}>

    <legend>Name</legend>

    <div class="row">
      <div class="col-lg-6 margin-bottom-md">
        <label for="first_name">First Name</label>
        <input type="text" class="form-control" bind:value={form.firstName}/>
      </div>
      <div class="col-lg-6 margin-bottom-md">
        <label for="last_name">Last Name</label>
        <input type="text" class="form-control" bind:value={form.lastName}/>
      </div>
    </div>

    <legend>Security</legend>

    <div class="row">
      <div class="col-lg-6 margin-bottom-md">
        <label for="email">Email Address</label>
        <input type="text" class="form-control" bind:value={form.email}/>
      </div>
      <div class="col-lg-6 margin-bottom-md">
        <label for="password">Password</label>
        <input type="password" class="form-control" bind:value={form.password}/>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-12 margin-top-md">
        <button type="submit" class="btn btn-primary">GO</button>
      </div>
    </div>
  </form>
</div>

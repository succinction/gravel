<script lang="ts">
  import { onMount } from 'svelte'
  import page from 'page'
  import { userStore } from '../stores/UserStore'
  import { subscribe } from '../../../lib/helpers'

  const form = {
    email: '',
    password: ''
  }

  subscribe(userStore, onSignInSuccess, 'signIn.success')

  onMount(() => {
    if (userStore.get().self._id) page('/')
  })

  function onSignInSuccess() {
    page('/')
  }

  function handleSubmit(){
    userStore.signIn(form)
  }

</script>

<main>
  <form on:submit|preventDefault={handleSubmit}>

    <h1>
      Sign In
    </h1>
    <div class="form-group mt-2">
      <label for="email">Email Address</label>
      <input type="text" class="form-control" bind:value={form.email} />
    </div>
    <div class="form-group mt-2">
      <label for="password">Password</label>
      <input type="password" class="form-control" bind:value={form.password} />
    </div>

    <div class="row row-cols-auto mt-3">
      <div class="col">
        <button type="submit" class="btn btn-primary">Sign In</button>
      </div>
      <div class="col mt-1">
        <a href="/users/forgotPassword"> Forgot Password?</a>
      </div>
      <div class="col mt-1">
        <a href="/users/signup">Need an Account? Sign Up</a>
      </div>
    </div>

  </form>
</main>
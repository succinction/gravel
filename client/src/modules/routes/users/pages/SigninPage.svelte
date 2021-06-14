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
    if ($userStore.self._id) page('/')
  })

  function onSignInSuccess() {
    page('/')
  }

  function handleSubmit(){
    userStore.signIn(form)
  }

</script>


<div class="col-md-8 col-md-offset-2">
  <form on:submit|preventDefault={handleSubmit}>

    <div class="panel panel-default margin-top-xlg">

      <div class="panel-heading">
        Sign In
      </div>
      <div class="panel-body">
        <div class="form-group">
          <label for="email">Email Address</label>
          <input type="text" class="form-control" bind:value={form.email} />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" class="form-control" bind:value={form.password} />
        </div>

        <button type="submit" class="btn btn-primary">Sign In</button> <a class="margin-left-sm" href="/users/forgot" > Forgot Password?</a>
      </div>
    </div>
    <div class="text-center"><a href="/users/signup">Need an Account? Sign Up</a></div>

  </form>
</div>

<script lang="ts">
  import { onMount } from 'svelte'
  import page from 'page'
  import { userStore } from '../stores/UserStore'
  import { subscribe } from '../../../lib/helpers'

	const form = {
		firstName: '',
		lastName: '',
		email: '',
		password: ''
	}

  subscribe(userStore, onSignUpSuccess, 'signUp.success')

  onMount(() => {
    if (userStore.get().self._id) page('/')
  })

  function onSignUpSuccess() {
    page('/')
  }

	/**
	* Handle Sign Up
	*/
	function handleSubmit(){
		userStore.signUp(form)
	}

</script>

<main>
  <form on:submit|preventDefault={handleSubmit}>
    <h1>
      Sign Up
    </h1>
    <div class="form-group mt-2">
      <label for="firstName">Firt Name</label>
      <input type="lastName" class="form-control" bind:value={form.firstName} />
    </div>
    <div class="form-group mt-2">
      <label for="password">Last Name</label>
      <input type="password" class="form-control" bind:value={form.lastName} />
    </div>
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
        <button type="submit" class="btn btn-primary">Sign Up</button>
      </div>
      <div class="col mt-1">
        <a href="/users/signin">Already have an Account? Sign In</a>
      </div>
    </div>

  </form>
</main>

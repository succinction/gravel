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
    if ($userStore.self._id) page('/')
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

<div class="col-md-8 col-md-offset-2">
  <form on:submit|preventDefault={handleSubmit}>
		<div class="panel panel-default margin-top-xlg">
			<div class="panel-heading">Sign Up</div>
			<div class="panel-body">
				<div class="col-md-6 form-group">
					<label for="first_name">First Name</label>
					<input type="text" class="form-control" bind:value={form.firstName}>
				</div>
				<div class="col-md-6 form-group">
					<label for="last_name">Last Name</label>
					<input type="text" class="form-control" bind:value={form.lastName}>
				</div>
				<div class="col-md-6 form-group">
					<label for="email">Email Address</label>
					<input type="text" class="form-control" bind:value={form.email}>
				</div>
				<div class="col-md-6 form-group">
					<label for="password">Password</label>
					<input type="password" class="form-control" bind:value={form.password}>
				</div>
				<div class="col-md-6 form-group">
          <button type="submit" class="btn btn-primary">Sign Up</button>
				</div>
			</div>
		</div>
		<div class="text-center"><a href="/users/signin">Already have an Account? Sign In</a></div>
	</form>
</div>
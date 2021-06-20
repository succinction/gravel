<script lang="ts">
  import { onMount } from 'svelte'
  import page from 'page'
  import { userStore } from '../stores/UserStore'
  
  const form = {
    email: ''
  }
  
  onMount(() => {
    if (userStore.get().self._id) page('/')
  })
  
  function handleSubmit(){
    userStore.forgotPassword(form)
  }
  
  </script>
  
  <main>
    <form on:submit|preventDefault={handleSubmit}>
    
      <h1>
        Forgot Password
      </h1>
      <div class="form-group mt-2">
        <label for="email">Email Address</label>
        <input type="text" class="form-control" bind:value={form.email} />
      </div>
    
      <div class="row row-cols-auto mt-3">
        <div class="col">
          <button type="submit" class="btn btn-primary">Go</button>
        </div>
      </div>
    
  </form>
</main>
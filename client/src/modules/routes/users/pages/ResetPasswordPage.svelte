<script lang="ts">
  import { onMount } from 'svelte'
  import page from 'page'
  import { userStore } from '../stores/UserStore'
  import { subscribe } from '../../../lib/helpers'
  
  const form = {
    password: ''
  }
  
  subscribe(userStore, onUpdateSelfSuccess, 'updateSelf.success')
  
  onMount(() => {
    if (userStore.get().self._id) page('/')
  })
  
  function onUpdateSelfSuccess() {
    page('/')
  }
  
  function handleSubmit(){
    userStore.updateSelf(form)
  }
  
  </script>
  
  <main>
    <form on:submit|preventDefault={handleSubmit}>

      <h1>
        Reset Password
      </h1>
      <div class="form-group mt-2">
        <label for="password">Password</label>
        <input type="password" class="form-control" bind:value={form.password} />
      </div>

      <div class="row row-cols-auto mt-3">
        <div class="col">
            <button type="submit" class="btn btn-primary">Go</button>
        </div>
      </div>

    </form>
  </main>
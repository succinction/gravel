<script lang="ts">
  import { userStore } from  '../../users/stores/UserStore'
  import { onMount } from 'svelte'

  onMount(() => {
    userStore.validateAuth()
  })
  
</script>

<main>
  <h1>Hello Mates!</h1>
  <p> <a href="/about">About</a></p>
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
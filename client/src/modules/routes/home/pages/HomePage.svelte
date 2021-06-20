<script lang="ts">
  import { userStore } from  '../../users/stores/UserStore'
  import { onMount } from 'svelte'
  import { modalStore } from '../../../common/modals/stores/ModalStore'
  import ThingOneModal from '../modals/ThingOneModal.svelte'
  import ThingTwoModal from '../modals/ThingTwoModal.svelte'

  onMount(() => {
    userStore.validateAuth()
  })

  
</script>

<main>
  <ThingOneModal />
  <ThingTwoModal />
  <h1>Hello Mates!</h1>
  <p><button on:click={() => modalStore.show('thingOne')}>Thing One</button></p>
  <p><button on:click={() => modalStore.show('thingTwo')}>Thing Two</button></p>
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
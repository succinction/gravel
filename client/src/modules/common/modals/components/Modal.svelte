<script lang="ts">
  import { fade } from 'svelte/transition';
  import { modalStore } from '../stores/ModalStore'
  import { alertStore } from '../../alerts/stores/AlertStore'
  import { subscribe } from '../../../lib/helpers';

  interface IButton {
    onClick: () => void
    text: string
    type?: string
  }

  export let onShow = (options?: Record<string, any>) => {}
  export let onHide = (options?: Record<string, any>) => {}
  export let id: string
  export let title: string = ''
  export let show: boolean = false
  export let zindex: number = 2000
  export let buttons: IButton[] = []

  subscribe(modalStore, showModal, `${id}.show`)
  subscribe(modalStore, hideModal, `${id}.hide`)
  subscribe(modalStore, hideModal, `hide`)

  function showModal () {
    const modal = modalStore.get()
    document.body.style.overflow = 'hidden'
    show = true
    zindex = modal.zindex

    onShow(modal.options)
  }

  function hideModal (e) {

    if(e.target !== e.currentTarget) return

    const modal = modalStore.get()

    // Add the scroll bars back in for the body
    document.body.style.overflow = 'auto'
    show = false
    zindex = modal.zindex

    // Remove all alerts
    alertStore.clear()
    onHide(modal.options)
    
  }

</script>

{#if show}
  <div id={id} class="modal" style="zindex:{zindex};" transition:fade tabIndex="-1" on:click={hideModal}>
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{title}</h5>
          <button type="button" on:click={hideModal} class="btn-close" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <slot></slot>
        </div>
        {#if buttons.length}
        <div class="modal-footer">
          {#each buttons as button}
            <button type="button" on:click={button.onClick} class="btn btn-{button.type ||  'primary'}">{button.text}</button>
          {/each}
        </div>
        {/if}
      </div>
    </div>
  </div>
{/if}

<style>
  .modal {
    display: block;
  }

  .modal-header {
    padding: 1rem 2rem;
  }

  .modal-footer {
    padding: .75rem;
  }
</style>
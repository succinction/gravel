<script lang="ts">
  import { alertStore } from '../stores/AlertStore'

  function handleDismiss(message) {
    alertStore.delete(message)
  }

</script>

<div id="alerts">
  {#each $alertStore.alerts as alert}
    <div  class={'alert alert-' + alert.type + ' alert-dismissible'} role="alert">
      <button type="button" class="close" on:click={() => handleDismiss(alert.message)} data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
      {#if alert.title}
        <h4>{alert.title}</h4>
      {/if}
      {alert.message}
    </div>
  {/each}
</div>

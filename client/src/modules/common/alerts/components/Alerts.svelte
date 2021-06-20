<script lang="ts">
  import { alertStore } from '../stores/AlertStore'

  function handleDismiss(message) {
    alertStore.delete(message)
  }

</script>

<div id="alerts">
  {#each $alertStore.alerts as alert}
    <div  class={'alert alert-' + alert.type + ' alert-dismissible'} role="alert">
      <button type="button" class="btn-close" on:click={() => handleDismiss(alert.message)} ></button>
      {#if alert.title}
        <h4>{alert.title}</h4>
      {/if}
      {alert.message}
    </div>
  {/each}
</div>

<style>
  #alerts {
    position: fixed;
    top: 50px;
    right: 20px;
    width: 300px;
    z-index: 5;
  }

  .alert {
    margin-top: 25px;
    -webkit-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
  }
</style>
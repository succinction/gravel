<script lang="ts" >
  import { uuid } from '../../../lib/helpers'
  export let onClose = () => {}
  export let links: IDropdownLinks[]
  export let trigger

  const id = uuid()
  let show = false

  function handleClick () {
    show = !show
  }

  function handleClose (e) {

    // Handle close is not controlled by its own click
    if(e.target.id == id) return

    if(this.state.show){
      show = false
      if(onClose) onClose()
    }
  }

</script>

<div id={id} class="dropdown">
  <div>
    <button type="button" id={id} class="btn-link dropdown-toggle" on:click={handleClick}>{trigger.label} <span class="caret"></span></button>
    {#if show}
      <ul class="dropdown-menu" on:click={handleClick}>
        {#each links as link}
          {#if link.text}
            <li class="text">{link.text}</li>
          {:else if link.divider}
            <li role="separator" class="divider"></li>
          {:else if link.handleClick}
            <li><button type="button" class="btn-link" on:click={link.handleClick}>{link.label}</button></li>
          {:else if link.to}
            <li><a href={link.to}>{link.label}</a></li>
          {/if}
        {/each}
      </ul>
    {/if}
  </div>
</div>

<style>
  .dropdown-menu .btn-link {
    width: 100%;
    text-align: left;
    padding-left: 20px;
  }
</style>

<script lang="ts" >
  import { uuid } from '../../../lib/helpers'
  export let links: IDropdownLinks[]
  export let trigger

  const id = uuid()
  let show = false

  function handleClick () {
    show = !show
  }

</script>

<div id={id} class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" on:click={handleClick}>
    {trigger.label}
  </button>
  {#if show}
    <ul class="dropdown-menu">
      {#each links as link}
          {#if link.text}
            <li>
              <span class="dropdown-item" >{link.text}</span>
            </li>
          {:else if link.divider}
            <li>
              <hr class="dropdown-divider" />
            </li>
          {:else if link.handleClick}
            <li>
              <button type="button" class="dropdown-item" on:click={link.handleClick}>{link.label}</button>
            </li>
          {:else if link.to}
            <li>
              <a class="dropdown-item" href={link.to}>{link.label}</a>
            </li>
          {/if}
        {/each}
    </ul>
  {/if}
</div>

<style>
  .dropdown-menu {
    display: block;
  }

  .dropdown-item {
    padding: .5rem 1rem;
  }

</style>
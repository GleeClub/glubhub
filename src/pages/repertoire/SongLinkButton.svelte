<script lang="ts">
  import { FullSongLink } from 'src/state/types'

  export let link: FullSongLink
  export let deleteLink: ((link: FullSongLink) => void) | undefined = undefined
</script>

<span style:display={deleteLink ? 'inline' : ''}>
  {#if deleteLink}
    <button
      class="delete"
      style:margin="8px"
      on:click={() => deleteLink && deleteLink(link)}
    />
  {/if}

  {#if link.type === 'Sheet Music'}
    <a
      class="button is-outlined is-primary"
      href="https://gleeclub.gatech.edu/music/{link.target}"
      target="_blank"
      rel="noopener noreferrer"
    >
      <span class="icon">
        <i class="fas fa-scroll" />
      </span>
      <span>{link.name}</span>
    </a>
  {:else if link.type === 'MIDIs'}
    <a
      class="button is-outlined is-primary"
      href="https://gleeclub.gatech.edu/music/{link.target}"
      target="_blank"
      rel="noopener noreferrer"
    >
      <span class="icon">
        <i class="fas fa-volume-up" />
      </span>
      <span>{link.name}</span>
    </a>
  {:else if link.type === 'Performances'}
    <span style="display: inline; align-items: center">
      <span class="icon has-text-grey-lighter" style:margin-right=".5rem">
        <i class="fas fa-external-link-alt" />
      </span>
      <a
        class="button"
        href="https://youtu.be/{link.target}"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span class="icon has-text-danger">
          <i class="fab fa-youtube" />
        </span>
      </a>
      <span style:padding-left="5px">{link.name}</span>
    </span>
  {:else}
    <a
      class="button"
      target="_blank"
      href={link.target}
      rel="noopener noreferrer"
    >
      {link.name}
    </a>
  {/if}
</span>

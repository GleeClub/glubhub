<script lang="ts">
  import Button from 'components/buttons/Button.svelte'
  import DeleteButton from 'components/buttons/DeleteButton.svelte'
  import ErrorBox from 'components/remote/ErrorBox.svelte'

  import type { RemoteData } from 'state/types'

  export let title: string
  export let cancel: () => void
  export let confirm: () => void
  export let state: RemoteData
</script>

<div class="modal is-active">
  <div class="modal-background" onClick={cancel} />
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">{title}</p>
      <DeleteButton click={cancel} />
    </header>
    <section class="modal-card-body">
      <slot />
    </section>

    <footer class="modal-card-foot">
      <Button
        click={confirm}
        loading={state.type === 'loading'}
        color="is-danger"
      >
        Delete
      </Button>
      <Button click={cancel}>Cancel</Button>
      {#if state.type === 'error'}
        <ErrorBox error={state.error} />
      {/if}
    </footer>
  </div>
</div>

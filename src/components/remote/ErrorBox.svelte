<script lang="ts">
  import type { CombinedError } from '@urql/svelte'
  import { SUBMISSION_STATE_BOX_ID } from 'utils/constants'

  export let error: CombinedError
</script>

<article
  id={SUBMISSION_STATE_BOX_ID}
  class="message is-danger"
  style="padding-top: 5px; padding-bottom: 5px"
>
  {#if error.networkError}
    <div class="message-header">
      <p>Something went wrong. (Network Error)</p>
    </div>
    <div class="message-body">{error.networkError.message}</div>
  {:else}
    <div class="message-header">
      <p>Something went wrong. (API Error)</p>
    </div>
    <div class="message-body">{error.message}</div>
  {/if}
</article>

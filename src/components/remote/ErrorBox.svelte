<script lang="ts">
  import { SUBMISSION_STATE_BOX_ID } from 'src/utils/constants'

  export let error: string
</script>

<article
  id={SUBMISSION_STATE_BOX_ID}
  class="message is-danger"
  style="padding-top: 5px; padding-bottom: 5px"
>
  <div class="message-header">
    <p>Something went wrong.</p>
  </div>
  <div class="message-body">{error}</div>
</article>

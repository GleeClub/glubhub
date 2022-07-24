<script lang="ts">
  import { ApiError } from 'src/state/types'
  import { SUBMISSION_STATE_BOX_ID } from 'src/utils/constants'

  export let error: ApiError
</script>

<article
  id={SUBMISSION_STATE_BOX_ID}
  class="message is-danger"
  style="padding-top: 5px; padding-bottom: 5px"
>
  <div class="message-header">
    <p>Something went wrong. (Code {error.response.status})</p>
  </div>
  <div class="message-body">{error.response.error}</div>
</article>

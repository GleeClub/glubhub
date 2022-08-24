<script lang="ts">
  import { Uniform } from 'src/gql-operations'

  export let uniform: Uniform
</script>

<p>
  <span>{uniform.name} </span>
  <span
    class="icon has-tooltip has-tooltip-bottom has-tooltip-multiline has-text-grey-light is-small"
    data-tooltip={uniform.description || ''}
  >
    <i class="far fa-question-circle" />
  </span>
  <br />
</p>

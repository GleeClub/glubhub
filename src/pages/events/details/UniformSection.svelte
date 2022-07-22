<script lang="ts">
  import { Uniform } from 'gql-operations'

  export let uniform: Uniform
</script>

<p>
  <span>{uniform.name} </span>
  <span
    style:cursor="pointer"
    class="icon tooltip has-tooltip-bottom is-tooltip-multiline has-text-grey-light is-small"
    data-tooltip={uniform.description || ''}
  >
    <i class="far fa-question-circle" />
  </span>
  <br />
</p>

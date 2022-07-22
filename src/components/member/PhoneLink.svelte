<script lang="ts">
  import { formatPhone } from 'utils/helpers'

  export let phone: string
</script>

<a href="tel:{phone}">{formatPhone(phone)}</a>

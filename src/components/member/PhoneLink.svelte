<script lang="ts">
  import { formatPhone } from 'src/utils/helpers'

  export let phone: string
</script>

<a href="tel:{phone}">{formatPhone(phone)}</a>

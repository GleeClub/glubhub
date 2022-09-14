<script lang="ts">
  import Box from 'src/components/bulma/Box.svelte'
  import Column from 'src/components/bulma/Column.svelte'

  import { API_URL } from 'src/utils/constants'
  import { getToken } from 'src/utils/token'
</script>

<Box>
  <Column>
    <a href="{API_URL}/?token={getToken()}"> API Access </a>
  </Column>
</Box>

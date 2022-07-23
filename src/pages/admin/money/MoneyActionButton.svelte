<script lang="ts">
  import Button from 'src/components/buttons/Button.svelte'

  import { adminMoney, routeAdmin } from 'src/route/constructors'
  import { MoneyTab } from 'src/route/types'
  import { replaceRoute } from 'src/store/route'

  export let tab: MoneyTab
</script>

<li style:margin-bottom="10px">
  <Button
    color="is-primary"
    click={() => replaceRoute(routeAdmin(adminMoney(tab)))}
  >
    {tab.name}
  </Button>
</li>

<script lang="ts">
  import Button from "components/buttons/Button.svelte";

  import { adminMoney, routeAdmin } from "route/constructors";
  import { MoneyTab } from "route/types";
  import { replaceRoute } from "store/route";

  export let tab: MoneyTab;
</script>

<li style:margin-bottom="10px">
  <Button color="is-primary"
    click={() => replaceRoute(routeAdmin(adminMoney(tab)))}
  >
    {tab.name}
  </Button>
</li>

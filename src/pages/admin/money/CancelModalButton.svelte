<script lang="ts">
  import LinkButton from "components/buttons/LinkButton.svelte";

  import { adminMoney, routeAdmin } from "route/constructors";
</script>

<LinkButton className="is-pulled-right" route={routeAdmin(adminMoney(null))}>
  ABORT! ABORT!
</LinkButton>

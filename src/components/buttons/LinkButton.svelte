<script lang="ts">
  import Button from "./Button.svelte";

  import { ButtonColor, ButtonSize } from "utils/helpers";
  import type { GlubRoute } from "route/types";
  import { goToRoute } from "store/route";

  export let color: ButtonColor | undefined = undefined;
  export let size: ButtonSize | undefined = undefined;
  export let loading = false;
  export let inverted = false;
  export let outlined = false;
  export let fullwidth = false;
  export let className = '';
  export let route: GlubRoute;
</script>

<Button
  {color}
  {size}
  {loading}
  {inverted}
  {outlined}
  {fullwidth}
  {className}
  click={() => goToRoute(route)}
>
  <slot />
</Button>

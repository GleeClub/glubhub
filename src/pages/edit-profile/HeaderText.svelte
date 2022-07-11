<script lang="ts">
  import { siteContext } from "store/context";
  import { derived } from "svelte/store";

  const loggedIn = derived(siteContext, context => !!context.user);
</script>

<style>
.stricken {
  text-decoration: line-through;
}
</style>

{#if $loggedIn}
  <p>
    You can make changes to your stats here. It's important we know as much about you as possible to
    <span class="stricken">creep</span>
    <span class="stricken">better serve you</span>
    make you drive carpools. It'll also help your new friends get to know you!
  </p>
{:else}
  <p>
    Note that this registration is not mandatory. If you are unwilling to
    provide any of the required information, let an officer know and we will
    work out alternate means of registration.
  </p>
{/if}

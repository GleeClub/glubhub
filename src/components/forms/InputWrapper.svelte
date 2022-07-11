<script lang="ts">
  export let title = "";
  export let horizontal = false;
  export let helpText = "";
</script>

<div class="field {horizontal ? ' is-horizontal' : ''}">
  {#if title}
    {#if horizontal}
      <div class="field-label is-normal">
        <label class="label">{title}</label>
      </div>
    {:else}
      <label class="label">{title}</label>
    {/if}
  {/if}
  <div class="field-body">
    <slot />
  </div>
  {#if helpText}
    <p class="help">
      {helpText}
    </p>
  {/if}
</div>

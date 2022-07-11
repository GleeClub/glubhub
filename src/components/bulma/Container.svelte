<script lang="ts">
  export let fullheight = false;
</script>
 
 <div class="container" class:fullheight={fullheight}>
  <slot />
</div>

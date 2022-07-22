<script lang="ts">
  export let content: string
  export let click: () => void
</script>

<span class="middle-inline" style="cursor: pointer" on:click={click}>
  <i class="fas fa-arrow-left middle-middle-inline" />
  <span class="middle-inline">{content}</span>
</span>

<style>
  .middle-inline {
    display: inline-block;
    vertical-align: middle;
  }

  i {
    font-size: 16px;
  }
</style>

<script lang="ts">
  import InputWrapper from "./InputWrapper.svelte";

  export let file: File | null;
  export let selectFile: (file: File | null) => void;
  export let title = "";
  export let horizontal = false;
  export let helpText = "";
</script>

<InputWrapper title={title} horizontal={horizontal} helpText={helpText}>
  <div class="file has-name">
    <label class="file-label">
      <input class="file-input" type="file" on:change={event => selectFile(event.currentTarget.files?.item(0) || null)} />
      <span class="file-cta">
        <span class="file-icon">
          <i class="fas fa-upload" />
        </span>
      </span>
      {#if file}
        <span class="file-name">
          {file.name}
        </span>
      {/if}
    </label>
  </div>
</InputWrapper>

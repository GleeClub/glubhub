<script lang="ts">
  import Button from 'components/buttons/Button.svelte'
  import DeleteButton from 'components/buttons/DeleteButton.svelte'
  import ConfirmAccountModal from 'components/confirm-account/ConfirmAccountModal.svelte'

  import { siteContext } from 'store/context'

  let ignoreConfirm = false
  let confirming = false
</script>

<!-- only show for inactive members -->
{#if $siteContext.user && !$siteContext.user?.semester?.enrollment && !ignoreConfirm}
  <section style="margin: 2em; margin-bottom: -1em; padding-top: 40px">
    <div class="notification is-info">
      <DeleteButton click={() => (ignoreConfirm = true)} />
      <div style="width: 100%; display: flex: align-items: center">
        <div>
          Welcome! Feel free to browse the site, but if you're going to be
          active in Glee Club this semester, please confirm your account so we
          can get you into the system.
        </div>
        <div>
          <!-- TODO: style={{ margin: "0 2em" }} -->
          <Button
            click={() => (confirming = true)}
            color="is-info"
            inverted
            outlined
          >
            Confirm
          </Button>
        </div>
      </div>
    </div>
    {#if confirming}
      <ConfirmAccountModal close={() => (confirming = false)} />
    {/if}
  </section>
{/if}

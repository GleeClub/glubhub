<script lang="ts">
  import Box from "components/bulma/Box.svelte";
  import Column from "components/bulma/Column.svelte";
  import Title from "components/bulma/Title.svelte";
  import ButtonGroup from "components/buttons/ButtonGroup.svelte";
  import LinkButton from "components/buttons/LinkButton.svelte";
  import SubmitButton from "components/buttons/SubmitButton.svelte";
  import ErrorBox from "components/remote/ErrorBox.svelte";
  import TextInput from "components/forms/TextInput.svelte";

  import { routeLogin } from "route/constructors";
  import { emailType } from "state/input";
  import { emptyLoaded, loading, RemoteData, stateFromResult } from "state/types";
  import { goToRoute } from "store/route"
  import { query } from "state/query";

  let state: RemoteData = emptyLoaded;

  let email = "";
  let confirmEmail = "";

  async function submit() {
    if (email !== confirmEmail) {
      alert("Your emails don't match.");
      return;
    }

    state = loading;
    const result = await query("ForgotPassword", { email });

    state = stateFromResult(result);
    if (result.type === "loaded") {
      goToRoute(routeLogin);
      alert(
        "Check your email for a password reset link, it should be there in a few minutes."
      );
    }
  }
</script>

<div class="container fullheight">
  <div class="columns is-centered is-vcentered">
    <Column narrow>
      <form on:submit|preventDefault={submit} style="padding: 10px">
        <Box>
          <Title is4>Forgot your password?</Title>
          <p>
            That sucks. But don't "oh geez, oh frick", just slap some emails
            down and we will send you an email with a reset link.
          </p>
          <br />
          <TextInput
            type={emailType}
            value={email}
            onInput={newEmail => email = newEmail}
            title="E-mail"
            placeholder="gburdell3@gatech.edu"
            required
          />
          <TextInput
            type={emailType}
            value={confirmEmail}
            onInput={newConfirmEmail => confirmEmail = newConfirmEmail}
            title="Confirm E-mail"
            placeholder="bgurdell3@gatech.edu"
            required
          />

          <ButtonGroup alignment="is-right">
            <LinkButton route={routeLogin}>uh, nvm</LinkButton>
            <SubmitButton color="is-primary" loading={state.type === "loading"}>
              halp
            </SubmitButton>
          </ButtonGroup>
          {#if state.type === "error"}
            <ErrorBox error={state.error} />
          {/if}
        </Box>
      </form>
    </Column>
  </div>
</div>

<script lang="ts">
  import Box from "components/basic/Box.svelte";
  import Column from "components/basic/Column.svelte";
  import Title4 from "components/basic/Title4.svelte";
  import ButtonGroup from "components/buttons/ButtonGroup.svelte";
  import LinkButton from "components/buttons/LinkButton.svelte";
  import SubmitButton from "components/buttons/SubmitButton.svelte";
  import ErrorBox from "components/ErrorBox.svelte";
  import TextInput from "components/forms/TextInput.svelte";
  import { ForgotPasswordDocument } from "gql-operations";

  import { routeLogin } from "route/constructors";
  import { emailType } from "state/input";
  import { mutation } from "state/query";
  import { emptyLoaded, loading, RemoteData } from "state/types";
  import { goToRoute } from "store/route"

  let state: RemoteData = emptyLoaded;

  let email = "";
  let confirmEmail = "";

  async function submit() {
    if (email !== confirmEmail) {
      alert("Your emails don't match.");
      return;
    }

    state = loading;
    const response = await mutation(ForgotPasswordDocument, { email });

    if (response.type === "loaded") {
      goToRoute(routeLogin);
      alert(
        "Check your email for a password reset link, it should be there in a few minutes."
      );
    } else {
      state = response;
    }
  }
</script>

<div class="container fullheight">
  <div class="columns is-centered is-vcentered">
    <Column narrow>
      <form on:submit|preventDefault={submit} style="padding: 10px">
        <Box>
          <Title4>Forgot your password?</Title4>
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

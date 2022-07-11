<script lang="ts">
  import Container from "components/basic/Container.svelte";
  import Columns from "components/basic/Columns.svelte";
  import Column from "components/basic/Column.svelte";
  import Box from "components/basic/Box.svelte";
  import TextInput from "components/forms/TextInput.svelte";
  import SubmitButton from "components/buttons/SubmitButton.svelte";
  import Control from "components/forms/Control.svelte";
  import LinkButton from "components/buttons/LinkButton.svelte";

  import { setToken } from "utils/token";
  import { routeEditProfile, routeForgotPassword, routeHome } from "route/constructors";
  import { emptyLoaded, loading, RemoteData } from "state/types";
  import { goToRoute } from "store/route";
  import { mutation } from "state/query";
  import { LoginDocument } from "gql-operations";
  import { Md5 } from "ts-md5";
  import { reloadContext } from "store/context";
  import { emailType, passwordType } from "state/input";

  let email = "";
  let password = "";
  let state: RemoteData = emptyLoaded;

  async function submit() {
    state = loading;
    const response = await mutation(LoginDocument, { email, passHash: Md5.hashStr(password) });

    if (response.type === "loaded") {
      setToken(response.data.login);
      reloadContext();
      goToRoute(routeHome);
    } else {
      state = response;
      alert("Your username and/or password were incorrect.");
    }
  }
</script>

<Container fullheight>
  <Columns centered vcentered flex>
    <Column narrow>
      <Box>
        <form on:submit|preventDefault={submit}>
          <img style="width: 100%" alt="" src="./glubhub.svg" />
          <TextInput
            type={emailType}
            value={email}
            onInput={newEmail => email = newEmail}
            title="Who are you?"
            placeholder="gburdell3@gatech.edu"
          />
          <TextInput
            type={passwordType}
            value={password}
            onInput={newPassword => password = newPassword}
            title="Oh yeah? Prove it."
            placeholder="••••••••"
          />

          <div>
            <SubmitButton
              color="is-primary"
              fullwidth
              loading={state.type === "loading"}
            >
              I posit that I am worthy
            </SubmitButton>
            <br />
            <div class="field is-grouped is-grouped-centered is-expanded">
              <Control>
                <LinkButton route={routeForgotPassword}>
                  I have forgotten who I am
                </LinkButton>
              </Control>
              <Control>
                <LinkButton
                  route={routeEditProfile}
                  color="is-primary"
                  outlined
                >
                  I am not anyone yet
                </LinkButton>
              </Control>
            </div>
          </div>
        </form>
      </Box>
    </Column>
  </Columns>
</Container>

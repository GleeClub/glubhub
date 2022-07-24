<script lang="ts">
  import Container from 'src/components/bulma/Container.svelte'
  import Columns from 'src/components/bulma/Columns.svelte'
  import Column from 'src/components/bulma/Column.svelte'
  import Box from 'src/components/bulma/Box.svelte'
  import TextInput from 'src/components/forms/TextInput.svelte'
  import SubmitButton from 'src/components/buttons/SubmitButton.svelte'
  import Control from 'src/components/forms/Control.svelte'
  import LinkButton from 'src/components/buttons/LinkButton.svelte'

  import { Md5 } from 'ts-md5'
  import { query } from 'src/state/query'
  import { setToken } from 'src/utils/token'
  import { routeEditProfile, routeForgotPassword } from 'src/route/constructors'
  import {
    emptyLoaded,
    loading,
    RemoteData,
    stateFromResult,
  } from 'src/state/types'
  import { emailType, passwordType } from 'src/state/input'

  let email = ''
  let password = ''
  let state: RemoteData = emptyLoaded

  async function submit() {
    state = loading
    const result = await query('Login', {
      email,
      passHash: Md5.hashStr(password),
    })

    state = stateFromResult(result)
    if (result.type === 'loaded') {
      setToken(result.data.login)
      window.location.reload()
    } else {
      alert('Your username and/or password were incorrect.')
    }
  }
</script>

<Container fullheight>
  <Columns centered vcentered flex>
    <Column narrow>
      <Box>
        <form on:submit|preventDefault={submit}>
          <img style="width: 100%" alt="" src="/glubhub.svg" />
          <TextInput
            type={emailType}
            value={email}
            onInput={(newEmail) => (email = newEmail)}
            title="Who are you?"
            placeholder="gburdell3@gatech.edu"
          />
          <TextInput
            type={passwordType}
            value={password}
            onInput={(newPassword) => (password = newPassword)}
            title="Oh yeah? Prove it."
            placeholder="••••••••"
          />

          <div>
            <SubmitButton
              color="is-primary"
              fullwidth
              loading={state.type === 'loading'}
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

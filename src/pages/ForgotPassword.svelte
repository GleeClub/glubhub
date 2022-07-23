<script lang="ts">
  import Box from 'src/components/bulma/Box.svelte'
  import Column from 'src/components/bulma/Column.svelte'
  import Title from 'src/components/bulma/Title.svelte'
  import ButtonGroup from 'src/components/buttons/ButtonGroup.svelte'
  import LinkButton from 'src/components/buttons/LinkButton.svelte'
  import SubmitButton from 'src/components/buttons/SubmitButton.svelte'
  import ErrorBox from 'src/components/remote/ErrorBox.svelte'
  import TextInput from 'src/components/forms/TextInput.svelte'

  import { routeLogin } from 'src/route/constructors'
  import { emailType } from 'src/state/input'
  import {
    emptyLoaded,
    loading,
    RemoteData,
    stateFromResult,
  } from 'src/state/types'
  import { goToRoute } from 'src/store/route'
  import { query } from 'src/state/query'

  let state: RemoteData = emptyLoaded

  let email = ''
  let confirmEmail = ''

  async function submit() {
    if (email !== confirmEmail) {
      alert("Your emails don't match.")
      return
    }

    state = loading
    const result = await query('ForgotPassword', { email })

    state = stateFromResult(result)
    if (result.type === 'loaded') {
      goToRoute(routeLogin)
      alert(
        'Check your email for a password reset link, it should be there in a few minutes.'
      )
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
            onInput={(newEmail) => (email = newEmail)}
            title="E-mail"
            placeholder="gburdell3@gatech.edu"
            required
          />
          <TextInput
            type={emailType}
            value={confirmEmail}
            onInput={(newConfirmEmail) => (confirmEmail = newConfirmEmail)}
            title="Confirm E-mail"
            placeholder="bgurdell3@gatech.edu"
            required
          />

          <ButtonGroup alignment="is-right">
            <LinkButton route={routeLogin}>uh, nvm</LinkButton>
            <SubmitButton color="is-primary" loading={state.type === 'loading'}>
              halp
            </SubmitButton>
          </ButtonGroup>
          {#if state.type === 'error'}
            <ErrorBox error={state.error} />
          {/if}
        </Box>
      </form>
    </Column>
  </div>
</div>

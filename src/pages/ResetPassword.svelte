<script lang="ts">
  import Box from 'components/bulma/Box.svelte'
  import Column from 'components/bulma/Column.svelte'
  import Columns from 'components/bulma/Columns.svelte'
  import Container from 'components/bulma/Container.svelte'
  import Title from 'components/bulma/Title.svelte'
  import ButtonGroup from 'components/buttons/ButtonGroup.svelte'
  import SubmitButton from 'components/buttons/SubmitButton.svelte'
  import ErrorBox from 'components/remote/ErrorBox.svelte'
  import TextInput from 'components/forms/TextInput.svelte'

  import { routeLogin } from 'route/constructors'
  import { passwordType } from 'state/input'
  import { query } from 'state/query'
  import {
    emptyLoaded,
    loading,
    RemoteData,
    stateFromResult,
  } from 'state/types'
  import { goToRoute } from 'store/route'
  import { Md5 } from 'ts-md5'

  export let token: string

  let state: RemoteData = emptyLoaded

  let password = ''
  let confirmPassword = ''

  async function resetPassword() {
    if (password !== confirmPassword) {
      alert("Your passwords don't match.")
      return
    }

    state = loading
    const result = await query('ResetPassword', {
      token,
      passHash: Md5.hashStr(password),
    })

    state = stateFromResult(result)
    if (result.type === 'loaded') {
      goToRoute(routeLogin)
      alert('Your password has been successfully reset!')
    }
  }
</script>

<Container fullheight>
  <Columns centered vcentered>
    <Column narrow>
      <form on:submit|preventDefault={resetPassword} style="padding: 10px">
        <Box>
          <Title is4>Reset your Password</Title>
          <p>
            Good job getting this far. Gimme a new password, and you'll be
            reborn like it's Avatar 2009.
          </p>
          <br />
          <TextInput
            type={passwordType}
            value={password}
            onInput={(newPassword) => (password = newPassword)}
            title="Password"
            placeholder="••••••••"
            required
          />
          <TextInput
            type={passwordType}
            value={confirmPassword}
            onInput={(newConfirmPassword) =>
              (confirmPassword = newConfirmPassword)}
            title="Confirm Password"
            placeholder="••••••••"
            required
          />

          <ButtonGroup alignment="is-right">
            <SubmitButton color="is-primary" loading={state.type === 'loading'}>
              call me Jake Sully
            </SubmitButton>
          </ButtonGroup>
          {#if state.type === 'error'}
            <ErrorBox error={state.error} />
          {/if}
        </Box>
      </form>
    </Column>
  </Columns>
</Container>

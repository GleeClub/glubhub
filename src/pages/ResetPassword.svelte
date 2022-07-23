<script lang="ts">
  import Box from 'src/components/bulma/Box.svelte'
  import Column from 'src/components/bulma/Column.svelte'
  import Columns from 'src/components/bulma/Columns.svelte'
  import Container from 'src/components/bulma/Container.svelte'
  import Title from 'src/components/bulma/Title.svelte'
  import ButtonGroup from 'src/components/buttons/ButtonGroup.svelte'
  import SubmitButton from 'src/components/buttons/SubmitButton.svelte'
  import ErrorBox from 'src/components/remote/ErrorBox.svelte'
  import TextInput from 'src/components/forms/TextInput.svelte'

  import { routeLogin } from 'src/route/constructors'
  import { passwordType } from 'src/state/input'
  import { query } from 'src/state/query'
  import {
    emptyLoaded,
    loading,
    RemoteData,
    stateFromResult,
  } from 'src/state/types'
  import { goToRoute } from 'src/store/route'
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

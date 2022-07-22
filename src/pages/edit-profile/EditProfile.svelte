<script lang="ts">
  import Box from 'components/bulma/Box.svelte'
  import Container from 'components/bulma/Container.svelte'
  import Section from 'components/bulma/Section.svelte'
  import Title from 'components/bulma/Title.svelte'
  import HeaderText from './HeaderText.svelte'
  import ErrorBox from 'components/remote/ErrorBox.svelte'
  import FormFields from './FormFields.svelte'

  import { routeLogin, routeProfile } from 'route/constructors'
  import {
    emptyLoaded,
    loading,
    RemoteData,
    stateFromResult,
  } from 'state/types'
  import { reloadSiteContext, siteContext } from 'store/context'
  import { get } from 'svelte/store'
  import { MemberUpdate } from 'gql-operations'
  import { buildProfileForm } from './form'
  import { Md5 } from 'ts-md5'
  import { query } from 'state/query'
  import { goToRoute } from 'store/route'

  let password = ''
  let confirmPassword = ''
  let state: RemoteData = emptyLoaded
  let form: MemberUpdate = buildProfileForm(get(siteContext))

  async function updateProfile() {
    const loggedIn = !!get(siteContext).user

    const enteredPassword = !!(password || confirmPassword)
    if (!enteredPassword && !loggedIn) {
      alert('You must enter a password.')
      return
    } else if (password !== confirmPassword) {
      alert("Your passwords don't match.")
      return
    } else if (!form.section) {
      // TODO: is this actually needed?
      alert('You need a section, bucko.')
      return
    }

    state = loading
    form.passHash = enteredPassword ? Md5.hashStr(password) : null
    const result = loggedIn
      ? await query('UpdateMember', {
          email: get(siteContext).user!.email,
          update: form,
        })
      : await query('RegisterMember', {
          newMember: {
            ...form,
            enrollment: form.enrollment!,
            passHash: form.passHash!,
          },
        })

    state = stateFromResult(result)
    if (result.type === 'loaded') {
      if (loggedIn) {
        goToRoute(routeProfile(form.email, null))
        reloadSiteContext()
      } else {
        goToRoute(routeLogin)
        alert(
          `You have successfully created an account with email ${form.email}!`
        )
      }
    }
  }
</script>

<Section>
  <Container>
    <Title>{$siteContext.user ? 'Edit' : 'Create'} Profile</Title>
    <Box>
      <HeaderText />
      <br />
      <FormFields
        loggedIn={!!$siteContext.user}
        {form}
        updateForm={(updatedForm) => (form = updatedForm)}
        {password}
        updatePassword={(newPassword) => (password = newPassword)}
        {confirmPassword}
        updateConfirmPassword={(newConfirmPassword) =>
          (confirmPassword = newConfirmPassword)}
        {state}
        on:submit={updateProfile}
      />

      {#if state.type === 'error'}
        <ErrorBox error={state.error} />
      {/if}
    </Box>
  </Container>
</Section>

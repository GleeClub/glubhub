<script lang="ts">
  import Box from 'src/components/bulma/Box.svelte'
  import Container from 'src/components/bulma/Container.svelte'
  import Section from 'src/components/bulma/Section.svelte'
  import Title from 'src/components/bulma/Title.svelte'
  import HeaderText from './HeaderText.svelte'
  import ErrorBox from 'src/components/remote/ErrorBox.svelte'
  import FormFields from './FormFields.svelte'

  import { routeLogin, routeProfile } from 'src/route/constructors'
  import {
    emptyLoaded,
    loading,
    RemoteData,
    stateFromResult,
  } from 'src/state/types'
  import { reloadSiteContext, siteContext } from 'src/store/context'
  import { get } from 'svelte/store'
  import { MemberUpdate } from 'src/gql-operations'
  import { buildProfileForm } from './form'
  import { Md5 } from 'ts-md5'
  import { query } from 'src/state/query'
  import { goToRoute } from 'src/store/route'
import { onDestroy } from 'svelte';

  let password = ''
  let confirmPassword = ''
  let state: RemoteData = emptyLoaded
  let form: MemberUpdate = buildProfileForm(get(siteContext))

  async function updateProfile() {
    const loggedIn = !!get(siteContext).user

    const enteredPassword = !!(password || confirmPassword)
    if (!enteredPassword && !loggedIn) {
      alert('You need a password, champ')
      return
    } else if (password !== confirmPassword) {
      alert("Your passwords don't match, buddy")
      return
    } else if (!form.section && !loggedIn) {
      alert('You need a section, bucko')
      return
    }

    state = loading
    form.passHash = enteredPassword ? Md5.hashStr(password) : null
    const result = loggedIn
      ? await query('UpdateProfile', {
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
  
  const unsubscribe = siteContext.subscribe(context => {
    if (context.user) {
      form = buildProfileForm(context)
    }
  })
  
  onDestroy(unsubscribe)
</script>

<Section>
  <Container>
    <Title>{$siteContext.user ? 'Edit' : 'Create'} Profile</Title>
    <Box>
      <HeaderText />
      <br />
      <FormFields
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

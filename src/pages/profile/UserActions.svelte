<script lang="ts">
  import Button from 'src/components/buttons/Button.svelte'
  import ButtonGroup from 'src/components/buttons/ButtonGroup.svelte'
  import LinkButton from 'src/components/buttons/LinkButton.svelte'
  import RequiresPermission from 'src/components/member/RequiresPermission.svelte'
  import DeleteModal from 'src/components/popup/DeleteModal.svelte'
  import ErrorBox from 'src/components/remote/ErrorBox.svelte'

  import { query } from 'src/state/query'
  import { goToRoute } from 'src/store/route'
  import { siteContext } from 'src/store/context'
  import { FullMemberQuery } from 'src/gql-operations'
  import { deleteUser, switchUser } from 'src/state/permissions'
  import { routeEditProfile, routeRoster } from 'src/route/constructors'
  import { getOldToken, getToken, setOldToken, setToken } from 'src/utils/token'
  import {
    emptyLoaded,
    loading,
    RemoteData,
    stateFromResult,
  } from 'src/state/types'

  export let member: FullMemberQuery['member']

  let loginAsState: RemoteData = emptyLoaded
  let deleteState: RemoteData | null = null

  $: nickname = member.preferredName || member.firstName

  function logout() {
    setToken(null)
    window.location.reload()
  }

  async function logBackIn() {
    const oldToken = getOldToken()
    if (!oldToken) return

    loginAsState = loading
    const logoutResult = await query('Logout')

    if (logoutResult.type === 'loaded') {
      setOldToken(null)
      setToken(oldToken)
      window.location.reload()
    }
  }

  async function loginAsMember() {
    loginAsState = loading
    const result = await query('LoginAs', { email: member.email })

    loginAsState = stateFromResult(result)
    if (result.type === 'loaded') {
      const currentToken = getToken()
      setOldToken(currentToken)
      setToken(result.data.loginAs)

      window.location.reload()
    }
  }

  async function deleteMember() {
    deleteState = loading
    const result = await query('DeleteMember', { email: member.email })

    deleteState = stateFromResult(result)
    if (result.type === 'loaded') {
      goToRoute(routeRoster)
    }
  }
</script>

{#if $siteContext.user?.email === member.email}
  <ButtonGroup>
    {#if getOldToken()}
      <Button click={logBackIn}>Log back in as yourself</Button>
    {:else}
      <Button click={logout}>Log out</Button>
    {/if}
    <LinkButton route={routeEditProfile}>Edit your profile</LinkButton>
  </ButtonGroup>
{:else}
  <ButtonGroup>
    <RequiresPermission permission={switchUser}>
      <Button loading={loginAsState.type === 'loading'} click={loginAsMember}>
        Log in as {nickname}
      </Button>
    </RequiresPermission>
    <RequiresPermission permission={deleteUser}>
      <Button click={() => (deleteState = emptyLoaded)}>
        Delete {nickname}
      </Button>
    </RequiresPermission>
    {#if loginAsState.type === 'error'}
      <ErrorBox error={loginAsState.error} />
    {/if}

    {#if deleteState}
      <DeleteModal
        title="Delete {member.fullName}?"
        state={deleteState}
        confirm={deleteMember}
        cancel={() => (deleteState = null)}
      >
        Are you sure you want to delete {member.fullName}?
        <br />
        <i>Think of what Uncle Ben would say. No, not the rice one.</i>
      </DeleteModal>
    {/if}
  </ButtonGroup>
{/if}

<script lang="ts">
  import Title from 'src/components/bulma/Title.svelte'
  import Button from 'src/components/buttons/Button.svelte'
  import Modal from 'src/components/popup/Modal.svelte'
  import ErrorBox from 'src/components/remote/ErrorBox.svelte'
  import BeholdThe from './BeholdThe.svelte'
  import CancelModalButton from './CancelModalButton.svelte'

  import { adminMoney, routeAdmin } from 'src/route/constructors'
  import { query } from 'src/state/query'
  import {
    emptyLoaded,
    loading,
    RemoteData,
    stateFromResult,
  } from 'src/state/types'
  import { replaceRoute } from 'src/store/route'

  let state: RemoteData = emptyLoaded

  async function assignDues() {
    state = loading
    const result = await query('ChargeDues', {})

    state = stateFromResult(result)
    if (result.type === 'loaded') {
      replaceRoute(routeAdmin(adminMoney(null)))
    }
  }
</script>

<Modal close={() => replaceRoute(routeAdmin(adminMoney(null)))}>
  <div style:padding="20px">
    <Title>
      You are fixin' to assign dues to everyone
      <b>who has not yet been assigned dues this semester.</b>
    </Title>
    <BeholdThe text="power" />
    <BeholdThe text="corruption" />
    <BeholdThe text="folksy phrasing" />
    {#if state.type === 'error'}
      <ErrorBox error={state.error} />
    {/if}
    <br />
    <Button
      element="a"
      color="is-primary"
      className="is-pulled-left"
      loading={state.type === 'loading'}
      click={assignDues}
    >
      Dolla dolla bill, y'all
    </Button>
    <CancelModalButton />
    <br />
  </div>
</Modal>

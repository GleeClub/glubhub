<script lang="ts">
  import Box from 'components/bulma/Box.svelte'
  import Title from 'components/bulma/Title.svelte'
  import Remote from 'components/remote/Remote.svelte'
  import StateBox from 'components/remote/StateBox.svelte'
  import GigRequestTable from './GigRequestTable.svelte'

  import { GigRequestStatus } from 'gql-operations'
  import { derived } from 'svelte/store'
  import { eagerQuery, query } from 'state/query'
  import {
    emptyLoaded,
    loading,
    mapLazyLoaded,
    RemoteData,
    stateFromResult,
  } from 'state/types'

  let state: RemoteData = emptyLoaded

  const [allGigRequests, reloadAllGigRequests] = eagerQuery('AllGigRequests')

  const gigRequestsWithStatus = (status: GigRequestStatus) =>
    derived(allGigRequests, (requests) =>
      mapLazyLoaded(requests, (reqs) =>
        reqs.gigRequests.filter((r) => r.status === status)
      )
    )
  const pendingGigRequests = gigRequestsWithStatus(GigRequestStatus.Pending)
  const acceptedGigRequests = gigRequestsWithStatus(GigRequestStatus.Accepted)
  const dismissedGigRequests = gigRequestsWithStatus(GigRequestStatus.Dismissed)

  async function dismissRequest(id: number) {
    state = loading
    const result = await query('DismissGigRequest', { id })

    state = stateFromResult(result)
    if (result.type === 'loaded') {
      reloadAllGigRequests({})
    }
  }

  async function reopenRequest(id: number) {
    state = loading
    const result = await query('ReopenGigRequest', { id })

    state = stateFromResult(result)
    if (result.type === 'loaded') {
      reloadAllGigRequests({})
    }
  }
</script>

<Title>Gig Requests</Title>
<Box>
  <Remote data={$pendingGigRequests}>
    <GigRequestTable
      slot="loaded"
      let:data={gigRequests}
      {gigRequests}
      reopen={reopenRequest}
      dismiss={dismissRequest}
    />
  </Remote>
  <StateBox {state} />
</Box>

<Title>Accepted Gig Requests</Title>
<Box>
  <Remote data={$acceptedGigRequests}>
    <GigRequestTable
      slot="loaded"
      let:data={gigRequests}
      {gigRequests}
      reopen={reopenRequest}
      dismiss={dismissRequest}
    />
  </Remote>
</Box>

<Title>Dismissed Gig Requests</Title>
<Box>
  <Remote data={$dismissedGigRequests}>
    <GigRequestTable
      slot="loaded"
      let:data={gigRequests}
      {gigRequests}
      reopen={reopenRequest}
      dismiss={dismissRequest}
    />
  </Remote>
</Box>

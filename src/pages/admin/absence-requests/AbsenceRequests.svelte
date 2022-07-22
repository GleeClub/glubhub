<script lang="ts">
  import Box from 'components/bulma/Box.svelte'
  import Title from 'components/bulma/Title.svelte'
  import Remote from 'components/remote/Remote.svelte'
  import StateBox from 'components/remote/StateBox.svelte'
  import AbsenceRequestTable from './AbsenceRequestTable.svelte'

  import { AbsenceRequestStatus } from 'gql-operations'
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

  const [allAbsenceRequests, reloadAllAbsenceRequests] =
    eagerQuery('AllAbsenceRequests')

  const openAbsenceRequests = derived(allAbsenceRequests, (requests) =>
    mapLazyLoaded(requests, (reqs) =>
      reqs.absenceRequests.filter(
        (r) => r.state === AbsenceRequestStatus.Pending
      )
    )
  )
  const closedAbsenceRequests = derived(allAbsenceRequests, (requests) =>
    mapLazyLoaded(requests, (reqs) =>
      reqs.absenceRequests.filter(
        (r) => r.state !== AbsenceRequestStatus.Pending
      )
    )
  )

  async function respondToAbsenceRequest(
    eventId: number,
    email: string,
    approved: boolean
  ) {
    state = loading
    const result = await query('RespondToAbsenceRequest', {
      eventId,
      email,
      approved,
    })

    state = stateFromResult(result)
    if (result.type === 'loaded') {
      reloadAllAbsenceRequests({})
    }
  }
</script>

<div style:width="100%">
  <Title>Open Absence Requests</Title>
  <Box>
    <Remote data={$openAbsenceRequests}>
      <AbsenceRequestTable
        slot="loaded"
        let:data={absenceRequests}
        {absenceRequests}
        respond={respondToAbsenceRequest}
      />
    </Remote>
  </Box>
  <Title>Closed Absence Requests</Title>
  <Box>
    <Remote data={$closedAbsenceRequests}>
      <AbsenceRequestTable
        slot="loaded"
        let:data={absenceRequests}
        {absenceRequests}
        respond={respondToAbsenceRequest}
      />
    </Remote>
  </Box>
  <StateBox {state} />
</div>

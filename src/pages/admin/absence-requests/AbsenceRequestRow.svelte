<script lang="ts">
  import { AllAbsenceRequestsQuery } from 'src/gql-operations'
  import { routeEvents, routeProfile } from 'src/route/constructors'
  import { renderRoute } from 'src/route/render'
  import { dateFormatter, timeFormatter } from 'src/utils/datetime'

  export let absenceRequest: AllAbsenceRequestsQuery['absenceRequests'][number]
</script>

<tr class="no-bottom-border">
  <td>
    {dateFormatter(absenceRequest.time)}
    <br />
    {timeFormatter(absenceRequest.time)}
  </td>
  <td>
    <a href={renderRoute(routeEvents(absenceRequest.event.id, null))}>
      {absenceRequest.event.name}
    </a>
  </td>
  <td>
    {dateFormatter(absenceRequest.event.callTime)}
    <br />
    {timeFormatter(absenceRequest.event.callTime)}
    <br />
    {absenceRequest.event.location || ''}
  </td>
  <td>
    <a href={renderRoute(routeProfile(absenceRequest.member.email, null))}>
      {absenceRequest.member.fullName}
    </a>
  </td>
  <td>
    <i>"${absenceRequest.reason}"</i>
  </td>
</tr>

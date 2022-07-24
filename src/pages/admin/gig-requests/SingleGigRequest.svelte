<script lang="ts">
  import EmailLink from 'src/components/member/EmailLink.svelte'
  import PhoneLink from 'src/components/member/PhoneLink.svelte'

  import { AllGigRequestsQuery } from 'src/gql-operations'
  import {
    simpleDateWithYearFormatter,
    timeFormatter,
  } from 'src/utils/datetime'

  export let gigRequest: AllGigRequestsQuery['gigRequests'][number]
</script>

<tr class="no-bottom-border">
  <td>
    {simpleDateWithYearFormatter(gigRequest.time)}
    <br />
    {timeFormatter(gigRequest.time)}
  </td>
  <td>{gigRequest.name}</td>
  <td>
    {simpleDateWithYearFormatter(gigRequest.startTime)}
    <br />
    {timeFormatter(gigRequest.startTime)}
    <br />
    {gigRequest.location}
  </td>
  <td>
    {gigRequest.organization}
    <br />
    {gigRequest.contactName}
    <br />
    <PhoneLink phone={gigRequest.contactPhone} />
    <br />
    <EmailLink email={gigRequest.contactEmail} />
  </td>
  <td>
    <i>"{gigRequest.comments || 'no description given'}"</i>
  </td>
</tr>

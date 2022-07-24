<script lang="ts">
  import EmailLink from 'src/components/member/EmailLink.svelte'
  import PhoneLink from 'src/components/member/PhoneLink.svelte'

  import { FullMemberQuery } from 'src/gql-operations'

  export let member: FullMemberQuery['member']
</script>

<!-- TODO: replace p with something else -->
<p />
<h1 class="subtitle is-3" style:margin-bottom="initial">
  {member.fullName}
</h1>
<i>"{member.about || 'no quote'}"</i>
<br />
{#if member.positions.length}
  {member.positions.map((p) => p.name).join(', ')}
{:else}
  Member
{/if}
<br />
<EmailLink email={member.email} />
<br />
<PhoneLink phone={member.phoneNumber} />
<br />
{member.semester?.section || 'Homeless'}
<br />
{member.major || 'No major'}
{member.major && member.minor && `, minoring in ${member.minor}`}

<script lang="ts">
  import Column from 'src/components/bulma/Column.svelte'
  import Table from 'src/components/bulma/Table.svelte'
  import Button from 'src/components/buttons/Button.svelte'
  import ButtonGroup from 'src/components/buttons/ButtonGroup.svelte'
  import EditProfileForm from './EditProfileForm.svelte'

  import { query } from 'src/state/query'
  import { FullMemberQuery, MemberUpdate } from 'src/gql-operations'
  import {
    emptyLoaded,
    loading,
    RemoteData,
    stateFromResult,
  } from 'src/state/types'
import { titleCase } from 'src/utils/helpers';

  export let member: FullMemberQuery['member']
  export let onUpdate: () => void

  let state: RemoteData = emptyLoaded
  let form: MemberUpdate | null = null

  $: readonlyRows = [
    ['First Name', member.firstName],
    ['Preferred Name', member.preferredName || ''],
    ['Last Name', member.lastName],
    ['Email', member.email],
    ['Phone Number', member.phoneNumber],
    ['Location', member.location],
    ['On Campus', `${member.onCampus}`],
    ['Enrollment', member.semester?.enrollment ? titleCase(member.semester.enrollment) : 'Inactive'],
    ['Section', member.semester?.section || 'Homeless'],
    ['About', member.about],
    ['Picture', member.picture],
    ['Arrived At Tech', typeof member.arrivedAtTech === "number" ? `${member.arrivedAtTech}` : ''],
    ['Gateway Drug', member.gatewayDrug],
    ['Conflicts', member.conflicts],
    ['Dietary Restrictions', member.dietaryRestrictions],
  ]

  async function updateMember() {
    if (!form) return

    state = loading
    const result = await query('UpdateMember', {
      email: member.email,
      update: form,
    })

    state = stateFromResult(result)
    if (result.type === 'loaded') {
      form = null
      onUpdate()
    }
  }

  const formForMember = (): MemberUpdate => ({
    firstName: member.firstName,
    preferredName: member.preferredName || '',
    lastName: member.lastName,
    email: member.email,
    phoneNumber: member.phoneNumber,
    location: member.location,
    onCampus: !!member.onCampus,
    major: member.major,
    minor: member.minor,
    hometown: member.hometown,
    passengers: member.passengers,
    // TODO: remove these exclams
    enrollment: member.semester!.enrollment,
    section: member.semester!.section,
    about: member.about,
    picture: member.picture,
    arrivedAtTech: member.arrivedAtTech,
    gatewayDrug: member.gatewayDrug,
    conflicts: member.conflicts,
    dietaryRestrictions: member.dietaryRestrictions,
    passHash: '',
  })
</script>

{#if form}
  <EditProfileForm
    {form}
    updateForm={(updatedForm) => (form = updatedForm)}
    {state}
    cancel={() => (form = null)}
    submit={updateMember}
  />
{:else}
  <Column>
    <Table>
      <tbody>
        {#each readonlyRows as row}
          <tr class="no-bottom-border">
            <td style:text-align="right">
              <b>{row[0]}</b>
            </td>
            <td>{row[1]}</td>
          </tr>
        {/each}
      </tbody>
    </Table>

    <ButtonGroup alignment="is-right">
      <Button click={() => (form = formForMember())}>Edit</Button>
    </ButtonGroup>
  </Column>
{/if}

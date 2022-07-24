<script lang="ts">
  import Box from 'src/components/bulma/Box.svelte'
  import Title from 'src/components/bulma/Title.svelte'
  import SelectInput from 'src/components/forms/SelectInput.svelte'
  import Remote from 'src/components/remote/Remote.svelte'
  import StateBox from 'src/components/remote/StateBox.svelte'

  import { memberType } from 'src/state/input'
  import { eagerQuery, query } from 'src/state/query'
  import {
    emptyLoaded,
    loading,
    mapLazyLoaded,
    RemoteData,
  } from 'src/state/types'
  import { siteContext } from 'src/store/context'
  import { derived } from 'svelte/store'

  let state: RemoteData = emptyLoaded

  const [currentOfficers, reloadCurrentOfficers] = eagerQuery(
    'CurrentOfficers',
    {}
  )

  const roleGroups = derived(
    [siteContext, currentOfficers],
    ([context, officers]) =>
      mapLazyLoaded(officers, (os) => ({
        officers: context.static.roles.flatMap((role) => {
          const members = os.officers
            .filter((officer) => officer.role === role.name)
            .map((officer) => officer.member)
          const slots = [...members, null].slice(0, role.maxQuantity)

          return slots.map((slot) => ({ role, member: slot }))
        }),
        members: os.members,
      }))
  )

  async function toggleOfficer(
    role: string,
    fromEmail: string | null,
    toEmail: string | null
  ) {
    state = loading

    if (fromEmail) {
      const result = await query('RemoveOfficership', {
        role,
        email: fromEmail,
      })
      if (result.type === 'error') {
        state = result
        return
      }
    }

    if (toEmail) {
      const result = await query('AddOfficership', { role, email: toEmail })
      if (result.type === 'error') {
        state = result
        return
      }
    }

    state = emptyLoaded
    reloadCurrentOfficers()
  }
</script>

<Title>Positions</Title>
<Box>
  <Remote data={$roleGroups}>
    <table class="officer-table" slot="loaded" let:data={groups}>
      <tbody>
        {#each groups.officers as group}
          <tr>
            <td style:padding-right="10px">
              <span class="inline-middle">
                {group.role.name}
              </span>
            </td>
            <td>
              <SelectInput
                type={memberType(groups.members)}
                values={[null, ...groups.members]}
                selected={group.member}
                onInput={(newMember) =>
                  toggleOfficer(
                    group.role.name,
                    group.member?.email || null,
                    newMember?.email || null
                  )}
              />
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </Remote>
  <StateBox {state} />
</Box>

<style>
  .officer-table {
    border-spacing: 5px;
    border-collapse: separate;
  }

  .inline-middle {
    display: inline-block;
    vertical-align: middle;
  }
</style>

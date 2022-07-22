<script lang="ts">
  import Remote from 'components/remote/Remote.svelte'
  import Section from 'components/bulma/Section.svelte'
  import Container from 'components/bulma/Container.svelte'
  import Columns from 'components/bulma/Columns.svelte'
  import MinutesList from './MinutesList.svelte'
  import Column from 'components/bulma/Column.svelte'
  import Box from 'components/bulma/Box.svelte'
  import RequiresPermission from 'components/member/RequiresPermission.svelte'
  import EditMinutes from './EditMinutes.svelte'

  import {
    minutesEdit,
    minutesPrivate,
    minutesPublic,
    routeMinutes,
  } from 'route/constructors'
  import { MinutesTab } from 'route/types'
  import {
    emptyLoaded,
    loading,
    notLoaded,
    RemoteData,
    stateFromResult,
  } from 'state/types'
  import { replaceRoute } from 'store/route'
  import { readable } from 'svelte/store'
  import { dateFormatter } from 'utils/datetime'
  import { editMinutes, viewCompleteMinutes } from 'state/permissions'
  import { renderRoute } from 'route/render'
  import { eagerQuery, query } from 'state/query'
  import dayjs from 'dayjs'

  export let minutesId: number | null
  export let tab: MinutesTab | null

  let createState: RemoteData = emptyLoaded

  const [allMinutes, reloadAllMinutes] = eagerQuery('AllMinutes', {})
  $: [selectedMinutes, reloadSelectedMinutes] = minutesId
    ? eagerQuery('FullMinutes', { id: minutesId })
    : [readable(notLoaded), (_vars: { id: number }) => {}]

  async function createNewMinutes() {
    createState = loading
    const now = dayjs()
    const result = await query('CreateMinutes', {
      name: `Meeting on ${dateFormatter(now)}`,
    })

    createState = stateFromResult(result)
    if (result.type === 'loaded') {
      createState = emptyLoaded
      reloadAllMinutes({})
      replaceRoute(routeMinutes(result.data.createMeetingMinutes.id, null))
    }
  }
</script>

<Section>
  <Container>
    <Columns>
      <MinutesList
        allMinutes={$allMinutes}
        selectedId={minutesId}
        {createNewMinutes}
        {createState}
      />

      <Column>
        <Box>
          <Remote data={$selectedMinutes}>
            <svelte:fragment slot="loaded" let:data={minutes}>
              <RequiresPermission permission={viewCompleteMinutes}>
                <div class="tabs">
                  <ul>
                    <li class:is-active={tab?.route === minutesPublic.route}>
                      <a
                        href={renderRoute(
                          routeMinutes(minutes.meetingMinutes.id, minutesPublic)
                        )}
                      >
                        {minutesPublic.name}
                      </a>
                    </li>
                    <li class:is-active={tab?.route === minutesPrivate.route}>
                      <a
                        href={renderRoute(
                          routeMinutes(
                            minutes.meetingMinutes.id,
                            minutesPrivate
                          )
                        )}
                      >
                        {minutesPrivate.name}
                      </a>
                    </li>
                    <RequiresPermission permission={editMinutes}>
                      <li class:is-active={tab?.route === minutesEdit.route}>
                        <a
                          href={renderRoute(
                            routeMinutes(minutes.meetingMinutes.id, minutesEdit)
                          )}
                        >
                          {minutesEdit.name}
                        </a>
                      </li>
                    </RequiresPermission>
                  </ul>
                </div>
              </RequiresPermission>

              {#if tab?.route === 'private'}
                <RequiresPermission permission={viewCompleteMinutes}>
                  <div>{@html minutes.meetingMinutes.private}</div>
                </RequiresPermission>
              {:else if tab?.route === 'edit'}
                <EditMinutes
                  minutes={minutes.meetingMinutes}
                  onUpdate={() =>
                    minutesId && reloadSelectedMinutes({ id: minutesId })}
                  onDelete={() => reloadAllMinutes({})}
                />
              {:else}
                <div>{@html minutes.meetingMinutes.public}</div>
              {/if}
            </svelte:fragment>

            <p slot="not-loaded">Select Minutes</p>
          </Remote>
        </Box>
      </Column>
    </Columns>
  </Container>
</Section>

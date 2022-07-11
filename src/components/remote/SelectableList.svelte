<script lang="ts">
  import Column from 'components/bulma/Column.svelte'
  import Title from 'components/bulma/Title.svelte'
  import Table from 'components/bulma/Table.svelte'
  import Box from 'components/bulma/Box.svelte'
  import Remote from 'components/remote/Remote.svelte'

  import type { RemoteData } from 'state/types'
  import { GOLD_COLOR } from 'utils/constants'
  import { mapLoaded } from 'state/types'

  type T = $$Generic

  interface $$Props {
    itemGroups: RemoteData<T[][]>
    title: string | undefined
    isSelected: (item: T) => boolean
    select: (item: T) => void
    messageIfEmpty: string
  }

  interface $$Slots {
    [key: string]: T
  }

  export let itemGroups: RemoteData<T[][]>
  export let title: string | undefined = undefined
  export let isSelected: (item: T) => boolean
  export let select: (item: T) => void
  export let messageIfEmpty: string | undefined = undefined

  $: nonEmptyGroups = mapLoaded(itemGroups, (gs) => gs.filter((g) => g.length))
</script>

<Column narrow>
  {#if title}
    <Title>{title}</Title>
  {/if}
  <Box>
    <slot name="top-content" />
    <Remote data={nonEmptyGroups}>
      <svelte:fragment slot="loaded" let:data={groups}>
        {#if groups.length === 0}
          <p>{messageIfEmpty}</p>
        {:else}
          <Table fullwidth hoverable className="no-bottom-border">
            <thead />
            <tbody>
              {#each groups as group, groupIndex}
                {#each group as item}
                  <tr
                    style="background-color: {isSelected(item)
                       ? GOLD_COLOR
                      : ''}"
                    on:click={() => select(item)}
                  >
                    <slot {item} />
                  </tr>
                {/each}
                {#if groupIndex < groups.length - 1}
                  <!-- Divider Row -->
                  <tr class="not-hoverable">
                    <div class="is-divider" style="margin: 1rem" />
                  </tr>
                {/if}
              {/each}
            </tbody>
          </Table>
        {/if}
      </svelte:fragment>
    </Remote>
    <slot name="bottom-content" />
  </Box>
</Column>

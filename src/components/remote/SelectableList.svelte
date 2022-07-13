<script lang="ts">
  import Column from 'components/bulma/Column.svelte'
  import Title from 'components/bulma/Title.svelte'
  import Table from 'components/bulma/Table.svelte'
  import Box from 'components/bulma/Box.svelte'
  import Remote from 'components/remote/Remote.svelte'

  import { LazyRemoteData, mapLazyLoaded } from 'state/types'
  import { GOLD_COLOR } from 'utils/constants'
  import { createEventDispatcher } from 'svelte';

  type T = $$Generic

  interface $$Props {
    itemGroups: LazyRemoteData<T[][]>;
    isSelected: (item: T) => boolean;
    render: (item: T) => string;
    title: string;
    messageIfEmpty: string;
  }

  export let itemGroups: LazyRemoteData<T[][]>;
  export let isSelected: (item: T) => boolean;
  export let render: (item: T) => string;
  export let title: string = ""
  export let messageIfEmpty: string

  const dispatch = createEventDispatcher<{ select: T }>();

  $: nonEmptyGroups = mapLazyLoaded(itemGroups, (gs) => gs.filter((g) => g.length))
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
                    style:background-color={isSelected(item) ? GOLD_COLOR : ''}
                    on:click={() => dispatch("select", item)}
                  >
                    <td>{render(item)}</td>
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

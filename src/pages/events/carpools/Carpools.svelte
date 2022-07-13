<script lang="ts">
  import { FullEventQuery } from "gql-operations";

  export let carpools: FullEventQuery['event']['carpools'];
</script>

{#if carpools.length === 0}
  <div>No carpools set for this event.</div>
{:else}
  <Table scrollable>
    {#each carpools as carpool}
      <Table>
        <thead>
          <CarpoolRow
            member={carpool.driver}
            event={event}
            isDriver
            selection={selection}
            includeIcon={includeIcon}
          />
        </thead>
        <tbody>
          {carpool.passengers.length === 0 ? (
            <NoMembersRow
              select={() => selection?.selectEmptyCarpool(carpool.driver.email)}
            />
          ) : (
            <>
              {carpool.passengers.map((passenger, index) => (
                <CarpoolRow
                  member={passenger}
                  event={event}
                  selection={selection}
                  includeIcon={includeIcon && index === 0}
                />
              ))}
            </>
          )}
        </tbody>
      </Table>
    {/each}
        includeIcon
        carpool={carpool}
        event={event}
        selection={{
          selected: [],
          selectEmptyCarpool: () => {},
          select: member => goToRoute(routeProfile(member, null))
        }}
      />
    ))}
  </Table>
{/if}
<RequiresPermission permission={editCarpool}>
  <div style={{ padding: "10px" }}>
    <LinkButton route={routeEditCarpools(event.id)}>
      Edit Carpools
    </LinkButton>
  </div>
</RequiresPermission>

export interface EditCarpoolSelection {
  selected: string[];
  select: (member: string) => void;
  selectEmptyCarpool: (driver: string) => void;
}

const NoMembersRow: React.FC<{ select: () => void }> = ({ select }) => (
  <tr>
    <td colSpan={5} style={{ width: "100%" }} onClick={select}>
      <article className="message">
        <div className="message-body">It sure is lonely here...</div>
      </article>
    </td>
  </tr>
);

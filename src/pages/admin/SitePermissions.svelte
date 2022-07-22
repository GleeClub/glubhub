<script lang="ts">
  import Remote from "components/remote/Remote.svelte";
  import Title from "components/bulma/Title.svelte";
  import Box from "components/bulma/Box.svelte";
  import Tooltip from "components/bulma/Tooltip.svelte";
  import CheckboxInput from "components/forms/CheckboxInput.svelte";
  import StateBox from "components/remote/StateBox.svelte";

  import { siteContext } from "store/context";
  import { rolePermissionsAreEqual } from "utils/helpers";
  import { emptyLoaded, loading, RemoteData, stateFromResult } from "state/types";
  import { derived } from "svelte/store";
  import { eagerQuery, query } from "state/query";
  import { NewRolePermission, Permission, PermissionType } from "gql-operations";

  let state: RemoteData = emptyLoaded;

  const [rolePermissions, _reload] = eagerQuery("AllRolePermissions", {});
  const eventTypes = derived(
    siteContext,
    context => [null, ...context.static.eventTypes.map(et => et.name)]
  );

  function permissionEventTypes(
    permission: Permission, 
    eventTypes: (string | null)[]
  ): (string | null)[] {
    if (permission.type === PermissionType.Static) {
      return [null];
    } else {
      return eventTypes;
    }
  }

  async function toggleRolePermission(rolePermission: NewRolePermission, enabled: boolean) {
    state = loading;
    const result = enabled
      ? await query("EnableRolePermission", { rolePermission })
      : await query("DisableRolePermission", { rolePermission });

    state = stateFromResult(result);
  }
</script>

<Title>Permissions</Title>
<Box>
  <Remote data={$rolePermissions}>
    <table slot="loaded" let:data={currentPermissions}>
      <tbody>
        <tr>
          <th />
          {#each $siteContext.static.roles as role}
            <th class="vertheader">
              <div>{role.name}</div>
            </th>
          {/each}
        </tr>

        {#each $siteContext.static.permissions as permission}
          {#each permissionEventTypes(permission, $eventTypes) as eventType}
            <tr>
              <td style:white-space="nowrap">
                {permission.name}
                {#if eventType}
                  :{eventType}
                {/if}
              </td>
              {#each $siteContext.static.roles as role}
                <td>
                  <Tooltip content={role.name}>
                    <CheckboxInput
                      content=""
                      checked={currentPermissions.currentPermissions.some(rp =>
                        rolePermissionsAreEqual(rp, {
                          role: role.name,
                          permission: permission.name,
                          eventType,
                        })
                      )}
                      onChange={enabled => toggleRolePermission({
                        role: role.name,
                        permission: permission.name,
                        eventType,
                      }, !enabled)}
                    />
                  </Tooltip>
                </td>              
              {/each}
            </tr>
          {/each}
        {/each}
      </tbody>
    </table>
  </Remote>
  <StateBox {state} />
</Box>

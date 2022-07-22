<script lang="ts">
  import BackButton from "components/buttons/BackButton.svelte";
  import Sidebar from "components/popup/Sidebar.svelte";
  import EditSemesterForm from "./EditSemesterForm.svelte";

  import { get } from "svelte/store";
  import { query } from "state/query";
  import { replaceRoute } from "store/route";
  import { reloadSiteContext, siteContext } from "store/context";
  import { adminSemesters, routeAdmin } from "route/constructors";
  import { emptyLoaded, loaded, loading, RemoteData, stateFromResult } from "state/types";

  let semester = get(siteContext).currentSemester;
  let state: RemoteData = emptyLoaded;

  const oldName = semester.name;

  function closeSidebar() {
    replaceRoute(routeAdmin(adminSemesters(null)));
  }

  async function editSemester() {
    state = loading;
    const result = await query("UpdateSemester", {
      name: oldName, update: semester
    });

    state = stateFromResult(result);
    if (state.type === "loaded") {
      reloadSiteContext();
      closeSidebar();
    }
  }
</script>

<Sidebar data={loaded({})} close={closeSidebar}>
  <BackButton content="cancel" click={closeSidebar} />
  <div class="column" style:text-align="center">
    <h2 class="subtitle is-2">Do it in pencil, not pen</h2>
    <p>
      Select the semester you want to make changes to, and then make the
      changes. You cannot edit the past, sorry.
    </p>
    <br />
    <EditSemesterForm
      {semester}
      update={updatedSemester => semester = updatedSemester}
      {state}
      submit={editSemester}
      submitMessage="Do this please"
    />
  </div>
</Sidebar>

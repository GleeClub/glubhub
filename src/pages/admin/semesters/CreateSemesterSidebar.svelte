<script lang="ts">
  import BackButton from "components/buttons/BackButton.svelte";
  import Sidebar from "components/popup/Sidebar.svelte";

  import { mutation } from "state/query";
  import { replaceRoute } from "store/route";
  import { adminSemesters, routeAdmin } from "route/constructors";
  import { CreateSemesterDocument, NewSemester } from "gql-operations";
  import { emptyLoaded, loaded, loading, RemoteData, stateFromResult } from "state/types";

  export let onCreate: () => void;

  // TODO: set name from `Semester Year`
  let semester: NewSemester = {
    name: "",
    gigRequirement: 5,
    startDate: "",
    endDate: "",
  };
  let state: RemoteData = emptyLoaded;

  function closeSidebar() {
    replaceRoute(routeAdmin(adminSemesters(null)));
  }

  async function createSemester() {
    state = loading;
    const result = await mutation(CreateSemesterDocument, { newSemester: semester });

    state = stateFromResult(result);
    if (result.type === "loaded") {
      onCreate();
      closeSidebar();
    }
  }
</script>

<Sidebar data={loaded({})} close={closeSidebar}>
  <svelte:fragment slot="loaded">
    <BackButton content="cancel" click={closeSidebar} />
    <div class="column" style:text-align="center">
      <h2 class="subtitle is-2">Time marches on</h2>
      <p>
        Another day, another dollar. And also another semester. Make a new
        semester baby now, and switch over to it whenever you want to
        later, but before it turns 18.
      </p>

      <br />
      <EditSemesterForm
        form={semester}
        update={updatedSemester => semester = updatedSemester}
        submit={createSemester}
        submitMessage="Break your water"
        {state}
      />
    </div>
  </svelte:fragment>
</Sidebar>

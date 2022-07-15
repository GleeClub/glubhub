<script lang="ts">
  import Remote from "components/remote/Remote.svelte";
import { SemesterTab } from "route/types";
import { reexecutableQuery } from "state/query";

  export let tab: SemesterTab | null;

  const [allSemesters, reloadAllSemesters] = reexecutableQuery(AllSemestersDocument, {});
</script>

<Title>Edit the Semester</Title>
<Remote data={$allSemesters}>
  <svelte:fragment slot="loaded" let:data={semesters}>
    <Box>
      <p>
        This is a form that will allow you to add and edit semesters in the
        database. It will also change the current semester.
      </p>
      <br />
      <p>
        Changing the current semester will change the entire face of the website.
        Only stuff from the current semester is shown on the main website. In new
        semesters, every member's status is by default 'inactive' until they log
        in and confirm themself.
      </p>
      <br />
      <p>
        With great power comes great potential to screw everyone over. Use this
        feature wisely.
      </p>
      <br />
      <p>Now, pick your poison:</p>
    </Box>

    <ButtonGroup alignment="is-centered">
      {#each [semesterChange, semesterEdit, semesterCreate] as option}
        <LinkButton
          color="is-primary"
          route={routeAdmin(adminSemesters(option))}
        >
          {option.name}
        </LinkButton>
      {/each}
    </ButtonGroup>

    <br />
    <TabContent
      {tab}
      {semesters}
      onUpdate={}
      updateSemesters={s => updateSemesters(loaded(s))}
    />
  </svelte:fragment>
</Remote>


interface TabContentProps {
  tab: SemesterTab | null;
  semesters: Semester[];
  updateSemesters: (semesters: Semester[]) => void;
}

const TabContent: React.FC<TabContentProps> = ({
  tab,
  semesters,
  updateSemesters
}) => {
  switch (tab?.route) {
    case "change":
      return <ChangeSemesterModal semesters={semesters} />;

    case "edit":
      return (
        <EditSemesterSidebar
          semesters={semesters}
          updateSemesters={updateSemesters}
        />
      );

    case "create":
      return (
        <CreateSemesterSidebar
          semesters={semesters}
          updateSemesters={updateSemesters}
        />
      );

    default:
      return <></>;
  }
};


interface EditSemesterSidebarProps {
  semesters: Semester[];
  updateSemesters: (semesters: Semester[]) => void;
}

const EditSemesterSidebar: React.FC<EditSemesterSidebarProps> = ({
  semesters,
  updateSemesters
}) => {
  const { currentSemester } = useContext(GlubHubContext);
  const { replaceRoute } = useGlubRoute();

  const [form, updateForm] = useState(formFromSemester(currentSemester!));
  const [state, setState] = useState(notSentYet);

  const closeSidebar = useCallback(
    () => replaceRoute(routeAdmin(adminSemesters(null))),
    [replaceRoute]
  );

  const editSemester = useCallback(async (event: FormEvent) => {
    event.preventDefault();

    setState(sending);
    const editedSemester = semesterJson(form);
    const result = await post(`semesters`, editedSemester);

    setState(resultToSubmissionState(result));
    if (result.successful) {
      updateSemesters(
        semesters.map(s =>
          s.name === currentSemester?.name
            ? { ...editedSemester, current: true }
            : s
        )
      );
      closeSidebar();
    }
  }, [
    setState,
    form,
    currentSemester,
    updateSemesters,
    semesters,
    closeSidebar
  ]);

  return (
    <Sidebar
      data={loaded({})}
      close={closeSidebar}
      render={() => (
        <>
          <BackButton content="cancel" click={closeSidebar} />
          <div className="column" style={{ textAlign: "center" }}>
            <h2 className="subtitle is-2">Do it in pencil, not pen</h2>
            <p>
              Select the semester you want to make changes to, and then make the
              changes. You cannot edit the past, sorry.
            </p>
            <br />
            <EditSemesterForm
              form={form}
              update={updateForm}
              state={state}
              submit={editSemester}
              submitMessage="Do this please"
            />
          </div>
        </>
      )}
    />
  );
};

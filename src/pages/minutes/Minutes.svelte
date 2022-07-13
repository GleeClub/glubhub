<script lang="ts">
  import dayjs from "dayjs";
  import { AllMinutesDocument, CreateMinutesDocument, FullMinutesDocument } from "gql-operations";
  import { routeMinutes } from "route/constructors";
  import { MinutesTab } from "route/types";
  import { mutation, query } from "state/query";
  import { emptyLoaded, loading, notLoaded, RemoteData } from "state/types";
  import { replaceRoute } from "store/route";
  import { get } from "svelte/store";
  import { dateFormatter } from "utils/datetime";

  export let minutesId: number | null;
  export let tab: MinutesTab | null;

  let showAllMinutes = false;
  let createState: RemoteData = emptyLoaded;

  const [allMinutes, reloadAllMinutes] = lazyQuery(AllMinutesDocument, {});
  $: [selectedMinutes, reloadSelectedMinutes] = minutesId
    ? lazyQuery(FullMinutesDocument, {}) 
    : [readable(notLoaded), (_vars: { id: number }) => void];

  async function createNewMinutes() {
    if (get(selectedMinutes).type !== "loaded") return;

    createState = loading;
    const now = dayjs();
    const response = await mutation(CreateMinutesDocument, {
      name: `Meeting on ${dateFormatter(now)}` 
    });

    if(response.type === "loaded") {
      createState = emptyLoaded;
      reloadAllMinutes();
      replaceRoute(routeMinutes(response.data.createMeetingMinutes.id, null));
    } else {
      createState = response;
    }
  }
</script>

<Section>
  <Container>
    <Columns>
      <MinutesList
        minutes={minutes}
        showAllMinutes={showAllMinutes}
        createState={createState}
        selectedId={isLoaded(selected) ? selected.data.id : null}
        createNewMinutes={createNewMinutes}
        toggleShowAllMinutes={() => setShowAllMinutes(!showAllMinutes)}
      />
      <Column>
        <Box>
          <RemoteContent
            data={selected}
            notAsked={<p>Select Minutes</p>}
            render={selected => (
              <>
                <MinutesTabList
                  minutes={selected}
                  tab={tab || minutesPublic}
                />
                <TabContent
                  minutes={selected}
                  tab={tab || minutesPublic}
                  updateMinutes={propagateUpdateMinutes}
                  savedMinutes={savedMinutes}
                  deletedMinutes={deletedMinutes}
                />
              </>
            )}
          />
        </Box>
      </Column>
    </Columns>
  </Container>
</Section>

interface MinutesListProps {
  minutes: RemoteData<MeetingMinutes[]>;
  showAllMinutes: boolean;
  createState: SubmissionState;
  selectedId: number | null;
  createNewMinutes: () => void;
  toggleShowAllMinutes: () => void;
}

const MinutesList: React.FC<MinutesListProps> = ({
  minutes,
  showAllMinutes,
  createNewMinutes,
  createState,
  selectedId,
  toggleShowAllMinutes
}) => {
  const { replaceRoute } = useGlubRoute();

  return (
    <SelectableList
      listItems={
        showAllMinutes
          ? mapLoaded(minutes, m => [m])
          : mapLoaded(minutes, m => [m.slice(0, 10)])
      }
      isSelected={m => m.id === selectedId}
      onSelect={m => replaceRoute(routeMinutes(m.id, null))}
      messageIfEmpty="No minutes"
      render={m => <td>{m.name}</td>}
      contentAtTop={
        <RequiresPermission permission={editMinutes}>
          <div style={{ paddingBottom: "5px" }}>
            <ButtonGroup alignment="is-centered">
              <Button
                color="is-primary"
                onClick={createNewMinutes}
                loading={isSending(createState)}
              >
                + Add New Minutes
              </Button>
              {failedToSend(createState) && (
                <ErrorBox error={createState.error} />
              )}
            </ButtonGroup>
          </div>
        </RequiresPermission>
      }
      contentAtBottom={
        <>
          {isLoaded(minutes) && minutes.data.length > 10 && (
            <div style={{ paddingBottom: "5px" }}>
              <ButtonGroup alignment="is-centered">
                <Button onClick={toggleShowAllMinutes}>
                  {showAllMinutes ? "Hide" : "Show"} old minutes...
                </Button>
              </ButtonGroup>
            </div>
          )}
        </>
      }
    />
  );
};

interface MinutesTabListProps {
  minutes: MeetingMinutes;
  tab: MinutesTab;
}

const MinutesTabList: React.FC<MinutesTabListProps> = ({ minutes, tab }) => (
  <RequiresPermission permission={viewCompleteMinutes}>
    <div className="tabs">
      <ul>
        <SingleTab minutes={minutes} currentTab={tab} tab={minutesPublic} />
        <SingleTab minutes={minutes} currentTab={tab} tab={minutesPrivate} />
        <RequiresPermission permission={editMinutes}>
          <SingleTab minutes={minutes} currentTab={tab} tab={minutesEdit} />
        </RequiresPermission>
      </ul>
    </div>
  </RequiresPermission>
);

interface SingleTabProps {
  minutes: MeetingMinutes;
  tab: MinutesTab;
  currentTab: MinutesTab;
}

const SingleTab: React.FC<SingleTabProps> = ({ minutes, tab, currentTab }) => (
  <li className={tab.route === currentTab.route ? "is-active" : undefined}>
    <a href={renderRoute(routeMinutes(minutes.id, tab))}>{tab.name}</a>
  </li>
);

interface TabContentProps {
  minutes: MeetingMinutes;
  tab: MinutesTab;
  updateMinutes: (minutes: MeetingMinutes) => void;
  savedMinutes: (minutes: MeetingMinutes) => void;
  deletedMinutes: (minutes: MeetingMinutes) => void;
}

const TabContent: React.FC<TabContentProps> = ({
  minutes,
  tab,
  updateMinutes,
  savedMinutes,
  deletedMinutes
}) => {
  switch (tab.route) {
    case "public":
      return <div dangerouslySetInnerHTML={{ __html: minutes.public || "" }} />;

    case "private":
      return (
        <RequiresPermission permission={viewCompleteMinutes}>
          <div dangerouslySetInnerHTML={{ __html: minutes.private || "" }} />
        </RequiresPermission>
      );

    default:
      return (
        <EditMinutes
          minutes={minutes}
          update={updateMinutes}
          saved={savedMinutes}
          deleted={deletedMinutes}
        />
      );
  }
};

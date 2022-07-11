<script lang="ts">
  import Container from "components/basic/Container.svelte";
  import Remote from "components/complex/Remote.svelte";

  import { siteContext } from "store/context";
  import { AllEventsDocument } from "gql-operations";
  import { query } from "state/query";

  export interface HoveredEvent {
    event: GlubEvent;
    x: number;
    y: number;
  }

  let hovered: HoveredEvent | null = null;

  const events = query(AllEventsDocument, {});
  const attendanceIssueEmail =
    "mailto:gleeclub_officers@lists.gatech.edu?subject=Attendance%20Issue";
</script>

<Container fullheight>
  <Remote data={$events}>
    <svelte:fragment slot="loaded" let:data={loadedEvents}>
      <GradesBlock
        finalGrade={events[events.length - 1]?.change?.partialScore}
        events={events}
        hoverEvent={setHovered}
      />
      {#if hovered}
        <EventHoverBox hovered={hovered} />
      {/if}
      <Section>
        <Container>
          <Columns>
            <UpcomingEvents allEvents={events} />
            <Volunteerism pastEvents={events} />
          </Columns>
        </Container>
      </Section>
    </svelte:fragment>
  </Remote>
</Container>


const attendanceMessage = (
  enrollment: Enrollment | null,
  finalGrade: number
): string => {
  if (!enrollment) {
    return "Do you even go here?";
  } else if (finalGrade >= 90.0) {
    return "Ayy lamo nice.";
  } else if (finalGrade >= 80.0) {
    return "OK not bad, I guess";
  } else if (finalGrade >= 70.0) {
    return "Pls";
  } else {
    return "BRUH get it together.";
  }
};

const GradesBlock: React.FC<GradesBlockProps> = ({
  events,
  finalGrade,
  hoverEvent
}) => {
  const { user } = useContext(GlubHubContext);

  const grade = typeof finalGrade === 'number' ? finalGrade : 100;

  return (
    <Section>
      <Container>
        <Title>Score</Title>
        <p>
          Right now you have a <strong>{grade}</strong>.
          <br />
          <span className="has-text-grey-light is-italic">
            {attendanceMessage(user?.enrollment || null, grade)}
          </span>
        </p>
        {events.length ? (
          <>
            <div style={{ width: "100%", margin: "auto", overflowX: "scroll" }}>
              <AttendanceGraph events={events} hover={hoverEvent} />
            </div>
            <p>
              <br />
              Do you have an issue? Do you need a daddy tissue?{" "}
              <a href={attendanceIssueEmail}>Email the officers</a> to cry about
              it.
            </p>
          </>
        ) : (
            <>
              <p>New semester, new you! Make it count.</p>
              <br />
              <br />
            </>
          )}
      </Container>
    </Section>
  );
};

const EventHoverBox: React.FC<{ hovered: HoveredEvent }> = ({ hovered }) => (
  <div
    className="box"
    style={{
      position: "absolute",
      top: `${hovered.y + 20}px`,
      left: `${hovered.x}px`,
      transform: "translateX(-50%)"
    }}
  >
    <p>
      <strong>{hovered.event.name}</strong>
    </p>
    <p>{fullDateTimeFormatter(hovered.event.callTime)}</p>
    <p>
      {hovered.event.change?.change || 0.0} points{" "}
      <span className="icon is-primary has-text-primary">
        <i className="fas fa-arrow-right" />
      </span>{" "}
      {hovered.event.change?.partialScore}%
    </p>
    <p>
      <em>{hovered.event.change?.reason}</em>
    </p>
  </div>
);

const UpcomingEvents: React.FC<{ allEvents: GlubEvent[] }> = ({
  allEvents
}) => (
    <Column>
      <Title>This Week</Title>
      <Box>
        <div className="timeline">
          <ThisWeek events={allEvents} />
        </div>
      </Box>
    </Column>
  );

const Volunteerism: React.FC<{ pastEvents: GlubEvent[] }> = ({
  pastEvents
}) => {
  const { currentSemester } = useContext(GlubHubContext);

  const volunteerGigsAttended = pastEvents.filter(
    event => event.gigCount && !!event.attendance?.didAttend
  );
  const metGigRequirement =
    volunteerGigsAttended.length >= currentSemester.gigRequirement;
  const gigList = metGigRequirement
    ? volunteerGigsAttended
    : [
      ...volunteerGigsAttended,
      ...new Array<GlubEvent | null>(currentSemester.gigRequirement).fill(
        null
      )
    ].slice(0, currentSemester.gigRequirement);

  return (
    <Column>
      <Title>Volunteerism</Title>
      <Box>
        {metGigRequirement ? (
          <p>
            The dedication! The passion! The attendance! You've been to{" "}
            {romanNumeral(volunteerGigsAttended.length)} volunteer gigs this
            semester. Glub salutes you and your volunteerism.
          </p>
        ) : (
            <p>
              OK so you've only been to{" "}
              {romanNumeral(volunteerGigsAttended.length)} volunteer gigs this
            semester and you need to go to{" "}
              {romanNumeral(currentSemester.gigRequirement)}. So. Uh, you know, do
              that.
          </p>
          )}
        <p style={{ textAlign: "center" }}>
          {gigList.map(gig => (
            <>
              <GigIcon gig={gig} />{" "}
            </>
          ))}
        </p>
      </Box>
    </Column>
  );
};

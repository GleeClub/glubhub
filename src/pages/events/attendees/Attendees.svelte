<script lang="ts">
  import { FullEventQuery } from "gql-operations";

  export let attendees: FullEventQuery['event']['allAttendance'];

  // const { attending, notAttending } = separateAttendees(attendees);


const separateAttendees = (attendees: EventAttendee[]): SeparateByAttending => {
  const attending = attendees.filter(a => a.attendance.shouldAttend);
  const notAttending = attendees.filter(a => !a.attendance.shouldAttend);

  const separateByConfirmed = (
    givenAttendees: EventAttendee[]
  ): Map<string | null, SeparateByConfirmed | null> =>
    new Map(
      SECTION_ORDER.map(section => {
        const inSection = givenAttendees.filter(
          a => a.member.section === section
        );

        return [
          section,
          inSection.length
            ? {
                confirmed: inSection.filter(a => a.attendance.confirmed),
                notConfirmed: inSection.filter(a => !a.attendance.confirmed)
              }
            : null
        ];
      })
    );

  return {
    attending: separateByConfirmed(attending),
    notAttending: separateByConfirmed(notAttending)
  };
};</script>

<Column>
  <Title centered>Attending</Title>
  {SECTION_ORDER.map(
    section =>
      attending.get(section) && (
        <AttendeeTable section={section} {...attending.get(section)!} />
      )
  )}
  <Title centered>Not Attending</Title>
  {SECTION_ORDER.map(
    section =>
      notAttending.get(section) && (
        <AttendeeTable section={section} {...notAttending.get(section)!} />
      )
  )}
</Column>

const AttendeeTable: React.FC<AttendeeTableProps> = ({
  section,
  confirmed,
  notConfirmed
}) => (
  <Table fullwidth scrollable>
    <thead>
      <tr>
        <th>{section}</th>
        <th>Confirmed</th>
        <th>Not Confirmed</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style={{ width: "20%" }}></td>
        <AttendeeNameList attendees={confirmed} />
        <AttendeeNameList attendees={notConfirmed} />
      </tr>
    </tbody>
  </Table>
);

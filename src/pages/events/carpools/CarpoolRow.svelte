<script lang="ts">
  import { FullEventQuery } from "gql-operations";

  export let member: FullEventQuery['event']['carpools'][number];
</script>

export const CarpoolRow: React.FC<CarpoolRowProps> = props => {
  const isSelected = props.selection?.selected.some(
    email => email === props.member.email
  );
  const passengerCount = props.member.passengers
    ? `${props.member.passengers}`
    : "";
  const ColumnElement: React.FC = ({ children }) =>
    props.isDriver ? <th>{children}</th> : <td>{children}</td>;

  return (
    <tr
      onClick={() => props.selection?.select(props.member.email)}
      style={{ cursor: "pointer", width: "100%", minWidth: "100%" }}
      className={isSelected ? "is-selected" : undefined}
    >
      <ColumnElement>
        {props.includeIcon && (
          <span className="icon">
            <i className={"fas fa-" + (props.isDriver ? "user" : "users")} />
          </span>
        )}
      </ColumnElement>
      <ColumnElement>{fullName(props.member)}</ColumnElement>
      <ColumnElement>{props.member.location}</ColumnElement>
      <ColumnElement>{passengerCount}</ColumnElement>
      <ColumnElement>
        <AttendanceIcon
          event={{ ...props.event, attendance: props.attendance || null }}
        />
      </ColumnElement>
    </tr>
  );
}
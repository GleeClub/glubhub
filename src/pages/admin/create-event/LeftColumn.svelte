<script lang="ts">
  import Column from 'components/bulma/Column.svelte'
  import TextInput from 'components/forms/TextInput.svelte'
  import dayjs from 'dayjs'
  import customParseFormat from 'dayjs/plugin/customParseFormat'

  import { NewEventFields, NewGig } from 'gql-operations'
  import { dateType, numberType, stringType, timeType } from 'state/input'
  import { hyphenDateFormatter, timeFormatter } from 'utils/datetime'

  export let event: NewEventFields
  export let updateEvent: (event: NewEventFields) => void
  export let gig: NewGig
  export let updateGig: (gig: NewGig) => void

  function updateDatetimeWithDate(datetime: string, date: string): string {
    dayjs.extend(customParseFormat)

    const parsedDate = dayjs(date, 'YYYY-MM-DD')
    return dayjs(datetime)
      .day(parsedDate.day())
      .month(parsedDate.month())
      .year(parsedDate.year())
      .format('YYYY-MM-DDTHH:MM:SSZ')
  }

  function updateOptionalDatetimeWithDate(
    datetime: string | null | undefined,
    date: string
  ): string | undefined {
    return datetime ? updateDatetimeWithDate(datetime, date) : undefined
  }

  function updateDatetimeWithTime(datetime: string, time: string): string {
    dayjs.extend(customParseFormat)

    const parsedTime = dayjs(time, 'H:mm A')
    return dayjs(datetime)
      .hour(parsedTime.hour())
      .minute(parsedTime.minute())
      .format('YYYY-MM-DDTHH:MM:SSZ')
  }

  function updateOptionalDatetimeWithTime(
    datetime: string | null | undefined,
    time: string
  ): string | undefined {
    return datetime ? updateOptionalDatetimeWithTime(datetime, time) : undefined
  }
</script>

<Column>
  <TextInput
    type={stringType}
    value={event.name}
    onInput={(name) => updateEvent({ ...event, name })}
    title="Event Name"
    placeholder="Flashmobbing the HOMO SEX IS SIN people"
    helpText="Make it descriptive, make it short."
    required
  />
  <TextInput
    type={stringType}
    value={event.location}
    onInput={(location) => updateEvent({ ...event, location })}
    title="Event Location"
    placeholder="Your mom's house 😂"
    helpText="ha gottem"
  />
  <TextInput
    type={dateType}
    value={hyphenDateFormatter(event.callTime)}
    onInput={(callDate) =>
      updateEvent({
        ...event,
        callTime: updateDatetimeWithDate(event.callTime, callDate),
      })}
    title="Date of Event"
    required
  />
  <TextInput
    type={timeType}
    value={timeFormatter(event.callTime)}
    onInput={(callTime) =>
      updateEvent({
        ...event,
        callTime: updateDatetimeWithTime(event.callTime, callTime),
      })}
    title="Call Time"
    helpText="4:20 lamo"
    required
  />
  <TextInput
    type={timeType}
    value={timeFormatter(gig.performanceTime)}
    onInput={(performanceTime) =>
      updateGig({
        ...gig,
        performanceTime: updateDatetimeWithTime(
          gig.performanceTime,
          performanceTime
        ),
      })}
    title="Event Time"
    helpText="4:21 lamo"
  />
  <TextInput
    type={timeType}
    value={(event.releaseTime && timeFormatter(event.releaseTime)) || ''}
    onInput={(releaseTime) =>
      updateEvent({
        ...event,
        releaseTime: updateOptionalDatetimeWithTime(
          event.releaseTime,
          releaseTime
        ),
      })}
    title="Release Time"
    helpText="4:22 lamo"
  />
  <TextInput
    type={dateType}
    value={(event.releaseTime && hyphenDateFormatter(event.releaseTime)) || ''}
    onInput={(releaseDate) =>
      updateEvent({
        ...event,
        releaseTime: updateOptionalDatetimeWithDate(
          event.releaseTime,
          releaseDate
        ),
      })}
    title="Release Date"
  />
  <TextInput
    type={numberType}
    value={event.points}
    onInput={(points) => updateEvent({ ...event, points: points || 0 })}
    title="How many points is this worth?"
    placeholder="69"
  />
</Column>

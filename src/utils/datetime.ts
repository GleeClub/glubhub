import dayjs, { Dayjs } from 'dayjs'

// TODO: update the formats of these

export const fullDateTimeFormatter = (datetime: string | Dayjs): string =>
  dayjs(datetime).format('dddd, MMMM D, YYYY h:mm A')

export const simpleDateTimeFormatter = (datetime: string | Dayjs): string =>
  dayjs(datetime).format('MMM D h:mm A')

export const timeFormatter = (datetime: string | Dayjs): string =>
  dayjs(datetime).format('H:mm A')

export const hyphenDateFormatter = (datetime: string | Dayjs): string =>
  dayjs(datetime).format('YYYY-MM-DD')

export const twentyFourHourTimeFormatter = (datetime: string | Dayjs): string =>
  dayjs(datetime).format('HH:MM')

export const dateFormatter = (datetime: string | Dayjs): string =>
  dayjs(datetime).format('dddd, MMMM Do')

export const simpleDateWithYearFormatter = (datetime: string | Dayjs): string =>
  dayjs(datetime).format('MMM DD, YYYY')

export const simpleDateFormatter = (datetime: string | Dayjs): string =>
  dayjs(datetime).format('M/D')

// export const timeFromNow = (datetime: string): string =>
//   dayjs(datetime).fromNow();

export const parseFormDateString = (date: string): string | null =>
  dayjs(date)?.format('YYYY-MM-DD')

export const parseFormDateAndTimeString = (
  date: string,
  time: string
): string | null =>
  dayjs(`${date} ${time}`)?.format('YYYY-MM-DDTHH:MM:SSZ') || null

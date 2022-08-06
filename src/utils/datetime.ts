import dayjs, { Dayjs } from 'dayjs'
import { SECONDS_IN_DAY } from './constants'

// TODO: update the formats of these

export const fullDateTimeFormatter = (datetime: number | Dayjs): string =>
  dayjs(datetime).format('dddd, MMMM D, YYYY h:mm A')

export const simpleDateTimeFormatter = (datetime: number | Dayjs): string =>
  dayjs(datetime).format('MMM D h:mm A')

export const timeFormatter = (datetime: number | Dayjs): string =>
  dayjs(datetime).format('H:mm A')

export const hyphenDateFormatter = (datetime: number | Dayjs): string =>
  dayjs(datetime).format('YYYY-MM-DD')

export const twentyFourHourTimeFormatter = (datetime: number | Dayjs): string =>
  dayjs(datetime).format('HH:MM')

export const dateFormatter = (datetime: number | Dayjs): string =>
  dayjs(datetime).format('dddd, MMMM D')

export const simpleDateWithYearFormatter = (datetime: number | Dayjs): string =>
  dayjs(datetime).format('MMM DD, YYYY')

export const simpleDateFormatter = (datetime: number | Dayjs): string =>
  dayjs(datetime).format('M/D')

export const parseFormDateString = (date: string): number | null => {
  const epoch = dayjs(date)?.toDate().getTime();
  return typeof epoch === "number" ? epoch / 1000 : null;
}

export const parseFormTimeString = (date: string): number | null => {
  const epoch = dayjs(`1970-00-00 ${date}`)?.toDate().getTime();
  return typeof epoch === "number" ? epoch / 1000 : null;
}

export const parseFormDateAndTimeString = (
  date: string,
  time: string
): number | null => {
  const epoch = dayjs(`${date} ${time}`)?.toDate().getTime();
  return typeof epoch === "number" ? epoch / 1000 : null;
}

export function combineDateAndTime(date: number, time: number): number {
  return date - (date % SECONDS_IN_DAY) + (time % SECONDS_IN_DAY);
}

import dayjs from 'dayjs'
import { SECONDS_IN_DAY } from './constants'

export const fullDateTimeFormatter = (datetime: number): string =>
  datetime ? dayjs(datetime * 1000).format('dddd, MMMM D, YYYY h:mm A') : ''

export const timeFormatter = (datetime: number): string =>
  datetime ? dayjs(datetime * 1000).format('H:mm A') : ''

export const hyphenDateFormatter = (datetime: number): string =>
  datetime ? dayjs(datetime * 1000).format('YYYY-MM-DD') : ''

export const twentyFourHourTimeFormatter = (datetime: number): string =>
  datetime ? dayjs(datetime * 1000).format('HH:MM') : ''

export const dateFormatter = (datetime: number): string =>
  datetime ? dayjs(datetime * 1000).format('dddd, MMMM D') : ''

export const simpleDateWithYearFormatter = (datetime: number): string =>
  datetime ? dayjs(datetime * 1000).format('MMM DD, YYYY') : ''

export const simpleDateFormatter = (datetime: number): string =>
  datetime ? dayjs(datetime * 1000).format('M/D') : ''

export const parseFormDateString = (date: string): number | null => {
  if (!date) return null
  const epoch = dayjs(date)?.toDate().getTime()
  return typeof epoch === 'number' ? epoch / 1000 : null
}

export const parseFormTimeString = (time: string): number | null => {
  if (!time) return null
  const epoch = dayjs(`1970-00-00 ${time}`)?.toDate().getTime()
  return typeof epoch === 'number' ? epoch / 1000 : null
}

export function combineDateAndTime(date: number, time: number): number {
  const onlyDate = date - (date % SECONDS_IN_DAY)
  const onlyTime = time % SECONDS_IN_DAY

  if (!onlyDate) return onlyTime;
  if (!onlyTime) return onlyDate;
  return onlyDate + onlyTime
}

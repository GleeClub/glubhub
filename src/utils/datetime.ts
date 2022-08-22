import dayjs, { Dayjs } from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import { DateTime } from 'src/gql-operations'
import { EST_TIMEZONE } from './constants'

dayjs.extend(timezone)
dayjs.tz.setDefault(EST_TIMEZONE)

export const now = (): Dayjs => dayjs()

export const datetimeToDate = (datetime: DateTime): Date =>
  new Date(`${datetime.date} ${datetime.time}`)

export const fullDateTimeFormatter = (datetime?: DateTime | null): string =>
  datetime ? dayjs(`${datetime.date} ${datetime.time}`).format('dddd, MMMM D, YYYY h:mm A') : ''

export const timeFormatter = (time?: string | null): string =>
  time ? dayjs(time).format('H:mm A') : ''

export const dateFormatter = (date?: string | Dayjs | null): string =>
  date ? dayjs(date).format('dddd, MMMM D') : ''

export const simpleDateWithYearFormatter = (date?: string | null): string =>
  date ? dayjs(date).format('MMM DD, YYYY') : ''

export const simpleDateFormatter = (date?: string | null): string =>
  date ? dayjs(date).format('M/D') : ''

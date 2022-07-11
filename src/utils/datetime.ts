import dayjs from "dayjs";

// TODO: update the formats of these

export const fullDateTimeFormatter = (datetime: string): string =>
  dayjs(datetime).format("dddd, MMMM D, YYYY h:mm A");

export const simpleDateTimeFormatter = (datetime: string): string =>
  dayjs(datetime).format("MMM D h:mm A");

export const timeFormatter = (datetime: string): string =>
  dayjs(datetime).format("H:mm A");

export const hyphenDateFormatter = (datetime: string): string =>
  dayjs(datetime).format("YYYY-MM-DD");

export const twentyFourHourTimeFormatter = (datetime: string): string =>
  dayjs(datetime).format("HH:MM");

export const dateFormatter = (datetime: string): string =>
  dayjs(datetime).format("dddd, MMMM Do");

export const simpleDateWithYearFormatter = (datetime: string): string =>
  dayjs(datetime).format("MMM DD, YYYY");

export const simpleDateFormatter = (datetime: string): string =>
  dayjs(datetime).format("M/D");

export const timeFromNow = (datetime: string): string =>
  dayjs(datetime).fromNow();

export const parseFormDateString = (date: string): number | null =>
  dayjs(date)
    ?.toDate()
    ?.getTime();

export const parseFormDateAndTimeString = (
  date: string,
  time: string
): number | null =>
  dayjs(`${date} ${time}`)
    ?.toDate()
    ?.getTime() || null;

import { MONTHS_NAME } from "variables";

export function isMobile() {
  return (
    typeof navigator !== "undefined" && navigator.product === "ReactNative"
  );
}

/**
 * Formats date to DD MMM YYYY, hh:mm am/pm
 */
export const formatDateTime = (date: Date) => {
  return `${formatDate(date)}, ${formatTime(date)}`;
};

/**
 * Formats date to DD MMM YYYY
 */
export const formatDate = (date: Date) => {
  const day = date.getDate();
  // Add leading zero to day
  const dayString = day.toString().length === 1 ? `0${day}` : day;

  // Get last two digits of year
  const year = date.getFullYear().toString().slice(-2);

  const month = MONTHS_NAME[date.getMonth()]; // get month in MMM format

  return `${dayString} ${month} ${year}`;
};

/**
 * Formats date to hh:mm am/pm
 */
export const formatTime = (date: Date) => {
  let hour = date.getHours();

  const period = hour < 12 ? "am" : "pm"; // Set AM/PM

  // Convert 24 hour to 12 hour
  hour = hour % 12 || 12;
  // Add leading zero to hours
  const hourString = hour.toString().length === 1 ? `0${hour}` : hour;

  // Add leading zero to minutes
  const minute =
    date.getMinutes().toString().length === 1
      ? `0${date.getMinutes()}`
      : date.getMinutes();

  return `${hourString}:${minute} ${period}`;
};

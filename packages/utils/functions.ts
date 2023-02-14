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
  let hour = date.getHours();
  const day = date.getDate();
  const year = date.getFullYear();
  const month = MONTHS_NAME[date.getMonth()]; // get month in MMM format
  const period = hour < 12 ? "am" : "pm"; // Set AM/PM
  hour = hour % 12 || 12; // Adjust hours
  const minute =
    date.getMinutes().toString().length === 1
      ? `0${date.getMinutes()}`
      : date.getMinutes();
  return `${day} ${month} ${year}, ${hour}:${minute} ${period}`;
};

/**
 * Formats date to DD MMM YYYY
 */
export const formatDate = (date: Date) => {
  const day = date.getDate();
  const year = date.getFullYear();
  const month = MONTHS_NAME[date.getMonth()]; // get month in MMM format

  return `${day} ${month} ${year}`;
};

/**
 * Formats date to hh:mm am/pm
 */
export const formatTime = (date: Date) => {
  let hour = date.getHours();
  const period = hour < 12 ? "am" : "pm"; // Set AM/PM
  hour = hour % 12 || 12; // Adjust hours
  const minute =
    date.getMinutes().toString().length === 1
      ? `0${date.getMinutes()}`
      : date.getMinutes();
  return `${hour}:${minute} ${period}`;
};

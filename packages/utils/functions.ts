import dayjs from "dayjs";

export function isMobile() {
  return (
    typeof navigator !== "undefined" && navigator.product === "ReactNative"
  );
}

/**
 * Formats date to DD MMM YY, hh:mm am/pm
 */
export const formatDateTime = (date: Date) => {
  return dayjs(date).format("DD MMM YY, hh:mm A");
};

/**
 * Formats date to DD MMM YY
 */
export const formatDate = (date: Date) => {
  return dayjs(date).format("DD MMM YY");
};

/**
 * Formats date to hh:mm am/pm
 */
export const formatTime = (date: Date) => {
  return dayjs(date).format("hh:mm A");
};

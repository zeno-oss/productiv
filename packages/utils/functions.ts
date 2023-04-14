import { Task } from "@prisma/client";
import dayjs from "dayjs";
import { TimeSlot } from "types";

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

export function findFreeSlots(timeSlots: Task[]): TimeSlot[] {
  // Sort the time slots by start time in ascending order
  const sortedSlots = timeSlots
    .slice()
    .sort((a, b) => a.startTime.getTime() - b.startTime.getTime());

  // Initialize an array to hold the free slots
  const freeSlots: TimeSlot[] = [];

  if (sortedSlots.length === 0) {
    return [
      {
        startTime: new Date(),
        endTime: new Date(new Date().setHours(23, 59, 59, 999)),
      },
    ];
  }

  // Handle the case where there is only one time slot
  if (sortedSlots.length === 1) {
    const startOfDay = new Date(sortedSlots[0]!.startTime);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(sortedSlots[0]!.endTime);
    endOfDay.setHours(23, 59, 59, 999);
    if (sortedSlots[0]!.startTime.getTime() !== startOfDay.getTime()) {
      freeSlots.push({
        startTime: startOfDay,
        endTime: sortedSlots[0]!.startTime,
      });
    }
    if (sortedSlots[0]!.endTime.getTime() !== endOfDay.getTime()) {
      freeSlots.push({ startTime: sortedSlots[0]!.endTime, endTime: endOfDay });
    }
    return freeSlots;
  }

  // Find the free slots between the sorted time slots
  let previousSlotEndTime = sortedSlots[0]!.endTime;
  for (let i = 1; i < sortedSlots.length; i++) {
    const currentSlotStartTime = sortedSlots[i]!.startTime;
    if (previousSlotEndTime.getTime() !== currentSlotStartTime.getTime()) {
      freeSlots.push({
        startTime: previousSlotEndTime,
        endTime: currentSlotStartTime,
      });
    }
    previousSlotEndTime = sortedSlots[i]!.endTime;
  }

  // Handle the case where there is a free slot at the start and/or end of the day
  const startOfDay = new Date(sortedSlots[0]!.startTime);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(sortedSlots[sortedSlots.length - 1]!.endTime);
  endOfDay.setHours(23, 59, 59, 999);
  if (sortedSlots[0]!.startTime.getTime() !== startOfDay.getTime()) {
    freeSlots.unshift({
      startTime: startOfDay,
      endTime: sortedSlots[0]!.startTime,
    });
  }
  if (
    sortedSlots[sortedSlots.length - 1]!.endTime.getTime() !==
    endOfDay.getTime()
  ) {
    freeSlots.push({
      startTime: sortedSlots[sortedSlots.length - 1]!.endTime,
      endTime: endOfDay,
    });
  }

  // Return the array of free slots
  return freeSlots;
}

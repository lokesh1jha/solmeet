import { DateTime } from "luxon";

export function convertToUTC(timeObj: any): Date | null {
    const { hour, minute, period } = timeObj;

    // Get user's timezone dynamically
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    // Convert 12-hour format to 24-hour format
    let hours = parseInt(hour, 10);
    if (period === "PM" && hours !== 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;

    // Create DateTime in user's timezone
    const dateTime = DateTime.fromObject(
        { hour: hours, minute: parseInt(minute, 10) },
        { zone: userTimeZone }
    );

    // Convert to UTC and ensure it is not null
    const isoString = dateTime.toUTC().toISO();
    
    return isoString ? new Date(isoString) : null;
}
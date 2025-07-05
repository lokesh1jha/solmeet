import { DateTime } from 'luxon'

export function isValidTimeSlot(dateTime: DateTime, startTime: DateTime, endTime: DateTime, availableDays: string[]): boolean {
  const dayName = dateTime.toFormat('cccc') // Full day name like "Monday"
  
  // Check if the day is available
  if (!availableDays.includes(dayName)) {
    return false
  }
  
  // Check if the time is within the available time range
  const timeOnly = dateTime.toFormat('HH:mm')
  const startTimeOnly = startTime.toFormat('HH:mm')
  const endTimeOnly = endTime.toFormat('HH:mm')
  
  return timeOnly >= startTimeOnly && timeOnly < endTimeOnly
}

export function generateTimeSlots(
  selectedDate: Date,
  startTime: Date,
  endTime: Date,
  intervalMinutes: number = 30
): string[] {
  const slots: string[] = []
  const selectedDateTime = DateTime.fromJSDate(selectedDate)
  const start = DateTime.fromJSDate(startTime)
  const end = DateTime.fromJSDate(endTime)
  
  // Create start and end times for the selected date
  const startDateTime = selectedDateTime.set({
    hour: start.hour,
    minute: start.minute,
    second: 0,
    millisecond: 0
  })
  
  const endDateTime = selectedDateTime.set({
    hour: end.hour,
    minute: end.minute,
    second: 0,
    millisecond: 0
  })
  
  let current = startDateTime
  while (current < endDateTime) {
    slots.push(current.toFormat('HH:mm'))
    current = current.plus({ minutes: intervalMinutes })
  }
  
  return slots
}

export function formatDateTime(date: Date, time: string): Date {
  const [hours, minutes] = time.split(':').map(Number)
  const result = new Date(date)
  result.setHours(hours, minutes, 0, 0)
  return result
}

export function isDateInPast(date: Date): boolean {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  date.setHours(0, 0, 0, 0)
  return date < today
}

export function addDays(date: Date, days: number): Date {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

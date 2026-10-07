export interface TimeElapsed {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

// Target Start Date: Sep 6, 2026 11:25 PM (23:25:00)
export const START_DATE = new Date(2026, 8, 6, 23, 25, 0); // Month is 0-indexed: 8 = September

export function getTimeElapsed(fromDate: Date = START_DATE, toDate: Date = new Date()): TimeElapsed {
  const diffMs = Math.max(0, toDate.getTime() - fromDate.getTime());

  const secondsTotal = Math.floor(diffMs / 1000);
  const days = Math.floor(secondsTotal / (3600 * 24));
  const hours = Math.floor((secondsTotal % (3600 * 24)) / 3600);
  const minutes = Math.floor((secondsTotal % 3600) / 60);
  const seconds = secondsTotal % 60;

  return { days, hours, minutes, seconds };
}

export function padZero(num: number): string {
  return num < 10 ? `0${num}` : `${num}`;
}

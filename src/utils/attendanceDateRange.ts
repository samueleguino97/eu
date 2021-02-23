import { differenceInDays, eachDayOfInterval, isSameDay } from 'date-fns';

export default function attendanceDateRange(
  startDate: Date,
  endDate: Date,
  attendances: any[],
) {
  const days = eachDayOfInterval({ start: startDate, end: endDate });

  return days.filter((d) =>
    attendances.find((a) => isSameDay(new Date(a.date), d)),
  );
}

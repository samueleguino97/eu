import { eachDayOfInterval, format } from 'date-fns';

export default function attendanceDateRange(
  startDate: Date,
  endDate: Date,
  attendances: any[],
) {
  const days = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });
  return days.filter((d) =>
    attendances
      ?.map((a) => a.date.toString())
      .includes(format(new Date(d), 'yyyy-MM-dd')),
  );
}

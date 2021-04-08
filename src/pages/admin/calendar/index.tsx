import {
  MonthlyCalendar,
  MonthlyNav,
  MonthlyBody,
  DefaultMonthlyEventItem,
} from '@zach.codes/react-calendar';
import * as React from 'react';
import '@zach.codes/react-calendar/dist/calendar-tailwind.css';
import { useAppDispatch, useAppSelector } from '@/services/store';
import { fetchAllClasses } from '@/pageSlices/classes.thunk';
import { format } from 'date-fns';
// import * as EventCalendar from 'react-event-calendar';
export type CalendarProps = {};

function Calendar({}: CalendarProps) {
  const [currentMonth, setCurrentMonth] = React.useState<Date>(new Date());

  const allClasses = useAppSelector((state) => state.classesReducer.all);

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(fetchAllClasses(currentMonth));
  }, []);

  return (
    <div>
      <MonthlyCalendar
        currentMonth={currentMonth}
        onCurrentMonthChange={setCurrentMonth}
      >
        <MonthlyNav />
        <MonthlyBody
          events={allClasses.map((singleClass) => ({
            title: singleClass.id,
            date: new Date(singleClass.date),
            singleClass: singleClass,
          }))}
          renderDay={(data: any) =>
            data.map((item) => (
              <DefaultMonthlyEventItem
                key={item.singleClass.id}
                title={
                  (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      {' '}
                      <div
                        style={{
                          width: 10,
                          height: 10,
                          background: item.singleClass.groups.color,
                          marginRight: 10,
                        }}
                      />{' '}
                      {item.singleClass.groups.name}
                    </div>
                  ) as any
                }
                date={format(new Date(item.date), 'HH:mm')}
              />
            ))
          }
        />
      </MonthlyCalendar>
    </div>
  );
}

export default Calendar;

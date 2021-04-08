import { useAppSelector } from '@/services/store';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@material-ui/core';
import { format, isAfter, isBefore, isEqual } from 'date-fns';
import { useRouter } from 'next/router';
import * as React from 'react';

export type ReportModalProps = {
  reportIsOpen: boolean;
  dateRange: { from: Date; to: Date };
};
const isBetween = (date: Date, from: Date, to: Date, inclusivity = '()') => {
  if (!['()', '[]', '(]', '[)'].includes(inclusivity)) {
    throw new Error('Inclusivity parameter must be one of (), [], (], [)');
  }

  const isBeforeEqual = inclusivity[0] === '[',
    isAfterEqual = inclusivity[1] === ']';

  return (
    (isBeforeEqual
      ? isEqual(from, date) || isBefore(from, date)
      : isBefore(from, date)) &&
    (isAfterEqual ? isEqual(to, date) || isAfter(to, date) : isAfter(to, date))
  );
};
function ReportModal({ reportIsOpen, dateRange }: ReportModalProps) {
  const router = useRouter();
  const classes = useAppSelector((state) => state.classesReducer.all);
  console.log(classes);
  const students = useAppSelector(
    (state) => state.studentsReducer.list?.[router.query.id?.toString()] || [],
  );
  const groups = useAppSelector((state) => state.groupsReducer.list);
  const group = groups.find((g) => g.id === router.query.id?.toString());
  return (
    <Dialog open={reportIsOpen} fullScreen>
      <DialogTitle>
        {group?.name} -{' '}
        <span style={{ fontSize: 24, fontWeight: 700 }}>
          {format(dateRange.from, 'MMMM do')}
        </span>{' '}
        to{' '}
        <span style={{ fontSize: 24, fontWeight: 700 }}>
          {format(dateRange.to, 'MMMM do')}
        </span>
      </DialogTitle>
      <DialogContent>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                  }}
                  component="th"
                >
                  Attenddance
                </TableCell>
                {classes
                  .filter((singleClass) =>
                    isBetween(
                      new Date(singleClass.date),
                      dateRange.from,
                      dateRange.to,
                      '[]',
                    ),
                  )
                  .map((singleClass) => (
                    <TableCell
                      align="center"
                      style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                      }}
                    >
                      {format(new Date(singleClass.date), 'MMM do')}
                    </TableCell>
                  ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {students.map((s) => (
                <TableRow>
                  <TableCell
                    style={{
                      fontSize: 18,
                    }}
                    component="th"
                  >
                    {s?.name}
                  </TableCell>
                  {classes
                    .filter((singleClass) =>
                      isBetween(
                        new Date(singleClass.date),
                        dateRange.from,
                        dateRange.to,
                        '[]',
                      ),
                    )
                    .map((singleClass, i) => (
                      <TableCell align="center">
                        <span
                          style={{
                            fontSize: 20,
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            color: (
                              singleClass.attendances
                                ? JSON.parse(singleClass.attendances)[s.id]
                                : ''
                            )
                              ? 'green'
                              : 'red',
                          }}
                        >
                          {(
                            singleClass.attendances
                              ? JSON.parse(singleClass.attendances)[s.id]
                              : ''
                          )
                            ? 'P'
                            : 'M'}
                        </span>
                      </TableCell>
                    ))}
                </TableRow>
              ))}
              {/* {studentsResponse.data?.students.map((g) => (
           
          ))} */}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
    </Dialog>
  );
}

export default ReportModal;

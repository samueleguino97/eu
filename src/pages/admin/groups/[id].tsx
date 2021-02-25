import Button from '@/components/general/Button';
import {
  useCreateStudentMutation,
  useCreateAttendanceMutation,
  useStudentsQuery,
  Students,
  useGroupsQuery,
  useUpdateAttendanceMutation,
} from '@/generated/graphql';
import useFormState from '@/hooks/useFormState';
import attendanceDateRange from '@/utils/attendanceDateRange';
import attendancesToObject from '@/utils/attendancesToObject';
import {
  Card,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import { format, getDate } from 'date-fns';
import { useRouter } from 'next/router';
import * as React from 'react';
const useStyles = makeStyles({
  container: {
    padding: 32,
    height: '100%',
    display: 'grid',
    gridTemplateRows: '60px 1fr',
  },
  groups: {
    backgroundColor: '#fff',
    borderRadius: 12,
    height: '100%',
    width: '100%',
    padding: 24,
    display: 'grid',
    gridTemplateColumns: ' 1fr 1fr 1fr ',
  },
  modalForm: {
    display: 'flex',
    flexDirection: 'column',
    '& >*': {
      marginBottom: 24,
    },
  },
  groupListItem: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '120px 1fr',
    padding: 24,
  },
  groupAttendance: {
    display: 'grid',
    gridTemplateColumns: 'repeat(13,1fr)',
  },
  studentAtt: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export type GroupsProps = {};

function Groups({}: GroupsProps) {
  const router = useRouter();
  const [, createStudent] = useCreateStudentMutation();
  const [, createAttendance] = useCreateAttendanceMutation();
  const [, updateAttendance] = useUpdateAttendanceMutation();
  const [groupsResponse] = useGroupsQuery();
  const [studentsResponse] = useStudentsQuery({
    variables: { groupId: +router.query.id },
  });
  const [isCreating, setIsCreating] = React.useState<boolean>(false);
  const [reportIsOpen, setReportIsOpen] = React.useState<boolean>(false);
  const classes = useStyles();
  const [state, setField] = useFormState({});
  const [date, setDate] = React.useState<Date>(new Date());
  const [dateRange, setDateRange] = React.useState<{ from: Date; to: Date }>({
    to: new Date(),
    from: new Date(),
  });

  async function handleStudentCreation() {
    await createStudent({
      object: { name: state.name, group_id: +router.query.id },
    });

    setIsCreating(false);
  }

  async function handleAttendance(student, status) {
    const formattedDate = format(date, 'yyyy-MM-dd');
    if (
      !student.attendances?.find(
        (a) => formattedDate === format(new Date(a.date), 'yyyy-MM-dd'),
      )
    ) {
      await createAttendance({
        object: {
          student_id: student.id,
          date: formattedDate,
          status,
          attended: true,
        },
      });
    } else {
      await updateAttendance({
        object: { status },
        id: student.attendances?.find(
          (a) => formattedDate === format(new Date(a.date), 'yyyy-MM-dd'),
        )?.id,
      });
    }
  }
  const group = groupsResponse.data?.groups.find(
    (g) => g.id === +router.query.id,
  );
  return (
    <div className={classes.container}>
      <div>
        <Button onClick={() => setIsCreating(true)}>Create Student</Button>
      </div>
      <div className={classes.groups}>
        <Card
          style={{ backgroundColor: '#d6f3db', position: 'relative' }}
          elevation={5}
        >
          <h2 style={{ padding: 24 }}>Attendance - "{group?.name}"</h2>
          <Divider style={{ backgroundColor: 'black' }} />
          <div style={{ padding: 24 }}>
            <div
              className={classes.studentAtt}
              style={{ margin: 12, justifyContent: 'center' }}
            >
              <DatePicker
                label="Attendance Register Date"
                size="small"
                inputVariant="outlined"
                onChange={setDate}
                value={date}
              />
            </div>
            {studentsResponse.data?.students.map((s) => (
              <div key={s.id + date.toString()} className={classes.studentAtt}>
                <div>{s.name}</div>
                <Select
                  value={
                    attendancesToObject(s.attendances)[
                      format(date, 'yyyy-MM-dd')
                    ] || ''
                  }
                  onChange={(e) => handleAttendance(s, e.target.value)}
                >
                  <MenuItem value={'p'}>P</MenuItem>
                  <MenuItem value={'a'}>A</MenuItem>
                  <MenuItem value={'r'}>R</MenuItem>
                </Select>
              </div>
            ))}
          </div>
          <Divider />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-evenly',
              bottom: 24,
              position: 'absolute',
            }}
          >
            <DatePicker
              label="From Date"
              size="small"
              inputVariant="outlined"
              style={{ width: '30%' }}
              onChange={(newDate) =>
                setDateRange({ ...dateRange, from: newDate })
              }
              value={dateRange.from}
            />
            <DatePicker
              label="To Date"
              size="small"
              inputVariant="outlined"
              style={{ width: '30%' }}
              onChange={(newDate) =>
                setDateRange({ ...dateRange, to: newDate })
              }
              value={dateRange.to}
            />
            <Button
              onClick={() => {
                setReportIsOpen(true);
                setTimeout(() => {
                  window.print();
                  setReportIsOpen(false);
                }, 1000);
              }}
            >
              Generar Reporte
            </Button>
          </div>
        </Card>
      </div>
      <Dialog open={isCreating} onClose={() => setIsCreating(false)}>
        <DialogTitle>Create Student</DialogTitle>
        <DialogContent>
          <div className={classes.modalForm}>
            <TextField {...setField('name')} label="Name" variant="outlined" />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleStudentCreation}>Create Group</Button>
        </DialogActions>
      </Dialog>

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
                  {attendanceDateRange(
                    dateRange.from,
                    dateRange.to,
                    studentsResponse.data?.students
                      .map((s) => s.attendances)
                      .flat(),
                  ).map((key, i) => (
                    <TableCell
                      align="center"
                      style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                      }}
                    >
                      {format(key, 'MMM do')}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {studentsResponse.data?.students.map((g) => (
                  <TableRow>
                    <TableCell
                      style={{
                        fontSize: 18,
                      }}
                      component="th"
                    >
                      {g.name}
                    </TableCell>
                    {attendanceDateRange(
                      dateRange.from,
                      dateRange.to,
                      studentsResponse.data?.students
                        .map((s) => s.attendances)
                        .flat(),
                    ).map((key, i) => (
                      <TableCell align="center">
                        <span
                          style={{
                            fontSize: 20,
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            color:
                              attendancesToObject(g.attendances)[
                                format(key, 'yyyy-MM-dd')
                              ] === 'p'
                                ? '#1fc97a'
                                : attendancesToObject(g.attendances)[
                                    format(key, 'yyyy-MM-dd')
                                  ] === 'r'
                                ? '#dbd035'
                                : 'red',
                          }}
                        >
                          {attendancesToObject(g.attendances)[
                            format(key, 'yyyy-MM-dd')
                          ] || 'A'}
                        </span>
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Groups;

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
  Select,
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

  async function handleAttendance(student, date, status) {
    if (
      !student.attendances?.find(
        (a) => getDate(date) === getDate(new Date(a.date)),
      )
    ) {
      await createAttendance({
        object: {
          student_id: student.id,
          date: date,
          status,
          attended: true,
        },
      });
    } else {
      await updateAttendance({
        object: { status },
        id: student.attendances?.find(
          (a) => getDate(date) === getDate(new Date(a.date)),
        )?.id,
      });
    }
  }
  const group = groupsResponse.data?.groups.find(
    (g) => g.id === +router.query.id,
  );
  console.log(studentsResponse.data?.students);
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
                    ] || false
                  }
                  onChange={(e) => handleAttendance(s, date, e.target.value)}
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
            <Button>Generar Reporte</Button>
          </div>
        </Card>
        <Grid spacing={4} container>
          {/* {studentsResponse.data?.students.map((g) => (
            <div className={classes.groupListItem}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontWeight: 'bold',
                  fontSize: 20,
                }}
              >
                {g.name}
              </div>
              <div className={classes.groupAttendance}>
                {new Array(13).fill(0).map((_, i) => (
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={
                            g.attendances?.find((a) =>
                              isSameDay(
                                new Date(a.date),
                                addDays(
                                  startOfMonth(
                                    setMonth(new Date(), monthSelected),
                                  ),
                                  i,
                                ),
                              ),
                            )?.attended || false
                          }
                          onChange={() =>
                            handleAttendance(
                              g,
                              addDays(
                                startOfMonth(
                                  setMonth(new Date(), monthSelected),
                                ),
                                i + 1,
                              ),
                            )
                          }
                        />
                      }
                      label={i + 1}
                      labelPlacement="top"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))} */}
        </Grid>
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
    </div>
  );
}

export default Groups;

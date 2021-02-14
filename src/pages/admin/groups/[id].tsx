import Button from '@/components/general/Button';
import {
  useCreateStudentMutation,
  useCreateAttendanceMutation,
  useStudentsQuery,
  Students,
  useGroupsQuery,
} from '@/generated/graphql';
import useFormState from '@/hooks/useFormState';
import {
  Card,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  makeStyles,
  TextField,
} from '@material-ui/core';
import {
  addDays,
  eachMonthOfInterval,
  endOfYear,
  format,
  getDate,
  isSameDay,
  setMonth,
  startOfMonth,
  startOfYear,
} from 'date-fns';
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
});

export type GroupsProps = {};

function Groups({}: GroupsProps) {
  const router = useRouter();
  const [, createStudent] = useCreateStudentMutation();
  const [, createAttendance] = useCreateAttendanceMutation();
  const [groupsResponse] = useGroupsQuery();
  const [studentsResponse] = useStudentsQuery({
    variables: { groupId: +router.query.id },
  });
  const [isCreating, setIsCreating] = React.useState<boolean>(false);
  const classes = useStyles();
  const [state, setField] = useFormState({});
  const [monthSelected, setMonthSelected] = React.useState<number>(
    new Date().getMonth(),
  );

  async function handleStudentCreation() {
    await createStudent({
      object: { name: state.name, group_id: +router.query.id },
    });
    setIsCreating(false);
  }

  async function handleAttendance(student, date) {
    await createAttendance({
      object: {
        student_id: student.id,
        attended: !student.attendances?.find(
          (a) => getDate(date) === getDate(new Date(a.date)),
        )?.attended,
        date: date,
      },
    });
  }

  return (
    <div className={classes.container}>
      <div>
        <Button onClick={() => setIsCreating(true)}>Create Student</Button>
      </div>
      <div className={classes.groups}>
        <Grid spacing={4} container>
          <h2>
            Attendance -
            <select
              onChange={(e) => setMonthSelected(+e.target.value)}
              value={monthSelected}
            >
              {eachMonthOfInterval({
                start: startOfYear(new Date()),
                end: endOfYear(new Date()),
              }).map((d) => (
                <option value={d.getMonth()}>{format(d, 'MMMM')}</option>
              ))}
            </select>
            "
            {
              groupsResponse.data?.groups.find((g) => g.id === +router.query.id)
                ?.name
            }
            "
          </h2>
          {studentsResponse.data?.students.map((g) => (
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
          ))}
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

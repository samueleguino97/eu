import ClassGridItem from '@/components/classes/ClassGridItem';
import Button from '@/components/general/Button';
import GroupsLayout from '@/components/layouts/GroupsLayout';
import GeneratePeriodModal from '@/components/modals/GeneratePeriodModal';
import ReportModal from '@/components/modals/ReportModal';
import useFormState from '@/hooks/useFormState';
import { fetchClassesByGroup } from '@/pageSlices/groups.thunk';
import {
  fetchStudentsByGroup,
  insertStudent,
} from '@/pageSlices/students.thunk';
import { useAppDispatch, useAppSelector } from '@/services/store';
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
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
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
import { useTrail } from '@react-spring/core';
import { animated } from '@react-spring/web';
import { format, getDate } from 'date-fns';
import { useRouter } from 'next/router';
import * as React from 'react';
const useStyles = makeStyles({
  container: {
    height: '100%',
    display: 'grid',
    gridTemplateRows: '1fr',
    gridTemplateColumns: '1fr 1fr',
    gridGap: 24,
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
  const states = useAppSelector((state) => state);

  console.log(states);
  const dispatch = useAppDispatch();
  const { groupClasses, group, period } = useAppSelector((state) => ({
    period: state.groupsReducer.currentPeriod,
    group: state.groupsReducer.list.find((g) => g.id === router.query.id),
    groupClasses:
      state.groupsReducer.classes?.[router.query.id?.toString()] || [],
  }));

  React.useEffect(() => {
    dispatch(
      fetchClassesByGroup({ group_id: router.query.id?.toString(), period }),
    );
    dispatch(fetchStudentsByGroup({ group_id: router.query.id?.toString() }));
  }, [router.query.id]);

  const students = useAppSelector(
    (state) => state.studentsReducer.list?.[router.query.id?.toString()] || [],
  );

  const [isCreating, setIsCreating] = React.useState<boolean>(false);
  const [reportIsOpen, setReportIsOpen] = React.useState<boolean>(false);
  const [
    periodCreationIsOpen,
    setPeriodCreationIsOpen,
  ] = React.useState<boolean>(false);

  const classes = useStyles();
  const [state, setField] = useFormState({});
  const [dateRange, setDateRange] = React.useState<{ from: Date; to: Date }>({
    to: new Date(),
    from: new Date(),
  });

  async function handleStudentCreation() {
    await dispatch(
      insertStudent({
        name: state.name,
        group_id: router.query.id?.toString(),
      }),
    );

    setIsCreating(false);
  }

  const trail = useTrail(groupClasses.length || 0, {
    to: { opacity: 1, transform: 'translateY(0%)' },
    from: { opacity: 0, transform: 'translateY(60%)', marginTop: 12 },
  });
  let showedMonths = [];
  return (
    <div className={classes.container}>
      <Card style={{ padding: 24 }}>
        <div>
          <Button onClick={() => setPeriodCreationIsOpen(true)}>
            Generate Period Classes
          </Button>
          <div>
            <DatePicker
              value={dateRange.from}
              label="From"
              onChange={(d) => setDateRange({ ...dateRange, from: d })}
            />{' '}
            -
            <DatePicker
              value={dateRange.to}
              label="To"
              onChange={(d) => setDateRange({ ...dateRange, to: d })}
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
        </div>
        {groupClasses.length ? (
          <div
            style={{
              display: 'flex',
              width: '100%',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            {trail.map((props, index) => {
              const singleClass = groupClasses[index];
              return (
                <animated.div style={props} key={singleClass.id}>
                  {' '}
                  <ClassGridItem
                    monthToShow={
                      showedMonths.includes(
                        format(new Date(singleClass.date), 'LLLL'),
                      )
                        ? ''
                        : (() => {
                            showedMonths.push(
                              format(new Date(singleClass.date), 'LLLL'),
                            );
                            return format(new Date(singleClass.date), 'LLLL');
                          })()
                    }
                    singleClass={singleClass}
                  />
                </animated.div>
              );
            })}
          </div>
        ) : (
          <div> Loading Classes./ </div>
        )}
      </Card>

      <Card style={{ padding: 24 }}>
        <span> Students</span>
        <Button onClick={() => setIsCreating(true)}>Create Student</Button>

        <List>
          {students.map((student) => (
            <ListItem>
              <ListItemText primary={student.name}> </ListItemText>
              <ListItemSecondaryAction>
                <IconButton>
                  <Icon>delete</Icon>
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Card>
      <GeneratePeriodModal
        open={periodCreationIsOpen}
        onClose={() => setPeriodCreationIsOpen(false)}
      />
      <Dialog open={isCreating} onClose={() => setIsCreating(false)}>
        <DialogTitle>Create Student</DialogTitle>
        <DialogContent>
          <div className={classes.modalForm}>
            <TextField {...setField('name')} label="Name" variant="outlined" />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleStudentCreation}>Create Student</Button>
        </DialogActions>
      </Dialog>

      <ReportModal dateRange={dateRange} reportIsOpen={reportIsOpen} />
    </div>
  );
}

Groups.Layout = GroupsLayout;

export default Groups;

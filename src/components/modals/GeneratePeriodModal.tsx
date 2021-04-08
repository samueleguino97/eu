import { createClasses } from '@/pageSlices/groups.thunk';
import { useAppDispatch } from '@/services/store';
import { definitions } from '@/supabase-types';
import {
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  Input,
  Switch,
  TextField,
} from '@material-ui/core';
import { DatePicker, DateTimePicker } from '@material-ui/pickers';
import { addWeeks, getDay } from 'date-fns';
import { useRouter } from 'next/router';
import * as React from 'react';
import Button from '../general/Button';

const DAYS = [
  { name: 'Mon' },
  { name: 'Tue' },
  { name: 'Wed' },
  { name: 'Thu' },
  { name: 'Fri' },
  { name: 'Sat' },
];

function getNextDayOfWeek(date, dayOfWeek) {
  // Code to check that date and dayOfWeek are valid left as an exercise ;)

  var resultDate = new Date(date.getTime());

  resultDate.setDate(date.getDate() + ((7 + dayOfWeek - date.getDay()) % 7));

  return resultDate;
}

export type GeneratePeriodModalProps = {
  open: boolean;
  onClose: (event: {}, reason: 'backdropClick' | 'escapeKeyDown') => void;
};

function GeneratePeriodModal({ open, onClose }: GeneratePeriodModalProps) {
  // const [, createClasses] = useCreateClassesMutation();
  const dispatch = useAppDispatch();

  const router = useRouter();

  const [periodStartDate, setPeriodStartDate] = React.useState<Date>(
    new Date(),
  );
  const [daysSelected, setDaysSelected] = React.useState<number[]>([]);
  const [period, setPeriod] = React.useState<number>(1);

  async function handleCreateClasses() {
    const classesPerPeriod = 13;
    let classesCreated = 0;
    let classesToCreate = [];

    const daysToCheck = [...daysSelected, getDay(periodStartDate)].sort();
    let currentWeek = 0;

    while (classesPerPeriod > classesCreated) {
      let allClassesCreated = false;
      for (let i = 0; i < daysToCheck.length; i++) {
        const d = daysToCheck[i];
        classesToCreate.push({
          date: getNextDayOfWeek(addWeeks(new Date(), currentWeek), d),
          group_id: router.query.id.toString(),
          period: 1,
        });
        classesCreated++;
        if (classesCreated >= classesPerPeriod) {
          allClassesCreated = true;
          break;
        }
      }
      if (allClassesCreated) {
        break;
      }

      currentWeek++;
    }
    const sorted: definitions['classes'][] = classesToCreate.sort((a, b) =>
      a.date > b.date ? 1 : b.date > a.date ? -1 : 0,
    );
    await dispatch(
      createClasses({ classes: sorted, group_id: router.query.id.toString() }),
    );
    onClose({}, 'backdropClick');
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Generate new period</DialogTitle>
      <DialogContent>
        <TextField
          label="Period"
          onChange={(e) => setPeriod(+e.target.value)}
          value={period}
          type="number"
        />
        <DateTimePicker
          label="Period Start Date"
          value={periodStartDate}
          onChange={setPeriodStartDate}
        />
        <Grid container>
          {DAYS.map((day, index) => (
            <Grid item xs={2}>
              <FormControlLabel
                labelPlacement="top"
                control={
                  <Checkbox
                    disabled={getDay(periodStartDate) === index + 1}
                    checked={
                      getDay(periodStartDate) === index + 1 ||
                      daysSelected.includes(index + 1)
                    }
                    onChange={() => {
                      if (daysSelected.includes(index + 1)) {
                        const newList = [...daysSelected];
                        const itemIndex = daysSelected.findIndex(
                          (d) => d === index + 1,
                        );
                        newList.splice(itemIndex, 1);

                        setDaysSelected(newList.sort());
                      } else {
                        setDaysSelected([...daysSelected, index + 1].sort());
                      }
                    }}
                  />
                }
                label={day.name}
              />
            </Grid>
          ))}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleCreateClasses()}>Generate</Button>
      </DialogActions>
    </Dialog>
  );
}

export default GeneratePeriodModal;

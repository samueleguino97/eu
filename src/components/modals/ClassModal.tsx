import { ModalProps } from '@/hooks/useModal';
import { useAppSelector } from '@/services/store';
import {
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Select,
} from '@material-ui/core';
import { DatePicker, DateTimePicker } from '@material-ui/pickers';
import { useRouter } from 'next/router';
import { definitions } from '@/supabase-types';
import * as React from 'react';
import Button from '../general/Button';
import supabase from '@/services/supabase';

export type ClassModalProps = ModalProps & {
  classSelected: definitions['classes'];
};

export enum AttendedStatus {
  PRESENT = 'PRESENT',
  LATE = 'LATE',
  MISSING = 'MISSING',
}

function ClassModal({ open, onClose, classSelected }: ClassModalProps) {
  const router = useRouter();

  const students = useAppSelector(
    (state) => state.studentsReducer.list[router.query.id?.toString()] || [],
  );
  const [date, setDate] = React.useState<Date>(new Date(classSelected?.date));
  // console.log(classSelected);
  const [studentsSelected, setStudentsSelected] = React.useState<
    { student_id: string; attended_status: AttendedStatus }[]
  >(
    students.map((student) => ({
      student_id: student.id,
      attended_status: classSelected.registered
        ? JSON.parse(classSelected.attendances)[student.id]
        : AttendedStatus.MISSING,
    })),
  );

  async function handleClassRegistration() {
    await supabase
      .from<definitions['classes']>('classes')
      .update({
        registered: true,
        attendances: JSON.stringify(
          studentsSelected.reduce(
            (map, next) => ({
              ...map,
              [next.student_id]: next.attended_status,
            }),
            {},
          ),
        ),
      })
      .match({ id: classSelected.id });
  }

  return (
    <Dialog open={open} maxWidth="xs" fullWidth onClose={onClose}>
      <DialogContent>
        <DateTimePicker label="Class Date" onChange={setDate} value={date} />
        <div>
          <FormLabel>Attendance</FormLabel>
          {studentsSelected.map((student) => (
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                {students.find((s) => s.id === student.student_id)?.name}
              </div>

              <Select
                style={{ width: 150 }}
                inputProps={{ style: { width: 150 } }}
                SelectDisplayProps={{ style: { width: 150 } }}
                defaultValue={AttendedStatus.MISSING}
                value={student.attended_status}
                onChange={(e) => {
                  const newStudents = [...studentsSelected];
                  const index = students.findIndex(
                    (s) => s.id === student.student_id,
                  );
                  newStudents[index] = {
                    ...newStudents[index],
                    attended_status: e.target.value as any,
                  };
                  setStudentsSelected(newStudents);
                }}
              >
                <MenuItem value={AttendedStatus.PRESENT}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginLeft: 10,
                    }}
                  >
                    <div
                      style={{
                        height: 10,
                        width: 10,
                        marginRight: 10,
                        backgroundColor: 'green',
                      }}
                    ></div>
                    Present
                  </div>
                </MenuItem>
                <MenuItem value={AttendedStatus.LATE}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginLeft: 10,
                    }}
                  >
                    <div
                      style={{
                        height: 10,
                        width: 10,
                        marginRight: 10,
                        backgroundColor: 'yellow',
                      }}
                    ></div>
                    Late
                  </div>
                </MenuItem>
                <MenuItem value={AttendedStatus.MISSING}>
                  {' '}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginLeft: 10,
                    }}
                  >
                    <div
                      style={{
                        height: 10,
                        width: 10,
                        marginRight: 10,
                        backgroundColor: 'red',
                      }}
                    ></div>{' '}
                    Missing
                  </div>
                </MenuItem>
              </Select>
            </div>
          ))}
        </div>
        <DialogActions>
          <Button onClick={handleClassRegistration}>Register Class</Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}

export default ClassModal;

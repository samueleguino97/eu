import { definitions } from '@/supabase-types';
import { createSlice } from '@reduxjs/toolkit';
import { fetchStudentsByGroup, insertStudent } from './students.thunk';

interface StudentState {
  list: { [key: string]: definitions['students'][] };
}
const initialState: StudentState = { list: {} };

const studentSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchStudentsByGroup.fulfilled, (state, { payload }) => {
      state.list[payload.groupId] = payload.data;
    });

    builder.addCase(insertStudent.fulfilled, (state, { payload }) => {
      state.list[payload.group_id].push(payload);
    });
  },
});

const studentsReducer = studentSlice.reducer;
export default studentsReducer;

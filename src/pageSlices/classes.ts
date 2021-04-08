import { definitions } from '@/supabase-types';
import { createSlice } from '@reduxjs/toolkit';
import { fetchAllClasses } from './classes.thunk';
import { fetchStudentsByGroup, insertStudent } from './students.thunk';

interface ClassesState {
  all: definitions['classes'][];
}
const initialState: ClassesState = { all: [] };

const classesSlice = createSlice({
  name: 'classes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllClasses.fulfilled, (state, { payload }) => {
      state.all = payload;
    });
  },
});

const classesReducer = classesSlice.reducer;
export default classesReducer;

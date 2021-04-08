import supabase from '@/services/supabase';
import { definitions } from '@/supabase-types';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchStudentsByGroup = createAsyncThunk<
  { data: definitions['students'][]; groupId: string },
  { group_id: string }
>('students/fetchByGroup', async ({ group_id }, thunk) => {
  if (!group_id) {
    thunk.rejectWithValue('No group id');
  }

  const { error, data } = await supabase
    .from<definitions['students']>('students')
    .select('*')
    .eq('group_id', group_id);

  if (error) {
    thunk.rejectWithValue(error);
  }

  return { groupId: group_id, data };
});

export const insertStudent = createAsyncThunk(
  'students/insertStudent',
  async (newData: Partial<definitions['students']>, thunk) => {
    const { data, error } = await supabase
      .from<definitions['students']>('students')
      .insert(newData)
      .single();

    if (error) {
      thunk.rejectWithValue(error);
    }

    return data;
  },
);

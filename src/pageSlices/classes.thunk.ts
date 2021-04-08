import supabase from '@/services/supabase';
import { definitions } from '@/supabase-types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { endOfMonth, endOfWeek, startOfMonth, startOfWeek } from 'date-fns';

export const fetchAllClasses = createAsyncThunk(
  'classes/fetchAllClasses',
  async (currentMonth: Date, thunk) => {
    const { data, error } = await supabase
      .from<definitions['classes']>(`classes`)
      .select('*, groups(name,color)')
      .gte('date', startOfWeek(startOfMonth(currentMonth)).toISOString())
      .lte('date', endOfWeek(endOfMonth(currentMonth)).toISOString());

    if (error) {
      thunk.rejectWithValue(error);
    }

    return data;
  },
);

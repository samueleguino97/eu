import supabase from '@/services/supabase';
import { definitions } from '@/supabase-types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setPeriod } from './groups';

export const fetchAllGroups = createAsyncThunk(
  'groups/fetchAllGroups',
  async (_, thunk) => {
    const { data, error } = await supabase
      .from<definitions['groups']>('groups')
      .select('*');

    if (error) {
      thunk.rejectWithValue(error);
    }

    return data;
  },
);

export const insertGroup = createAsyncThunk(
  'groups/insertGroups',
  async (newData: Partial<definitions['groups']>, thunk) => {
    const { data, error } = await supabase
      .from<definitions['groups']>('groups')
      .insert(newData)
      .single();

    if (error) {
      thunk.rejectWithValue(error);
    }

    return data;
  },
);

export const deleteGroup = createAsyncThunk(
  'groups/deleteGroup',
  async (id: string, thunk) => {
    const { error } = await supabase
      .from<definitions['groups']>('groups')
      .delete()
      .eq('id', id);

    if (error) {
      thunk.rejectWithValue(error);
    }

    return id;
  },
);

export const fetchClassesByGroup = createAsyncThunk<
  { data: definitions['classes'][]; groupId: string },
  { group_id: string; period?: number }
>('groups/classes', async ({ group_id, period }, thunk) => {
  if (!period) {
    const { data: maxPeriod } = await supabase
      .from<definitions['latest_period']>('latest_period')
      .select('*')
      .single();
    period = maxPeriod.max;
    thunk.dispatch(setPeriod(period));
  }

  if (!group_id) {
    thunk.rejectWithValue('No group id');
  }

  const { error, data } = await supabase
    .from<definitions['classes']>('classes')
    .select('*')
    .eq('group_id', group_id)
    .eq('period', period)
    .order('date', { ascending: true });

  if (error) {
    thunk.rejectWithValue(error);
  }

  return { groupId: group_id, data };
});

export const createClasses = createAsyncThunk<
  { data: definitions['classes'][]; groupId: string },
  { classes: definitions['classes'][]; group_id: string }
>('groups/createClasses', async ({ group_id, classes }, thunk) => {
  const { error, data } = await supabase
    .from<definitions['classes']>('classes')
    .insert(classes);

  if (error) {
    thunk.rejectWithValue(error);
  }

  return { data, groupId: group_id };
});

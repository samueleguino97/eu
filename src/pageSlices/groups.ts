import { definitions } from '@/supabase-types';
import { createSlice } from '@reduxjs/toolkit';

import {
  createClasses,
  deleteGroup,
  fetchAllGroups,
  fetchClassesByGroup,
  insertGroup,
} from './groups.thunk';

interface GroupClasses {
  [key: string]: definitions['classes'][];
}

interface GroupsState {
  list: definitions['groups'][];
  classes: GroupClasses;
  currentPeriod?: number;
}

const initialState: GroupsState = {
  list: [],
  classes: {},
};
const groupsSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    setPeriod(state, { payload }) {
      state.currentPeriod = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllGroups.fulfilled, (state, { payload }) => {
      state.list = payload;
    });
    builder.addCase(insertGroup.fulfilled, (state, { payload }) => {
      state.list.push(payload);
    });
    builder.addCase(deleteGroup.fulfilled, (state, { payload }) => {
      const deleteIndex = state.list.findIndex((i) => i.id === payload);
      state.list.splice(deleteIndex, 1);
    });

    builder.addCase(fetchClassesByGroup.fulfilled, (state, { payload }) => {
      state.classes[payload.groupId] = payload.data;
    });
    createClasses;

    builder.addCase(createClasses.fulfilled, (state, { payload }) => {
      state.classes[payload.groupId] = payload.data;
    });
  },
});

export const { setPeriod } = groupsSlice.actions;

const groupsReducer = groupsSlice.reducer;
export default groupsReducer;

import Button from '@/components/general/Button';
import GroupsLayout from '@/components/layouts/GroupsLayout';
import useFormState from '@/hooks/useFormState';
import {
  deleteGroup,
  fetchAllGroups,
  insertGroup,
} from '@/pageSlices/groups.thunk';
import { useAppDispatch, useAppSelector } from '@/services/store';
import {
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormLabel,
  Grid,
  makeStyles,
  TextField,
} from '@material-ui/core';

import { CirclePicker } from 'react-color';
import { useRouter } from 'next/router';
import * as React from 'react';
const useStyles = makeStyles({
  container: {
    height: '100%',
    display: 'grid',
    gridTemplateRows: '1fr',
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
  groupCard: {
    cursor: 'pointer',
    padding: 12,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    position: 'relative',
    '& h3': {
      fontWeight: 'bolder',
      fontSize: 14,
      color: '#1d203f',
      margin: ' 10px 0',
    },
    '& h4': {
      fontWeight: 'bold',
      fontSize: 12,
      color: '#bbb',
    },
    '& .imagen': {
      height: 80,
      width: 80,
      borderRadius: '50%',
      backgroundColor: '#e2ffe6',
      border: '0.5px solid #e2ffe6',
    },
  },
  close: {
    position: 'absolute',
    top: 15,
    right: 15,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bolder',
    backgroundColor: '#df5f5f',
    borderRadius: '50%',
    color: 'white',
    height: 25,
    width: 25,
    fontSize: 10,
  },
});
export type GroupsProps = {};

function Groups({}: GroupsProps) {
  const groups = useAppSelector((state) => state.groupsReducer.list);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(fetchAllGroups());
  }, []);
  const [isCreating, setIsCreating] = React.useState<boolean>(false);
  const classes = useStyles();
  const [state, setField] = useFormState({});

  const router = useRouter();

  async function handleGroupCreation() {
    dispatch(insertGroup({ name: state.name }));
    setIsCreating(false);
  }

  async function handleDelete(id: string) {
    dispatch(deleteGroup(id));
  }

  return (
    <div className={classes.container}>
      <div>
        <Button onClick={() => setIsCreating(true)}>Create Group</Button>
      </div>
      <div className={classes.groups}>
        <Grid spacing={4} container>
          {groups.map((g) => (
            <Grid xs={2} item>
              <Card
                onClick={() => router.push('/admin/groups/' + g.id)}
                className={classes.groupCard}
              >
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(g.id);
                  }}
                  className={classes.close}
                >
                  X
                </div>
                <div className={'imagen'}>
                  <img />
                </div>
                <h3>{g.name}</h3>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}

Groups.Layout = GroupsLayout;

export default Groups;

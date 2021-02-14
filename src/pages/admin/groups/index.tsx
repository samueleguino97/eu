import Button from '@/components/general/Button';
import { useCreateGroupMutation, useGroupsQuery } from '@/generated/graphql';
import useFormState from '@/hooks/useFormState';
import {
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  makeStyles,
  TextField,
} from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import { useRouter } from 'next/router';
import * as React from 'react';
const useStyles = makeStyles({
  container: {
    padding: 32,
    height: '100%',
    display: 'grid',
    gridTemplateRows: '60px 1fr',
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
      backgroundColor: '#eee',
      border: '0.5px solid #eee',
    },
  },
});
export type GroupsProps = {};

function Groups({}: GroupsProps) {
  const [groupResponse] = useGroupsQuery();
  const [, createGroup] = useCreateGroupMutation();
  const [isCreating, setIsCreating] = React.useState<boolean>(false);
  const classes = useStyles();
  const [state, setField] = useFormState({});

  const router = useRouter();

  async function handleGroupCreation() {
    await createGroup({ object: { name: state.name, date: state.date } });
    setIsCreating(false);
  }

  return (
    <div className={classes.container}>
      <div>
        <Button onClick={() => setIsCreating(true)}>Create Group</Button>
      </div>
      <div className={classes.groups}>
        <Grid spacing={4} container>
          {groupResponse.data?.groups.map((g) => (
            <Grid xs={2} item>
              <Card
                onClick={() => router.push('/admin/groups/' + g.id)}
                className={classes.groupCard}
              >
                <div className={'imagen'}>
                  <img />
                </div>
                <h3>{g.name}</h3>
                <h4>{g.date}</h4>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
      <Dialog open={isCreating} onClose={() => setIsCreating(false)}>
        <DialogTitle>Create Group</DialogTitle>
        <DialogContent>
          <div className={classes.modalForm}>
            <TextField {...setField('name')} label="Name" variant="outlined" />
            <DatePicker
              {...setField('date')}
              label="Payment Date"
              inputVariant="outlined"
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleGroupCreation}>Create Group</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Groups;

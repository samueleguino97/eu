import useFormState from '@/hooks/useFormState';
import { fetchAllGroups, insertGroup } from '@/pageSlices/groups.thunk';
import { useAppDispatch, useAppSelector } from '@/services/store';
import {
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormLabel,
  Icon,
  IconButton,
  makeStyles,
  TextField,
} from '@material-ui/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';
import Button from '../general/Button';
import { CirclePicker } from 'react-color';

export type GroupsLayoutProps = {
  children: React.ReactNode;
};

const useStyles = makeStyles({
  container: {
    display: 'grid',
    gridTemplateColumns: '250px 1fr',
    gridTemplateRows: '1fr',
    height: '100%',
    padding: 32,
    gridGap: 24,
  },
  modalForm: {
    display: 'flex',
    flexDirection: 'column',
    '& >*': {
      marginBottom: 24,
    },
  },
  list: {
    paddingBlock: 10,
  },
  groupItem: {
    display: 'flex',
    alignItems: 'center',
    paddingInline: 12,
    marginBottom: 12,
    height: 40,
    cursor: 'pointer',
    '&:hover': {
      boxShadow: ' 0 0 3px 1px #2b5829',
    },
    borderRadius: 12,
    marginInline: 'auto',
    maxWidth: 220,
    color: '#aaa',
    '&.active': {
      color: 'white',
      backgroundColor: '#2b5829',
    },
  },
});

function GroupsLayout({ children }: GroupsLayoutProps) {
  const classes = useStyles();
  const groups = useAppSelector((state) => state.groupsReducer.list);
  const dispatch = useAppDispatch();

  const router = useRouter();

  React.useEffect(() => {
    dispatch(fetchAllGroups());
  }, []);

  const [isCreating, setIsCreating] = React.useState<boolean>(false);
  const [state, setField] = useFormState({});

  async function handleGroupCreation() {
    dispatch(insertGroup({ name: state.name, color: state.color.hex }));
    setIsCreating(false);
  }

  return (
    <div className={classes.container}>
      <Card className={classes.list}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Link href="/admin/groups">
            <span style={{ paddingInline: 12, fontSize: 18, color: '#aaa' }}>
              Groups
            </span>
          </Link>
          <IconButton onClick={() => setIsCreating(true)} color="primary">
            <Icon>add</Icon>
          </IconButton>
        </div>
        <div>
          {groups.map((group) => (
            <div
              onClick={() => router.push(`/admin/groups/${group.id}`)}
              className={
                classes.groupItem +
                (router.pathname.startsWith(`/admin/groups/[id]`) &&
                router.query.id?.toString() === group.id
                  ? ' active'
                  : '')
              }
            >
              {group.name}
            </div>
          ))}
        </div>
      </Card>
      <div>{children}</div>
      <Dialog open={isCreating} onClose={() => setIsCreating(false)}>
        <DialogTitle>Create Group</DialogTitle>
        <DialogContent>
          <div className={classes.modalForm}>
            <TextField {...setField('name')} label="Name" variant="outlined" />
            <FormLabel>Group Color</FormLabel>
            <CirclePicker
              color={state.color}
              onChange={setField('color').onChange}
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

export default GroupsLayout;

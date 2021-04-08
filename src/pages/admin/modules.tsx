import Button from '@/components/general/Button';
import { useCourseQuery, useAddLessonMutation } from '@/generated/graphql';
import useFormState from '@/hooks/useFormState';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import * as React from 'react';

const useStyles = makeStyles({
  modalForm: {
    display: 'flex',
    flexDirection: 'column',
    '& >*': {
      marginBottom: 24,
    },
  },
});

export type ModuleProps = {};

function Module({}: ModuleProps) {
  const [courseRes] = useCourseQuery();
  const classes = useStyles();
  const [state, setField] = useFormState({});

  const [isCreating, setIsCreating] = React.useState<boolean>(false);

  const [, addLesson] = useAddLessonMutation();

  function handleCreation(module_id) {
    addLesson({ object: { ...state, module_id } });
  }

  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ fontSize: 32, textAlign: 'center' }}>Modules and lessons</h1>
      {courseRes.data?.module.map((module) => (
        <>
          <Accordion>
            <AccordionSummary>
              <h2 style={{ color: '#2b5829' }}>
                <strong>
                  {module.number}. {module.name}
                </strong>
              </h2>
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsCreating(true);
                }}
              >
                Add Lesson
              </Button>
            </AccordionSummary>
            <AccordionDetails style={{ flexDirection: 'column' }}>
              <Grid container spacing={1}>
                <Grid direction="column" container item xs={4} spacing={3}>
                  {module.lessons.slice(0, 5).map((lesson) => (
                    <Grid item>
                      <strong>
                        {lesson.number}. {lesson.name}
                      </strong>
                    </Grid>
                  ))}
                </Grid>
                <Grid direction="column" container item xs={4} spacing={3}>
                  {module.lessons.slice(5, 10).map((lesson) => (
                    <Grid item>
                      <strong>
                        {lesson.number}. {lesson.name}
                      </strong>
                    </Grid>
                  ))}
                </Grid>
                <Grid direction="column" container item xs={4} spacing={3}>
                  {module.lessons.slice(10, 15).map((lesson) => (
                    <Grid item>
                      <strong>
                        {lesson.number}. {lesson.name}
                      </strong>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
          <Dialog open={isCreating} onClose={() => setIsCreating(false)}>
            <DialogTitle>Create Lesson</DialogTitle>
            <DialogContent>
              <div className={classes.modalForm}>
                <TextField
                  {...setField('name')}
                  label="Name"
                  variant="outlined"
                />
                <TextField
                  {...setField('description')}
                  label="Description"
                  variant="outlined"
                />

                <TextField
                  {...setField('number')}
                  label="Lesson Number"
                  type="number"
                  variant="outlined"
                />
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => handleCreation(module.id)}>
                Create Lesson
              </Button>
            </DialogActions>
          </Dialog>
        </>
      ))}
    </div>
  );
}

export default Module;

import { useModal } from '@/hooks/useModal';
import { Card, Icon, makeStyles } from '@material-ui/core';
import { format, getDate } from 'date-fns';
import * as React from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import ClassModal from '../modals/ClassModal';

const useStyles = makeStyles({
  item: {
    minWidth: 100,
    marginLeft: 24,
    marginBlock: 12,
    borderRadius: 12,
    transition: 'all 0.5s ease',
    color: '#aaa',
    cursor: 'pointer',
    boxShadow: '0 0 3px 1px #ccc',
    '&:hover': {
      boxShadow: '0 0 3px 1px green',
    },
  },
});

export type ClassGridItemProps = {
  singleClass: any;
  monthToShow: string;
};

function ClassGridItem({ singleClass, monthToShow }: ClassGridItemProps) {
  const classes = useStyles();

  const [isOpen, { openModal, closeModal }] = useModal();

  const attendances = singleClass.registered
    ? Object.keys(JSON.parse(singleClass.attendances)).map((a) => ({
        student_id: a,
        attendance_status: JSON.parse(singleClass.attendances)[a],
      }))
    : [];

  return (
    <div>
      {isOpen && (
        <ClassModal
          open={isOpen}
          onClose={closeModal}
          classSelected={singleClass}
        />
      )}
      <Card
        onClick={openModal}
        elevation={5}
        style={{
          height: 100,
          position: 'relative',
          color: singleClass.registered ? '#4dbe8a' : '',
        }}
        className={classes.item}
      >
        <div
          style={{
            fontSize: 10,
            fontWeight: 'bold',
            height: 10,
            margin: 2,
          }}
        >
          {monthToShow}
        </div>
        <div
          style={{
            textAlign: 'center',
            fontSize: 18,
          }}
        >
          {format(new Date(singleClass.date), 'EEE')}
        </div>
        <div
          style={{
            textAlign: 'center',
            fontSize: 14,
          }}
        >
          {format(new Date(singleClass.date), 'd')}
        </div>
        <Icon
          style={{
            position: 'absolute',
            left: 5,
            bottom: 5,
          }}
        >
          {singleClass.registered ? 'check_circle' : 'check_circle_outlined'}
        </Icon>
        <div
          style={{
            position: 'absolute',
            right: 5,
            bottom: 5,
            height: 21,
            width: 21,
          }}
        >
          <PieChart
            startAngle={90}
            data={[
              {
                title: 'Present',
                color: '#4dbe8a',
                value:
                  attendances.filter(
                    (a) =>
                      a.attendance_status === 'PRESENT' ||
                      a.attendance_status === 'LATE',
                  ).length / attendances.length,
              },
              {
                title: 'Missing',
                color: '#fc4f4f',
                value:
                  attendances.filter((a) => a.attendance_status === 'MISSING')
                    .length / attendances.length,
              },
            ]}
            style={{ height: '20px' }}
          />
        </div>
      </Card>
    </div>
  );
}

export default ClassGridItem;

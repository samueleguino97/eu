import { Attendance } from '@/generated/graphql';
import next from 'next';

export default function attendancesToObject(attendanceArray: any[]) {
  const attObj = attendanceArray.reduce(
    (map, next) => ({ ...map, [next.date]: next.status }),
    {},
  );
  return attObj;
}

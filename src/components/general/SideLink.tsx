import { Icon, makeStyles, Theme } from '@material-ui/core';
import Link from 'next/link';
import * as React from 'react';

const useStyles = makeStyles<Theme, { active: boolean }>({
  container: {
    height: 50,
    width: '100%',

    marginBottom: 16,

    display: 'grid',
    gridTemplateColumns: '24px 1fr 24px',
    gridTemplateRows: '1fr',
    textDecoration: 'none',
    color: ({ active }) => (active ? '#ffffff' : '#bbb'),
  },
  main: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: ({ active }) => (active ? '#2b5829' : 'transparent'),
    borderRadius: 12,
    padding: '0 24px',
    fontWeight: 'bold',
  },
  indicator: {
    display: 'flex',
    alignItems: 'center',
    '& >div': {
      height: '80%',
      width: 5,
      backgroundColor: ({ active }) => (active ? '#2b5829' : 'transparent'),
      borderTopRightRadius: 20,
      borderBottomRightRadius: 20,
    },
  },
  icon: {
    marginRight: 12,
  },
});

export type SideLinkProps = {
  to: string;
  children: React.ReactNode;
  icon?: string;
  active?: boolean;
};

function SideLink({ to, children, icon, active }: SideLinkProps) {
  const classes = useStyles({ active });
  return (
    <Link href={to}>
      <a className={classes.container}>
        <div className={classes.indicator}>
          <div></div>
        </div>
        <div className={classes.main}>
          {icon && <Icon className={classes.icon}>{icon}</Icon>}
          {children}
        </div>
        <div></div>
      </a>
    </Link>
  );
}

export default SideLink;

import { makeStyles } from '@material-ui/core';
import * as React from 'react';
import SideLink from '../general/SideLink';
import { useRouter } from 'next/router';

const useStyles = makeStyles({
  appContainer: {
    height: '100%',
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '250px 1fr',
    gridTemplateRows: '1fr',
    backgroundColor: 'white',
    borderRadius: 24,
    overflow: 'hidden',
  },
  background: {
    backgroundColor: '#dadada',
    padding: 24,
    height: '100vh',
  },
  main: {
    backgroundColor: '#e7fff5',
    overflow: 'auto',
  },
  logo: {
    height: 120,
    width: '100%',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 36,
    padding: 12,
    fontWeight: 'bold',
    lineHeight: '35px',
    '& span': {
      color: '#2fbd6f',
      fontWeight: 'bolder',
    },
  },
  sidebar: {},
});

export type AdminLayoutProps = {
  children: React.ReactNode;
};

const links = [
  {
    label: 'Groups',
    icon: 'group',
    to: '/admin/groups',
  },
  {
    label: 'Finances',
    icon: 'monetization_on',
    to: '/admin/finances',
  },
  {
    label: 'Calendar',
    icon: 'today',
    to: '/admin/calendar',
  },
  {
    label: 'Settings',
    icon: 'settings',
    to: '/admin/settings',
  },
];

function AdminLayout({ children }: AdminLayoutProps) {
  const classes = useStyles();
  const router = useRouter();
  return (
    <div className={classes.background}>
      <div className={classes.appContainer}>
        <div className={classes.sidebar}>
          <div className={classes.logo}>
            <div>
              English Unlimited<span> .</span>
            </div>
          </div>
          <nav>
            {links.map((l) => (
              <SideLink
                active={router.pathname.startsWith(l.to)}
                icon={l.icon}
                to={l.to}
              >
                {l.label}
              </SideLink>
            ))}
          </nav>
        </div>
        <main className={classes.main}>{children}</main>
      </div>
    </div>
  );
}

export default AdminLayout;

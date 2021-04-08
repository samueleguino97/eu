import { makeStyles } from '@material-ui/core';
import { ReactNode } from 'react';
const useStyles = makeStyles({
  container: {
    height: '100vh',
  },
});
export type LandingLayoutProps = { children: ReactNode };

function LandingLayout({ children }: LandingLayoutProps) {
  const classes = useStyles();
  return <div className={classes.container}>{children}</div>;
}

export default LandingLayout;

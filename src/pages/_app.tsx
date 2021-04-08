import AdminLayout from '@/components/layouts/AdminLayout';
import LandingLayout from '@/components/layouts/LandingLayout';
import { store } from '@/services/store';
import DateFnsUtils from '@date-io/date-fns';
import {
  createMuiTheme,
  makeStyles,
  MuiThemeProvider,
} from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  '@global': {
    '*': {
      fontFamily: "'Nunito'",
      padding: 0,
      margin: 0,
      boxSizing: 'border-box',
    },
    body: {
      height: '100vh',
      width: '100%',
    },
  },
}));
const theme = createMuiTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: '#2b5829',
    },
    secondary: {
      // This is green.A700 as hex.
      main: '#2b5829',
    },
  },
});

export default function MyApp({ Component, pageProps }) {
  useStyles();
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  const router = useRouter();

  function getLayout() {
    if (router.pathname.startsWith('/admin')) {
      return AdminLayout;
    }

    return LandingLayout;
  }
  const Layout = getLayout();

  const NestedLayout =
    Component.Layout ||
    (({ children }) => <React.Fragment>{children}</React.Fragment>);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Layout>
            <NestedLayout>
              <Component {...pageProps} />
            </NestedLayout>
          </Layout>
        </MuiPickersUtilsProvider>
      </Provider>
    </MuiThemeProvider>
  );
}

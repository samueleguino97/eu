import AdminLayout from '@/components/layouts/AdminLayout';
import {
  Students,
  StudentsDocument,
  StudentsQuery,
  StudentsQueryVariables,
} from '@/generated/graphql';
import DateFnsUtils from '@date-io/date-fns';
import {
  createMuiTheme,
  makeStyles,
  MuiThemeProvider,
} from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';

import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { cacheExchange } from '@urql/exchange-graphcache';
import { useEffect } from 'react';

import {
  Provider,
  createClient,
  dedupExchange,
  fetchExchange,
  gql,
} from 'urql';

const client = createClient({
  url: 'https://english.hasura.app/v1/graphql',

  exchanges: [dedupExchange, cacheExchange({}), fetchExchange],
});

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
      main: '#2fb96d',
    },
    secondary: {
      // This is green.A700 as hex.
      main: '#2fb96d',
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

  return (
    <MuiThemeProvider theme={theme}>
      <Provider value={client}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <AdminLayout>
            <Component {...pageProps} />
          </AdminLayout>
        </MuiPickersUtilsProvider>
      </Provider>
    </MuiThemeProvider>
  );
}

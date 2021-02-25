import AdminLayout from '@/components/layouts/AdminLayout';
import {
  GroupsDocument,
  GroupsQuery,
  GroupsQueryVariables,
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
import { useRouter } from 'next/router';
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

  exchanges: [
    dedupExchange,
    cacheExchange({
      updates: {
        Mutation: {
          insert_students_one: (res: any, args, cache, info) => {
            cache.updateQuery<StudentsQuery, StudentsQueryVariables>(
              {
                query: StudentsDocument,
                variables: { groupId: res.insert_students_one.group_id },
              },
              (data) => {
                data.students.push(res.insert_students_one);
                return data;
              },
            );
          },
          delete_groups_by_pk: (res: any, args, cache, info) => {
            cache.updateQuery<GroupsQuery, GroupsQueryVariables>(
              { query: GroupsDocument },
              (data) => {
                const i = data.groups.findIndex(
                  (g) => g.id === res.delete_groups_by_pk.id,
                );
                data.groups.splice(i, 1);
                return data;
              },
            );
          },
          insert_groups_one: (res: any, args, cache, info) => {
            cache.updateQuery<GroupsQuery, GroupsQueryVariables>(
              { query: GroupsDocument },
              (data) => {
                data.groups.push(res.insert_groups_one);
                return data;
              },
            );
          },

          insert_attendance_one: (res: any, args, cache, info) => {
            cache.updateQuery<StudentsQuery, StudentsQueryVariables>(
              {
                query: StudentsDocument,
                variables: {
                  groupId: res.insert_attendance_one.student.group_id,
                },
              },
              (data) => {
                const studentIndex = data.students.findIndex(
                  (s) => s.id === res.insert_attendance_one.student_id,
                );
                const newAttendances =
                  data.students[studentIndex].attendances || [];
                delete res.student;

                newAttendances.push(res);
                data.students[studentIndex] = {
                  ...data.students[studentIndex],
                  attendances: newAttendances,
                };
                return data;
              },
            );
          },
        },
      },
    }),
    fetchExchange,
  ],
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

    return 'div';
  }
  const Layout = getLayout();

  return (
    <MuiThemeProvider theme={theme}>
      <Provider value={client}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </MuiPickersUtilsProvider>
      </Provider>
    </MuiThemeProvider>
  );
}

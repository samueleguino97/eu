import {
  Button,
  Link as MaterialLink,
  Container,
  Grid,
} from '@material-ui/core';
import Link from 'next/link';

export type HomeProps = {};

function Home({}: HomeProps) {
  return (
    <Container style={{ height: '100%' }}>
      <Grid
        style={{ height: '100%' }}
        container
        justify="center"
        alignItems="center"
        direction="column"
        spacing={4}
      >
        <Grid item>
          <Link href="/education">
            <MaterialLink>
              <Button variant="contained" color="primary">
                Education
              </Button>
            </MaterialLink>
          </Link>
        </Grid>

        <Grid item>
          <Link href="/lounge">
            <MaterialLink>
              <Button variant="contained" color="primary">
                Teacher's Lounge
              </Button>
            </MaterialLink>
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home;

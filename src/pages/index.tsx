import { makeStyles } from "@material-ui/core";
const useStyles = makeStyles({
  container: {
    height: "100%",
  },
});

export type HomeProps = {};

function Home({}: HomeProps) {
  const classes = useStyles();
  return <div className={classes.container}></div>;
}

export default Home;

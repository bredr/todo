import { Grid } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";
import "./App.css";
import { CreateOpen } from "./features/createItem";
import { Items } from "./features/items";
import { NavBar } from "./features/nav";
import { Pagination } from "./features/pagination";
import { Toaster } from "./features/toaster";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1
    },
    control: {
      padding: theme.spacing(2)
    }
  })
);

const App: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <NavBar />
      <Grid
        container={true}
        spacing={2}
        alignItems="center"
        justify="center"
        className={classes.control}
      >
        <Grid item={true} xs={6}>
          <Items />
        </Grid>
      </Grid>
      <Grid
        container={true}
        spacing={2}
        alignItems="center"
        justify="center"
        className={classes.control}
      >
        <Grid item={true} xs={2} />
        <Grid item={true} xs={6}>
          <Pagination />
        </Grid>
        <Grid item={true} xs={2}>
          <CreateOpen />
        </Grid>
      </Grid>
      <Toaster />
    </div>
  );
};

export default App;

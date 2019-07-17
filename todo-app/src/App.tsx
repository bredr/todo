import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";
import "./App.css";
import { Items } from "./features/items";
import { NavBar } from "./features/nav";

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
    }
  })
);

const App: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <NavBar />
      <Items />
    </div>
  );
};

export default App;

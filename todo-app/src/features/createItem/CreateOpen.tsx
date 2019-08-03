import { Fab } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { open } from "./state/actions";
import selectors from "./state/selectors";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      margin: theme.spacing(1)
    }
  })
);

export const CreateOpen = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const isOpen = useSelector(selectors.createItemOpen);

  function onClick() {
    dispatch(open());
  }

  return (
    <Fab
      color="primary"
      aria-label="add"
      className={classes.fab}
      onClick={onClick}
      disabled={isOpen}
    >
      <AddIcon />
    </Fab>
  );
};

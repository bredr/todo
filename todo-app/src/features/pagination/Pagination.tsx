import { grpc } from "@improbable-eng/grpc-web";
import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pagination as PaginationRequest } from "../../proto/todo_pb";
import { Todo } from "../../proto/todo_pb_service";
import * as actions from "../items/state/actions";
import selectors from "../items/state/selectors";
import * as toaster from "../toaster/state/actions";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      margin: theme.spacing(1)
    }
  })
);

export const getItemsAction = (limit = 10, offset = 0) => {
  const request = new PaginationRequest();
  request.setLimit(limit);
  request.setOffset(offset);
  return actions.getItems({
    methodDescriptor: Todo.GetItems,
    request,
    onStart: () => actions.loadingItems({ limit, offset }),
    onMessage: res => actions.setItems(res.toObject()),
    onEnd: (code, message) =>
      code === grpc.Code.OK
        ? toaster.addSuccess(message)
        : toaster.addError(message)
  });
};

export const Pagination = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const hasNext = useSelector(selectors.hasNext);
  const hasPrevious = useSelector(selectors.hasPrevious);
  const loading = useSelector(selectors.loading);
  const { limit, offset } = useSelector(selectors.pagination);

  useEffect(() => {
    dispatch(getItemsAction());
  }, [dispatch]);

  const handleBefore = () => {
    dispatch(getItemsAction(10, offset - 10));
  };
  const handleNext = () => {
    dispatch(getItemsAction(10, offset + 10));
  };
  return (
    <Grid container={true}>
      <Grid item={true} xs={6}>
        <IconButton
          aria-label="Before"
          className={classes.fab}
          disabled={loading || !hasPrevious}
          onClick={handleBefore}
        >
          <NavigateBeforeIcon />
        </IconButton>
      </Grid>
      <Grid item={true} xs={6}>
        <Fab
          color="primary"
          aria-label="Next"
          className={classes.fab}
          disabled={loading || !hasNext}
          onClick={handleNext}
        >
          <NavigateNextIcon />
        </Fab>
      </Grid>
    </Grid>
  );
};

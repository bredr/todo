import { grpc } from "@improbable-eng/grpc-web";
import Fab from "@material-ui/core/Fab";
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

const getItemsAction = (limit = 10, offset = 0) => {
  const request = new PaginationRequest();
  request.setLimit(limit);
  request.setOffset(offset);
  return actions.getItems({
    methodDescriptor: Todo.GetItems,
    request,
    onStart: () => actions.loadingItems(),
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

  useEffect(() => {
    dispatch(getItemsAction());
  }, [dispatch]);

  return (
    <div>
      <IconButton
        aria-label="Before"
        className={classes.fab}
        disabled={loading || !hasPrevious}
      >
        <NavigateBeforeIcon />
      </IconButton>
      <Fab
        color="primary"
        aria-label="Next"
        className={classes.fab}
        disabled={loading || !hasNext}
      >
        <NavigateNextIcon />
      </Fab>
    </div>
  );
};

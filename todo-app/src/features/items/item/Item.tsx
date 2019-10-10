import { grpc } from "@improbable-eng/grpc-web";
import { Fab } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ID, Item as ItemType } from "../../../proto/todo_pb";
import { Todo } from "../../../proto/todo_pb_service";
import { getItemsAction } from "../../pagination/Pagination";
import toaster from "../../toaster/state/actions";
import { editItem, removeItem } from "../state/actions";

const useStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(1)
  },
  card: {
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
}));

const deleteItemAction = (id: string) => {
  const request = new ID();
  request.setId(id);
  return removeItem({
    methodDescriptor: Todo.RemoveItem,
    request,
    onMessage: () => getItemsAction(),
    onEnd: (code, message) =>
      code === grpc.Code.OK
        ? toaster.addSuccess("Deleted")
        : toaster.addError(message)
  });
};

export const Item: React.FC<ItemType.AsObject> = props => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { description, daystocomplete, due, id } = props;

  function onEdit() {
    dispatch(editItem(id));
  }

  function onDelete() {
    dispatch(deleteItemAction(id));
  }

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom={true}
        >
          {description}
        </Typography>
        <Typography variant="body2" component="p">
          Days to complete: {daystocomplete}
          <br />
          {due
            ? "Due:" + new Date(due.seconds * 1000).toLocaleDateString()
            : ""}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={onEdit} className={classes.fab}>
          Edit
        </Button>
        <Fab
          size="small"
          aria-label="delete"
          onClick={onDelete}
          className={classes.fab}
        >
          <DeleteIcon />
        </Fab>
      </CardActions>
    </Card>
  );
};

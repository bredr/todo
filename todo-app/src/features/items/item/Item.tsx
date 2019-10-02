import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { Item as ItemType } from "../../../proto/todo_pb";

const useStyles = makeStyles({
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
});

export const Item: React.FC<ItemType.AsObject> = props => {
  const classes = useStyles();

  const { description, daystocomplete, due } = props;

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
        <Button size="small">Edit</Button>
      </CardActions>
    </Card>
  );
};

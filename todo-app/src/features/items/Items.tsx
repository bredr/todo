import CircularProgress from "@material-ui/core/CircularProgress";
import List from "@material-ui/core/List";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";
import { useSelector } from "react-redux";
import { Item } from "./item/Item";
import selectors from "./state/selectors";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    progress: {
      margin: theme.spacing(2)
    },
    root: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper
    }
  })
);

export const Items: React.FC = () => {
  const items = useSelector(selectors.items);
  const loading = useSelector(selectors.loading);
  const classes = useStyles();

  return (
    <div>
      {loading && <CircularProgress className={classes.progress} />}
      {!loading && items.length > 0 && (
        <List className={classes.root}>
          {items.map(item => (
            <Item {...item} />
          ))}
        </List>
      )}
    </div>
  );
};

import { Paper } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import List from "@material-ui/core/List";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";
import { useSelector } from "react-redux";
import { CreateForm } from "../createItem/CreateForm";
import create from "../createItem/state/selectors";
import { Item } from "./item/Item";
import selectors from "./state/selectors";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    progress: {
      margin: theme.spacing(2)
    },
    root: {
      width: "100%",
      backgroundColor: theme.palette.background.paper
    },
    padding: {
      "margin-bottom": theme.spacing(2)
    }
  })
);

export const Items: React.FC = () => {
  const items = useSelector(selectors.items);
  const loading = useSelector(selectors.loading);
  const createForm = useSelector(create.createItemOpen);
  const classes = useStyles();

  return (
    <div>
      {createForm && (
        <div className={classes.padding}>
          <CreateForm />
        </div>
      )}
      {loading && <CircularProgress className={classes.progress} />}
      {!loading && items.length > 0 && (
        <div>
          {items.map(item => (
            <div className={classes.padding}>
              {item.edit ? (
                <CreateForm item={item} />
              ) : (
                <Item {...item} key={item.id} />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

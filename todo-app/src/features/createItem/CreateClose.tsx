import { Button } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { cancelEditItem } from "../items/state/actions";
import { close } from "./state/actions";
import selectors from "./state/selectors";

interface IProps {
  id?: string;
}
export const CreateClose: React.FC<IProps> = props => {
  const { id } = props;
  const dispatch = useDispatch();

  const isOpen = useSelector(selectors.createItemOpen);

  function onClick() {
    id ? dispatch(cancelEditItem(id)) : dispatch(close());
  }

  return (
    <Button
      variant="outlined"
      color="primary"
      fullWidth={true}
      disabled={!isOpen && !id}
      onClick={onClick}
    >
      Cancel
    </Button>
  );
};

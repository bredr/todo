import React from "react";
import { Item as ItemType } from "../../../proto/todo_pb";

export const Item: React.FC<ItemType.AsObject> = props => {
  const { id } = props;
  return <p>{id}</p>;
};

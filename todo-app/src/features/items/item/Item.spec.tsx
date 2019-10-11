import { cleanup, fireEvent, render } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { Item } from "./Item";

const mockStore = configureStore([]);

describe("Item", () => {
  afterEach(() => cleanup());

  it("renders", () => {
    const props = {
      description: "d",
      daystocomplete: 1,
      due: { seconds: 1000000, nanos: 0 },
      id: "1"
    };
    const store = mockStore();
    const { container } = render(
      <Provider store={store}>
        <Item {...props} />
      </Provider>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it("dispatches delete", () => {
    const props = {
      description: "d",
      daystocomplete: 1,
      due: { seconds: 1000000, nanos: 0 },
      id: "1"
    };
    const store = mockStore();
    const { getByLabelText } = render(
      <Provider store={store}>
        <Item {...props} />
      </Provider>
    );
    fireEvent.click(getByLabelText("delete"));
    expect(store.getActions()[0]).toEqual(
      expect.objectContaining({ type: "GRPC_WEB_REQUEST" })
    );
  });

  it("dispatches edit", () => {
    const props = {
      description: "d",
      daystocomplete: 1,
      due: { seconds: 1000000, nanos: 0 },
      id: "1"
    };
    const store = mockStore();
    const { getByLabelText } = render(
      <Provider store={store}>
        <Item {...props} />
      </Provider>
    );
    fireEvent.click(getByLabelText("edit"));
    expect(store.getActions()[0]).toEqual(
      expect.objectContaining({
        error: undefined,
        meta: undefined,
        payload: "1",
        type: "EDIT_ITEM"
      })
    );
  });
});

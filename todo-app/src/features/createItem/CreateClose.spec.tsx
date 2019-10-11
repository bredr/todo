import { cleanup, fireEvent, render } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { CreateClose } from "./CreateClose";
import { CREATE_SLICE } from "./state/selectors";

const mockStore = configureStore([]);

describe("CreateClose", () => {
  afterEach(() => cleanup());

  it("renders", () => {
    const store = mockStore({ [CREATE_SLICE]: { isOpen: true } });
    const { container } = render(
      <Provider store={store}>
        <CreateClose />
      </Provider>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it("dispatches close if no id", () => {
    const store = mockStore({ [CREATE_SLICE]: { isOpen: true } });
    const { getByLabelText } = render(
      <Provider store={store}>
        <CreateClose />
      </Provider>
    );
    fireEvent.click(getByLabelText("close"));
    expect(store.getActions()[0]).toEqual(
      expect.objectContaining({ type: "CLOSE_CREATE" })
    );
  });
  it("dispatches cancelEditItem if no id", () => {
    const store = mockStore({ [CREATE_SLICE]: { isOpen: true } });
    const props = { id: "id" };
    const { getByLabelText } = render(
      <Provider store={store}>
        <CreateClose {...props} />
      </Provider>
    );
    fireEvent.click(getByLabelText("close"));
    expect(store.getActions()[0]).toEqual(
      expect.objectContaining({ payload: "id", type: "CANCEL_EDIT_ITEM" })
    );
  });
});

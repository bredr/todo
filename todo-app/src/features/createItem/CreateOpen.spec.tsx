import { cleanup, fireEvent, render } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";
import { CreateOpen } from "./CreateOpen";
import reducer, { IState } from "./state/reducer";
import { CREATE_SLICE } from "./state/selectors";

const renderWithRedux = (
  ui: JSX.Element,
  {
    initialState,
    store = createStore(
      combineReducers({
        [CREATE_SLICE]: reducer
      }),
      initialState
    )
  }: {
    initialState?: { [CREATE_SLICE]: IState };
    store?: any;
  } = {}
) => {
  return { ...render(<Provider store={store}>{ui}</Provider>) };
};

describe("CreateOpen", () => {
  afterEach(() => cleanup());

  it("renders", () => {
    const { container } = renderWithRedux(<CreateOpen />, {
      initialState: { [CREATE_SLICE]: { isOpen: true } }
    });
    expect(container.firstChild).toMatchSnapshot();
  });

  it("is disabled if isOpen", () => {
    const { getByLabelText } = renderWithRedux(<CreateOpen />, {
      initialState: { [CREATE_SLICE]: { isOpen: true } }
    });
    expect(getByLabelText("add").getAttribute("disabled")).toBe("");
  });
  it("is enabled if not isOpen", () => {
    const { getByLabelText } = renderWithRedux(<CreateOpen />, {
      initialState: { [CREATE_SLICE]: { isOpen: false } }
    });
    expect(getByLabelText("add").getAttribute("disabled")).toBe(null);
  });

  it("on click opens", () => {
    const { getByLabelText } = renderWithRedux(<CreateOpen />, {
      initialState: { [CREATE_SLICE]: { isOpen: false } }
    });
    expect(getByLabelText("add").getAttribute("disabled")).toBe(null);
    fireEvent.click(getByLabelText("add"));
    expect(getByLabelText("add").getAttribute("disabled")).toBe("");
  });
});

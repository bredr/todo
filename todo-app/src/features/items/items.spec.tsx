import { render } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";
import { Items } from "./Items";
import reducer, { IState } from "./state/reducer";
import { ITEMS_SLICE } from "./state/selectors";

const renderWithRedux = (
  ui: JSX.Element,
  {
    initialState,
    store = createStore(
      combineReducers({ [ITEMS_SLICE]: reducer }),
      initialState
    )
  }: { initialState?: { [ITEMS_SLICE]: IState }; store?: any } = {}
) => {
  return { ...render(<Provider store={store}>{ui}</Provider>) };
};

describe("Items", () => {
  it("renders spinning wheel when loading", () => {
    const { container } = renderWithRedux(<Items />, {
      initialState: {
        [ITEMS_SLICE]: {
          total: 0,
          limit: 0,
          offset: 0,
          items: [],
          loading: true
        }
      }
    });
    expect(container.firstChild).toMatchSnapshot();
  });
  it("renders list of items when not loading", () => {
    const { container } = renderWithRedux(<Items />, {
      initialState: {
        [ITEMS_SLICE]: {
          total: 0,
          limit: 0,
          offset: 0,
          items: [],
          loading: false
        }
      }
    });
    expect(container.firstChild).toMatchSnapshot();
  });
});

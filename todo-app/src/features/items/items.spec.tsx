import { cleanup, render } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";
import createItemReducer, {
  IState as ICreateState
} from "../createItem/state/reducer";
import { CREATE_SLICE } from "../createItem/state/selectors";
import { Items } from "./Items";
import reducer, { IState } from "./state/reducer";
import { ITEMS_SLICE } from "./state/selectors";
const renderWithRedux = (
  ui: JSX.Element,
  {
    initialState,
    store = createStore(
      combineReducers({
        [ITEMS_SLICE]: reducer,
        [CREATE_SLICE]: createItemReducer
      }),
      initialState
    )
  }: {
    initialState?: { [ITEMS_SLICE]: IState; [CREATE_SLICE]: ICreateState };
    store?: any;
  } = {}
) => {
  return { ...render(<Provider store={store}>{ui}</Provider>) };
};

describe("Items", () => {
  afterEach(() => cleanup());

  it("renders spinning wheel when loading", () => {
    const { container } = renderWithRedux(<Items />, {
      initialState: {
        [ITEMS_SLICE]: {
          total: 0,
          limit: 0,
          offset: 0,
          items: [],
          loading: true
        },
        [CREATE_SLICE]: {
          isOpen: false
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
        },
        [CREATE_SLICE]: {
          isOpen: false
        }
      }
    });
    expect(container.firstChild).toMatchSnapshot();
  });
  it("renders create form when isOpen", () => {
    const { container } = renderWithRedux(<Items />, {
      initialState: {
        [ITEMS_SLICE]: {
          total: 0,
          limit: 0,
          offset: 0,
          items: [],
          loading: false
        },
        [CREATE_SLICE]: {
          isOpen: true
        }
      }
    });
    expect(container.firstChild).toMatchSnapshot();
  });
});

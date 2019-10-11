import {
  cleanup,
  fireEvent,
  getByAltText,
  getByText,
  render
} from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";
import reducer, { IState } from "./state/reducer";
import { TOASTER_SLICE } from "./state/selectors";
import { Toaster } from "./Toaster";

const renderWithRedux = (
  ui: JSX.Element,
  {
    initialState,
    store = createStore(
      combineReducers({
        [TOASTER_SLICE]: reducer
      }),
      initialState
    )
  }: {
    initialState?: { [TOASTER_SLICE]: IState };
    store?: any;
  } = {}
) => {
  return { ...render(<Provider store={store}>{ui}</Provider>) };
};

describe("Toaster", () => {
  afterEach(() => cleanup());
  it("renders messages", () => {
    const { container } = renderWithRedux(<Toaster />, {
      initialState: {
        [TOASTER_SLICE]: {
          messages: [{ time: 0, message: "blah", error: false }]
        }
      }
    });
    expect(container.firstChild).toMatchSnapshot();
  });
  it("removes messages on close", () => {
    const { getByTestId, queryByRole } = renderWithRedux(<Toaster />, {
      initialState: {
        [TOASTER_SLICE]: {
          messages: [{ time: 0, message: "blah", error: false }]
        }
      }
    });
    expect(queryByRole("alertdialog")).toBeDefined();
    fireEvent.click(getByTestId("close"));
    expect(queryByRole("alertdialog")).toBeNull();
  });
  it("removes messages after 3 seconds", () => {
    jest.useFakeTimers();
    const { queryByRole } = renderWithRedux(<Toaster />, {
      initialState: {
        [TOASTER_SLICE]: {
          messages: [{ time: Date.now(), message: "blah", error: false }]
        }
      }
    });
    expect(queryByRole("alertdialog")).toBeDefined();
    jest.runAllTimers();
    expect(queryByRole("alertdialog")).toBeNull();
  });
});

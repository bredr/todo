import { cleanup, fireEvent, render } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { CreateForm, validationSchema } from "./CreateForm";
import { CREATE_SLICE } from "./state/selectors";

const mockStore = configureStore([]);

describe("CreateForm", () => {
  afterEach(() => cleanup());
  it("renders", () => {
    const store = mockStore({ [CREATE_SLICE]: { isOpen: true } });
    const { container } = render(
      <Provider store={store}>
        <CreateForm />
      </Provider>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  describe("validationSchema", () => {
    [
      { test: {}, valid: false },
      { test: { description: "test", daystocomplete: 1 }, valid: true },
      { test: { description: "test", daystocomplete: -1 }, valid: false },
      {
        test: {
          description: "test",
          daystocomplete: 1,
          due: new Date(Date.now() + 2 * 24 * 3.6e6)
        },
        valid: true
      },
      {
        test: {
          description: "test",
          daystocomplete: 1,
          due: new Date(Date.now())
        },
        valid: false
      }
    ].forEach((t, i) =>
      test(i.toString(), async () => {
        await expect(validationSchema.isValid(t.test)).resolves.toEqual(
          t.valid
        );
      })
    );
  });
});

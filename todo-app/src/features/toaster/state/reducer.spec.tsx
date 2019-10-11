import { addError, addSuccess, clearMessage } from "./actions";
import reducer from "./reducer";

describe("reducer", () => {
  describe("addError", () => {
    it("adds error", () => {
      expect(reducer(undefined, addError("error"))).toEqual({
        messages: expect.arrayContaining([
          expect.objectContaining({
            error: true,
            message: "error"
          })
        ])
      });
    });
    it("adds error to front", () => {
      expect(
        reducer(
          { messages: [{ error: true, message: "old", time: 0 }] },
          addError("error")
        )
      ).toEqual({
        messages: [
          expect.objectContaining({
            error: true,
            message: "error"
          }),
          { error: true, message: "old", time: 0 }
        ]
      });
    });
  });
  describe("addSuccess", () => {
    it("adds success", () => {
      expect(reducer(undefined, addSuccess("blah"))).toEqual({
        messages: expect.arrayContaining([
          expect.objectContaining({
            error: false,
            message: "blah"
          })
        ])
      });
    });
    it("adds success to front", () => {
      expect(
        reducer(
          { messages: [{ error: true, message: "old", time: 0 }] },
          addSuccess("blah")
        )
      ).toEqual({
        messages: [
          expect.objectContaining({
            error: false,
            message: "blah"
          }),
          { error: true, message: "old", time: 0 }
        ]
      });
    });
  });
  describe("clearMessage", () => {
    it("clears most recent", () => {
      expect(
        reducer(
          {
            messages: [
              { error: true, message: "first", time: 0 },
              { error: true, message: "second", time: 0 }
            ]
          },
          clearMessage()
        )
      ).toEqual({ messages: [{ error: true, message: "second", time: 0 }] });
    });
    it("does nothing if no messages", () => {
      expect(reducer(undefined, clearMessage())).toEqual({ messages: [] });
    });
  });
});

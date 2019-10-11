import { close, open } from "./actions";
import reducer from "./reducer";

describe("reducer", () => {
  describe("open", () => {
    it("sets open to default", () => {
      expect(reducer(undefined, open())).toEqual({ isOpen: true });
    });
    it("makes no change to already open", () => {
      expect(reducer({ isOpen: true }, open())).toEqual({ isOpen: true });
    });
  });
  describe("close", () => {
    it("makes no change to default", () => {
      expect(reducer(undefined, close())).toEqual({ isOpen: false });
    });
    it("closes open", () => {
      expect(reducer({ isOpen: true }, close())).toEqual({ isOpen: false });
    });
  });
});

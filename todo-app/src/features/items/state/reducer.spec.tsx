import { Pagination } from "../../../proto/todo_pb";
import { Todo } from "../../../proto/todo_pb_service";
import { getItems, loadingItems, setItems } from "./actions";
import reducer from "./reducer";

describe("reducer", () => {
  describe("loadingItems", () => {
    it("sets loading to true", () => {
      expect(reducer(undefined, loadingItems())).toEqual(
        expect.objectContaining({
          loading: true
        })
      );
    });
  });
  describe("getItems", () => {
    it("resets state of items", () => {
      const init = {
        items: [],
        loading: true,
        total: 0,
        limit: 10,
        offset: 20
      };
      const request = new Pagination();
      request.setOffset(100);
      request.setLimit(42);
      const payload = {
        methodDescriptor: Todo.GetItems,
        request,
        onEnd: () => {
          return;
        }
      };
      expect(reducer(init, getItems(payload))).toEqual({
        items: [],
        loading: true,
        total: 0,
        limit: 42,
        offset: 100
      });
    });
  });
  describe("setItems", () => {
    it("sets initial items", () => {
      const payload = {
        limit: 1,
        offset: 0,
        total: 1,
        itemsList: [
          {
            id: "1",
            description: "test",
            due: { seconds: 1563220467, nanos: 0 },
            created: { seconds: 1563220467, nanos: 0 },
            hourstocomplete: 1
          }
        ]
      };
      expect(reducer(undefined, setItems(payload))).toEqual({
        loading: false,
        limit: 1,
        offset: 0,
        total: 1,
        items: [
          {
            id: "1",
            description: "test",
            due: { seconds: 1563220467, nanos: 0 },
            created: { seconds: 1563220467, nanos: 0 },
            hourstocomplete: 1
          }
        ]
      });
    });
    it("replaces old items", () => {
      const payload = {
        limit: 1,
        offset: 0,
        total: 1,
        itemsList: [
          {
            id: "1",
            description: "test",
            due: { seconds: 1563220467, nanos: 0 },
            created: { seconds: 1563220467, nanos: 0 },
            hourstocomplete: 1
          }
        ]
      };
      const init = {
        items: [],
        loading: true,
        total: 0,
        limit: 10,
        offset: 20
      };
      expect(reducer(init, setItems(payload))).toEqual({
        loading: false,
        limit: 1,
        offset: 0,
        total: 1,
        items: [
          {
            id: "1",
            description: "test",
            due: { seconds: 1563220467, nanos: 0 },
            created: { seconds: 1563220467, nanos: 0 },
            hourstocomplete: 1
          }
        ]
      });
    });
  });
});

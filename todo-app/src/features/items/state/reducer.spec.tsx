import { cancelEditItem, editItem, loadingItems, setItems } from "./actions";
import reducer from "./reducer";

describe("reducer", () => {
  describe("loadingItems", () => {
    it("sets loading to true", () => {
      expect(
        reducer(undefined, loadingItems({ limit: 10, offset: 0 }))
      ).toEqual(
        expect.objectContaining({
          loading: true
        })
      );
    });
  });
  describe("editItem", () => {
    it("sets item to edit", () => {
      expect(
        reducer(
          {
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
                daystocomplete: 1,
                edit: false
              }
            ]
          },
          editItem("1")
        )
      ).toEqual({
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
            daystocomplete: 1,
            edit: true
          }
        ]
      });
    });
  });
  describe("cancelEditItem", () => {
    it("unsets item to edit", () => {
      expect(
        reducer(
          {
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
                daystocomplete: 1,
                edit: true
              }
            ]
          },
          cancelEditItem("1")
        )
      ).toEqual({
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
            daystocomplete: 1,
            edit: false
          }
        ]
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
            daystocomplete: 1
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
            daystocomplete: 1,
            edit: false
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
            daystocomplete: 1
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
            daystocomplete: 1,
            edit: false
          }
        ]
      });
    });
  });
});

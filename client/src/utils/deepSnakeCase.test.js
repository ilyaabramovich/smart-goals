import { describe, expect, it } from "vitest";
import { deepSnakeCase } from "./deepSnakeCase";

describe("formatDate", () => {
  it("returns empty object when for null", () => {
    expect(deepSnakeCase(null)).toEqual({});
  });

  it("when non-object is passed return as it is", () => {
    expect(deepSnakeCase("test")).toEqual("test");
  });

  it("snake cases object keys", () => {
    expect(deepSnakeCase({ myKey: 0, another: 1 })).toEqual({
      my_key: 0,
      another: 1,
    });
  });

  it("when array of object is passed snake cases object keys", () => {
    expect(deepSnakeCase([{ myKey: 0 }, { fooBar: 1 }])).toEqual([
      {
        my_key: 0,
      },
      { foo_bar: 1 },
    ]);
  });

  it("in nested object snake cases object keys", () => {
    expect(
      deepSnakeCase({ myKey: 0, another: 1, oneMore: { heyThere: "me" } }),
    ).toEqual({ my_key: 0, another: 1, one_more: { hey_there: "me" } });
  });
});

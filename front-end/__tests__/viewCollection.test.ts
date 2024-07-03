import { describe, expect, test } from "@jest/globals";
const sum = (a: number, b: number) => {
  return a + b;
};

import collectionApi from "../lib/CollectionApi";
import { number } from "zod";
describe("sum module", () => {
  test("view collection", () => {
    return collectionApi.viewCollection().then((res) => {
      expect(res.data.data[0]).toHaveProperty("id");
    });
  });
});

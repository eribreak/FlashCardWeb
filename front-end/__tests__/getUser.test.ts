import { describe, expect, test } from "@jest/globals";

import adminApi from "../lib/AdminApi";
import { number } from "zod";
describe("sum module", () => {
  test("view collection", () => {
    return adminApi.getUserData().then((res) => {
      expect(res.data.data[0]).toHaveProperty("id");
    });
  });
});

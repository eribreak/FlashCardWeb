import { describe, expect, test } from "@jest/globals";

import classApi from "../lib/ClassApi";
import { number } from "zod";
describe("sum module", () => {
  test("view classs", () => {
    return classApi.viewStudyAt(9).then((res) => {
      expect(res.data.data).toHaveProperty([]);
    });
  });
});

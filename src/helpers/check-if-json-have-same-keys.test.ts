import { expect } from "vitest";
import { it, describe } from "vitest";
import { checkIfJsonHaveSameKeys } from "./check-if-json-have-same-keys";

describe("check if json have same keys", () => {
  describe("Check if json files have same keys", () => {
    it("should return false if any of the content is nullish", () => {
      const file1 = { name: "file1", content: null };
      const file2 = { name: "file2", content: undefined };
      const file3 = { name: "file3", content: { title: "hello" } };

      expect(checkIfJsonHaveSameKeys(file1, file1).res).toBe(false);
      expect(checkIfJsonHaveSameKeys(file1, file2).res).toBe(false);
      expect(checkIfJsonHaveSameKeys(file1, file3).res).toBe(false);
      expect(checkIfJsonHaveSameKeys(file3, file1).res).toBe(false);
    });
    it("should return false with the correct error message when the files don't have the same keys", () => {
      const file1 = {
        name: "file1",
        content: {
          title: "hello",
          body: "world",
        },
      };
      const file2 = {
        name: "file2",
        content: {
          title: "Hola",
        },
      };

      const res1 = checkIfJsonHaveSameKeys(file1, file2);
      expect(res1.res).toBe(false);
      expect(res1.error).toBe(`"body" key is not found in the file: file2`);

      const file3 = {
        name: "file3",
        content: {
          title: "hello",
        },
      };
      const file4 = {
        name: "file4",
        content: {
          title: "Hola",
          body: "Mundo",
        },
      };

      const res2 = checkIfJsonHaveSameKeys(file3, file4);
      expect(res2.res).toBe(false);
      expect(res2.error).toBe(`"body" key is not found in the file: file3`);
    });

    it("should return false when the key name is different", () => {
      const file1 = {
        name: "file1",
        content: {
          title: "hello",
          body: "world",
        },
      };
      const file2 = {
        name: "file2",
        content: {
          title: "Hola",
          bodi: "mundo",
        },
      };

      const res1 = checkIfJsonHaveSameKeys(file1, file2);
      expect(res1.res).toBe(false);
      expect(res1.error).toBe(`"body" key is not found in the file: file2`);
    });
  });

  describe("nested objects", () => {
    it("should return false with the correct error message when the files don't have the same keys", () => {
      const file1 = {
        name: "file1",
        content: {
          title: "hello",
          body: {
            part1: "wo",
            part2: "rld",
          },
        },
      };
      const file2 = {
        name: "file2",
        content: {
          title: "Hola",
          body: {
            part1: "wo",
          },
        },
      };

      const res1 = checkIfJsonHaveSameKeys(file1, file2);
      expect(res1.res).toBe(false);
      expect(res1.error).toBe(`"part2" key is not found in the file: file2`);
    });
    it("should return true when the objects have the same keys", () => {
      const file1 = {
        name: "file1",
        content: {
          title: "hello",
          body: {
            part1: "wo",
            part2: "rld",
          },
        },
      };
      const file2 = {
        name: "file2",
        content: {
          title: "Hola",
          body: {
            part1: "Mu",
            part2: "ndo",
          },
        },
      };

      const res1 = checkIfJsonHaveSameKeys(file1, file2);
      expect(res1.res).toBe(true);
      expect(res1.error).toBeUndefined();
    });
  });
});

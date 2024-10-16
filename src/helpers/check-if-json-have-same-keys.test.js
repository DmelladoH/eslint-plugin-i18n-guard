import { expect } from "vitest";
import { it, describe } from "vitest";
const {
  checkIfJsonHaveSameKeys,
} = require("./check-if-json-have-same-keys.js");

describe("checkIfJsonHaveSameKeys", () => {
  describe("Nullish content checks", () => {
    it("should return false if any of the content is null or undefined", () => {
      const file1 = { name: "file1", content: null };
      const file2 = { name: "file2", content: undefined };
      const file3 = { name: "file3", content: { title: "hello" } };

      expect(checkIfJsonHaveSameKeys(file1, file1).res).toBe(false);
      expect(checkIfJsonHaveSameKeys(file1, file2).res).toBe(false);
      expect(checkIfJsonHaveSameKeys(file1, file3).res).toBe(false);
      expect(checkIfJsonHaveSameKeys(file3, file1).res).toBe(false);
    });
  });
  describe("Flat object checks", () => {
    it("should tell the key that is missed and in which file", () => {
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
      expect(res1.wrongKeys).toStrictEqual([{ key: "body", file: "file2" }]);

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
      expect(res2.wrongKeys).toStrictEqual([{ key: "body", file: "file3" }]);
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
      expect(res1.wrongKeys).toStrictEqual([
        { key: "body", file: "file2" },
        { key: "bodi", file: "file1" },
      ]);
    });

    it("should handle multiple missing keys", () => {
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
          author: "unknown",
        },
      };

      const res = checkIfJsonHaveSameKeys(file1, file2);
      expect(res.res).toBe(false);
      expect(res.wrongKeys).toStrictEqual([
        { key: "body", file: "file2" },
        { key: "author", file: "file1" },
      ]);
    });

    it("should return true when the objects have the same keys", () => {
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
          body: "Mundo",
        },
      };

      const res = checkIfJsonHaveSameKeys(file1, file2);
      expect(res.res).toBe(true);
    });

    it("should return false when key names differ by a case sensitive typo", () => {
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
          Body: "Mundo", // Misspelled key
        },
      };

      const res = checkIfJsonHaveSameKeys(file1, file2);
      expect(res.res).toBe(false);
      expect(res.wrongKeys).toStrictEqual([
        { key: "body", file: "file2" },
        { key: "Body", file: "file1" },
      ]);
    });
  });

  describe("nested objects", () => {
    it("should return false when nested keys are missing", () => {
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
      expect(res1.wrongKeys).toStrictEqual([{ key: "part2", file: "file2" }]);
    });

    it("should handle deep nested objects with more levels", () => {
      const file1 = {
        name: "file1",
        content: {
          meta: {
            version: 1,
            details: {
              author: "John",
              tags: ["test", "json"],
            },
          },
        },
      };
      const file2 = {
        name: "file2",
        content: {
          meta: {
            version: 1,
            details: {
              author: "Jane",
            },
          },
        },
      };

      const res = checkIfJsonHaveSameKeys(file1, file2);
      expect(res.res).toBe(false);
      expect(res.wrongKeys).toStrictEqual([{ key: "tags", file: "file2" }]);
    });

    it("should handle multiple missing keys", () => {
      const file1 = {
        name: "file1",
        content: {
          meta: {
            version: 1,
            details: {
              author: "John",
              tags: ["test", "json"],
            },
          },
        },
      };
      const file2 = {
        name: "file2",
        content: {
          meta: {
            version: 1,
            main: "h",
            details: {
              author: "Jane",
              lastName: "Austin",
            },
          },
        },
      };

      const res = checkIfJsonHaveSameKeys(file1, file2);
      expect(res.res).toBe(false);
      expect(res.wrongKeys).toStrictEqual([
        { key: "tags", file: "file2" },
        { key: "lastName", file: "file1" },
        { key: "main", file: "file1" },
      ]);
    });

    it("should return false when a two keys have the same name but one is an object and the other one not", () => {
      const file1 = {
        name: "file1",
        content: {
          meta: {
            version: 1,
            details: "details",
          },
        },
      };
      const file2 = {
        name: "file2",
        content: {
          meta: {
            version: 1,
            details: {
              author: "Jane",
              tags: "js",
            },
          },
        },
      };
      const { res, wrongKeys } = checkIfJsonHaveSameKeys(file1, file2);
      expect(res).toBe(false);
      expect(wrongKeys).toStrictEqual([
        { key: "author", file: "file1" },
        { key: "tags", file: "file1" },
      ]);
    });

    it("should return true when nested objects have the same keys", () => {
      const file1 = {
        name: "file1",
        content: {
          meta: {
            version: 1,
            details: {
              author: "John",
              tags: "json",
            },
          },
        },
      };
      const file2 = {
        name: "file2",
        content: {
          meta: {
            version: 1,
            details: {
              author: "Jane",
              tags: "js",
            },
          },
        },
      };

      const res = checkIfJsonHaveSameKeys(file1, file2);
      expect(res.res).toBe(true);
    });
  });
});

import { describe, expect, it } from "vitest";
const {
  checkIfObjectsHaveSameStructureInOrder,
} = require("./check-if-json-have-same-structure-in-order.js");

describe("checkIfObjectsHaveSameStructureInOrder", () => {
  describe("Nullish content checks", () => {
    it("should return false if any of the content is null or undefined", () => {
      const file1 = { name: "file1", content: null };
      const file2 = { name: "file2", content: undefined };
      const file3 = { name: "file3", content: { title: "hello" } };

      expect(checkIfObjectsHaveSameStructureInOrder(file1, file1).res).toBe(
        false
      );
      expect(checkIfObjectsHaveSameStructureInOrder(file1, file2).res).toBe(
        false
      );
      expect(checkIfObjectsHaveSameStructureInOrder(file1, file3).res).toBe(
        false
      );
      expect(checkIfObjectsHaveSameStructureInOrder(file3, file1).res).toBe(
        false
      );
    });
  });
  it("should return true if the structure of both json is identical (in order)", () => {
    const file1 = {
      name: "file1",
      content: {
        title: "hello",
        body: {
          part1: "wo",
          part2: "rd",
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

    const { res } = checkIfObjectsHaveSameStructureInOrder(file1, file2);
    expect(res).toBe(true);
  });

  it("should tell which key is out of order", () => {
    const file1 = {
      name: "file1",
      content: {
        title: "hello",
        body: {
          part1: "wo",
          part2: "rd",
        },
      },
    };
    const file2 = {
      name: "file2",
      content: {
        title: "Hola",
        body: {
          part2: "ndo",
          part1: "Mu",
        },
      },
    };

    const { res, keysOutOfOrder } = checkIfObjectsHaveSameStructureInOrder(
      file1,
      file2
    );
    expect(res).toBe(false);
    expect(keysOutOfOrder).toStrictEqual(["part2", "part1"]);
  });

  it("should tell the first key that is out of order", () => {
    const file1 = {
      name: "file1",
      content: {
        title: "hello",
        body: {
          part1: "wo",
          part2: "rd",
        },
      },
    };
    const file2 = {
      name: "file2",
      content: {
        body: {
          part2: "ndo",
          part1: "Mu",
        },
        title: "Hola",
      },
    };

    const { res, keysOutOfOrder } = checkIfObjectsHaveSameStructureInOrder(
      file1,
      file2
    );
    expect(res).toBe(false);
    expect(keysOutOfOrder).toStrictEqual(["body", "title", "part2", "part1"]);
  });
});

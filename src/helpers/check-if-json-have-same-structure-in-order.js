function checkIfObjectsHaveSameStructureInOrder(obj1, obj2) {
  const { name: fileName1, content: content1 } = obj1;
  const { name: fileName2, content: content2 } = obj2;

  if (content1 == null || content2 == null)
    return { res: false, keysOutOfOrder: [] };
  if (typeof content1 !== "object" || typeof content2 !== "object")
    return { res: false, keysOutOfOrder: [] };

  const keys1 = Object.keys(content1);
  const keys2 = Object.keys(content2);

  const keysOutOfOrder = [];
  for (let i = 0; i < keys1.length; i++) {
    const key1 = content1[keys1[i]];
    const key2 = content2[keys2[i]];

    if (typeof key1 !== "object" && typeof key2 === "object") {
      keysOutOfOrder.push(keys2[i]);
    }
    if (typeof key2 !== "object" && typeof key1 === "object") {
      keysOutOfOrder.push(keys2[i]);
    }
    if (typeof key2 === "object" && typeof key1 === "object") {
      const newObj1 = { name: fileName1, content: key1 };
      const newObj2 = { name: fileName2, content: key2 };

      const { keysOutOfOrder: koo } = checkIfObjectsHaveSameStructureInOrder(
        newObj1,
        newObj2
      );

      const nestedKeysOutOfOrder = koo.length ? [...koo] : [];
      keysOutOfOrder.push(...nestedKeysOutOfOrder);
    }
    if (keys1[i] !== keys2[i]) {
      keysOutOfOrder.push(keys2[i]);
    }
  }

  if (keysOutOfOrder.length > 0) {
    return { res: false, keysOutOfOrder: Array.from(new Set(keysOutOfOrder)) };
  }

  return { res: true, keysOutOfOrder: [] };
}

module.exports = {
  checkIfObjectsHaveSameStructureInOrder,
};

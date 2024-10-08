export function objectsHaveSameStructureInOrder(
  obj1: jsonFile,
  obj2: jsonFile
) {
  const { name: fileName1, content: content1 } = obj1;
  const { name: fileName2, content: content2 } = obj2;

  if (content1 == null || content2 == null) return { res: false };
  if (typeof content1 !== "object" || typeof content2 !== "object")
    return { res: false };

  const keys1 = Object.keys(content1);
  const keys2 = Object.keys(content2);

  debugger;
  for (let i = 0; i < keys1.length; i++) {
    const key1 = content1[keys1[i]];
    const key2 = content2[keys2[i]];

    const errorFile = keys1.length >= keys2.length ? fileName2 : fileName1;

    if (typeof key1 !== "object" && typeof key2 === "object") {
      return {
        res: false,
        error: `"${keys2[i]}" key is not in order in the file: ${errorFile}`,
      };
    }
    if (typeof key2 !== "object" && typeof key1 === "object")
      return {
        res: false,
        error: `"${keys2[i]}" key is not in order in the file: ${errorFile}`,
      };

    if (typeof key2 === "object" && typeof key1 === "object") {
      const newObj1 = { name: fileName1, content: key1 };
      const newObj2 = { name: fileName2, content: key2 };

      return objectsHaveSameStructureInOrder(newObj1, newObj2);
    }

    if (keys1[i] !== keys2[i]) {
      const errorFile = keys1.length >= keys2.length ? fileName2 : fileName1;
      return {
        res: false,
        error: `"${keys2[i]}" key is not in order in the file: ${errorFile}`,
      };
    }
  }

  return { res: true };
}

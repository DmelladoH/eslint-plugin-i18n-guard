export function checkIfJsonHaveSameKeys(obj1: jsonFile, obj2: jsonFile) {
  const { name: fileName1, content: content1 } = obj1;
  const { name: fileName2, content: content2 } = obj2;

  if (content1 == null || content2 == null) return { res: false };
  if (typeof content1 !== "object" || typeof content2 !== "object")
    return { res: false };

  const keys1 = Object.keys(content1);
  const keys2 = Object.keys(content2);

  const keys = keys1.length >= keys2.length ? keys1 : keys2;
  const set = keys1.length >= keys2.length ? new Set(keys2) : new Set(keys1);

  for (const key of keys) {
    if (set.has(key)) {
      const bothAreObjects =
        typeof content2[key] === "object" && typeof content1[key] === "object";

      const newObj1 = { name: fileName1, content: content1[key] };
      const newObj2 = { name: fileName2, content: content2[key] };

      if (bothAreObjects) return checkIfJsonHaveSameKeys(newObj1, newObj2);
    } else {
      const errorFile = keys1.length >= keys2.length ? fileName2 : fileName1;
      return {
        res: false,
        error: `"${key}" key is not found in the file: ${errorFile}`,
      };
    }
  }

  return { res: true };
}

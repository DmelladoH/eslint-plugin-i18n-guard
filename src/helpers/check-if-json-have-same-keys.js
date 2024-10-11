function checkIfJsonHaveSameKeys(obj1, obj2) {
  const { name: fileName1, content: content1 } = obj1;
  const { name: fileName2, content: content2 } = obj2;

  if (content1 == null || content2 == null) return { res: false };
  if (typeof content1 !== "object" || typeof content2 !== "object")
    return { res: false };

  const keys1 = Object.keys(content1);
  const keys2 = Object.keys(content2);

  const keys = keys1.length >= keys2.length ? keys1 : keys2;
  const set = keys1.length >= keys2.length ? new Set(keys2) : new Set(keys1);
  const wrongKeys = [];

  for (const key of keys) {
    if (set.has(key)) {
      const bothAreObjects =
        typeof content2[key] === "object" && typeof content1[key] === "object";

      const newObj1 = { name: fileName1, content: content1[key] };
      const newObj2 = { name: fileName2, content: content2[key] };

      if (bothAreObjects) return checkIfJsonHaveSameKeys(newObj1, newObj2);
    } else {
      const errorFile = keys1.length >= keys2.length ? fileName2 : fileName1;
      wrongKeys.push({ key: key, file: errorFile });
    }
  }
  if (wrongKeys.length > 0) {
    return {
      res: false,
      wrongKeys: wrongKeys,
    };
  }
  return { res: true };
}

module.exports = {
  checkIfJsonHaveSameKeys,
};

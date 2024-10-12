function checkIfJsonHaveSameKeys(obj1, obj2) {
  const { name: fileName1, content: content1 } = obj1;
  const { name: fileName2, content: content2 } = obj2;

  if (content1 == null || content2 == null)
    return { res: false, wrongKeys: [] };
  if (typeof content1 !== "object" || typeof content2 !== "object")
    return { res: false, wrongKeys: [] };

  const keys1 = Object.keys(content1);
  const keys2 = Object.keys(content2);

  const set = new Set([...keys1, ...keys2]);
  const wrongKeys = [];

  for (const entry of set.entries()) {
    const key = entry[0];
    if (set.has(key)) {
      if (content1[key] == null && content2 != null) {
        wrongKeys.push({ key: key, file: fileName1 });
      }

      if (content2[key] == null && content1 != null) {
        wrongKeys.push({ key: key, file: fileName2 });
      }

      const bothAreObjects =
        typeof content2[key] === "object" && typeof content1[key] === "object";

      const newObj1 = { name: fileName1, content: content1[key] };
      const newObj2 = { name: fileName2, content: content2[key] };

      if (bothAreObjects) {
        const { wrongKeys: wk } = checkIfJsonHaveSameKeys(newObj1, newObj2);
        const wrongKeysNested = wk.length ? [...wk] : [];
        wrongKeys.push(...wrongKeysNested);
      }
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
  return { res: true, wrongKeys: [] };
}

module.exports = {
  checkIfJsonHaveSameKeys,
};

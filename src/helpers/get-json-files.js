const fs = require("fs");
const path = require("path");

function getJsonFiles(dir) {
  let files = [];
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    const stats = fs.lstatSync(fullPath);

    if (stats.isDirectory()) {
      files = files.concat(getJsonFiles(fullPath));
    } else if (file.endsWith(".json")) {
      files.push(fullPath);
    }
  });
  return files;
}

module.exports = {
  getJsonFiles,
};

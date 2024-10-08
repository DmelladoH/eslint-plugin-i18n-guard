import fs from "fs";
import path from "path";

export function getJsonFiles(dir: string) {
  let files: string[] = [];
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

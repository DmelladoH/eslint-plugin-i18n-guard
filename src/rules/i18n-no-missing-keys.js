const {
  checkIfJsonHaveSameKeys,
} = require("../helpers/check-if-json-have-same-keys.js");
const fs = require("fs");
const { getJsonFiles } = require("../helpers/get-json-files.js");
const path = require("path");

const meta = {
  type: "problem",
  docs: {
    description:
      "Ensure consistency across i18n translation files by reporting missing keys.",
    category: "Best Practices",
    recommended: true,
  },
  messages: {
    missingKeys: "",
    noDirectories:
      "No valid translation directories were found. Please make sure you passed valid directory paths containing JSON files.",
    noEntryPoint:
      "No entry point was found. Please make sure you passed an existan file.",
  },
  schema: [
    {
      type: "object",
      properties: {
        directories: {
          type: "array",
          items: { type: "string" },
          description:
            "Array of directory paths containing JSON files to compare for key consistency.",
        },
        entryPoint: {
          type: "string",
          description:
            "The entry point file of the application (e.g., 'main.tsx' or 'App.tsx'). ESLint errors will appear in this file.",
        },
      },
      additionalProperties: false,
    },
  ],
};

function create(context) {
  const fileName = context.getFilename();
  const entryPoint = context.options[0]?.entryPoint || "main.tsx";

  if (!entryPoint) {
    context.report({
      messageId: "noEntryPoint",
      loc: { line: 1, column: 0 },
    });
    return {};
  }

  if (!fileName.endsWith(entryPoint)) {
    return {};
  }

  const projectRoot = process.cwd();
  const directoriesInput = context.options[0]?.directories;

  if (!directoriesInput) {
    context.report({
      messageId: "noDirectories",
      loc: { line: 1, column: 0 },
    });
    return {};
  }

  const directories = directoriesInput.map(
    (dir) => path.resolve(projectRoot, dir) // Resolver la ruta desde la raíz del proyecto
  );

  const fileGroups = directories.map((dir) => {
    return getJsonFiles(dir);
  });

  fileGroups.forEach((fileGroup) => {
    const visited = {};

    fileGroup.map((file) => {
      const obj1 = {
        name: file,
        content: JSON.parse(fs.readFileSync(file, "utf8")),
      };

      visited[file]?.length
        ? visited[file].push(file)
        : (visited[file] = [file]);

      fileGroup.map((file2) => {
        if (!visited[file]?.includes(file2)) {
          visited[file2]?.length
            ? visited[file2].push(file)
            : (visited[file2] = [file]);

          const obj2 = {
            name: file2,
            content: JSON.parse(fs.readFileSync(file2, "utf8")),
          };

          const { res, wrongKeys } = checkIfJsonHaveSameKeys(obj1, obj2);
          if (!res) {
            wrongKeys.map(({ key, file }) => {
              context.report({
                message: `"${key}" is missing in file: ${file}`,
                loc: { line: 1, column: 0 },
              });
            });
          }
        }
      });
    });
  });

  return {};
}

module.exports = {
  name: "i18n-no-missing-keys",
  meta: meta,
  create(context) {
    return create(context);
  },
};

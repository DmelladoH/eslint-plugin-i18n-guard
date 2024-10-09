const {
  checkIfJsonHaveSameKeys,
} = require("../helpers/check-if-json-have-same-keys.js");
const fs = require("fs");
const { getJsonFiles } = require("../helpers/get-json-files.js");
const path = require("path");

module.exports = {
  name: "i18n-no-missing-keys",
  meta: {
    type: "problem",
    docs: {
      description: "i18n rule comparar traducciones",
      category: "Best Practices",
    },
    schema: [
      {
        type: "object",
        properties: {
          directories: { type: "array", items: { type: "string" } },
        },
        additionalProperties: false,
      },
    ],
  },
  create(context) {
    // console.log({ context });
    const fileName = context.getFilename();
    console.log({ fileName });

    // Apply the rule only to specific files (for example, 'main.tsx' and 'App.tsx')
    if (!fileName.endsWith("main.tsx")) {
      return {}; // Skip the rule if the file is not one of the entry points
    }
    const projectRoot = process.cwd();

    const directoriesInput = context.options[0]?.directories;
    console.log({ directoriesInput });

    if (!directoriesInput) {
      context.report({
        message: "No hay directorios",
        loc: { line: 1, column: 0 },
      });
      return {};
    }

    const directories = directoriesInput.map(
      (dir) => path.resolve(projectRoot, dir) // Resolver la ruta desde la raíz del proyecto
    );

    console.log({ directories });

    const fileGroups = directories.map((dir) => {
      return getJsonFiles(dir);
    });

    fileGroups.forEach((fileGroup) => {
      const firstFile = fileGroup[0];
      console.log({ fileGroup });

      fileGroup.slice(1).forEach((file) => {
        try {
          console.log({ file });
          const obj1 = {
            name: firstFile,
            content: JSON.parse(fs.readFileSync(firstFile, "utf8")),
          };
          const obj2 = {
            name: firstFile,
            content: JSON.parse(fs.readFileSync(file, "utf8")),
          };

          const { res, error } = checkIfJsonHaveSameKeys(obj1, obj2);
          if (!res) {
            context.report({
              message: `Translation error: ${error}`,
              loc: { line: 1, column: 0 },
              fileName: file,
            });
          }
        } catch (e) {
          console.log({ e });
        }
      });
    });

    return {};
  },
};

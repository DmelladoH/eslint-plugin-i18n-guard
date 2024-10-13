# eslint-plugin-i18n-guard

ESLint plugin designed to help ensure that every key in your JSON i18n translation files has a corresponding translation. This can help avoid missing translations and ensure consistency across languages.

## Installation

```BASH
npm install eslint-plugin-i18n-guard --save-dev
```

```BASH
pnpm install eslint-plugin-i18n-guard --save-dev
```

```BASH
yarn add eslint eslint-plugin-i18n-guard --dev

```

## Usage

In your ESLint configuration (.eslintrc.json, .eslintrc.js), add the plugin and configure the rules:

```JavaScript
import i18nGuard from "eslint-plugin-i18n-guard";

const i18nOptions = {
    "directories": ["src/translations"],
    "entryPoint": "src/App.tsx"
}

```

```JavaScript
export default eslint.config(
    //.....

    plugins: {
      "i18n-guard": i18nGuard,
    },
    rules: {
        "i18n-guard/i18n-no-missing-keys": [
            "error",
            i18nOptions
        ],
        "i18n-guard/i18n-consistent-json": [
            "warn",
            i18nOptions
        ]
    }
)


```

## Rules

### i18n-no-missing-keys

This rule ensures that all translation files have the same keys. If any key is missing in one or more files, an error will be reported.

This will prevent not translated texts across our application.

#### Example

```JSON
// translations/en.json
{
  "welcome": "Welcome",
  "logout": "Log out"
}

// translations/fr.json
{
  "welcome": "Bienvenue"
}
```

```BASH
"logout" is missing in file: translations/fr.json
```

### i18n-consistent-json-files.js

This rule checks that the order of the keys is the same across all translation files. It warns if the key order is inconsistent.

#### Example

```Json
// translations/en.json
{
  "welcome": "Welcome",
  "logout": "Log out"
}

// translations/fr.json
{
  "logout": "Se déconnecter",
  "welcome": "Bienvenue"
}
```

```BASH
"welcome" is not consistent in files: translations/en.json, translations/fr.json
```

### Options

Both rules accept the following options:

- **directories**: An array of directory paths containing the i18n JSON files that should be checked for consistency.
- **entryPoint**: The entry point file of your application (e.g., main.tsx, App.tsx). The ESLint error or warning messages will appear in this file.

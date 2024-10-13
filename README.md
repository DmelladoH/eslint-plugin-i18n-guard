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
const i18nOptions = {
    "directories": ["src/translations"],
    "entryPoint": "src/App.tsx"
}

```

```JavaScript
{
    "rules": {
        "i18n-consistency/i18n-no-missing-keys": [
            "error",
            i18nOptions
        ],
        "i18n-consistency/i18n-consistent-json": [
            "warn",
            i18nOptions
        ]
    }
}

```

## Rules

### i18n-no-missing-keys

This rule ensures that all translation files have the same keys. If any key is missing in one or more files, an error will be reported.

This will prevent not translated texts across our application.

#### Example

### i18n-consistent-json-files.js

### Options

## Configuration

/** @type {import('prettier').Config} */
export default {
  // Maximum line length
  printWidth: 80,

  // Number of spaces per indentation level
  tabWidth: 2,

  // Use tabs instead of spaces
  useTabs: false,

  // Use semicolons
  semi: true,

  // Use single quotes
  singleQuote: true,

  // Object and array trailing commas
  trailingComma: "es5",

  // Spaces around brackets
  bracketSpacing: true,

  // Put > of jsx elements on the last line
  bracketSameLine: true,

  // Include parentheses around a sole arrow function parameter
  arrowParens: "always",

  // Line endings
  endOfLine: "lf",

  // Enforce single attribute per line in HTML, Vue and JSX
  singleAttributePerLine: false,

  // Quote props in objects only when needed
  quoteProps: "as-needed",

  // JSX quotes
  jsxSingleQuote: true,

  // Preserve prose wrapping
  proseWrap: "preserve",

  // HTML whitespace sensitivity
  htmlWhitespaceSensitivity: "strict",

  // Require pragma at the top of files to format them
  requirePragma: false,

  // Insert pragma at the top of formatted files
  insertPragma: false,

  // Markdown line wrapping
  embeddedLanguageFormatting: "auto",

  // Plugins
  plugins: ["prettier-plugin-tailwindcss"],

  // Override configs for specific file patterns
  overrides: [
    {
      files: "*.json",
      options: {
        parser: "json",
      },
    },
    {
      files: "*.md",
      options: {
        parser: "markdown",
      },
    },
  ],
};

export const schema = {
  $schema: "https://json-schema.org/draft/2019-09/schema",
  type: "object",
  required: ["lang", "editor", "input", "output"],
  properties: {
    lang: { type: "string" },
    editor: { type: "string" },
    input: { type: "string" },
    output: { type: "string" },
  },
}

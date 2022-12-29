import { DiagnosticSeverity } from "@stoplight/types";
import testRule from "./__helpers__/helper";

testRule("paths-kebab-case", [
  {
    name: "valid case",
    document: {
      openapi: "3.1.0",
      info: { version: "1.0" },
      paths: { "/this-is-kebab-case": {} },
    },
    errors: [],
  },

  {
    name: "invalid case",
    document: {
      openapi: "3.1.0",
      info: { version: "1.0" },
      paths: { "/this_is_snake_case": {} },
    },
    errors: [
      {
        message:
          "/this_is_snake_case should be kebab-case (lower case and separated with hyphens).",
        path: ["paths", "/this_is_snake_case"],
        severity: DiagnosticSeverity.Warning,
      },
    ],
  },
]);

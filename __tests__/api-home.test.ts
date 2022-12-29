import { DiagnosticSeverity } from "@stoplight/types";
import testRule from "./__helpers__/helper";

testRule("api-home", [
  {
    name: "valid case",
    document: {
      openapi: "3.1.0",
      info: { version: "1.0" },
      paths: { "/": {} },
    },
    errors: [],
  },

  {
    name: "invalid case",
    document: {
      openapi: "3.1.0",
      info: { version: "1.0" },
      paths: {},
    },
    errors: [
      {
        message: "APIs MUST have a root path (`/`) defined.",
        path: ["paths"],
        severity: DiagnosticSeverity.Warning,
      },
    ],
  },
]);

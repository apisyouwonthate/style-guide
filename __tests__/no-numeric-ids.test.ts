import { DiagnosticSeverity } from "@stoplight/types";
import testRule from "./__helpers__/helper";

testRule("no-numeric-ids", [
  {
    name: "valid case",
    document: {
      openapi: "3.1.0",
      info: { version: "1.0" },
      paths: {
        "/foo/{id}": {
          get: {
            description: "get",
            parameters: [
              {
                name: "id",
                in: "path",
                required: true,
                schema: {
                  type: "string",
                  format: "uuid",
                },
              },
            ],
          },
        },
      },
    },
    errors: [],
  },

  {
    name: "invalid if its an integer",
    document: {
      openapi: "3.1.0",
      info: { version: "1.0" },
      paths: {
        "/foo/{id}": {
          get: {
            description: "get",
            parameters: [
              {
                name: "id",
                in: "path",
                required: true,
                schema: {
                  type: "integer",
                  format: "int32",
                },
              },
            ],
          },
        },
      },
    },
    errors: [
      {
        message:
          "Please avoid exposing IDs as an integer, UUIDs are preferred.",
        path: ["paths", "/foo/{id}", "get", "parameters", "0", "schema"],
        severity: DiagnosticSeverity.Error,
      },
    ],
  },
]);

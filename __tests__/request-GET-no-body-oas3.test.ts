import { DiagnosticSeverity } from "@stoplight/types";
import testRule from "./__helpers__/helper";

testRule("request-GET-no-body-oas3", [
  {
    name: "valid case",
    document: {
      openapi: "3.1.0",
      info: { version: "1.0" },
      paths: {
        "/": {
          get: {},
        },
      },
    },
    errors: [],
  },

  {
    name: "invalid case",
    document: {
      openapi: "3.1.0",
      info: { version: "1.0" },
      paths: {
        "/": {
          get: {
            requestBody: {
              description: "Get is a question but this looks like an answer",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                  },
                },
              },
            },
          },
        },
      },
    },
    errors: [
      {
        message: "A `GET` request MUST NOT accept a request body.",
        path: ["paths", "/", "get", "requestBody"],
        severity: DiagnosticSeverity.Error,
      },
    ],
  },
]);

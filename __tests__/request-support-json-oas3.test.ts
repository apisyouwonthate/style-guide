import { DiagnosticSeverity } from "@stoplight/types";
import testRule from "./__helpers__/helper";

testRule("request-support-json-oas3", [
  {
    name: "valid case",
    document: {
      openapi: "3.1.0",
      info: { version: "1.0" },
      paths: {
        "/": {
          get: {
            requestBody: {
              description: "JSON and CSV? How courteous of you!",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                  },
                },
                "text/csv": {
                  schema: {
                    type: "string",
                  },
                },
              },
            },
          },
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
              description:
                "only csv is going to annoy folks who want to use JSON so this is invalid",
              content: {
                "text/csv": {
                  schema: {
                    type: "string",
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
        message:
          "Every request SHOULD support at least one `application/json` content type.",
        path: ["paths", "/", "get", "requestBody", "content"],
        severity: DiagnosticSeverity.Warning,
      },
    ],
  },
]);

import { DiagnosticSeverity } from "@stoplight/types";
import testRule from "./__helpers__/helper";

const template = (contentType: string) => {
  return {
    openapi: "3.1.0",
    info: { version: "1.0", contact: {} },
    paths: {
      "/unknown-error": {
        get: {
          summary: "Your GET endpoint",
          responses: {
            "400": {
              description: "Error",
              content: {
                [contentType]: {},
              },
            },
          },
        },
      },
    },
  };
};

testRule("no-unknown-error-format", [
  {
    name: "valid error format (JSON:API)",
    document: template("application/vnd.api+json"),
    errors: [],
  },

  {
    name: "valid error format (RFC 7807, XML)",
    document: template("application/problem+xml"),
    errors: [],
  },

  {
    name: "valid error format (RFC 7807, JSON)",
    document: template("application/problem+json"),
    errors: [],
  },

  {
    name: "invalid error format (plain JSON)",
    document: template("application/json"),
    errors: [
      {
        message: "Error response should use a standard error format.",
        path: [
          "paths",
          "/unknown-error",
          "get",
          "responses",
          "400",
          "content",
          "application/json",
        ],
        severity: DiagnosticSeverity.Warning,
      },
    ],
  },
]);

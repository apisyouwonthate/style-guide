import { DiagnosticSeverity } from "@stoplight/types";
import testRule from "./__helpers__/helper";

testRule("no-http-basic", [
  {
    name: "valid case",
    document: {
      openapi: "3.1.0",
      info: { version: "1.0" },
      components: {
        securitySchemes: {
          "anything-else": {
            type: "http",
            scheme: "bearer",
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
      components: {
        securitySchemes: {
          "please-hack-me": {
            type: "http",
            scheme: "basic",
          },
        },
      },
    },
    errors: [
      {
        message: "Please consider a more secure alternative to HTTP Basic.",
        path: ["components", "securitySchemes", "please-hack-me", "scheme"],
        severity: DiagnosticSeverity.Error,
      },
    ],
  },
]);

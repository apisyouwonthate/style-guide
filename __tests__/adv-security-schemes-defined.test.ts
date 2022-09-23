import { DiagnosticSeverity } from "@stoplight/types";
import testRule from "./__helpers__/helper";

testRule("adv-security-schemes-defined", [
  {
    name: "valid case",
    document: {
      openapi: "3.1.0",
      info: { version: "1.0" },
      components: {
        securitySchemes: {
          "oAuth2": {
            type: "oauth2",
            flow: {},
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
      components: {},
    },
    errors: [
      {
        message: "This API definition does not have any security scheme defined.",
        path: ["components"],
        severity: DiagnosticSeverity.Error,
      },
    ],
  },
]);

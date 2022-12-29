import { DiagnosticSeverity } from "@stoplight/types";
import testRule from "./__helpers__/helper";

testRule("no-x-headers", [
  {
    name: "valid case",
    document: {
      openapi: "3.1.0",
      info: { version: "1.0" },
      paths: {
        "/foo": {
          get: {
            parameters: [
              {
                name: "RateLimit-Limit",
                in: "header",
                description:
                  "standards are cool: https://www.ietf.org/archive/id/draft-polli-ratelimit-headers-02.html#name-ratelimit-limit",
                required: true,
                schema: {
                  type: "string",
                  examples: ["100, 100;w=10"],
                },
              },
            ],
            responses: {
              "200": {
                description: "ok",
                headers: {
                  "X-Doesnt-Matter": {
                    description:
                      "Because OAS has two totally different ways of doing headers for request or response, this will be picked up by another rule.",
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
    },
    errors: [],
  },

  {
    name: "invalid case",
    document: {
      openapi: "3.1.0",
      info: { version: "1.0" },
      paths: {
        "/foo": {
          get: {
            description: "get",
            parameters: [
              {
                name: "X-Rate-Limit",
                in: "header",
                description: "calls per hour allowed by the user",
                required: true,
                schema: {
                  type: "integer",
                  format: "int32",
                },
              },
            ],
            responses: {
              "200": {
                description: "ok",
                headers: {
                  "X-Doesnt-Matter": {
                    description:
                      "Because OAS has two totally different ways of doing headers for request or response, this will be picked up by another rule.",
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
    },
    errors: [
      {
        message: 'Header `name` should not start with "X-".',
        path: ["paths", "/foo", "get", "parameters", "0", "name"],
        severity: DiagnosticSeverity.Error,
      },
    ],
  },
]);

import { DiagnosticSeverity } from "@stoplight/types";
import testRule from "./__helpers__/helper";

testRule("no-x-response-headers", [
  {
    name: "valid case",
    document: {
      openapi: "3.1.0",
      info: { version: "1.0", contact: {} },
      paths: {
        "/foo": {
          get: {
            parameters: [
              {
                name: "X-Doesnt-Matter",
                in: "header",
                description:
                  "Because OAS has two totally different ways of doing headers for request or response, this will be picked up by another rule.",
                required: true,
                schema: {
                  type: "string",
                },
              },
            ],
            responses: {
              "200": {
                description: "ok",
                headers: {
                  "Retry-After": {
                    description:
                      "How long the user agent should wait before making a follow-up request.",
                    schema: {
                      oneOf: [
                        {
                          type: "string",
                          format: "date-time",
                          examples: ["Wed, 21 Oct 2015 07:28:00 GMT"],
                        },
                        {
                          type: "integer",
                          examples: [60],
                        },
                      ],
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
      info: { version: "1.0", contact: {} },
      paths: {
        "/foo": {
          get: {
            parameters: [
              {
                name: "X-Doesnt-Matter",
                in: "header",
                description:
                  "Because OAS has two totally different ways of doing headers for request or response, this will be picked up by another rule.",
                required: true,
                schema: {
                  type: "string",
                },
              },
            ],
            responses: {
              "200": {
                description: "ok",
                headers: {
                  "X-Expires-After": {
                    description:
                      "Some custom made header that could will confuse everyone and probably has a standard HTTP header already.",
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
        message: 'Header `X-Expires-After` should not start with "X-".',
        path: [
          "paths",
          "/foo",
          "get",
          "responses",
          "200",
          "headers",
          "X-Expires-After",
        ],
        severity: DiagnosticSeverity.Error,
      },
    ],
  },
]);

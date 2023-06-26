/*
 * These rules dictate actual content of the API: headers, URL conventions, and general
 * Good Ideas™ for HTTP APIs, mainly from the books/blogs on apisyouwonthate.com
 */

import {
  enumeration,
  truthy,
  undefined as undefinedFunc,
  pattern,
  schema,
} from "@stoplight/spectral-functions";
import { oas2, oas3 } from "@stoplight/spectral-formats";
import { DiagnosticSeverity } from "@stoplight/types";

export default {
  rules: {
    // Author: Phil Sturgeon (https://github.com/philsturgeon)
    "api-home": {
      message: "APIs MUST have a root path (`/`) defined.",
      description:
        "Good documentation is always welcome, but API consumers should be able to get a pretty long way through interaction with the API alone. They should at least know they're looking at the right place instead of getting a 404 or random 500 error as is common in some APIs.\n\nThere are various efforts around to standardize the home document, but the best is probably this one: https://webconcepts.info/specs/IETF/I-D/nottingham-json-home",
      given: "$.paths",
      then: {
        field: "/",
        function: truthy,
      },
      severity: DiagnosticSeverity.Warning,
    },

    // Author: Phil Sturgeon (https://github.com/philsturgeon)
    "api-home-get": {
      message: "APIs root path (`/`) MUST have a GET operation.",
      description:
        "Good documentation is always welcome, but API consumers should be able to get a pretty long way through interaction with the API alone. They should at least know they're looking at the right place instead of getting a 404 or random 500 error as is common in some APIs.\n\nThere are various efforts around to standardize the home document, but the best is probably this one: https://webconcepts.info/specs/IETF/I-D/nottingham-json-home",
      given: "$.paths[/]",
      then: {
        field: "get",
        function: truthy,
      },
      severity: DiagnosticSeverity.Warning,
    },

    // Author: Phil Sturgeon (https://github.com/philsturgeon)
    "api-health": {
      message: "APIs MUST have a health path (`/health`) defined.",
      description:
        "Creating a `/health` endpoint is a simple solution for pull-based monitoring and manually checking the status of an API. To learn more about health check endpoints see https://apisyouwonthate.com/blog/health-checks-with-kubernetes.",
      given: "$.paths",
      then: {
        field: "/health",
        function: truthy,
      },
      severity: DiagnosticSeverity.Warning,
    },

    // Author: Phil Sturgeon (https://github.com/philsturgeon)
    "api-health-format": {
      message:
        "Health path (`/health`) SHOULD support Health Check Response Format",
      description:
        "Use existing standards (and draft standards) wherever possible, like the draft standard for health checks: https://datatracker.ietf.org/doc/html/draft-inadarei-api-health-check. To learn more about health check endpoints see https://apisyouwonthate.com/blog/health-checks-with-kubernetes.",
      formats: [oas3],
      given: "$.paths[/health]..responses[*].content.*~",
      then: {
        function: enumeration,
        functionOptions: {
          values: ["application/health+json"],
        },
      },
      severity: DiagnosticSeverity.Warning,
    },

    // Author: Phil Sturgeon (https://github.com/philsturgeon)
    "paths-kebab-case": {
      message:
        "{{property}} should be kebab-case (lower case and separated with hyphens).",
      description:
        "Naming conventions don't particular matter, and picking something consistent is the most important thing. So let's pick kebab-case for paths, because... well it's nice and why not.",
      given: "$.paths[*]~",
      then: {
        function: pattern,
        functionOptions: {
          match: "^(/|[a-z0-9-.]+|{[a-zA-Z0-9_]+})+$",
        },
      },
      severity: DiagnosticSeverity.Warning,
    },

    // Author: Phil Sturgeon (https://github.com/philsturgeon)
    "no-numeric-ids": {
      message: "Please avoid exposing IDs as an integer, UUIDs are preferred.",
      description:
        "Using auto-incrementing IDs in your API means people can download your entire database with a for() loop, whether its public or protected. Using UUID, ULID, snowflake, etc. can help to avoid this, or at least slow them down, depending on how you have your API set up.\n\nThis is recommended by the OWASP API Security Project. https://github.com/OWASP/API-Security/blob/master/2019/en/src/0xa1-broken-object-level-authorization.md.\n\nLearn more about this over here. https://phil.tech/2015/auto-incrementing-to-destruction/",
      given:
        '$.paths..parameters[*][?(@property === "name" && (@ === "id" || @.match(/(_id|Id|-id)$/)))]^.schema',
      then: {
        function: schema,
        functionOptions: {
          schema: {
            type: "object",
            not: {
              properties: {
                type: {
                  const: "integer",
                },
              },
            },
            properties: {
              format: {
                const: "uuid",
              },
            },
          },
        },
      },
      severity: DiagnosticSeverity.Error,
    },

    // Author: Phil Sturgeon (https://github.com/philsturgeon)
    "no-http-basic": {
      message: "Please consider a more secure alternative to HTTP Basic.",
      description:
        "HTTP Basic is an inherently insecure way to pass credentials to the API. They're placed in the URL in base64 which can be decrypted easily. Even if you're using a token, there are far better ways to handle passing tokens to an API which are less likely to leak.\n\nSee OWASP advice. https://github.com/OWASP/API-Security/blob/master/2019/en/src/0xa2-broken-user-authentication.md",
      given: "$.components.securitySchemes[*]",
      then: {
        field: "scheme",
        function: pattern,
        functionOptions: {
          notMatch: "basic",
        },
      },
      severity: DiagnosticSeverity.Error,
    },

    // Author: Phil Sturgeon (https://github.com/philsturgeon)
    "no-x-headers": {
      message: 'Header `{{property}}` should not start with "X-".',
      description:
        "Headers starting with X- is an awkward convention which is entirely unnecessary. There is probably a standard for what you're trying to do, so it would be better to use that. If there is not a standard already perhaps there's a draft that you could help mature through use and feedback.\n\nSee what you can find on https://standards.rest.\n\nMore about X- headers here: https://tools.ietf.org/html/rfc6648.",
      given: "$..parameters[?(@.in === 'header')].name",
      then: {
        function: pattern,
        functionOptions: {
          notMatch: "^(x|X)-",
        },
      },
      severity: DiagnosticSeverity.Error,
    },

    // Author: Phil Sturgeon (https://github.com/philsturgeon)
    "no-x-response-headers": {
      message: 'Header `{{property}}` should not start with "X-".',
      description:
        "Headers starting with X- is an awkward convention which is entirely unnecessary. There is probably a standard for what you're trying to do, so it would be better to use that. If there is not a standard already perhaps there's a draft that you could help mature through use and feedback.\n\nSee what you can find on https://standards.rest.\n\nMore about X- headers here: https://tools.ietf.org/html/rfc6648.",
      given: "$..headers.*~",
      then: {
        function: pattern,
        functionOptions: {
          notMatch: "^(x|X)-",
        },
      },
      severity: DiagnosticSeverity.Error,
    },

    // Author: Andrzej (https://github.com/jerzyn)
    "request-GET-no-body-oas2": {
      message: "A `GET` request MUST NOT accept a request body.",
      description:
        "Defining a request body on a HTTP GET is technically possible in some implementations, but is increasingly frowned upon due to the confusion that comes from unspecified behavior in the HTTP specification.",
      given: "$.paths..get.parameters..in",
      then: {
        function: pattern,
        functionOptions: {
          notMatch: "/^body$/",
        },
      },
      severity: DiagnosticSeverity.Error,
      formats: [oas2],
    },

    // Author: Andrzej (https://github.com/jerzyn)
    "request-GET-no-body-oas3": {
      message: "A `GET` request MUST NOT accept a request body.",
      description:
        "Defining a request body on a HTTP GET is in some implementations, but is increasingly frowned upon due to the confusion that comes from unspecified behavior in the HTTP specification.",
      given: "$.paths..get.requestBody",
      then: {
        function: undefinedFunc,
      },
      formats: [oas3],
      severity: DiagnosticSeverity.Error,
    },

    // Author: Andrzej (https://github.com/jerzyn)
    "hosts-https-only-oas2": {
      message: "Schemes MUST be https and no other protocol is allowed.",
      description:
        "Using http in production is reckless, advised against by OWASP API Security, and generally unnecessary thanks to free SSL on loads of hosts, gateways like Cloudflare, and OSS tools like Lets Encrypt.",
      given: "$.schemes",
      then: {
        function: schema,
        functionOptions: {
          schema: {
            type: "array",
            items: {
              type: "string",
              const: "https",
            },
          },
        },
      },
      severity: DiagnosticSeverity.Error,
      formats: [oas2],
    },

    // Author: Andrzej (https://github.com/jerzyn)
    "hosts-https-only-oas3": {
      message: "Servers MUST be https and no other protocol is allowed.",
      description:
        "Using http in production is reckless, advised against by OWASP API Security, and generally unnecessary thanks to free SSL on loads of hosts, gateways like Cloudflare, and OSS tools like Lets Encrypt.",
      given: "$.servers..url",
      then: {
        function: pattern,
        functionOptions: {
          match: "/^https:/",
        },
      },
      formats: [oas3],
      severity: DiagnosticSeverity.Error,
    },

    // Author: Andrzej (https://github.com/jerzyn)
    "request-support-json-oas3": {
      message:
        "Every request SHOULD support at least one `application/json` content type.",
      description:
        "Maybe you've got an XML heavy API or you're using a special binary format like BSON or CSON. That's lovely, but supporting JSON too is going to help a lot of people avoid a lot of confusion, and probably make you more money than you spend on supporting it.",
      given: "$.paths[*][*].requestBody.content",
      then: {
        function: schema,
        functionOptions: {
          schema: {
            type: "object",
            properties: {
              "application/json": true,
            },
            required: ["application/json"],
          },
        },
      },
      formats: [oas3],
      severity: DiagnosticSeverity.Warning,
    },

    // Author: Phil Sturgeon (https://github.com/philsturgeon)
    "no-unknown-error-format": {
      message: "Error response should use a standard error format.",
      description:
        "Error responses can be unique snowflakes, different to every API, but standards exist to make them consistent, which reduces surprises and increase interoperability. Please use either RFC 7807 (https://tools.ietf.org/html/rfc7807) or the JSON:API Error format (https://jsonapi.org/format/#error-objects).",
      given: "$.paths[*]..responses[?(@property.match(/^(4|5)/))].content.*~",
      then: {
        function: enumeration,
        functionOptions: {
          values: [
            "application/vnd.api+json",
            "application/problem+json",
            "application/problem+xml",
          ],
        },
      },
      formats: [oas3],
      severity: DiagnosticSeverity.Warning,
    },

    // Author: Nauman Ali (https://github.com/naumanali-stoplight)
    "no-global-versioning": {
      message: "Server URL should not contain global versions.",
      description:
        "Using global versions just forces all your clients to do a lot more work for each upgrade. Please consider using API Evolution instead.\n\nMore: https://apisyouwonthate.com/blog/api-evolution-for-rest-http-apis.",
      given: "$.servers[*].url",
      then: {
        function: pattern,
        functionOptions: {
          notMatch: "/v[1-9]+",
        },
      },
      formats: [oas3],
      severity: DiagnosticSeverity.Warning,
    },

    // Author: Advanced API & Integrations Team (https://www.oneadvanced.com/)
    "no-file-extensions-in-paths": {
      message:
        "Paths must not include file extensions such as .json, .xml, .html and .txt.",
      description:
        "Paths must not include file extensions such as `.json`, `.xml`, `.html` and `.txt`. Use the OpenAPI `content` keyword to tell consumers which Media Types are available.",
      given: "$.paths[*]~",
      then: {
        function: pattern,
        functionOptions: {
          notMatch: ".(json|xml|html|txt)$",
        },
      },
      severity: DiagnosticSeverity.Error,
    },

    // Author: Advanced API & Integrations Team (https://www.oneadvanced.com/)
    "no-security-schemes-defined": {
      message: "All APIs MUST have a security scheme defined.",
      description:
        "This API definition does not have any security scheme defined, which means the entire API is open to the public. That's probably not what you want, even if all the data is read-only. Setting lower rate limits for the public and letting known consumers use more resources is a handy path to monetization, and helps know who your power users are when changes need feedback or migration, even if not just good practice.",
      given: "$..components",
      then: {
        field: "securitySchemes",
        function: truthy,
      },
      formats: [oas3],
      severity: DiagnosticSeverity.Error,
    },
  },
};

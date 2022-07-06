// These rules dictate actual content of the API: headers, URL conventions, and general 
// Good Ideas™ for HTTP APIs, mainly from the books/blogs on apisyouwonthate.com

import { enumeration, truthy, falsy, undefined as undefinedFunc, pattern, schema } from "@stoplight/spectral-functions";
import { oas2, oas3 } from "@stoplight/spectral-formats";

// TODO Make sure every post/put/delete/patch endpoint has some sort of security (OAuth 2, API Key, but not both)
// TODO Mime type should have "; charset=utf-8"
// TODO No "(e/E)rror" in 2xx

// https://apistylebook.stoplight.io/docs/url-guidelines
// paths-no-file-extensions

export default {
  rules: {

    // Author: Phil Sturgeon (https://github.com/philsturgeon)
    'api-home': {
      description: 'APIs MUST have a root path (`/`) defined.',
      message: 'Stop forcing all API consumers to visit documentation for basic interactions when the API could do that itself.',
      given: "$.paths",
      then: {
        field: "/",
        function: truthy,
      },
      severity: 'warn',
    },

    // Author: Phil Sturgeon (https://github.com/philsturgeon)
    'api-home-get': {
      description: 'APIs root path (`/`) MUST have a GET operation.',
      message: "Otherwise people won't know how to get it.",
      given: "$.paths[/]",
      then: {
        field: "get",
        function: truthy,
      },
      severity: 'warn',
    },

    // Author: Phil Sturgeon (https://github.com/philsturgeon)
    'api-health': {
      description: 'APIs MUST have a health path (`/health`) defined.',
      message: 'Creating a `/health` endpoint is a simple solution for pull-based monitoring and manually checking the status of an API.',
      severity: 'warning',
      given: "$.paths",
      then: {
        field: "/health",
        function: truthy,
      }
    },

    // Author: Phil Sturgeon (https://github.com/philsturgeon)
    'api-health-format': {
      description: 'Health path (`/heath`) SHOULD support Health Check Response Format',
      message: 'Use existing standards (and draft standards) wherever possible, like the draft standard for health checks: https://datatracker.ietf.org/doc/html/draft-inadarei-api-health-check',
      formats: [oas3],
      severity: 'warn',
      given: "$.paths.[/health].responses[*].content.*~",
      then: {
        function: enumeration,
        functionOptions: {
          values: [
            "application/vnd.health+json"
          ]
        }
      }
    },

    // Author: Phil Sturgeon (https://github.com/philsturgeon)
    'paths-kebab-case': {
      description: 'Should paths be kebab-case.',
      message: '{{property}} should be kebab-case (lower case and separated with hyphens)',
      severity: 'warn',
      given: "$.paths[*]~",
      then: {
        function: pattern,
        functionOptions: {
          match: '^(/|[a-z0-9-.]+|{[a-zA-Z0-9_]+})+$'
        }
      }
    },

    // Author: Phil Sturgeon (https://github.com/philsturgeon)
    'no-numeric-ids': {
      description: 'Please avoid exposing IDs as an integer, UUIDs are preferred.',
      given: '$.paths..parameters[*].[?(@property === "name" && (@ === "id" || @.match(/(_id|Id)$/)))]^.schema',
      then: {
        function: schema,
        functionOptions: {
          schema: {
            type: "object",
            not: {
              properties: {
                type: {
                  const: "integer"
                }
              }
            },
            properties: {
              format: {
                const: 'uuid'
              }
            }
          }
        }
      },
      severity: 'error',
    },

    // Author: Phil Sturgeon (https://github.com/philsturgeon)
    'no-http-basic': {
      description: 'Consider a more secure alternative to HTTP Basic.',
      message: 'HTTP Basic is a pretty insecure way to pass credentials around, please consider an alternative.',
      given: "$.components.securitySchemes[*]",
      then: {
        field: "scheme",
        function: pattern,
        functionOptions: {
          notMatch: 'basic'
        }
      },
      severity: 'error',
    },

    // Author: Phil Sturgeon (https://github.com/philsturgeon)
    'no-x-headers': {
      description: 'Please do not use headers with X-',
      message: 'Headers cannot start with X-, so please find a new name for {{property}}. More: https://tools.ietf.org/html/rfc6648',
      given: "$..parameters.[?(@.in === 'header')].name",
      then: {
        function: pattern,
        functionOptions: {
          notMatch: '^(x|X)-'
        }
      },
      severity: 'error',
    },

    // Author: Phil Sturgeon (https://github.com/philsturgeon)
    'no-x-response-headers': {
      description: 'Please do not use headers with X-',
      message: 'Headers cannot start with X-, so please find a new name for {{property}}. More: https://tools.ietf.org/html/rfc6648',
      given: "$..headers.*~",
      then: {
        function: pattern,
        functionOptions: {
          notMatch: '^(x|X)-'
        }
      },
      severity: 'error',
      formats: [oas3],
    },
    // Author: Andrzej (https://github.com/jerzyn)
    'request-GET-no-body-oas2': {
      description: 'A `GET` request MUST NOT accept a `body` parameter',
      given: '$.paths..get.parameters..in',
      then: {
        function: pattern,
        functionOptions: {
          notMatch: "/^body$/"
        }
      },
      severity: 'error',
      formats: [oas2],
    },

    // Author: Andrzej (https://github.com/jerzyn)
    'request-GET-no-body-oas3': {
      description: 'A `GET` request MUST NOT accept a request body',
      given: "$.paths..get.requestBody",
      then: {
        function: undefinedFunc,
      },
      formats: [oas3],
      severity: 'error',
    },

    // Author: Andrzej (https://github.com/jerzyn)
    'headers-hyphenated-pascal-case': {
      description: 'All HTTP headers MUST use Hyphenated-Pascal-Case casing',
      given: "$..parameters[?(@.in == 'header')].name",
      message: 'HTTP headers have the first letter of each word capitalized, and each word should be separated by a hyphen.',
      type: "style",
      then: {
        function: pattern,
        functionOptions: {
          match: '/^([A-Z][a-z0-9]-)*([A-Z][a-z0-9])+/'
        }
      },
      severity: 'error',
    },

    // Author: Andrzej (https://github.com/jerzyn)
    'hosts-https-only-oas2': {
      description: 'ALL requests MUST go through `https` protocol only',
      type: "style",
      message: 'Schemes MUST be https and no other value is allowed.',
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
            "maxItems": 1
          }
        }
      },
      severity: 'error',
      formats: [oas2],
    },

    // Author: Andrzej (https://github.com/jerzyn)
    'hosts-https-only-oas3': {
      description: 'ALL requests MUST go through https:// protocol only',
      message: 'Servers MUST be https and no other protocol is allowed.',
      given: "$.servers..url",
      then: {
        function: pattern,
        functionOptions: {
          match: '/^https:/'
        }
      },
      formats: [oas3],
      severity: 'error',
    },

    // Author: Andrzej (https://github.com/jerzyn)
    'request-support-json-oas3': {
      description: 'Every request SHOULD support `application/json` media type',
      message: '{{description}}: {{error}}',
      given: "$.paths.[*].requestBody.content[?(@property.indexOf('json') === -1)]^",
      then: {
        function: falsy,
      },
      formats: [oas3],
      severity: 'warn',
    },

    // Author: Phil Sturgeon (https://github.com/philsturgeon)
    'no-unknown-error-format': {
      description: 'Every error response SHOULD support either RFC 7807 (https://tools.ietf.org/html/rfc6648) or the JSON:API Error format.',
      given: "$.paths.[*]..responses[?(@property.match(/^(4|5)/))].content.*~",
      then: {
        function: enumeration,
        functionOptions: {
          values: [
            "application/vnd.api+json",
            "application/problem+xml",
            "application/problem+json",
          ]
        }
      },
      formats: [oas3],
      severity: 'warn',
    },

    // Author: Nauman Ali (https://github.com/naumanali-stoplight)
    'no-global-versioning': {
      description: 'Using global versions just forces all your clients to do a lot more work for each upgrade. Please consider using API Evolution instead.',
      message: 'Server URL should not contain global versions',
      given: "$.servers[*].url",
      then: {
        function: pattern,
        functionOptions: {
          notMatch: '/v[1-9]'
        }
      },
      formats: [oas3],
      severity: 'warn',
    }
  }
};

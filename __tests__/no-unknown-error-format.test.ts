import { DiagnosticSeverity } from '@stoplight/types';
import testRule from './__helpers__/helper';

const document = (contentType: string) => {
  return {
    openapi: '3.1.0',
    info: { version: '1.0', contact: {} },
    paths: { 
      "/unknown-error": {
        "get": {
          "summary": "Your GET endpoint",
          "responses": {
            "400": {
              "description": "Error",
              "content": {
                [contentType]: {}
              }
            }
          }
        }
      }
    }
  }
};

testRule('no-unknown-error-format', [
  {
    name: 'valid error format (JSON:API)',
    document: document("application/vnd.api+json"),
    errors: [],
  },

  {
    name: 'valid error format (RFC 7807, XML)',
    document: document("application/problem+xml"),
    errors: [],
  },

  {
    name: 'valid error format (RFC 7807, JSON)',
    document: document("application/problem+json"),
    errors: [],
  },

  {
    name: 'invalid error format (plain JSON)',
    document: document("application/json"),
    errors: [
      {
        message: 'Every error response SHOULD support either RFC 7807 (https://tools.ietf.org/html/rfc7807) or the JSON:API Error format.',
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
        range: {
          start: expect.objectContaining({
            line: 0,
          }),
          end: expect.objectContaining({
            line: 0,
          }),
        },
        
      },
    ],
  },
]);

import { DiagnosticSeverity } from '@stoplight/types';
import testRule from './__helpers__/helper';

testRule('api-home-get', [
  {
    name: 'valid case',
    document: {
      openapi: '3.1.0',
      info: { version: '1.0', contact: {} },
      paths: { 
        '/': {
          'get': {}
        }
      },
    },
    errors: [],
  },
  
  {
    name: 'invalid case',
    document: {
      openapi: '3.1.0',
      info: { version: '1.0', contact: {} },
      paths: {
        '/': {}
      },
    },
    errors: [
      {
        message: "Otherwise people won't know how to get it.",
        path: ['paths', '/'],
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

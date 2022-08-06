import { DiagnosticSeverity } from '@stoplight/types';
import testRule from './__helpers__/helper';

testRule('hosts-https-only-oas3', [
  {
    name: 'valid case',
    document: {
      openapi: '3.1.0',
      info: { version: '1.0', contact: {} },
      paths: { '/': {} },
    },
    errors: [],
  },

  {
    name: 'invalid case',
    document: {
      openapi: '3.1.0',
      info: { version: '1.0', contact: {} },
      paths: {},
    },
    errors: [
      {
        message: 'Stop forcing all API consumers to visit documentation for basic interactions when the API could do that itself.',
        path: ['paths'],
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

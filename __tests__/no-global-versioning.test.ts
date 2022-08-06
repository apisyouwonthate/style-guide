import { DiagnosticSeverity } from '@stoplight/types';
import testRule from './__helpers__/helper';

testRule('no-global-versioning', [
  {
    name: 'valid case',
    document: {
      openapi: '3.1.0',
      info: { version: '1.0', contact: {} },
      paths: { '/': {} },
      servers: [{ url: 'https://api.example.com/' }]
    },
    errors: [],
  },

  {
    name: 'invalid case',
    document: {
      openapi: '3.1.0',
      info: { version: '1.0', contact: {} },
      paths: { '/': {} },
      servers: [{ url: 'https://api.example.com/v13' }]
    },
    errors: [
      {
        message: 'Using global versions just forces all your clients to do a lot more work for each upgrade. Please consider using API Evolution instead. More: https://apisyouwonthate.com/blog/api-evolution-for-rest-http-apis.',
        path: ['servers', '0', 'url'],
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

import { DiagnosticSeverity } from '@stoplight/types';
import testRule from './__helpers__/helper';

testRule('no-file-extensions-in-paths', [
  {
    name: 'valid case',
    document: {
      openapi: '3.1.0',
      info: { version: '1.0' },
      paths: { 'resources': {} }
    },
    errors: [],
  },

  {
    name: 'an API definition that is returning a json file',
    document: {
      openapi: '3.1.0',
      info: { version: '1.0' },
      paths: { 'resources.json': {} }
    },
    errors: [
      {
        message: 'Paths must not include file extensions such as .json, .xml, .html and .txt',
        path: ["paths", "resources.json"],
        severity: DiagnosticSeverity.Error,
      },
    ],
  }
]);

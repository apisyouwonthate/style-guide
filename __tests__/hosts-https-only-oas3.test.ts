import { DiagnosticSeverity } from "@stoplight/types";
import testRule from "./__helpers__/helper";

testRule("hosts-https-only-oas3", [
  {
    name: "valid case",
    document: {
      openapi: "3.1.0",
      info: { version: "1.0" },
      paths: { "/": {} },
      servers: [{ url: "https://api.example.com/" }],
    },
    errors: [],
  },

  {
    name: "an invalid server.url using http",
    document: {
      openapi: "3.1.0",
      info: { version: "1.0" },
      paths: { "/": {} },
      servers: [{ url: "http://api.example.com/" }],
    },
    errors: [
      {
        message: "Servers MUST be https and no other protocol is allowed.",
        path: ["servers", "0", "url"],
        severity: DiagnosticSeverity.Error,
      },
    ],
  },

  {
    name: "an invalid server using ftp",
    document: {
      openapi: "3.1.0",
      info: { version: "1.0" },
      paths: { "/": {} },
      servers: [{ url: "ftp://api.example.com/" }],
    },
    errors: [
      {
        message: "Servers MUST be https and no other protocol is allowed.",
        path: ["servers", "0", "url"],
        severity: DiagnosticSeverity.Error,
      },
    ],
  },
]);

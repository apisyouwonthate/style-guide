import { DiagnosticSeverity } from "@stoplight/types";
import testRule from "./__helpers__/helper";

testRule("no-file-extensions-in-paths", [
  {
    name: "valid case",
    document: {
      swagger: "2.0",
      info: { version: "1.0" },
      paths: { resources: {} },
    },
    errors: [],
  },

  {
    name: "an API definition that is returning a json file",
    document: {
      swagger: "2.0",
      info: { version: "1.0" },
      paths: { "resources.json": {} },
    },
    errors: [
      {
        message:
          "Paths must not include file extensions such as .json, .xml, .html and .txt.",
        path: ["paths", "resources.json"],
        severity: DiagnosticSeverity.Error,
      },
    ],
  },
  {
    name: "an API definition that is returning a xml file",
    document: {
      swagger: "2.0",
      info: { version: "1.0" },
      paths: { "resources.xml": {} },
    },
    errors: [
      {
        message:
          "Paths must not include file extensions such as .json, .xml, .html and .txt.",
        path: ["paths", "resources.xml"],
        severity: DiagnosticSeverity.Error,
      },
    ],
  },
  {
    name: "an API definition that is returning a html file",
    document: {
      swagger: "2.0",
      info: { version: "1.0" },
      paths: { "resources.html": {} },
    },
    errors: [
      {
        message:
          "Paths must not include file extensions such as .json, .xml, .html and .txt.",
        path: ["paths", "resources.html"],
        severity: DiagnosticSeverity.Error,
      },
    ],
  },
  {
    name: "an API definition that is returning a txt file",
    document: {
      swagger: "2.0",
      info: { version: "1.0" },
      paths: { "resources.txt": {} },
    },
    errors: [
      {
        message:
          "Paths must not include file extensions such as .json, .xml, .html and .txt.",
        path: ["paths", "resources.txt"],
        severity: DiagnosticSeverity.Error,
      },
    ],
  },

  {
    name: "valid case",
    document: {
      openapi: "3.1.0",
      info: { version: "1.0" },
      paths: { resources: {} },
    },
    errors: [],
  },

  {
    name: "an API definition that is returning a json file",
    document: {
      openapi: "3.1.0",
      info: { version: "1.0" },
      paths: { "resources.json": {} },
    },
    errors: [
      {
        message:
          "Paths must not include file extensions such as .json, .xml, .html and .txt.",
        path: ["paths", "resources.json"],
        severity: DiagnosticSeverity.Error,
      },
    ],
  },
  {
    name: "an API definition that is returning a xml file",
    document: {
      openapi: "3.1.0",
      info: { version: "1.0" },
      paths: { "resources.xml": {} },
    },
    errors: [
      {
        message:
          "Paths must not include file extensions such as .json, .xml, .html and .txt.",
        path: ["paths", "resources.xml"],
        severity: DiagnosticSeverity.Error,
      },
    ],
  },
  {
    name: "an API definition that is returning a html file",
    document: {
      openapi: "3.1.0",
      info: { version: "1.0" },
      paths: { "resources.html": {} },
    },
    errors: [
      {
        message:
          "Paths must not include file extensions such as .json, .xml, .html and .txt.",
        path: ["paths", "resources.html"],
        severity: DiagnosticSeverity.Error,
      },
    ],
  },
  {
    name: "an API definition that is returning a txt file",
    document: {
      openapi: "3.1.0",
      info: { version: "1.0" },
      paths: { "resources.txt": {} },
    },
    errors: [
      {
        message:
          "Paths must not include file extensions such as .json, .xml, .html and .txt.",
        path: ["paths", "resources.txt"],
        severity: DiagnosticSeverity.Error,
      },
    ],
  },
]);

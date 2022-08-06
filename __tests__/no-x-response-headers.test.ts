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
						responses: {
							"200": {
								description: "ok",
								headers: {
									"RateLimit-Limit": {
										description:
											"standards are cool: https://www.ietf.org/archive/id/draft-polli-ratelimit-headers-02.html#name-ratelimit-limit",
										schema: {
											type: "string",
											examples: ["100, 100;w=10"],
										},
									},
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
						responses: {
							"200": {
								description: "ok",
								headers: {
									"X-Rate-Limit": {
										description: "calls per hour allowed by the user",
										schema: {
											type: "integer",
											format: "int32",
										},
									},
									"X-Expires-After": {
										description: "date in UTC when token expires",
										schema: {
											type: "string",
											format: "date-time",
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
				message:
					"Headers cannot start with X-, so please find a new name for X-Rate-Limit. More: https://tools.ietf.org/html/rfc6648.",
				path: [
					"paths",
					"/foo",
					"get",
					"responses",
					"200",
					"headers",
					"X-Rate-Limit",
				],
				severity: DiagnosticSeverity.Error,
				range: {
					start: expect.objectContaining({
						line: 0,
					}),
					end: expect.objectContaining({
						line: 0,
					}),
				},
			},
			{
				message:
					"Headers cannot start with X-, so please find a new name for X-Expires-After. More: https://tools.ietf.org/html/rfc6648.",
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

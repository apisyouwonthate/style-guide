# OpenAPI Community Style Guide

These days API Linting (or creating [automated style guides](https://www.apisyouwonthate.com/blog/automated-style-guides-for-rest-graphql-and-grpc)) is all the rage. 

Spectral was created to make this simple with OpenAPI and AsyncAPI, powering linting in editors, as a CLI tool, in continuous integration, etc., and comes with its [own set of baked 
in OpenAPI v2/v3 rules](https://meta.stoplight.io/docs/spectral/docs/reference/openapi-rules.md). 

This repo is the start of a community powered collection of style guides (a.k.a rulesets), which you can use as well as, or instead of, those rules.

- [APIs You Won't Hate](./apisyouwonthate.yml) - Super opinionated HTTP API advice.
- [FHIR](./fhir.yml) - FHIR is a standard for health care data exchange, published by HL7.
- [OpenAPI](./openapi.yml) - Make more useful and consistent OpenAPI files with this more experimental set of rules than `spectral:oas`.

All of these rulesets have plenty of rules to be done, all mentioned in comments. Feel free to dig in and send PRs. 

Other ideas for Rulesets:

- [AWS Gateway](https://github.com/stoplightio/spectral/issues/475)
- [JSON:API](https://github.com/stoplightio/spectral/issues/544)
- [Microsoft Azure](https://github.com/stoplightio/spectral/issues/476)

Make a new file and dig in. If you need any help post an issue.

[Spectral]: https://stoplight.io/spectral/

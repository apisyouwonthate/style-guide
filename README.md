# APIs You Won't Hate: API Style Guide

Make your APIs "better" according to APIs You Won't Hate, with this slick command line tool that'll run on your [OpenAPI](https://spec.openapis.org/oas/v3.1.0). 

## Installation

``` bash
npm install --save -D @apisyouwonthate/style-guide
npm install --save -D @stoplight/spectral-cli
```

## Usage


Create a local ruleset that extends the style guide. In its most basic form this just tells Spectral what ruleset you want to use, but it will allow you to customise things, add your own rules, turn bits off if its causing trouble.

```
cd ~/src/<your-api>

echo 'extends: ["@apisyouwonthate/style-guide"]' > .spectral.yaml
```

Next, use Spectral CLI to lint against your OpenAPI description. Don't have any OpenAPI? [Record some HTTP traffic to make OpenAPI](https://apisyouwonthate.com/blog/creating-openapi-from-http-traffic) and then you can switch to API Design-First going forwards.

```
spectral lint api/openapi.yaml
```

You should see some output like this, letting you know there are a few more standards you could be using (shoutout to [Standards.REST](https://standards.rest/)):

```
/Users/phil/src/protect-earth-api/api/openapi.yaml
  18:7   warning  api-health               Creating a `/health` endpoint is a simple solution for pull-based monitoring and manually checking the status of an API.  paths
  18:7   warning  api-home                 Stop forcing all API consumers to visit documentation for basic interactions when the API could do that itself.           paths
  36:30  warning  no-unknown-error-format  Every error response SHOULD support either RFC 7807 (https://tools.ietf.org/html/rfc6648) or the JSON:API Error format.   paths./v1/orders.post.responses[401].content.application/json
  96:30  warning  no-unknown-error-format  Every error response SHOULD support either RFC 7807 (https://tools.ietf.org/html/rfc6648) or the JSON:API Error format.   paths./v1/orders/{order}.get.responses[401].content.application/json
 112:30  warning  no-unknown-error-format  Every error response SHOULD support either RFC 7807 (https://tools.ietf.org/html/rfc6648) or the JSON:API Error format.   paths./v1/orders/{order}.get.responses[404].content.application/json
```

Now you have some things to work on for your API. Thankfully this lot only looks like warnings, so they can be got to those in time (it's not going to [fail continuous integration](https://meta.stoplight.io/docs/spectral/ZG9jOjExNTMyOTAx-continuous-integration) unless [you want it to](https://meta.stoplight.io/docs/spectral/ZG9jOjI1MTg1-spectral-cli#error-results)).

## Backstory

You could write your API Style Guide as a giant manifesto and hope people see it, or you could [automate your API style guide](https://www.apisyouwonthate.com/blog/automated-style-guides-for-rest-graphql-and-grpc)) using a tool like Spectral so that your API Style Guide is enforced at the pull request level. This is one of many parts of a successful API Governance program.

Spectral runs on top of OpenAPI and AsyncAPI, powering linting in editors, as a CLI tool, in continuous integration, etc., and comes with its [own set of baked 
in OpenAPI v2/v3 rules](https://meta.stoplight.io/docs/spectral/docs/reference/openapi-rules.md). Making rules about how to write OpenAPI can help beginners write better OpenAPI, but its real power is using rules to make the actual APIs better and more consistent, before there is any programming involved.

This NPM package brings together all sorts of advice found in the books and blog posts from [APIs You Won't Hate](https://apisyouwonthate.com) books. If you apply this to APIs in production, this is basically [Phil Sturgeon](https://philsturgeon.com/) judging your API for free. But if you can get this API Style Guide involved in the API Design-First workflow, you're getting free advice on how to design a better API before you waste any time coding, which then means fewer BC breaks as you fix things.

There are [a bunch of other rulesets](https://github.com/stoplightio/spectral-rulesets) you can check out if you feel like making your own API Style Guides, or feel like contributing some new rules here via a pull request.

These two are pretty good:

- [Adidas](https://github.com/adidas/api-guidelines/blob/master/.spectral.yml)
- [Digital Ocean](https://github.com/digitalocean/openapi/blob/main/spectral/ruleset.yml)

## 🎉 Thanks

- [Mike Ralphson](https://github.com/MikeRalphson) for kicking off the Spectral CLI and his work on Speccy
- [Jamund Ferguson](https://github.com/xjamundx) for JUnit formatter
- [Sindre Sorhus](https://github.com/sindresorhus) for Stylish formatter
- [Ava Thorn](https://github.com/amthorn) for the Pretty formatter
- Julian Laval for HTML formatter
- [@nulltoken](https://github.com/nulltoken) for a whole bunch of amazing features

## 📜 License

This repository is licensed under the MIT license.

## 🌲 Sponsor

If you'd like to say thanks for this style guide, throw some money at [Protect Earth](https://protect.earth/donate), a charity that plants trees all over the United Kingdom, which has [secured a 64 acre ancient woodland to restore](https://www.protect.earth/blog/high-wood). Phil spends all his time on this, both planting trees _and_ writing APIs believe it or not!

# OpenAPI Community Style Guide

[Spectral] lets you enforce style guides on your APIs in the editor, CLI, continuous integration, etc., and comes with its [own set of baked 
in OpenAPI v2/v3 rules](https://stoplight.io/p/docs/gh/stoplightio/spectral/docs/reference/openapi-rules.md). This repo is a community powered set of rules, which can be considered an extended superset (😉) of those rules. 

Let's collect a bunch of rules together that we think are excellent. This is going to 
get opinionated fast, and there will be compromises made, but it's for the good of the community that we try and agree on something. 

Then tools like Spectral can use this as a basis for rulesets, and other tools can either use the same rulesets or use Spectral, and we don't all have to write out our own things over and over. 

If you have some very very specific rules (like AWS Gateway compatibility, or rules required for a specific tool) please make a new file, and extend the main `spectral.yaml`).

[Spectral]: https://stoplight.io/spectral/

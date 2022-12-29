import {
  IRuleResult,
  Spectral,
  Document,
  Ruleset,
  RulesetDefinition,
} from "@stoplight/spectral-core";
import { httpAndFileResolver } from "@stoplight/spectral-ref-resolver";
import apisYouWontHateRuleset from "../../src/ruleset";

export type RuleName = keyof Ruleset["rules"];

type Scenario = ReadonlyArray<
  Readonly<{
    name: string;
    document: Record<string, unknown> | Document<unknown, any>;
    errors: ReadonlyArray<Partial<IRuleResult>>;
    mocks?: Record<string, Record<string, unknown>>;
  }>
>;

export default (ruleName: RuleName, tests: Scenario): void => {
  describe(`Rule ${ruleName}`, () => {
    const concurrent = tests.every(
      (test) => test.mocks === void 0 || Object.keys(test.mocks).length === 0
    );
    for (const testCase of tests) {
      (concurrent ? it.concurrent : it)(testCase.name, async () => {
        const s = createWithRules([ruleName]);
        const doc =
          testCase.document instanceof Document
            ? testCase.document
            : JSON.stringify(testCase.document);
        const errors = await s.run(doc);
        expect(errors.filter(({ code }) => code === ruleName)).toEqual(
          testCase.errors.map(
            (error) => expect.objectContaining(error) as unknown
          )
        );
      });
    }
  });
};

export function createWithRules(rules: (keyof Ruleset["rules"])[]): Spectral {
  const s = new Spectral({ resolver: httpAndFileResolver });

  s.setRuleset({
    extends: [[apisYouWontHateRuleset as RulesetDefinition, "off"]],
    rules: rules.reduce((obj: Record<string, boolean>, name) => {
      obj[name] = true;
      return obj;
    }, {}),
  });

  return s;
}

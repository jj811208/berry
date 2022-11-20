import * as configUtils from '../sources/configUtils';

describe(`configurationUtils`, () => {
  describe(`resolveConfigs`, () => {
    it(`it should resolve all RcFile according to the \`onConflict\` option`, () => {
      expect(
        configUtils.resolveConfigs([
          [`a`, [`foo`]],
          [`b`, [`bar`]],
          [`c`, [`baz`]],
        ]),
      ).toEqual(
        [`a, b, c`, [
          [`a`, `foo`],
          [`b`, `bar`],
          [`c`, `baz`],
        ]],
      );

      expect(
        configUtils.resolveConfigs([
          [`a`, [`foo`]],
          [`b`, {onConflict: `reset`, value: [`bar`]}],
          [`c`, [`baz`]],
        ]),
      ).toEqual(
        [`b, c`, [
          [`b`, `bar`],
          [`c`, `baz`],
        ]],
      );

      expect(
        configUtils.resolveConfigs([[`a`, [{foo: `bar`}]]]),
      ).toEqual(
        [`a`, [
          [`a`, {foo: [`a`, `bar`]}],
        ]],
      );

      expect(
        configUtils.resolveConfigs([
          [`a`, [`foo`]],
          [`b`, 42],
        ]),
      ).toEqual(
        [`b`, 42],
      );

      expect(
        configUtils.resolveConfigs([
          [`a`, {foo: `foo`}],
          [`b`, {bar: `bar`}],
          [`c`, {baz: `baz`}],
        ]),
      ).toEqual(
        [`a, b, c`, {
          foo: [`a`, `foo`],
          bar: [`b`, `bar`],
          baz: [`c`, `baz`],
        }],
      );

      expect(
        configUtils.resolveConfigs([
          [`a`, {foo: `foo`}],
          [`b`, {onConflict: `reset`, bar: `bar`}],
          [`c`, {baz: `baz`}],
        ]),
      ).toEqual(
        [`b, c`, {
          bar: [`b`, `bar`],
          baz: [`c`, `baz`],
        }],
      );

      expect(
        configUtils.resolveConfigs([
          [`a`, {foo: `foo`}],
          [`b`, {onConflict: `reset`, value: {bar: `bar`}}],
          [`c`, {baz: `baz`}],
        ]),
      ).toEqual(
        [`b, c`, {
          bar: [`b`, `bar`],
          baz: [`c`, `baz`],
        }],
      );

      expect(
        configUtils.resolveConfigs([
          [`a`, {foo: {hello: `hello`}, bar: 42}],
          [`b`, {onConflict: `reset`, foo: {onConflict: `extend`, world: `world`}}],
        ]),
      ).toEqual(
        [`b`, {
          foo: [
            `a, b`,
            {hello: [`a`, `hello`], world: [`b`, `world`]},
          ],
        }],
      );

      expect(
        configUtils.resolveConfigs([
          [`a`, {foo: {hello: `hello`}, bar: 42}],
          [`b`, 42],
          [`c`, {onConflict: `reset`, foo: {onConflict: `extend`, world: `world`}}],
        ]),
      ).toEqual(
        [`c`, {
          foo: [`c`, {world: [`c`, `world`]}],
        }],
      );

      expect(
        configUtils.resolveConfigs([
          [`a`, {foo: {hello: `hello`}, bar: 42}],
          [`b`, undefined],
          [`c`, {onConflict: `reset`, foo: {onConflict: `extend`, world: `world`}}],
        ]),
      ).toEqual(
        [`c`, {
          foo: [`a, c`, {
            hello: [`a`, `hello`],
            world: [`c`, `world`],
          }],
        }],
      );
    });
  });
});

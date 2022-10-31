import {Filename, PortablePath, ppath, xfs} from '@yarnpkg/fslib';

describe(`Features`, () => {
  describe(`Configuration`, () => {
    test(`it should let the project configuration override the home configuration`, makeTemporaryEnv({
    }, async ({path, run, source}) => {
      await xfs.mkdirPromise(ppath.join(path, `.yarn/home` as PortablePath), {recursive: true});

      await xfs.writeJsonPromise(ppath.join(path, `.yarn/home` as PortablePath, Filename.rc), {
        preferInteractive: true,
      });

      // Sanity check
      await expect(run(`config`, `get`, `--json`, `preferInteractive`)).resolves.toMatchObject({
        stdout: `true\n`,
      });

      await xfs.writeJsonPromise(ppath.join(path, Filename.rc), {
        preferInteractive: false,
      });

      await expect(run(`config`, `get`, `--json`, `preferInteractive`)).resolves.toMatchObject({
        stdout: `false\n`,
      });
    }));

    test(`it should completely ignore the home configuration if onConflict: reset is set in the project configuration`, makeTemporaryEnv({
    }, async ({path, run, source}) => {
      await xfs.mkdirPromise(ppath.join(path, `.yarn/home` as PortablePath), {recursive: true});

      // Sanity checks
      await expect(run(`config`, `get`, `--json`, `preferInteractive`)).resolves.toMatchObject({stdout: `false\n`});
      await expect(run(`config`, `get`, `--json`, `preferTruncatedLines`)).resolves.toMatchObject({stdout: `false\n`});

      await xfs.writeJsonPromise(ppath.join(path, `.yarn/home` as PortablePath, Filename.rc), {
        preferInteractive: true,
        preferTruncatedLines: true,
      });

      await expect(run(`config`, `get`, `--json`, `preferInteractive`)).resolves.toMatchObject({stdout: `true\n`});
      await expect(run(`config`, `get`, `--json`, `preferTruncatedLines`)).resolves.toMatchObject({stdout: `true\n`});

      await xfs.writeJsonPromise(ppath.join(path, Filename.rc), {
        onConflict: `reset`,
        preferInteractive: true,
      });

      await expect(run(`config`, `get`, `--json`, `preferInteractive`)).resolves.toMatchObject({stdout: `true\n`});
      await expect(run(`config`, `get`, `--json`, `preferTruncatedLines`)).resolves.toMatchObject({stdout: `false\n`});

      await xfs.writeJsonPromise(ppath.join(path, Filename.rc), {
        onConflict: `reset`,
      });

      await expect(run(`config`, `get`, `--json`, `preferInteractive`)).resolves.toMatchObject({stdout: `false\n`});
      await expect(run(`config`, `get`, `--json`, `preferTruncatedLines`)).resolves.toMatchObject({stdout: `false\n`});
    }));

    test(`it should let the env configuration override the project configuration`, makeTemporaryEnv({
    }, async ({path, run, source}) => {
      await xfs.writeJsonPromise(ppath.join(path, Filename.rc), {
        preferInteractive: true,
      });

      // Sanity check
      await expect(run(`config`, `get`, `--json`, `preferInteractive`)).resolves.toMatchObject({
        stdout: `true\n`,
      });

      await expect(run(`config`, `get`, `--json`, `preferInteractive`, {
        env: {YARN_PREFER_INTERACTIVE: `0`},
      })).resolves.toMatchObject({
        stdout: `false\n`,
      });
    }));
  });
});

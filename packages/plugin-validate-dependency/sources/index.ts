import {Hooks as CoreHooks, Manifest, Plugin, Project, SettingsType} from '@yarnpkg/core';
import {Filename, PortablePath, npath, ppath, xfs}                   from '@yarnpkg/fslib';

import ValidateDependencyCommand                                     from './commands/validate-dependency';
import * as execUtils                                                from './utils';

// export type {ExecEnv};
export {execUtils};

declare module '@yarnpkg/core' {
  interface ConfigurationValueMap {
    licenseValidList: Array<string>;
    licenseInvalidList: Array<string>;
    licenseDependencyWhiteList: Array<string>;
    invalidDependencyList: Array<string>; //dev
  }
}

const plugin: Plugin<CoreHooks> = {
  configuration: {
    licenseValidList: {
      description: `The linker used for installing Node packages, one of: "pnp", "node-modules"`,
      type: SettingsType.STRING,
      default: [],
      isArray: true,
    },
    licenseInvalidList: {
      description: `The linker used for installing Node packages, one of: "pnp", "node-modules"`,
      type: SettingsType.STRING,
      default: [],
      isArray: true,
    },
    licenseDependencyWhiteList: {
      description: `The linker used for installing Node packages, one of: "pnp", "node-modules"`,
      type: SettingsType.STRING,
      default: [],
      isArray: true,
    },
    invalidDependencyList: {
      description: `The linker used for installing Node packages, one of: "pnp", "node-modules"`,
      type: SettingsType.STRING,
      default: [],
      isArray: true,
    },
  },
  commands: [
    ValidateDependencyCommand,
  ],
  hooks: {
    // const manifest = await Manifest.find(fetchResult.prefixPath, {baseFs: fetchResult.packageFs});
    afterDependencyFetched: async (
      configuration,
      fetchResult,
      change,
    ) => {
      if (change && fetchResult.checksum)
        console.log(`update or install`);

      if (change && !fetchResult.checksum) {
        console.log(`delete`);
      }
    },
  },
};

// eslint-disable-next-line arca/no-default-export
export default plugin;

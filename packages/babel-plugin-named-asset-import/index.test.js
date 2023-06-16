'use strict';

const pluginTester = require('babel-plugin-tester/pure');
const namedAssetImport = require('./index');

pluginTester.default({
  plugin: namedAssetImport,
  pluginOptions: {
    loaderMap: {
      svg: {
        ReactComponent: '[path]',
      },
    },
  },
  pluginName: 'named-asset-import',
  snapshot: false,
  tests: {
    defaultImport: {
      code: 'import logo from "logo";',
      output: 'import logo from "logo";',
    },
    namedImport: {
      code: 'import { logo } from "logo";',
      output: 'import { logo } from "logo";',
    },
    namedImportRenamed: {
      code: 'import { Url as logo1 } from "logo";',
      output: 'import { Url as logo1 } from "logo";',
    },
    svgDefaultImport: {
      code: 'import Logo from "logo.svg";',
      output: 'import Logo from "logo.svg";',
    },
    svgNamedImport: {
      code: 'import { logo } from "logo.svg";',
      output: 'import { logo } from "logo.svg";',
    },
    svgReactComponentNamedImport: {
      code: 'import { ReactComponent as Logo } from "logo.svg";',
      output: 'import { ReactComponent as Logo } from "logo.svg";',
    },
    svgMultipleImport: {
      code:
        'import logoUrl from "logo.svg?url";\n' +
        'import Logo from "logo.svg";',
      output:
        'import logoUrl from "logo.svg?url";\n' +
        'import Logo from "logo.svg";',
    },
    defaultExport: {
      code: 'export default logo;',
      output: 'export default logo;',
    },
    constExport: {
      code: 'export const token = "token";',
      output: 'export const token = "token";',
    },
    classExport: {
      code: 'export class Logo {}',
      output: 'export class Logo {}',
    },
    namedExport: {
      code: 'export { logo } from "logo";',
      output: 'export { logo } from "logo";',
    },
    namedExportRenamed: {
      code: 'export { Url as logo } from "logo";',
      output: 'export { Url as logo } from "logo";',
    },
    allExport: {
      code: 'export * from "logo";',
      output: 'export * from "logo";',
    },
    svgNamedExport: {
      code: 'export { logo } from "logo.svg";',
      output: 'export { logo } from "logo.svg";',
    },
    svgAllExport: {
      code: 'export * from "logo.svg";',
      output: 'export * from "logo.svg";',
    },
    svgReactComponentNamedExport: {
      code: 'export { ReactComponent as Logo } from "logo.svg";',
      output: 'export { ReactComponent as Logo } from "logo.svg";',
    },
    svgReactComponentExport: {
      code: 'export { ReactComponent } from "logo.svg";',
      output: 'export { ReactComponent } from "logo.svg";',
    },
    svgMultipleExport: {
      code:
        'export { logoUrl } from "logo.svg?url";\n' +
        'export { ReactComponent as Logo } from "logo.svg";',
      output:
        'export { logoUrl } from "logo.svg?url";\n' +
        'export { ReactComponent as Logo } from "logo.svg";',
    },
  },
});

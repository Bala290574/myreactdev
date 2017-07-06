#!/usr/bin/env node
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

const spawn = require('react-dev-utils/crossSpawn');
const script = process.argv[2];
const args = process.argv.slice(3);

switch (script) {
  case 'build':
  case 'eject':
  case 'start':
  case 'test': {
    const result = spawn.sync(
      'node',
      [require.resolve('../scripts/' + script)].concat(args),
      { stdio: 'inherit' }
    );
    if (result.signal) {
      if (result.signal === 'SIGKILL') {
        console.log(
          'The build failed because the process exited too early. ' +
            'This probably means the system ran out of memory or someone called ' +
            '`kill -9` on the process.'
        );
      } else if (result.signal === 'SIGTERM') {
        console.log(
          'The build failed because the process exited too early. ' +
            'Someone might have called `kill` or `killall`, or the system could ' +
            'be shutting down.'
        );
      }
      process.exit(1);
    }
    process.exit(result.status);
    break;
  }
  case 'lint': {
    let eslintConfigPath;

    try {
      eslintConfigPath = require.resolve('eslint-config-react-app');
    } catch (e) {
      eslintConfigPath = require.resolve('../../../package.json');
    }

    const results = spawn(
      'node',
      [
        require.resolve('eslint/bin/eslint'),
        '--config',
        eslintConfigPath,
        'src/**/*.{js,jsx}',
      ],
      { stdio: 'inherit' }
    );

    results.on('error', err => {
      console.log('Error running ESLint: ' + err);
      process.exit(results.status);
    });
    break;
  }
  default:
    console.log('Unknown script "' + script + '".');
    console.log('Perhaps you need to update react-scripts?');
    console.log(
      'See: https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#updating-to-new-releases'
    );
    break;
}

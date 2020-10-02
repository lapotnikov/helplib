const assert = require('chai').assert;
const helpLib = require('../../dist/node/main.js');

/**
 * Run tests
 */
require('../common/core.js').test(describe, it, assert, helpLib);
require('../common/modules/common.js').test(describe, it, assert, helpLib);
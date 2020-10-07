const assert = require('chai').assert;
const helpLib = require('../../dist/node/main.js');

/**
 * Run tests
 */
require('../common/core.js').testCore(describe, it, assert, helpLib);
require('../common/modules/common.js').testCommon(describe, it, assert, helpLib);
require('../common/modules/function.js').testFunc(describe, it, assert, helpLib);
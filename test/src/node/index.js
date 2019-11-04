const assert = require('chai').assert;
const helpLib = require('../../dist/node/main.js');

/**
 * Run tests
 */
require('../common/core.js').testCore(describe, it, assert, helpLib);
const mocha = require('mocha');
const assert = require('chai').assert;
const helpLib = require('../../dist/node/main.js');

require('../common/core.js').testCore(describe, it, assert, helpLib);
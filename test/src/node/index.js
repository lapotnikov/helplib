const assert = require('chai').assert;
const helpLib = require('../../dist/node/main.js');

/**
 * Run tests
 */
require('../common/core.js').testCore(describe, it, assert, helpLib);
require('../common/modules/common.js').testCommon(describe, it, assert, helpLib);
require('../common/modules/string.js').testStr(describe, it, assert, helpLib);
require('../common/modules/number.js').testNum(describe, it, assert, helpLib);
require('../common/modules/object.js').testObj(describe, it, assert, helpLib);
require('../common/modules/array.js').testArr(describe, it, assert, helpLib);
require('../common/modules/function.js').testFunc(describe, it, assert, helpLib);
require('../common/modules/date.js').testDate(describe, it, assert, helpLib);
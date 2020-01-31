const helpLib = require('./helplib.js');
require('./modules/common.js')(helpLib);
require('./modules/string.js')(helpLib);
require('./modules/number.js')(helpLib);
require('./modules/object.js')(helpLib);
require('./modules/array.js')(helpLib);
require('./modules/function.js')(helpLib);
require('./modules/date.js')(helpLib);
helpLib.init();

module.exports = helpLib;
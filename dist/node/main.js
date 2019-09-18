const helLib = require('./helplib.js');
require('./modules/string.js')(helLib);
require('./modules/number.js')(helLib);
require('./modules/object.js')(helLib);
require('./modules/array.js')(helLib);
require('./modules/function.js')(helLib);
require('./modules/date.js')(helLib);

module.exports = helLib;
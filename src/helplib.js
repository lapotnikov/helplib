/**
 * <p>Ядро библиотеки helLib
 * <p>Здесь объявляется главный класс библиотеки [HelpLib]{@link module:core~HelpLib}.
 * Он является синглтоном и создать его объект извне вы не можете.
 * <p>Модуль создает единственный экземпляр этого класса [$namespace$]{@link $namespace$} и обеспечивает к нему доступ извне.
 * Все манипуляции со вспомогательными модулями и их функциями происходят через этот объект.
 *
 * @module core
 * @author Artyom Lapotnikov <lapotnikov@gmail.com>
 * @copyright Artyom Lapotnikov
 * @license MIT
 * @version 1.0.0
 */

/**
 * <p>Объект класса [HelpLib]{@link module:core~HelpLib}.
 * <p>Все манипуляции с модулями и их функциями происходят через этот объект.
 * С его помощью вы можете [создавать модули и добавлять к ним функции]{@link module:core~HelpLib#regHelper},
 * а также получать доступ к ним.
 * <p>Объект может иметь два состояния: <b>инициализированное</b> и <b>неинициализированное</b>.<br/>
 * Проверить состояние вы можете с помощью метода [isInit]{@link module:core~HelpLib#isInit}.
 * <p><b>Инициализированное состояние</b> означает, что объект готов к работе.
 * В него добавлены все модули и проверены зависимости между ними.
 * Вы также можете добавлять или расширять модули инициализированного объекта.
 * Но проверка зависимостей будет осуществляться в момент добавления функции модуля,
 * что не позволит добавлять модули, которые будут иметь перекрестные зависимости.
 * <p><b>Неинициализированный состояние</b> означает, что объект не может гарантировать корректную работу.
 * Возможно, что некоторые модули еще не были добавлены, или еще не осуществлялась проверка зависимостей.
 * Проверка зависимостей происходит в момент инициализации объекта, после добавления всех функций всех модулей,
 * что дает возможность добавлять модули, которые будут иметь перекрестные зависимости.
 * <p>Инициализация происходит автоматически после создания экземпляра класса и добавления всех модулей в него.
 * Вы получаете уже готовый объект к работе, и никак не можете повлиять на этот процесс.<br/>
 * Более подробную информацию о состояниях объекта вы можете получить [здесь]{@link module:core~HelpLib}.
 *
 * @example <caption>Cоздание и вызов функций без зависимостей</caption>
 * // создание модуля hi и добавление к нему функции hello
 * $namespace$.regHelper('hi', 'hello', null, () => 'Hello');
 * // добавление функции welcome к модулю hi
 * $namespace$.regHelper('hi', 'welcome', null, (name) => `Hello ${name}`);
 *
 * // вызов функций hello и welcome модуля hi
 * $namespace$.hi.hello();                  // Hello
 * $namespace$.hi.welcome('Alex');          // Hello Alex
 *
 * @example <caption>Cоздание и вызов функций c зависимостями от других модулей</caption>
 * // создание модуля wish и добавление к нему функции goodDay
 * // которая требует наличия функции welcome модуля hi
 * $namespace$.regHelper('wish', 'goodDay', {hi: 'welcome'}, function(name) {
 *     return this.hi.welcome(name) + ', have a nice day';
 * });
 *
 * // вызов функции goodDay модуля wish
 * $namespace$.wish.goodDay('Alex');        // Hello Alex, have a nice day
 *
 * @example <caption>Добавление модулей с перекрестными зависимостями в неинициализированный объект</caption>
 * // проверка состояния объекта
 * $namespace$.isInit();                    // false
 *
 * // создание модуля wish и добавление к нему функции goodDay
 * // которая требует наличия функции welcome, еще не добавленного модуля hi
 * $namespace$.regHelper('wish', 'goodDay', {hi: 'welcome'}, function(name) {
 *     return this.hi.welcome(name) + ', have a nice day';
 * });
 *
 * // создание модуля hi и добавление к нему функции hello
 * $namespace$.regHelper('hi', 'hello', null, () => 'Hello');
 * // добавление функции welcome к модулю hi
 * $namespace$.regHelper('hi', 'welcome', null, (name) => `Hello ${name}`);
 *
 * // инициализация объекта и проверка зависимостей
 * $namespace$.init();
 *
 * // вызов функции goodDay модуля wish
 * $namespace$.wish.goodDay('Alex');        // Hello Alex, have a nice day
 *
 * @example <caption>Добавление модулей с перекрестными зависимостями в инициализированный объект</caption>
 * // проверка состояния объекта
 * $namespace$.isInit();                    // true
 *
 * // создание модуля wish и добавление к нему функции goodDay
 * // которая требует наличия функции welcome, еще не добавленного модуля hi
 * $namespace$.regHelper('wish', 'goodDay', {hi: 'welcome'}, function(name) {
 *     return this.hi.welcome(name) + ', have a nice day';
 * });
 *
 * // throw ReferenceError Not all dependencies are met for the helper function "wish.goodDay"
 *
 * @type {module:core~HelpLib}
 * @global
 */
const $namespace$ = (() => {
	/**
	 * <p>Список зарезервированных имен.
	 * <p>Список ограничивает добавление модулей или функции общего модуля с именами, которые соответствует зарезервированным.
	 * Он заполняется в конструкторе класса и не изменяется после создания экземпляра класса.
	 * <p>Список содержит следующие значения:
	 * <ul>
	 *	<li>имена зарезервированные классом:
	 *		<code>
	 *			_common,						isInitialize,					modList,
	 *			constructor,				isInit,								init,							regHelper
	 *		</code>
	 *	<li>имена зарезервированные языком программирования (может изменяться в зависимости от окружения):
	 *		<code>
	 *			hasOwnProperty,					isPrototypeOf,						propertyIsEnumerable,
	 *			toString,								toLocaleString,						valueOf,
	 *			__defineGetter__,				__defineSetter__,					__lookupGetter__,
	 *			__lookupSetter__,				__proto__
	 *		</code>
	 * </ul>
	 *
	 * @type {string[]}
	 * @constant
	 * @memberof module:core~HelpLib
	 * @private
	 */
	const NAME_RESERVLIST = [];
	/**
	 * <p>Имя общего модуля, которое используется внутри класса.
	 * <p>Вы не должны использовать это имя для добавления функции к общему модулю.
	 * Оно используется только внутри класса.
	 *
	 * @type {string}
	 * @constant
	 * @default
	 * @memberof module:core~HelpLib
	 * @private
	 */
	const NAME_COMMONLIB = '_common';
	/**
	 * <p>Имя общего модуля.
	 * <p>Вы должны использовать это имя для добавления функции к общему модулю с помощью метода
	 * [regHelper]{@link module:core~HelpLib#regHelper}.
	 *
	 * @type {string}
	 * @constant
	 * @default
	 * @memberof module:core~HelpLib
	 * @private
	 */
	const NAME_ROOTLIB = '.';

	/**
	 * <p>Главный класс библиотеки HelpLib
	 * <p>Он является синглтоном и создать его объект извне вы не можете.
	 * <p>Модуль [core]{@link module:core} создает единственный экземпляр этого класса [$namespace$]{@link $namespace$}
	 * и обеспечивает к нему доступ извне.
	 * Все манипуляции со вспомогательными модулями и их функциями происходят через этот объект.
	 */
	class HelpLib {
		/**
		 * Конструктор класса
		 * @private
		 */
		constructor() {
			this.isInitialize = false;
			this.modList = {};

			NAME_RESERVLIST.push(NAME_COMMONLIB);
			NAME_RESERVLIST.push.apply(NAME_RESERVLIST, getOwnPropertyList.call(this));
		}

		/**
		 * The isInit methed
		 * @return {boolean} Is init
		 */
		isInit() {
			return this.isInitialize;
		}

		/**
		 * The regHelper method
		 * @param {string} mod - The module name
		 * @param {string} func - The function name
		 * @param {object|null|undefined} dependence - The dependence of function
		 * @param {function} callback - The function
		 * @throws {TypeError} If the module name is not a string
		 */
		regHelper(mod, func, dependence, callback) {
			if(mod !== null && mod !== undefined && typeof mod !== 'string') {
				throw new TypeError('The module name is incorrect');
			}
			if(typeof func !== 'string') {
				throw new TypeError('The helper function name is incorrect');
			}
			if(dependence !== null && dependence !== undefined && typeof dependence !== 'object') {
				throw new TypeError('The dependence value is incorrect');
			}

			mod = mod === null || mod === undefined ? NAME_COMMONLIB : mod.trim();
			mod = mod.length == 0 ? NAME_COMMONLIB : mod;
			mod = mod === NAME_ROOTLIB ? NAME_COMMONLIB : mod;
			func = func.trim();

			if(func.length == 0) {
				throw new TypeError('The helper function name is empty');
			}
			if(typeof callback !== 'function') {
				throw new TypeError('The callback of helper is not a function');
			}

			if(mod === NAME_COMMONLIB) {
				if(NAME_RESERVLIST.indexOf(func) >= 0) {
					throw new TypeError(`The helper function name "${func}" is reserved`);
				} else if(this.modList[mod] !== undefined && this.modList[mod][func] !== undefined) {
					throw new TypeError(`The helper function name "${func}" is already exist`);
				}
			} else if(NAME_RESERVLIST.indexOf(mod) >= 0) {
				throw new TypeError(`The module name "${mod}" is reserved`);
			} else if(this.modList[mod] !== undefined && this.modList[mod][func] !== undefined) {
				throw new TypeError(`The helper function name "${mod}.${func}" is already exist`);
			}

			if(this.isInitialize && dependence !== null && dependence !== undefined) {
				checkDependenceList.call(this, mod, func, dependence);
			}

			this.modList[mod] = this.modList[mod] === undefined ? {} : this.modList[mod];
			this.modList[mod][func] = {
				callback: callback.bind(this),
				dependence: dependence !== null && dependence !== undefined ? dependence : null
			};

			if(this.isInitialize) {
				if(mod === NAME_COMMONLIB) {
					this[func] = this.modList[mod][func].callback;
				} else {
					this[mod] = this[mod] === undefined ? {} : this[mod];
					this[mod][func] = this.modList[mod][func].callback;
				}
			}
		}

		/**
		 * The init methed
		 */
		init() {
			if(this.isInitialize === false) {
				for(let mod in this.modList) {
					for(let func in this.modList[mod]) {
						checkDependenceList.call(this, mod, func, this.modList[mod][func].dependence);

						if(mod === NAME_COMMONLIB) {
							this[func] = this.modList[mod][func].callback;
						} else {
							this[mod] = this[mod] === undefined ? {} : this[mod];
							this[mod][func] = this.modList[mod][func].callback;
						}
					}
				}

				this.isInitialize = true;
			}
		}
	}

	/**
	 * The checkDependenceList methed
	 * @param {string} mod - The module name
	 * @param {string} func - The function name
	 * @param {object} dependence - The dependence of function
	 * @throws {ReferenceError} If not all dependencies are met for the helper function
	 * @memberof module:core~HelpLib#
	 * @private
	 */
	function checkDependenceList(mod, func, dependence) {
		if(dependence !== null) {
			for(let depLib in dependence) {
				if(checkDependence.call(this, depLib, dependence[depLib]) === false) {
					let fullName = mod === NAME_COMMONLIB ? func : mod + '.' + func;
					throw new ReferenceError(`Not all dependencies are met for the helper function "${fullName}"`);
				}
			}
		}
	}

	/**
	 * The checkDependenceList methed
	 * @param {string} mod - The module name
	 * @param {string} func - The functions name
	 * @return {boolean} The result of check
	 * @memberof module:core~HelpLib#
	 * @private
	 */
	function checkDependence(mod, funcs) {
		mod = String(mod).trim();
		mod = mod === NAME_ROOTLIB ? NAME_COMMONLIB : mod;
		funcs = String(funcs).trim();

		if(this.modList[mod] === undefined) {
			return false;
		}

		if(funcs.length > 0) {
			funcs = String(funcs).split(',');
			for(let i in funcs) {
				funcs[i] = funcs[i].trim();
				if(funcs[i].length > 0 && this.modList[mod][funcs[i]] === undefined) {
					return false;
				}
			}
		}

		return true;
	}

	/**
	 * The getOwnPropertyList methed
	 * @return {string[]} The list of properties
	 * @memberof module:core~HelpLib#
	 * @private
	 */
	function getOwnPropertyList() {
		let curObj = this;
		let propList = [];

		do {
			propList = propList.concat(Object.getOwnPropertyNames(curObj));
		} while((curObj = Object.getPrototypeOf(curObj)));

		return propList;
	}

	return new HelpLib();
})();

module.exports = $namespace$;
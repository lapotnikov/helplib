((helpLib) => {

	helpLib.regHelper('obj', 'is', null, (obj) => {
		return typeof obj === 'object' && obj !== null ? true : false;
	});

	helpLib.regHelper('obj', 'isSet', null, (obj) => {
		return this.obj.is(obj) && this.isInstance(obj,' Set') ? true : false;
	});

	helpLib.regHelper('obj', 'isWeakSet', null, (obj) => {
		return this.obj.is(obj) && this.isInstance(obj,' WeakSet') ? true : false;
	});

	helpLib.regHelper('obj', 'isMap', null, (obj) => {
		return this.obj.is(obj) && this.isInstance(obj,' Map') ? true : false;
	});

	helpLib.regHelper('obj', 'isWeakMap', null, (obj) => {
		return this.obj.is(obj) && this.isInstance(obj,' WeakMap') ? true : false;
	});

	helpLib.regHelper('obj', 'isCollection', null, (obj) => {
		return this.obj.isSet(obj) || this.obj.isMap(obj) ? true : false;
	});

	helpLib.regHelper('obj', 'isWeakCollection', null, (obj) => {
		return this.obj.isWeakSet(obj) || this.obj.isWeakMap(obj) ? true : false;
	});

	helpLib.regHelper('obj', 'check', null, (obj, defValue = {}) => {
		return this.obj.is(obj) ? obj : defValue;
	});

	helpLib.regHelper('obj', 'checkSet', null, (obj, defValue = new Set()) => {
		return this.obj.isSet(obj) ? obj : defValue;
	});

	helpLib.regHelper('obj', 'checkWeakSet', null, (obj, defValue = new WeakSet()) => {
		return this.obj.isWeakSet(obj) ? obj : defValue;
	});

	helpLib.regHelper('obj', 'checkMap', null, (obj, defValue = new Map()) => {
		return this.obj.isMap(obj) ? obj : defValue;
	});

	helpLib.regHelper('obj', 'checkWeakMap', null, (obj, defValue = new WeakMap()) => {
		return this.obj.isWeakMap(obj) ? obj : defValue;
	});

	helpLib.regHelper('obj', 'size', null, (obj) => {
		let ret = 0;
		objTypify(obj,
			() => ret = Object.keys(obj).length,
			() => ret = obj.size
		);

		return ret;
	});

	helpLib.regHelper('obj', 'forEach', null, (obj, callback) => {
		checkCallback(callback);
		objTypify(obj,
			() => {
				for(let prop in obj) {
					if(Object.prototype.hasOwnProperty.call(obj, prop)) {
						callback(obj[prop], prop, obj);
					}
				}
			},
			() => obj.forEach(callback)
		);
	});

	helpLib.regHelper('obj', 'toArray', null, (obj) => {
		let ret = [];
		objTypify(obj,
			() => ret = Object.values(obj),
			() => ret = Array.from(obj.values())
		);

		return ret;
	});

	helpLib.regHelper('obj', 'copy', null, (obj) => {
		let ret = {};
		objTypify(obj,
			() => ret = Object.assign({}, obj),
			(className) =>  {
				if(className === 'Set') {
					ret = new Set(obj);
				} else {
					ret = new Map(obj);
				}
			}
		);

		return ret;
	});

	helpLib.regHelper('obj', 'merge', null, (...objList) => {
		let ret = {};
		let collection = 'Object';

		let fillRet = (prop, value) => {
			switch(collection) {
				case 'Object': ret[prop] = value; break;
				case 'Set': ret.add(value); break;
				case 'Map': ret.set(prop, value); break;
			}
		};

		for(let i of objList) {
			let obj = objList[i];
			objTypify(obj,
				() => {
					for(let prop in obj) {
						if(Object.prototype.hasOwnProperty.call(obj, prop)) {
							fillRet(prop, obj[prop]);
						}
					}
				},
				(className) =>  {
					if(i === 0) {
						collection = className;
						ret = className === 'Set' ? new Set() : new Map();
					}

					if(className === 'Map') {
						for(let prop of obj) {
							fillRet(prop[0], prop[1]);
						}
					} else if(collection === 'Set') {
						for(let prop of obj) {
							fillRet(null, prop);
						}
					}
				}
			);
		}

		return ret;
	});

	function objTypify(obj, defCallback, collectionCallback, weakCollectionCallback) {
		if(helpLib.obj.is(obj)) {
			if(helpLib.isInstance(obj,' Set')) {
				collectionCallback('Set');
			} else if(helpLib.isInstance(obj,' Map')) {
				collectionCallback('Map');
			} else if(helpLib.isInstance(obj,' WeakSet')) {
				weakCollectionCallback('WeakSet');
			} else if(helpLib.isInstance(obj,' WeakMap')) {
				weakCollectionCallback('WeakMap');
			} else {
				defCallback('Object');
			}
		}
	}

	function checkCallback(callback) {
		if(typeof callback !== 'function') {
			throw new TypeError('The callback is not a function');
		}
	}

})(helpLib);
const $moduleNamespace$ = (helpLib) => {

	helpLib.regHelper('obj', 'is', null, function(obj) {
		return typeof obj === 'object' && obj !== null ? true : false;
	});

	helpLib.regHelper('obj', 'isSet', {'.': 'isInstance'}, function(obj) {
		return this.obj.is(obj) && this.isInstance(obj,' Set') ? true : false;
	});

	helpLib.regHelper('obj', 'isWeakSet', {'.': 'isInstance'}, function(obj) {
		return this.obj.is(obj) && this.isInstance(obj,' WeakSet') ? true : false;
	});

	helpLib.regHelper('obj', 'isMap', {'.': 'isInstance'}, function(obj) {
		return this.obj.is(obj) && this.isInstance(obj,' Map') ? true : false;
	});

	helpLib.regHelper('obj', 'isWeakMap', {'.': 'isInstance'}, function(obj) {
		return this.obj.is(obj) && this.isInstance(obj,' WeakMap') ? true : false;
	});

	helpLib.regHelper('obj', 'isCollection', null, function(obj) {
		return this.obj.isSet(obj) || this.obj.isMap(obj) ? true : false;
	});

	helpLib.regHelper('obj', 'isWeakCollection', null, function(obj) {
		return this.obj.isWeakSet(obj) || this.obj.isWeakMap(obj) ? true : false;
	});

	helpLib.regHelper('obj', 'check', null, function(obj, defValue = {}) {
		return this.obj.is(obj) ? obj : defValue;
	});

	helpLib.regHelper('obj', 'checkSet', null, function(obj, defValue = new Set()) {
		return this.obj.isSet(obj) ? obj : defValue;
	});

	helpLib.regHelper('obj', 'checkWeakSet', null, function(obj, defValue = new WeakSet()) {
		return this.obj.isWeakSet(obj) ? obj : defValue;
	});

	helpLib.regHelper('obj', 'checkMap', null, function(obj, defValue = new Map()) {
		return this.obj.isMap(obj) ? obj : defValue;
	});

	helpLib.regHelper('obj', 'checkWeakMap', null, function(obj, defValue = new WeakMap()) {
		return this.obj.isWeakMap(obj) ? obj : defValue;
	});

	helpLib.regHelper('obj', 'size', {'.': 'isInstance'}, function(obj) {
		let ret = 0;
		objTypify(obj,
			() => ret = Object.keys(obj).length,
			() => ret = obj.size
		);

		return ret;
	});

	helpLib.regHelper('obj', 'forEach', {'.': 'isInstance', func: 'is'}, function(obj, callback) {
		if(this.func.is(callback)) {
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
		}
	});

	helpLib.regHelper('obj', 'toArray', {'.': 'isInstance'}, function(obj) {
		let ret = [];
		objTypify(obj,
			() => ret = Object.values(obj),
			() => ret = Array.from(obj.values())
		);

		return ret;
	});

	helpLib.regHelper('obj', 'copy', {'.': 'isInstance'}, function(obj) {
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

	helpLib.regHelper('obj', 'merge', {'.': 'isInstance'}, function(...objList) {
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
						let objArr = obj.values();
						for(let i of objArr) {
							fillRet(i, objArr[i]);
						}
					}
				}
			);
		}

		return ret;
	});

	function objTypify(obj, defCallback, collectionCallback, weakCollectionCallback) {
		if(helpLib.obj.is(obj)) {
			if(helpLib.isInstance(obj,' Set') && collectionCallback !== undefined) {
				collectionCallback('Set');
			} else if(helpLib.isInstance(obj,' Map') && collectionCallback !== undefined) {
				collectionCallback('Map');
			} else if(helpLib.isInstance(obj,' WeakSet') && weakCollectionCallback !== undefined) {
				weakCollectionCallback('WeakSet');
			} else if(helpLib.isInstance(obj,' WeakMap') && weakCollectionCallback !== undefined) {
				weakCollectionCallback('WeakMap');
			} else if(defCallback !== undefined) {
				defCallback('Object');
			}
		}
	}
};

module.exports = $moduleNamespace$;
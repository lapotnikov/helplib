const $moduleNamespace$ = (helpLib) => {

	helpLib.regHelper('.', 'isSet', null, function(val) {
		return val === null || val === undefined ? false : true;
	});

	helpLib.regHelper('.', 'isScalar', null, function(val) {
		return (/boolean|number|string/).test(typeof val);
	});

	helpLib.regHelper('.', 'isEmpty', null, function(val) {
		if(this.isSet(val) == false) {
			return true;
		} else {
			var type = typeof(val);
			switch(type) {
				case 'boolean': return val == false ? true : false;
				case 'number': return isNaN(val) || val == 0 ? true : false;
				case 'string': return val.trim().length == 0 ? true : false;
				case 'object': return Object.keys(val).length == 0 ? true : false;
				default: return false;
			}
		}
	});

	helpLib.regHelper('.', 'isInstance', null, function(obj, cls, onlyFirstLevel = false) {
		if(this.isSet(cls)) {
			let clsType = typeof cls;
			switch(clsType) {
				case 'string': cls = cls.trim(); break
				case 'object': cls = cls.constructor.name; break
				case 'function': cls = cls.name; break
				default: cls = null;
			}
		} else {
			cls = null;
		}

		if(typeof obj === 'object' && cls !== null) {
			while(obj !== null) {
				if(cls === obj.constructor.name) {
					return true;
				} else {
					obj = obj.__proto__;
				}

				if(onlyFirstLevel) {
					break;
				}
			}
		}

		return false;
	});
};

module.exports = $moduleNamespace$;
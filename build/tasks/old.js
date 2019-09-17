exports.checkFile = (path, error) => {
	if(fs.existsSync(path) == false || (fs.statSync(path)).isFile() == false) {
		throw error;
	}
};

exports.checkDir = (path, error) => {
	if(fs.existsSync(path) == false || (fs.statSync(path)).isDirectory() == false) {
		throw error;
	}
};

exports.checkStr = (regExp, str, error) => {
	if(regExp.test(str) === false) {
		throw error;
	}
};
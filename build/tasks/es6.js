const inlining = require("gulp-inlining-node-require");

/**
 * Create gulp task of modules building
 */
exports.buildModules = (gulp, taskName, cwdPath, distPath, modulePathList, tplVars) => {
	gulp.task(taskName, () => {
		let streams = [];

		for(let modulePath of modulePathList) {
			streams.push(
				gulp.src(modulePath.src, {cwd: cwdPath})
					.on('error', error => console.error(error))
					.pipe(template(tplVars, templateConf))
					//.pipe(abspath({rootDir: distPath}))
					.pipe(inlining())
					//.pipe(requireModules({dist: true, modulesManifestPath: distPath, fromDirectory: cwdPath + '/src', distDirectory: distPath}))
					.pipe(rename(modulePath.name))
					.pipe(gulp.dest(distPath, {cwd: cwdPath}))
			);
		}

		return mergeStream.apply(mergeStream, streams);
	});
};
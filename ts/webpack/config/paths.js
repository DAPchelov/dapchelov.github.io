const path = require('path');
const fs = require('fs');
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

module.exports = {
	buildPath: resolveApp('build'),
	appHtml: resolveApp('public/index.html'),
	appFavicon: resolveApp('public/favicon.ico'),
	appTsConfig: resolveApp('tsconfig.json'),
	entryPath: resolveApp('src/index.tsx'),
};
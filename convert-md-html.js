#/usr/env/node

const globby = require('globby');

globby(['*', '!cake']).then(paths => {
	console.log(paths);
	//=> ['unicorn', 'rainbow']
});

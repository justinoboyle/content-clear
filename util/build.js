var path = require('path');
var fs = require('fs');
var autoprefixer = require('autoprefixer');
var clean = require('postcss-clean');
var postcss      = require('postcss');
var sha256 = require('sha256');
var package = require('../package.json');

var location = path.join(__dirname, '../src/style.css');
var locationBuildLock = path.join(__dirname, '../build/lock');
var locationBuild = path.join(__dirname, '../build/style-min.css');

var buildLock = false;
try {
    buildLock = fs.readFileSync(locationBuildLock, 'utf-8');
} catch (e) { }

var content = fs.readFileSync(location, 'utf-8');

var hash = sha256(content);

if(buildLock == sha256(content)) {
    console.log('Already built. Nothing to do.');
    process.exit(0);
}

postcss([ autoprefixer, clean() ]).process(content).then(function (result) {
    result.warnings().forEach(function (warn) {
        console.warn(warn.toString());
    });
    let map = [];
    map.push(package.name + ' version ' + package.version + ' by ' + package.author);
    map.push('build ' + hash);
    map.push(package.license + ' license.');
    result.css = '/*\n' + map.join('\n') + '\n*/\n' + result.css;
    hash = sha256(result.css);
    console.log('Built CSS. Length: ' + result.css.length);
    console.log('Hash: ' + hash);
    fs.writeFileSync(locationBuildLock, hash, 'utf-8');
    console.log('Writing lock.');
    fs.writeFileSync(locationBuild, result.css, 'utf-8');
    console.log('Writing CSS.');
    console.log('Done. Nothing more to do.');
    process.exit(0);
});
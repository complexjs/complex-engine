var helper = require('littlehelper');

helper.init();
var files = [
	'libs/Class.js',

	'complex.js',
	'src/Component.js',
	'src/Engine.js',
	'src/Entity.js',
	'src/Screen.js',
	'src/System.js',
	'src/World.js',
	'src/Manager.js',
];

helper.Compiler.compile(files, "./build/complex.js", function(){
    console.log("New Complex Build @ "+(new Date()));
}, true); 
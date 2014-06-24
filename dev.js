var helper = require('littlehelper');

helper.init();
var files = [
	'libs/Class.js',

	'complex.js',
	'src/Component.js',
	'src/Entity.js',
	'src/System.js',
	'src/EntitySystem.js',
	'src/VoidSystem.js',
	'src/World.js',
	'src/Manager.js',

	'src/Custom/Script/Component.js',
	'src/Custom/Script/System.js',
	'src/Custom/Script/Script.js',
];

helper.Compiler.compile(files, "./build/complex.js", function(){
    console.log("New Complex Build @ "+(new Date()));
}, true); 
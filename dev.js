var helper = require('littlehelper');
helper.init();
var files = [
	'complex/complex.js',
	'complex/src/Component.js',
	'complex/src/Engine.js',
	'complex/src/Entity.js',
	'complex/src/Screen.js',
	'complex/src/System.js',
	'complex/src/World.js',
]

helper.Compiler.compile(files, "./complex/build/complex.js", function(){
    console.log("New Complex Build @ "+(new Date()));
}); 
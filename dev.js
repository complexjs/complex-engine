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
	'src/Manager.js'
];

helper.Compiler.compile(files, "./build/complex.js", function(){
    console.log("New Complex Build @ "+(new Date()));
}, {
    minify : true,
	appendFileInfo : true
});

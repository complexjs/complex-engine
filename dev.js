var helper = require('littlehelper');

helper.init();
var files = [
	'complex.js',

	'src/Core/Component.js',
	'src/Core/Entity.js',
	'src/Core/World.js',

	'src/System/System.js',
	'src/System/EntitySystem.js',
	'src/System/VoidSystem.js',

	'src/Manager/Manager.js'
];

helper.Compiler.compile(files, "./build/complex.js", function(){
    console.log("New Complex Build @ "+(new Date()));
}, {
    minify : true,
	appendFileInfo : true
});

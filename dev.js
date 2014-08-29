var helper = require('littlehelper');

helper.init();
var files = [
	'src/complex.js',
	'src/GameObject.js',
	'src/Component.js',
	'src/Entity.js',
	'src/System.js',
	'src/EntitySystem.js',
	'src/World.js',
	'src/Manager.js',
	'src/end.js'
];

helper.Compiler.compile(files, "./build/complex.js", function(){
    console.log("New Complex Build @ "+(new Date()));
}, {
    minify : true,
	appendFileInfo : true
});

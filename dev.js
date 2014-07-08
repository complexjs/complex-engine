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

	'src/Custom/Script/ScriptComponent.js',
	'src/Custom/Script/ScriptSystem.js',
	'src/Custom/Script/Script.js',

	'src/Custom/Stats/StatsSystem.js',
	'src/Custom/DatGui/DatGuiSystem.js',

	'src/Custom/Debug/DebugSystem.js',
	'src/Custom/Debug/DebugComponent.js',
];

helper.Compiler.compile(files, "./build/complex.js", function(){
    console.log("New Complex Build @ "+(new Date()));
}, true);

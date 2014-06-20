var ScriptComponent = cx.Component.extend({
	name:'cx.scriptcomponent',
	script : null,
	setup : false,
	init : function(script){
		this.script = script;
	}
});
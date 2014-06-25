var ScriptComponent = cx.Component.extend({
	tag:'cx.scriptcomponent',
	script : null,
	setup : false,
	init : function(script){
		this.script = script;
	}
});
var ScriptComponent = cx.Component.extend({
	tag:'cx.ScriptComponent',
	script : null,
	setup : false,
	init : function(script){
		this._super();
		this.script = script;
	}
});

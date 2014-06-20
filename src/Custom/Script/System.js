var ScriptSystem = cx.EntitySystem.extend({
	tag : 'cx.scriptsystem',

	init : function(){
		this.components = ["cx.scriptcomponent"];
		this.type = this.TYPE_PROCESS;

	},

	update : function( entity, components){

		var scriptcomponent = components["cx.scriptcomponent"];
		var script = scriptcomponent.script;

		if ( scriptcomponent.setup == false ){
			script.setup(entity);
			scriptcomponent.setup = true;
		}
		script.update();
	}
});
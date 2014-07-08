var ScriptSystem = cx.EntitySystem.extend({
	tag : 'cx.ScriptSystem',

	init : function(){
		this._super();
		this.components = ["cx.ScriptComponent"];
	},

	update : function( entity, components){
		var scriptcomponent = components["cx.ScriptComponent"];
		var script = scriptcomponent.script;

		if ( scriptcomponent.setup == false ){
			script.setup(entity);
			scriptcomponent.setup = true;
		}
		script.update();
	}
});

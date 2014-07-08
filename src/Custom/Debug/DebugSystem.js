var DebugSystem = cx.VoidSystem.extend({

	init : function(guiSystem){
		this._super();
		this.tag = "cx.DebugSystem";
		this.guiSystem = guiSystem;
	},

	added : function(entity){
		this.loadEntity(entity);
	},

	addObject : function(text, object, excluded){
		excluded = excluded || [];
		var keys = Object.keys(object);
		for(var i = 0; i < keys.length; i++ ) {
			var key = keys[i];
			if ( key == "debugable"){
				continue;
			}
			if ( this.isPropertyExcluded(key, excluded) ){
				continue;
			}
			if ( typeof object[key] == "boolean" || (typeof object[key] == "number" || typeof object[key] == "string")) {
				this.guiSystem.addToGroup(text, object, key);
			}
			if ( typeof object[key] == "object" && object[key] != null && object[key].debugable == true){
				this.addObject(text, object[key]);
			}
		}
	},
	isPropertyExcluded : function( property, list){
		for(var i = 0, len = list.length; i < len; i++){
			if ( property == list[i]){
				return true;
			}
		}
		return false;
	},
	loadSystem : function( systemname, excluded ) {
		var system = null;
		if ( (system = this.world.getSystem(systemname)) == null ){
			return;
		}
		this.addObject(system.tag, system, excluded);

	},
	loadEntity : function( entity, excluded ){
		var debugComponent = entity.getComponent("cx.DebugComponent");
		if ( debugComponent == null ) {
			return;
		}
		var tags = debugComponent.components;

		for ( var t = 0, tLen = tags.length; t < tLen; t++ ) {
			var tag = tags[t];
			var component = entity.getComponent(tag);
			this.addObject(entity.tag+"."+component.tag, component, excluded);
		}
	},

	update : function(){

	}
});

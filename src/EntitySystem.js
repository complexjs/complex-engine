cx.EntitySystem = cx.System.extend({
	init : function( components ) {
		this._super();
		this.components = components;
		this.type = this.TYPE_PROCESS;
	},

	/**
	* @param entity Entity
	* @param components array Array contains componens accessable via tag name `components['cx.scriptcomponent']`
	* called every tick for every entity
	*/
	update : function(entity, components){}

});

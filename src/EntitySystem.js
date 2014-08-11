cx.EntitySystem = cx.System.extend({
	init : function( components ) {
		this._super();
		this.components = components;
		this.type = this.TYPE_PROCESS;
	},

	/**
	 * Update entities
	 * @param  {cx.Entity} entity     [description]
	 * @param  {cx.Component[]} components [description]
	 */
	update : function(entity, components){}

});

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
	update : function(entity, components){},

	/**
	 * [added description]
	 * @param  {cx.Entity} entity [description]
	 * @return {[type]}        [description]
	 */
	added : function (entity){},

	/**
	 * [removed description]
	 * @param  {cx.Entity} entity [description]
	 * @return {[type]}        [description]
	 */
	removed : function(entity){}

});

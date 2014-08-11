/**
 * [init description]
 */
cx.Entity = cx.GameObject.extend({
	components : [],
	world : null,
	alive : true,

    /**
     * constructor
     */
	init : function(){
		this.components = [];
		this.alive = true;
		this.remove = false;
	},

	/**
	 * [getWorld description]
	 */
	getWorld : function(){
		return this.world;
	},

	/**
	 * [setWorld description]
	 * @param {cx.World} world [description]
	 */
	setWorld : function( world){
		this.world = world;
	},

	/**
	 * Add a component to the entity
	 * @param {cx.Component} component [description]
	 */
	addComponent : function ( component ) {
		var slot = this._getFreeSlot();
		if( slot != null ){
			this.components[slot] = component;
		} else {
			this.components.push( component );
		}
	},

	/**
	 * Get a component from this entity
	 * @param {string} componentName [description]
	 */
	getComponent : function ( componentName ) {
		for(var i = 0, len = this.components.length; i < len; i++){
			var component = this.components[i];
			if(component.tag == componentName){
				return component;
			}
		}
		return null;
	},

	/**
	 * Get all components
	 */
	getComponents : function() {
		return this.components;
	},

	/**
	 * Remove component from this entity
	 * @param {string} componentName [description]
	 */
	removeComponent : function(componentName){
		for(var i = 0, len = this.components.length; i < len; i++){
			var component = this.components[i];
			if(component.tag == componentName){
				delete this.components[i];
			}
		}
	},

	/**
	*	Destroy entity and remove it from the world
	*/
	destroy : function(){
		this.alive = false;
		this.remove = true;
	},

	/**
	 * Search a free slot for a component
	 */
	_getFreeSlot : function(){
		for(var c = 0, len = this.components.length; c < len; c++){
			var component = this.components[c];
			if(component == undefined || component == null ){
				return c;
			}
		}
		return null;
	}
});

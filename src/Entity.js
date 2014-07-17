/**
 * [Entity description]
 */
cx.Entity = Class.extend({
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

	getWorld : function(){
		return this.world;
	},

	setWorld : function( world){
		this.world = world;
	},
    /**
     * add a component to the entity
     * @param component
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
     * get a component by its name
     * @param componentName
     * @returns {*}
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
	*	Remove a component from the entity
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

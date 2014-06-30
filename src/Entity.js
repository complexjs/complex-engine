/**
 * [Entity description]
 */
cx.Entity = Class.extend({
	components : [],
	world : null,
    /**
     * constructor
     */
	init : function(){
		this.components = [];
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
		this.components[component.tag] = component;
	},

    /**
     * get a component by its name
     * @param componentName
     * @returns {*}
     */
	getComponent : function ( componentName ) {
		var c = this.components[componentName];

		return c || null;
	}
});
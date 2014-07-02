
/**
 * [System description]
 * @param {[type]} arrayOfComponents [description]
 */
cx.System = Class.extend({
    world : null,
    tag : null,

	init : function(){
		this.TYPE_VOID = "void";
		this.TYPE_PROCESS = "process";
	},

    /**
     * Set the worldobject when the system is added
     * @param world
     */
    setWorld : function ( world ) {
        this.world = world;
    },

    /**
     * retrive the world object
     * @returns {null}
     */
    getWorld : function() {
        return this.world;
    },

    /**
     * called for an entity if the required components are matching these of the entity
     * @param entity
     * @param componens Key Value store. Components can be accessed with the componentName `components["myComponent"]`
     */
	update : function( entity, componens){}

});

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
        this.debugable = true;
	},

    /**
    * called as soon the system has been added to the world object
    */
    addedToWorld : function(){},

    /**
     * Set World
     * @param {cx.World} world [description]
     */
    setWorld : function ( world ) {
        this.world = world;
    },

    /**
     * retrive the world object
     * @returns {cx.World}
     */
    getWorld : function() {
        return this.world;
    },

});

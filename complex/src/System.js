
/**
 * [System description]
 * @param {[type]} arrayOfComponents [description]
 */
cx.System = Class.extend({
	components : [],
	TYPE_VOID : "void",
	TYPE_PROCESS : "process",
	type : "process",

    /**
     * Initialize a new system
     * @param components required components for this system
     */
	init : function( components ){
		this.components = components;
	},

    /**
     * called for an entity if the required components are matching these of the entity
     * @param entity
     * @param componens
     */
	update : function( entity, componens){}
});


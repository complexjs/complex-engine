
/**
 * [System description]
 * @param {[type]} arrayOfComponents [description]
 */
cx.System = Class.extend({
	components : [],
	TYPE_VOID : "void",
	TYPE_PROCESS : "process",
	type : "process",

	init : function(){
		
	},
	setComponents : function ( components ) {
		this.components = components;
	},
	update : function(){}
});


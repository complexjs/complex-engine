cx.VoidSystem = cx.System.extend({
	type : this.TYPE_PROCESS,
	components : null,

	init : function( components ) {
		this.components = components;
	},

});
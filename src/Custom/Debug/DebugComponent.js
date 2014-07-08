var DebugComponent = cx.Component.extend({
	tag : "cx.DebugComponent",
	components : [],
	init : function( components ){
		this._super();
		this.components = components;
	},
});

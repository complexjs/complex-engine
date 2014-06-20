cx.Script = Class.extend({
	entity : null,
	setup : function( entity ){
		this.entity = entity;
		this.onSetup();
		this.isSetUp = true;
	},

	onSetup : function(){},
	update : function(){}
});
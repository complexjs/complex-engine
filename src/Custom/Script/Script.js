cx.Script = Class.extend({
	entity : null,
	init : function(){

	},
	setup : function( entity ){
		this.entity = entity;
		this.onSetup();
		this.isSetUp = true;
	},

	onSetup : function(){},
	update : function(){}
});

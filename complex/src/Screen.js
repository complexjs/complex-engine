/**
 * Represents the current shown&rendered screen
 */

cx.Screen = Class.extend({
	init : function(){
		this.world = new cx.World();
		this.tag = "cx.Screen";
	},

	show : function(){},
	hide : function(){},
	onUpdate : function(){},
	
	update : function(){
		this.world.update();
		this.onUpdate();
	}
});

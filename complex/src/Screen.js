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
	postUpdate : function(){},
	preUpdate : function(){},
	
	update : function(){
		this.preUpdate();
		this.world.update();
		this.postUpdate();
	}
});

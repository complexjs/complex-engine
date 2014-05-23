/**
 * Represents the current shown&rendered screen
 */

cx.Screen = Class.extend({
    /**
     * constructor
     */
	init : function(){
		this.world = new cx.World();
		this.tag = "cx.Screen";
	},

    /**
     * called when the screen is shown
     */
	show : function(){},

    /**
     * called when an other screen will be shown
     */
	hide : function(){},

    /**
     * called after update
     */
	postUpdate : function(){},

    /**
     * called before update
     */
	preUpdate : function(){},

    /**
     * updates the current world
     */
	update : function(){
		this.preUpdate();
		this.world.update();
		this.postUpdate();
	}
});

/**
 * Created by fabs on 11/13/13.
 */

cx.Screen('MenuScreen', {
	_world : null,

	setWorld : function(world)
	{
		this._world = world;
	},

	update : function()
	{
		this._world.update();
	}
});
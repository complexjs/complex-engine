cx.Component("Box2DComponent", {
	body : null,

	constructor : function( body )
	{
		this.body = body;
	},

	getPosition : function()
	{
		return this.body.m_position;
	}
});

cx.Component("DrawComponent", {
	width: 0, 
	height: 0,
	constructor : function(x, y, w, h){
		this.x = x;
		this.y = y;
		this.width = w;
		this.height = h;
	}
});

cx.Component("ScriptComponent", {
	initialized : false,
	script : null,
	constructor : function(script)
	{
		this.script = script;
	}
})
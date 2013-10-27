cx.Component("Box2DComponent", {
	body : null,
	constructor : function( body )
	{
		this.body = body;
	}
});

cx.Component("DrawComponent", {
	x : 0,
	y : 0,
	width: 0, 
	height: 0,
	constructor : function(x, y, w, h){
		this.x = x;
		this.y = y;
		this.width = w;
		this.height = h;
	}
});
/**
 * StatsSystem
 * @param  {[type]} )	{		this.stats     = new Stats();		this.stats.setMode(0); 		this.stats.domElement.style.position = 'absolute';		this.stats.domElement.style.left = '10px';		this.stats.domElement.style.top = '10px';	 	document.body.appendChild( this.stats.domElement );	 	this.stats.begin();	}
 * @param  {[type]} update:function()	{                                        	this.stats.end();                                                                       	this.stats.begin();	}}
 * @return {[type]}
 */
cx.System("StatsSystem", [], {

	stats : null,
	constructor : function()
	{
		this.stats = new Stats();
		this.stats.setMode(0); // 0: fps, 1: ms
		this.stats.domElement.style.position = 'absolute';
		this.stats.domElement.style.left = '10px';
		this.stats.domElement.style.top = '10px';
	 	document.body.appendChild( this.stats.domElement );
	 	this.stats.begin();

	},

	update:function()
	{
    	this.stats.end();
    	this.stats.begin();
	}
});

/** 
* Draw System
*/
cx.System('DrawSystem', ['DrawComponent'], {

	canvas : null,
	ctx : null,

	constructor : function(canvas)
	{
		this.canvas = canvas;
		this.ctx = canvas.getContext('2d');
	},
	
	update : function(entity)
	{
		var drawComponent = entity.getComponent("DrawComponent");
		
		
		this.ctx.fillStyle="#FF0000";
		this.ctx.fillRect(drawComponent.x, drawComponent.y, drawComponent.width, drawComponent.height);


	}
});

cx.System('Box2DSystem', [], {
   
   world : null,
   
   constructor : function()
   {
       var worldAABB = Box2D.b2AABB();
        worldAABB.minVertex.Set(-1000, -1000);
	    worldAABB.maxVertex.Set(1000, 1000);
	    
		this.world = new Box2D.b2World(worldAABB, new Box2D.b2Vec2(0, 300), true); 
		
   }
});

/**
 * Box2DSystem
 */
 /*
cx.System("Box2DSystem", [], {
	world : null,


	constructor : function()
	{
		var worldAABB = new b2AABB();
		worldAABB.minVertex.Set(-1000, -1000);
		worldAABB.maxVertex.Set(1000, 1000);

		this.world = new b2World(worldAABB, new b2Vec2(0, 300), true); 
	},

	update : function()
	{
		var timeStep = 1.0/60;
		var iteration = 1;
		this.world.Step(timeStep, iteration);
	},

	createCircle : function(x, y, radius)
	{
		var circleSd = new b2CircleDef();
		circleSd.density = 1.0;
		circleSd.radius = radius;
		circleSd.restitution = 1.0;
		circleSd.friction = 0;
		var circleBd = new b2BodyDef();
		circleBd.AddShape(circleSd);
		circleBd.position.Set(x,y);

		this.world.CreateBody(circleBd);

		return circleBd;
	},
});
*/
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
cx.System('DrawSystem', ['DrawComponent', 'Box2DComponent'], {

	canvas : null,
	ctx : null,
	size : null,

	constructor : function(canvas)
	{
		this.canvas = canvas;
		this.ctx = canvas.getContext('2d');
		this.size = new cx.Vector(this.canvas.width, this.canvas.height);
	},
	
	update : function(entity)
	{
		var drawComponent = entity.getComponent("DrawComponent");
		var box2dComponent = entity.getComponent("Box2DComponent");

		var position = box2dComponent.getPosition();
		
		console.log(position.y);

		this.ctx.fillStyle="#FF0000";
		this.ctx.fillRect(position.x, position.y, drawComponent.width, drawComponent.height);
	}
});

cx.System('ClearSystem', [], 
{
	drawSystem : null,
	ctx : null,
	size : null,

	init : function()
	{
		this.drawSystem = this.world.getSystem("DrawSystem");
		this.ctx = this.drawSystem.ctx;
		this.size = this.drawSystem.size;

	},
	update : function()
	{
		this.ctx.clearRect(0, 0, this.size.x, this.size.y);
	}
});


cx.System('Box2DSystem', [], 
{
    box2Dworld : null,

    constructor : function()
    {
      	var worldAABB = new b2AABB();
		worldAABB.minVertex.Set(-320, -210);
		worldAABB.maxVertex.Set(320, 210);
		var gravity = new b2Vec2(0, 3);
		var doSleep = true;
		this.box2Dworld = new b2World(worldAABB, gravity, doSleep); 
    },
    
    update : function()
    {
        this.box2Dworld.Step(1000/60, 1);
    },
    
    add : function ( body )
    {
        return this.box2Dworld.CreateBody(body);
    },    
});


cx.System('ScriptSystem', ['ScriptComponent'], 
{

   
    
    update : function(entity)
    {
    	var component = entity.getComponent("ScriptComponent");
   		if(!component.initialized)
   		{
   			if(component.script.init)
   				component.script.init();
   			component.initialized = true;
   		}
   		component.script.update();

    },
    
     
});

var screen;

cx.init(function()
{
	start();
});



function start()
{
	screen = new MenuScreen();

	var world = new cx.World();
	cx.Engine.world = world;

	world.setSystem(new DrawSystem(document.getElementById("screen")));
	world.setSystem(new StatsSystem());
	world.setSystem(new Box2DSystem());
	world.setSystem(new ClearSystem());
	world.setSystem(new ScriptSystem());

	var playerEntity = createPlayerEntity();
	world.addEntity(playerEntity);
	screen.setWorld(world);
	cx.Engine.setScreen(screen);
	setInterval(cx.Engine.update, 1000/60);
}

function createPlayerEntity()
{
	var world = cx.Engine.world;
	var playerEntity = world.createEntity();
	playerEntity.addComponent(new DrawComponent(10, 10, 10, 10));
	playerEntity.addComponent(new ScriptComponent({
		update : function()
		{

		}
	}));
	return playerEntity;
}
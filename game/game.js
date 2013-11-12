var world = new cx.World();

world.setSystem(new DrawSystem(document.getElementById("screen")));
world.setSystem(new StatsSystem());
world.setSystem(new Box2DSystem());

var playerEntity = world.createEntity();
playerEntity.addComponent(new DrawComponent(10, 10, 10, 10));

box2DSystem = world.getSystem("Box2DSystem");

var circleBody = new Box2D.b2Body();



playerEntity.addComponent(new Box2DComponent());

playerEntity.addEntity

console.log(playerEntity);

world.addEntity(playerEntity);

setInterval(render, 1000/60);

function render()
{
	world.update();
}
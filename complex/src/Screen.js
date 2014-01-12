cx.Screen = function () {
	this.world = new cx.World();
}
cx.Screen.prototype.update = function() {
	this.world.update();
}
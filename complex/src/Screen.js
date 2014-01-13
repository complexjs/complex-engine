/**
 * Represents the current shown&rendered screen
 */
cx.Screen = function () {
	this.world = new cx.World();
	this.tag = "cx.Screen";
}

/**
 * Called when the screen will be set to engine
 * @return {[type]} [description]
 */
cx.Screen.prototype.show = function(){

}

/**
 * Called when an other screen is set to the engine
 * @return {[type]} [description]
 */
cx.Screen.prototype.hide = function(){

}

/**
 * Updates screen
 * @return {[type]} [description]
 */
cx.Screen.prototype.update = function() {
	this.world.update();
	this.onUpdate();
}

/**
 * Funcion which can be overwritten by custom screen to add custom logic
 * @return {[type]} [description]
 */
cx.Screen.prototype.onUpdate = function(){

}
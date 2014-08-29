/**
 * The component object
 * @param {[type]} data [description]
 */
(function(){
	/**
	 * @constructor
	 */
	var Component = function(){
		cx.GameObject.call(this);
	}
	Component.prototype = Object.create(cx.GameObject.prototype);
    Component.prototype.constructor = Component;
	cx.Component = Component;
})();

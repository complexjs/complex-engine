/**
 * [Entity description]
 */
cx.Entity = function() {
	this.components = [];
}
cx.Entity.prototype.addComponent = function( component ) {
	this.components.push(component);
};

/**
 * [System description]
 * @param {[type]} arrayOfComponents [description]
 */
cx.System = function() {
	this.components = [];
}
cx.System.prototype.init = function() {

}
cx.System.prototype.setComponents = function (components) {
	this.components = components;
}
cx.System.prototype.update = function ( entity ) {

}
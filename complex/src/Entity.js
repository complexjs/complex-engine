/**
 * [Entity description]
 */
cx.Entity = function() {
	this.components = [];
}

/**
 * Add a component to the entity
 * @param {[type]} component [description]
 */
cx.Entity.prototype.addComponent = function( component ) {
	this.components.push(component);
}

/**
 * 
 */
cx.Entity.prototype.getComponent = function( componentName ) {
	for(var i = 0, len = this.compnents.length; i < len; i++){
		var component = this.components[i];
		if(component.name == componentName){
			return component;
		}
	}
	return null;
}
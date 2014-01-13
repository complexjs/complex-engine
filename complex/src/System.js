
/**
 * [System description]
 * @param {[type]} arrayOfComponents [description]
 */
cx.System = function() {
	this.components = [];
	this.TYPE_VOID = "void";
	this.TYPE_PROCESS = "process";
	this.type = "process";
}

/**
 * Data which have to be initialized
 * @return {[type]} [description]
 */
cx.System.prototype.init = function() {
	/* Add custom code */
}

/**
 * add required components to a system 
 * @param {[type]} components [description]
 */
cx.System.prototype.setComponents = function (components) {
	this.components = components;
}

/**
 * Update function for a entity. Have to be overridden by cliencode
 * @param  {[type]} entity [description]
 * @return {[type]}        [description]
 */
cx.System.prototype.update = function ( entity, components ) {
	/* add custom code */
}
"use strict";

let cxSystem = require('../cxSystem');

/**
 * A system reacting on entities with specifiy components
 */
module.exports = class cxEntitySystem extends cxSystem {
	constructor () {
		super();

		/**
		 * Name of components the entity should have
		 * @type String[]
		 */
		this.components = [];

		/**
		 * Type of the process
		 * @type String
		 */
		this.type = cxSystem.getTypeProcess();
	}

	/**
	 * @param cxEntity entity
	 * @param cxComponent[] components
	 */
	update (entity, components) {
		throw 'Method not implemented';
	}

	/**
	 * @param cxEntity entity
	 * @param cxComponent[] components
	 */
	render ( entity, components) {
		throw 'Method not implemented';
	}
}

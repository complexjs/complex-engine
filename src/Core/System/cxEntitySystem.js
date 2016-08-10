"use strict";

let cxSystem = require('../cxSystem');
let NotImplemented = require('../Exception/NotImplemented');

/**
* @class cxEntitySystem
*/
module.exports = class cxEntitySystem extends cxSystem {
	constructor () {
		super();

		/**
		 * @property components
		 * @type {Array<String>}
		 */
		this.components = [];

		/**
		 * @type {String}
		 */
		this.type = cxSystem.getTypeProcess();
	}

	/**
	 * @method update
	 * @param {cxEntity} entity
	 * @param {Array<cxComponent>} components
	 */
	update (entity, components) {
		throw new NotImplemented();
	}

}

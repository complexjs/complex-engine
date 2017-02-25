"use strict";

import cxSystem from '../cxSystem';
import NotImplemented from '../Exception/NotImplemented';

/**
* @class cxEntitySystem
*/
export default class cxEntitySystem extends cxSystem {
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

"use strict";

let InvalidClass = require('./Exception/InvalidClass');
let cxComponent = require('./cxComponent');

/**
 * @class cxEntity
 */
module.exports = class cxEntity
{
	/**
	 * @param {String} name Name of the entity
	 */
	constructor (name) {
		name = name || "Entity";

		/**
		 * @property components
		 * @type {Array<cxComponent>}
		 */
		this.components = [];

		/**
		 * @property alive
		 * @type {Boolean}
		 */
		this.alive = true;

		/**
		 * @property remove
		 * @type {Boolean}
		 */
		this.remove = false;

		/**
		 * @property world
		 * @type {cxWorld}
		 */
		this.world = null;

		/**
		 * @property name
		 * @type {String}
		 */
		this.name = name;
	}

	/**
	 * Add a component to the entity
	 * @method addComponent
	 * @param {cxComponent} component
	 */
	addComponent ( component ) {
		//if(component instanceof cxComponent === false){
	//		throw new InvalidClass('cxComponent');
		//}

		let slot = this._getFreeSlot();
		if( slot != null ) {
			this.components[slot] = component;
		} else{
			this.components.push( component );
		}
	}

	/**
	 * Get a component from the entity by its tag name
	 * @method getComponent
	 * @param  {String} componentName
	 * @return {cxComponent}
	 */
	getComponents ( componentName ) {
		let components = [];
		for(let i = 0, len = this.components.length; i < len; i++) {
			let component = this.components[i];
			if(component.tag == componentName) {
				components.push(component);
			}
		}
		return components;
	}

	/**
	 * Get a component from the entity by its tag name
	 * @method hasComponent
	 * @param  {String} componentName
	 * @return {Boolean}
	 */
	hasComponent ( componentName ) {
		for(let i = 0, len = this.components.length; i < len; i++) {
			let component = this.components[i];
			if(component.tag == componentName) {
				return true;
			}
		}
		return false;
	}

	/**
	 * remove a component from the entity
	 * @method removeComponent
	 * @param {String} componentName
	 */
	removeComponent ( componentName ) {
		for(let i = 0, len = this.components.length; i < len; i++) {
			let component = this.components[i];
			if(component.tag == componentName) {
				delete this.components[i];
			}
		}
	}

	/**
	 * Get all components from the entity
	 * @method getComponents
	 * @return {Array<cxComponent>}
	 */
	getAllComponents () {
		return this.components;
	}

	/**
	 * Reuses old component slots in the array
	 * @method _getFreeSlot
	 * @return {Integer}
	 */
	_getFreeSlot () {
		for(let c = 0, len = this.components.length; c < len; c++) {
			let component = this.components[c];
			if(component == undefined || component == null ) {
				return c;
			}
		}
		return null;
	}

	/**
	 * Kills the entity
	 * @method destroy
	 */
	destroy () {
		this.alive = false;
		this.remove = true;
	}

	/**
	 * Get the worlobject from the entity
	 * @method getWorld
	 * @return {cxWorld}
	 */
	getWorld () {
		return this.world;
	}

	/**
	 * Set the worldobject
	 * @method setWorld
	 * @param {cxWorld} world
	 */
	setWorld ( world ) {
		this.world = world;
	}
}

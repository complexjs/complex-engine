"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _InvalidClass = require('./Exception/InvalidClass');

var _InvalidClass2 = _interopRequireDefault(_InvalidClass);

var _cxComponent = require('./cxComponent');

var _cxComponent2 = _interopRequireDefault(_cxComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class cxEntity
 */
var cxEntity = function () {
	/**
  * @param {String} name Name of the entity
  */
	function cxEntity(name) {
		_classCallCheck(this, cxEntity);

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


	_createClass(cxEntity, [{
		key: 'addComponent',
		value: function addComponent(component) {
			if (component instanceof _cxComponent2.default === false) {
				throw new _InvalidClass2.default('cxComponent');
			}

			var slot = this._getFreeSlot();
			if (slot != null) {
				this.components[slot] = component;
			} else {
				this.components.push(component);
			}
		}

		/**
   * Get a component from the entity by its tag name
   * @method getComponent
   * @param  {String} componentName
   * @return {cxComponent}
   */

	}, {
		key: 'getComponents',
		value: function getComponents(componentName) {
			var components = [];
			for (var i = 0, len = this.components.length; i < len; i++) {
				var component = this.components[i];
				if (component.tag == componentName) {
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

	}, {
		key: 'hasComponent',
		value: function hasComponent(componentName) {
			for (var i = 0, len = this.components.length; i < len; i++) {
				var component = this.components[i];
				if (component.tag == componentName) {
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

	}, {
		key: 'removeComponent',
		value: function removeComponent(componentName) {
			for (var i = 0, len = this.components.length; i < len; i++) {
				var component = this.components[i];
				if (component.tag == componentName) {
					delete this.components[i];
				}
			}
		}

		/**
   * Get all components from the entity
   * @method getComponents
   * @return {Array<cxComponent>}
   */

	}, {
		key: 'getAllComponents',
		value: function getAllComponents() {
			return this.components;
		}

		/**
   * Reuses old component slots in the array
   * @method _getFreeSlot
   * @return {Integer}
   */

	}, {
		key: '_getFreeSlot',
		value: function _getFreeSlot() {
			for (var c = 0, len = this.components.length; c < len; c++) {
				var component = this.components[c];
				if (component == undefined || component == null) {
					return c;
				}
			}
			return null;
		}

		/**
   * Kills the entity
   * @method destroy
   */

	}, {
		key: 'destroy',
		value: function destroy() {
			this.alive = false;
			this.remove = true;
		}

		/**
   * Get the worlobject from the entity
   * @method getWorld
   * @return {cxWorld}
   */

	}, {
		key: 'getWorld',
		value: function getWorld() {
			return this.world;
		}

		/**
   * Set the worldobject
   * @method setWorld
   * @param {cxWorld} world
   */

	}, {
		key: 'setWorld',
		value: function setWorld(world) {
			this.world = world;
		}
	}]);

	return cxEntity;
}();

exports.default = cxEntity;
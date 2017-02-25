"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _cxSystem = require('./cxSystem');

var _cxSystem2 = _interopRequireDefault(_cxSystem);

var _cxEntity = require('./cxEntity');

var _cxEntity2 = _interopRequireDefault(_cxEntity);

var _cxManager = require('./cxManager');

var _cxManager2 = _interopRequireDefault(_cxManager);

var _cxEntitySystem = require('./System/cxEntitySystem');

var _cxEntitySystem2 = _interopRequireDefault(_cxEntitySystem);

var _cxVoidSystem = require('./System/cxVoidSystem');

var _cxVoidSystem2 = _interopRequireDefault(_cxVoidSystem);

var _InvalidClass = require('./Exception/InvalidClass');

var _InvalidClass2 = _interopRequireDefault(_InvalidClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * The world contains all entities, systems and managers
 * @class cxWorld
 */
var cxWorld = function () {
	function cxWorld() {
		_classCallCheck(this, cxWorld);

		/**
   * @property entities
   * @type {Array<cxEntity>}
   */
		this.entities = [];

		/**
   * @property voidSystems
   * @type {Array<cxVoidSystem>}
   */
		this.voidSystems = [];

		/**
   * @property entitySystems
   * @type {Array<cxEntitySystem>}
   */
		this.entitySystems = [];

		/**
   * @property managers
   * @type {Array<cxManager>}
   */
		this.managers = [];

		/**
   * @property tag
   * @type {String}
   */
		this.tag = 'cx.world';

		/**
   * @property initialized
  * @type Boolean
  */
		this.initialized = false;
	}

	/**
  * Add entity to world
  * @method addEntity
  * @param {cxEntity} entity
  */


	_createClass(cxWorld, [{
		key: 'addEntity',
		value: function addEntity(entity) {
			if (entity instanceof _cxEntity2.default === false) {
				throw new _InvalidClass2.default('cxEntity');
			}

			var slot = this._getFreeEntitySlot();
			entity.setWorld(this);

			if (slot != null) {
				entity.index = slot;
				this.entities[slot] = entity;
			} else {
				entity.index = this.entities.length;
				this.entities.push(entity);
			}

			this._entityAdded(entity);
		}

		/**
   * remove entity from world
   * @method removeEntity
   * @param  {cxEntity} entity
   */

	}, {
		key: 'removeEntity',
		value: function removeEntity(entity) {
			this._entityDeleted(entity);
			delete this.entities[entity.index];
		}

		/**
   * Get entity from world by its id
   * @method getEntity
   * @param  {Integer} int
   * @return {cxEntity}
   */

	}, {
		key: 'getEntity',
		value: function getEntity(index) {
			if (this.entities[index] == undefined) {
				throw "Entity " + index + " not found";
			}
			return this.entities[index];
		}

		/**
   * Get all entities from wold
   * @method getEntities
   * @return {Array<cxEntity>}
   */

	}, {
		key: 'getEntities',
		value: function getEntities() {
			var entities = [];
			for (var e = 0, len = this.entities.length; e < len; e++) {
				var entity = this.entities[e];
				if (entity == undefined || entity == null) {
					continue;
				}
				entities.push(entity);
			}
			return entities;
		}

		/**
   * Add a system to world
   * @method addSystem
   * @param {cxSystem} system
   */

	}, {
		key: 'addSystem',
		value: function addSystem(system) {
			if (system instanceof _cxSystem2.default === false) {
				throw new _InvalidClass2.default('cxSystem');
			}

			system.world = this;

			if (system instanceof _cxEntitySystem2.default === true) {
				var slot = this._getFreeProcessSystemSlot();
				if (slot != null) {
					this.entitySystems[slot] = system;
				} else {
					this.entitySystems.push(system);
				}
			} else if (system instanceof _cxVoidSystem2.default === true) {
				var _slot = this._getFreeProcessSystemSlot();
				if (_slot != null) {
					this.voidSystems[_slot] = system;
				} else {
					this.voidSystems.push(system);
				}
			}
		}

		/**
   * After all systems has been added, this should be called to initiate them
   * @method init
   */

	}, {
		key: 'init',
		value: function init() {

			for (var i = 0, len = this.entitySystems.length; i < len; i++) {
				var system = this.entitySystems[i];
				system.addedToWorld();
			}

			for (var _i = 0, _len = this.voidSystems.length; _i < _len; _i++) {
				var _system = this.voidSystems[_i];
				_system.addedToWorld();
			}

			this.initialized = true;
		}

		/**
   * get a system
   * @method getSystem
   * @param  {string|cxSystem} system
   * @return {cxSystem}
   */

	}, {
		key: 'getSystem',
		value: function getSystem(system) {
			var systemName = "";
			if (typeof system == "string") {
				systemName = system;
			} else {
				systemName = system.tag;
			}

			for (var i = 0, len = this.entitySystems.length; i < len; i++) {
				var _system2 = this.entitySystems[i];
				if (_system2.tag == systemName) {
					return _system2;
				}
			}

			for (var _i2 = 0, _len2 = this.voidSystems.length; _i2 < _len2; _i2++) {
				var _system3 = this.voidSystems[_i2];
				if (_system3.tag == systemName) {
					return _system3;
				}
			}

			throw "System " + systemName + " not found";
		}

		/**
   * Remove system
   * @method removeSystem
   * @param  {string|cxSystem} system
   */

	}, {
		key: 'removeSystem',
		value: function removeSystem(system) {
			var systemName = "";
			if (typeof system == "string") {
				systemName = system;
			} else {
				systemName = system.tag;
			}

			for (var i = 0, len = this.entitySystems.length; i < len; i++) {
				var _system4 = this.entitySystems[i];
				if (_system4 === undefined) {
					continue;
				}
				if (_system4.tag == systemName) {
					delete this.entitySystems[i];
				}
			}

			for (var _i3 = 0, _len3 = this.voidSystems.length; _i3 < _len3; _i3++) {
				var _system5 = this.voidSystems[_i3];
				if (_system5 === undefined) {
					continue;
				}
				if (_system5.tag == systemName) {
					delete this.voidSystems[_i3];
				}
			}
		}

		/**
   * Add Manager
   * @method addManager
   * @param {cxManager} manager
   */

	}, {
		key: 'addManager',
		value: function addManager(manager) {
			if (manager instanceof _cxManager2.default === false) {
				throw new _InvalidClass2.default('cxManager');
			}
			manager.world = this;
			this.managers.push(manager);
		}

		/**
   * Get Manager
   * @method getManager
   * @param  {String} name
   * @return {cxManager}
   */

	}, {
		key: 'getManager',
		value: function getManager(name) {
			for (var i = 0, len = this.managers.length; i < len; i++) {
				var manager = this.managers[i];
				if (manager.tag == name) {
					return this.managers[i];
				}
			}

			throw "Manager " + name + " not found";
		}

		/**
   * world loop
   * @method step
   */

	}, {
		key: 'step',
		value: function step() {
			this.update();
		}

		/**
   * Update method
   * @method update
   */

	}, {
		key: 'update',
		value: function update() {
			if (this.initialized === false) {
				throw new Error('Not initialized');
			}

			this._updateVoidSystem();
			this._updateEntitySystem();
		}

		/**
   * update systems
   * @method _updateVoidSystem
   */

	}, {
		key: '_updateVoidSystem',
		value: function _updateVoidSystem() {
			for (var s = 0, sLen = this.voidSystems.length; s < sLen; s++) {
				var system = this.voidSystems[s];
				system.update();
			}
		}

		/**
   * update systems
   * @method _updateEntitySystem
   */

	}, {
		key: '_updateEntitySystem',
		value: function _updateEntitySystem() {
			for (var s = 0, sLen = this.entitySystems.length; s < sLen; s++) {
				var system = this.entitySystems[s];

				for (var e = 0, eLen = this.entities.length; e < eLen; e++) {
					var entity = this.entities[e];

					if (entity == null) {
						continue;
					}

					if (!entity.alive && entity.remove) {
						this.removeEntity(entity);
						continue;
					}

					if (!entity.alive) {
						continue;
					}

					var entityComponents = [];
					var updateEntity = true;

					for (var sC = 0, sCLen = system.components.length; sC < sCLen; sC++) {
						var systemComponent = system.components[sC];
						var entityComponent = entity.getComponent(systemComponent);

						if (entityComponent === null) {
							updateEntity = false;
						} else {
							entityComponents[systemComponent] = entityComponent;
						}
					}

					if (updateEntity) {
						system.update(entity, entityComponents);
					}
				}
			}
		}

		/**
   * recycle entityslots
   * @method _getFreeEntitySlot
   * @return {Integer}
   */

	}, {
		key: '_getFreeEntitySlot',
		value: function _getFreeEntitySlot() {
			for (var e = 0, len = this.entities.length; e < len; e++) {
				var entity = this.entities[e];
				if (entity == null || entity == undefined) {
					return e;
				}
			}
			return null;
		}

		/**
   * recycle systemslot
   * @method _getFreeProcessSystemSlot
   * @return {Integer}
   */

	}, {
		key: '_getFreeProcessSystemSlot',
		value: function _getFreeProcessSystemSlot() {
			for (var s = 0, len = this.entitySystems.length; s < len; s++) {
				var system = this.entitySystems[s];
				if (system == undefined || system == null) {
					return s;
				}
			}
			return null;
		}

		/**
   * recycle systemslot
   * @method _getFreeVoidSystemSlot
   */

	}, {
		key: '_getFreeVoidSystemSlot',
		value: function _getFreeVoidSystemSlot() {
			for (var s = 0, len = this.voidSystems.length; s < len; s++) {
				var system = this.voidSystems[s];
				if (system == undefined || system == null) {
					return s;
				}
			}
			return null;
		}

		/**
   * notify systems for new entity
   * @method _entityAdded
   * @param {cxEntity} entity
   */

	}, {
		key: '_entityAdded',
		value: function _entityAdded(entity) {
			for (var s = 0, len = this.voidSystems.length; s < len; s++) {
				var system = this.voidSystems[s];
				system.added(entity);
			}

			for (var _s = 0, _len4 = this.entitySystems.length; _s < _len4; _s++) {
				var _system6 = this.entitySystems[_s];
				_system6.added(entity);
			}
		}

		/**
   * notify systems for deleted entity
   * @method _entityDeleted
   * @param {cxEntity} entity
   */

	}, {
		key: '_entityDeleted',
		value: function _entityDeleted(entity) {
			for (var s = 0, len = this.voidSystems.length; s < len; s++) {
				var system = this.voidSystems[s];
				system.removed(entity);
			}

			for (var _s2 = 0, _len5 = this.entitySystems.length; _s2 < _len5; _s2++) {
				var _system7 = this.entitySystems[_s2];
				_system7.removed(entity);
			}
		}
	}]);

	return cxWorld;
}();

exports.default = cxWorld;
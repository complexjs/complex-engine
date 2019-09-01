function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

/**
 * This is a bare Component.
 * It's used to store specific data related to an Entity. This data will then be processed by a cxSystem.
 */
var Component = function Component() {
  _classCallCheck(this, Component);
};

/**
 * An entity is a object that holds many components. Those components define the behaviour of an entity.
 */

var Entity =
/*#__PURE__*/
function () {
  /**
   *
   * @param {string} name
   */
  function Entity() {
    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "Entity";

    _classCallCheck(this, Entity);

    /** @var {string} */
    this.name = name;
    /** @var { Component[]} */

    this.components = [];
    /** @var {boolean} */

    this.alive = true;
    /** @var {boolean} */

    this.remove = false;
    /** @var {World | null} */

    this.world = null;
    /** @var {number | null} */

    this.index = null;
  }
  /**
   * Add a Component to the entity
   * @param {Component} component
   */


  _createClass(Entity, [{
    key: "addComponent",
    value: function addComponent(component) {
      var slot = this._getFreeSlot();

      if (slot != null) {
        this.components[slot] = component;
      } else {
        this.components.push(component);
      }
    }
    /**
     * Get a Component from the entity by its tag name
     * @param {Function} component
     * @return {Component[]}
     */

  }, {
    key: "getComponents",
    value: function getComponents(component) {
      var components = [];

      for (var i = 0, len = this.components.length; i < len; i++) {
        var c = this.components[i];

        if (c instanceof component) {
          components.push(c);
        }
      }

      return components;
    }
    /**
     * Get a Component from the entity by its tag name
     * @param {Function} component
     * @returns {boolean}
     */

  }, {
    key: "hasComponent",
    value: function hasComponent(component) {
      for (var i = 0, len = this.components.length; i < len; i++) {
        var c = this.components[i];

        if (c instanceof component) {
          return true;
        }
      }

      return false;
    }
    /**
     * remove a Component from the entity
     * @param {Function} component
     */

  }, {
    key: "removeComponent",
    value: function removeComponent(component) {
      for (var i = 0, len = this.components.length; i < len; i++) {
        var c = this.components[i];

        if (c instanceof component) {
          delete this.components[i];
        }
      }
    }
    /**
     * Get all components from the entity
     * @returns { Component[]}
     */

  }, {
    key: "getAllComponents",
    value: function getAllComponents() {
      return this.components;
    }
    /**
     * Reuses old Component slots in the array
     * @return {number | null}
     * @private
     */

  }, {
    key: "_getFreeSlot",
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
     */

  }, {
    key: "destroy",
    value: function destroy() {
      this.alive = false;
      this.remove = true;
    }
    /**
     * Get the worl object from the entity
     * @returns {World | null}
     */

  }, {
    key: "getWorld",
    value: function getWorld() {
      return this.world;
    }
    /**
     * Set the worldobject
     * @param {World} world
     *
     */

  }, {
    key: "setWorld",
    value: function setWorld(world) {
      this.world = world;
    }
    /**
     *
     * @param {number} index
     */

  }, {
    key: "setIndex",
    value: function setIndex(index) {
      this.index = index;
    }
    /**
     * @returns {number | null}
     */

  }, {
    key: "getIndex",
    value: function getIndex() {
      return this.index;
    }
    /**
     * @returns {boolean}
     */

  }, {
    key: "isAlive",
    value: function isAlive() {
      return this.alive;
    }
    /**
     * @returns {boolean}
     */

  }, {
    key: "isRemove",
    value: function isRemove() {
      return this.remove;
    }
  }]);

  return Entity;
}();

/**
 * Abstract System. A System is responsible that your game works. It holds all the business logic and processes the
 * entities based on the data in the components
 */

var System =
/*#__PURE__*/
function () {
  function System() {
    _classCallCheck(this, System);

    /**  @var {World | null} */
    this.world = null;
  }
  /**
   * get notified when System is added to world
   */


  _createClass(System, [{
    key: "addedToWorld",
    value: function addedToWorld() {}
    /**
     * get notified when entity is added to world
     * @param {Entity} entity
     */

  }, {
    key: "added",
    value: function added(entity) {}
    /**
     * get notified when entity is removed from world
     * @param {Entity} entity
     */

  }, {
    key: "removed",
    value: function removed(entity) {}
    /**
     *
     * @param {World} world
     */

  }, {
    key: "setWorld",
    value: function setWorld(world) {
      this.world = world;
    }
  }]);

  return System;
}();

var Manager =
/*#__PURE__*/
function () {
  function Manager() {
    _classCallCheck(this, Manager);

    /** @var { World | null} */
    this.world = null;
  }
  /**
   * @returns {World | null}
   */


  _createClass(Manager, [{
    key: "getWorld",
    value: function getWorld() {
      return this.world;
    }
    /**
     *
     * @param {World | null} world
     */

  }, {
    key: "setWorld",
    value: function setWorld(world) {
      this.world = world;
    }
  }]);

  return Manager;
}();

/**
 * This systems renders only entities that match the required components.
 */

var EntitySystem =
/*#__PURE__*/
function (_System) {
  _inherits(EntitySystem, _System);

  function EntitySystem() {
    var _this;

    _classCallCheck(this, EntitySystem);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(EntitySystem).call(this));
    /** @var {Function[]}  */

    _this.components = [];
    return _this;
  }
  /**
   * 
   * @param {Entity[]} entities
   */


  _createClass(EntitySystem, [{
    key: "processEntities",
    value: function processEntities(entities) {
      for (var i = 0; i < entities.length; i++) {
        this.update(entities[i]);
      }
    }
    /**
     * Get list of components to work with this system
     * @returns {Function[]}
     */

  }, {
    key: "getComponents",
    value: function getComponents() {
      return this.components;
    }
    /**
     * @param {Entity} entity
     */

  }, {
    key: "update",
    value: function update(entity) {}
  }]);

  return EntitySystem;
}(System);

/**
 * This System only renders once per update and is decoupled from the entities. This can be used to
 * update some data or clear the canvas on the screen
 */

var VoidSystem =
/*#__PURE__*/
function (_System) {
  _inherits(VoidSystem, _System);

  function VoidSystem() {
    _classCallCheck(this, VoidSystem);

    return _possibleConstructorReturn(this, _getPrototypeOf(VoidSystem).apply(this, arguments));
  }

  _createClass(VoidSystem, [{
    key: "update",

    /**
     * update System
     */
    value: function update() {}
  }]);

  return VoidSystem;
}(System);

/**
 * The world contains all entities, systems and managers
 */

var World =
/*#__PURE__*/
function () {
  function World() {
    _classCallCheck(this, World);

    /** @var {Entity[]}*/
    this.entities = [];
    /** @var {VoidSystem[]} */

    this.voidSystems = [];
    /** @var {EntitySystem[]} */

    this.entitySystems = [];
    /** @var {Manager[]} */

    this.managers = [];
    /** @var { boolean}  */

    this.initialized = false;
  }
  /**
   * Add entity to the world
   * @param { Entity} entity
   */


  _createClass(World, [{
    key: "addEntity",
    value: function addEntity(entity) {
      var slot = this.getFreeEntitySlot();
      entity.setWorld(this);

      if (slot != null) {
        this.entities[slot] = entity;
      } else {
        slot = this.entities.length;
        this.entities.push(entity);
      }

      entity.setIndex(slot);
      this.entityAdded(entity);
    }
    /**
     * remove entity from the world
     * @param {Entity} entity
     */

  }, {
    key: "removeEntity",
    value: function removeEntity(entity) {
      var index = entity.getIndex();

      if (index === null) {
        throw new Error("Entity has no index");
      }

      this.entityDeleted(entity);
      delete this.entities[index];
    }
    /**
     * Get entity from world by its id
     * @param {number} index
     * @returns {Entity}
     */

  }, {
    key: "getEntity",
    value: function getEntity(index) {
      if (this.entities[index] == undefined) {
        throw new Error("No entity found");
      }

      return this.entities[index];
    }
    /**
     * Get all entities from wold
     * @returns {Entity[]}
     */

  }, {
    key: "getEntities",
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
     * Add a System to world
     * @param { EntitySystem | VoidSystem} system
     */

  }, {
    key: "addSystem",
    value: function addSystem(system) {
      system.setWorld(this);
      console.log(system);

      if (system instanceof EntitySystem === true) {
        var slot = this.getFreeEntitySystemSlot();

        if (slot != null) {
          this.entitySystems[slot] = system;
        } else {
          this.entitySystems.push(system);
        }
      } else if (system instanceof VoidSystem === true) {
        var _slot = this.getFreeEntitySystemSlot();

        if (_slot != null) {
          this.voidSystems[_slot] = system;
        } else {
          this.voidSystems.push(system);
        }
      }
    }
    /**
     * After all systems has been added, this should be called to initiate them
     */

  }, {
    key: "init",
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
     * get a System
    * @param  {string | System} systemClass
    * @return {System}
            */

  }, {
    key: "getSystem",
    value: function getSystem(systemClass) {
      for (var i = 0, len = this.entitySystems.length; i < len; i++) {
        var s = this.entitySystems[i];

        if (s instanceof systemClass) {
          return s;
        }
      }

      for (var _i2 = 0, _len2 = this.voidSystems.length; _i2 < _len2; _i2++) {
        var _s = this.voidSystems[_i2];

        if (_s instanceof systemClass) {
          return _s;
        }
      }

      throw "System " + systemClass + " not found";
    }
    /**
     * Remove System
     * @param {Function} systemClass
     */

  }, {
    key: "removeSystem",
    value: function removeSystem(systemClass) {
      for (var i = 0, len = this.entitySystems.length; i < len; i++) {
        var s = this.entitySystems[i];

        if (s === undefined) {
          continue;
        }

        if (s instanceof systemClass) {
          delete this.entitySystems[i];
        }
      }

      for (var _i3 = 0, _len3 = this.voidSystems.length; _i3 < _len3; _i3++) {
        var _s2 = this.voidSystems[_i3];

        if (_s2 === undefined) {
          continue;
        }

        if (_s2 instanceof systemClass) {
          delete this.voidSystems[_i3];
        }
      }
    }
    /**
     * Add Manager
     * @param{Manager} manager
     */

  }, {
    key: "addManager",
    value: function addManager(manager) {
      manager.setWorld(this);
      this.managers.push(manager);
    }
    /**
     * Get a manager
     * @param { Function} managerClass
     * @returns {Manager}
     */

  }, {
    key: "getManager",
    value: function getManager(managerClass) {
      for (var i = 0, len = this.managers.length; i < len; i++) {
        var manager = this.managers[i];

        if (manager instanceof managerClass) {
          return this.managers[i];
        }
      }

      throw "Manager " + name + " not found";
    }
    /**
     * Update the world
     */

  }, {
    key: "update",
    value: function update() {
      if (this.initialized === false) {
        throw new Error("Not initialized");
      }

      this.updateEntities();
      this.updateVoidSystem();
      this.updateEntitySystem();
    }
    /**
     * Update void systems
     */

  }, {
    key: "updateVoidSystem",
    value: function updateVoidSystem() {
      for (var s = 0, sLen = this.voidSystems.length; s < sLen; s++) {
        var system = this.voidSystems[s];
        system.update();
      }
    }
    /**
     * Update entity systems
     */

  }, {
    key: "updateEntitySystem",
    value: function updateEntitySystem() {
      for (var s = 0, sLen = this.entitySystems.length; s < sLen; s++) {
        var system = this.entitySystems[s];
        var entities = this.getEntitiesForSystem(system);
        system.processEntities(entities);
      }
    }
    /**
     * Get all entities that fit a systems requirements(components)
     * @param {EntitySystem} system
     * @returns {Entity[]}
     */

  }, {
    key: "getEntitiesForSystem",
    value: function getEntitiesForSystem(system) {
      var components = system.getComponents();
      var entities = [];

      for (var i = 0; i < components.length; i++) {
        entities.push.apply(entities, _toConsumableArray(this.getEntitiesWithComponent(components[i])));
      }

      return entities;
    }
    /**
     * Get a list of entities that match a component
     * @param {Function} component
     * @returns {Entity[]}
     */

  }, {
    key: "getEntitiesWithComponent",
    value: function getEntitiesWithComponent(component) {
      var entities = this.entities;
      var entitiesLength = entities.length;
      var filteredComponents = [];

      for (var i = 0; i < entitiesLength; i++) {
        var entity = entities[i];

        if (entity.hasComponent(component)) {
          filteredComponents.push(entity);
        }
      }

      return filteredComponents;
    }
    /**
     * Update all entities state
     */

  }, {
    key: "updateEntities",
    value: function updateEntities() {
      var entities = this.entities;
      var entitiesLength = entities.length;

      for (var i = 0; i < entitiesLength; i++) {
        var entity = entities[i];

        if (!entity.isAlive() && entity.isRemove()) {
          this.removeEntity(entity);
        }
      }
    }
    /**
     * recycle entityslots
     * @returns {number | null}
     */

  }, {
    key: "getFreeEntitySlot",
    value: function getFreeEntitySlot() {
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
     * @return {number | null}
     */

  }, {
    key: "getFreeEntitySystemSlot",
    value: function getFreeEntitySystemSlot() {
      for (var s = 0, len = this.entitySystems.length; s < len; s++) {
        var system = this.entitySystems[s];

        if (system == undefined || system == null) {
          return s;
        }
      }

      return null;
    }
    /**
     * notify systems for new entity
     * @param {Entity} entity
     * @protected
     */

  }, {
    key: "entityAdded",
    value: function entityAdded(entity) {
      for (var s = 0, len = this.voidSystems.length; s < len; s++) {
        var system = this.voidSystems[s];
        system.added(entity);
      }

      for (var _s3 = 0, _len4 = this.entitySystems.length; _s3 < _len4; _s3++) {
        var _system2 = this.entitySystems[_s3];

        _system2.added(entity);
      }
    }
    /**
     * notify systems for deleted entity
     * @param {Entity} entity
     * @protected
     */

  }, {
    key: "entityDeleted",
    value: function entityDeleted(entity) {
      for (var s = 0, len = this.voidSystems.length; s < len; s++) {
        var system = this.voidSystems[s];
        system.removed(entity);
      }

      for (var _s4 = 0, _len5 = this.entitySystems.length; _s4 < _len5; _s4++) {
        var _system3 = this.entitySystems[_s4];

        _system3.removed(entity);
      }
    }
    /**
     * @return {EntitySystem[]}
     */

  }, {
    key: "getEntitySystems",
    value: function getEntitySystems() {
      return this.entitySystems;
    }
    /**
     * @returns {VoidSystem[]}
     */

  }, {
    key: "getVoidSystems",
    value: function getVoidSystems() {
      return this.voidSystems;
    }
    /**
     * @return {Manager[]}
     */

  }, {
    key: "getManagers",
    value: function getManagers() {
      return this.managers;
    }
  }]);

  return World;
}();

/**
 * The current scene with is rendered on screen.
 */

var Scene =
/*#__PURE__*/
function () {
  /**
   * @param {string} name 
   */
  function Scene(name) {
    _classCallCheck(this, Scene);

    /** @var {string} */
    this.name = name;
    /** @var {World} */

    this.world = new World();
  }
  /**
   * Called when the world is loaded by the ComplexCore. In this method your stage should be loaded/created
   */


  _createClass(Scene, [{
    key: "load",
    value: function load() {}
    /**
     * Starts the initialisation of the world
     */

  }, {
    key: "run",
    value: function run() {
      this.world.init();
    }
    /**
     * Updates the world object
     */

  }, {
    key: "update",
    value: function update() {
      this.world.update();
    }
  }]);

  return Scene;
}();

/**
 * Complex Core. This class handles the rendering of the current scene.
 */

var Core =
/*#__PURE__*/
function () {
  function Core() {
    _classCallCheck(this, Core);

    /** @var {Scene | null} */
    this.scene = null;
    /** @var {Core | null} */

    this.instance = null;
  }
  /**
   * @returns {Core}
   */


  _createClass(Core, [{
    key: "loadScene",

    /**
     * load a scene to be rendered
     * @param {Scene} scene
     */
    value: function loadScene(scene) {
      this.scene = scene;
      this.scene.load();
      this.scene.run();
    }
    /**
     * render the loaded scene
     */

  }, {
    key: "update",
    value: function update() {
      if (this.scene) {
        this.scene.update();
      }
    }
    /**
     * @returns {Scene | null}
     */

  }, {
    key: "getScene",
    value: function getScene() {
      return this.scene;
    }
  }], [{
    key: "getInstance",
    value: function getInstance() {
      if (!Core.instance) {
        Core.instance = new Core();
      }

      return Core.instance;
    }
  }]);

  return Core;
}();

export { Core as Complex, Component, Entity, EntitySystem, Manager, Scene, System, VoidSystem, World };

var cx = (function () {
  var main = null;
  var modules = {
      "require": {
          factory: undefined,
          dependencies: [],
          exports: function (args, callback) { return require(args, callback); },
          resolved: true
      }
  };
  function define(id, dependencies, factory) {
      return main = modules[id] = {
          dependencies: dependencies,
          factory: factory,
          exports: {},
          resolved: false
      };
  }
  function resolve(definition) {
      if (definition.resolved === true)
          return;
      definition.resolved = true;
      var dependencies = definition.dependencies.map(function (id) {
          return (id === "exports")
              ? definition.exports
              : (function () {
                  if(modules[id] !== undefined) {
                    resolve(modules[id]);
                    return modules[id].exports;
                  } else {
                    try {
                      return require(id);
                    } catch(e) {
                      throw Error("module '" + id + "' not found.");
                    }
                  }
              })();
      });
      definition.factory.apply(null, dependencies);
  }
  function collect() {
      Object.keys(modules).map(function (key) { return modules[key]; }).forEach(resolve);
      return (main !== null) 
        ? main.exports
        : undefined
  }

  define("Component", ["require", "exports"], function (require, exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      /**
       * This is a bare Component.
       * It's used to store specific data related to an Entity. This data will then be processed by a cxSystem.
       */
      var Component = /** @class */ (function () {
          function Component() {
          }
          return Component;
      }());
      exports.default = Component;
  });
  define("Entity", ["require", "exports"], function (require, exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      /**
       * An entity is a object that holds many components. Those components define the behaviour of an entity.
       */
      var Entity = /** @class */ (function () {
          function Entity(name) {
              if (name === void 0) { name = "Entity"; }
              this.components = [];
              this.alive = true;
              this.remove = false;
              this.world = null;
              this.index = null;
              this.name = name;
          }
          /**
           * Add a Component to the entity
           */
          Entity.prototype.addComponent = function (component) {
              var slot = this._getFreeSlot();
              if (slot != null) {
                  this.components[slot] = component;
              }
              else {
                  this.components.push(component);
              }
          };
          /**
           * Get a Component from the entity by its tag name
           */
          Entity.prototype.getComponents = function (component) {
              var components = [];
              for (var i = 0, len = this.components.length; i < len; i++) {
                  var c = this.components[i];
                  if (c instanceof component) {
                      components.push(c);
                  }
              }
              return components;
          };
          /**
           * Get a Component from the entity by its tag name
           */
          Entity.prototype.hasComponent = function (component) {
              for (var i = 0, len = this.components.length; i < len; i++) {
                  var c = this.components[i];
                  if (c instanceof component) {
                      return true;
                  }
              }
              return false;
          };
          /**
           * remove a Component from the entity
           */
          Entity.prototype.removeComponent = function (component) {
              for (var i = 0, len = this.components.length; i < len; i++) {
                  var c = this.components[i];
                  if (c instanceof component) {
                      delete this.components[i];
                  }
              }
          };
          /**
           * Get all components from the entity
           */
          Entity.prototype.getAllComponents = function () {
              return this.components;
          };
          /**
           * Reuses old Component slots in the array
           */
          Entity.prototype._getFreeSlot = function () {
              for (var c = 0, len = this.components.length; c < len; c++) {
                  var component = this.components[c];
                  if (component == undefined || component == null) {
                      return c;
                  }
              }
              return null;
          };
          /**
           * Kills the entity
           */
          Entity.prototype.destroy = function () {
              this.alive = false;
              this.remove = true;
          };
          /**
           * Get the worl object from the entity
           */
          Entity.prototype.getWorld = function () {
              return this.world;
          };
          /**
           * Set the worldobject
           */
          Entity.prototype.setWorld = function (world) {
              this.world = world;
          };
          Entity.prototype.setIndex = function (index) {
              this.index = index;
          };
          Entity.prototype.getIndex = function () {
              return this.index;
          };
          Entity.prototype.isAlive = function () {
              return this.alive;
          };
          Entity.prototype.isRemove = function () {
              return this.remove;
          };
          return Entity;
      }());
      exports.default = Entity;
  });
  define("System", ["require", "exports"], function (require, exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
  });
  define("Manager", ["require", "exports"], function (require, exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var Manager = /** @class */ (function () {
          function Manager() {
              this.world = null;
          }
          Manager.prototype.getWorld = function () {
              return this.world;
          };
          Manager.prototype.setWorld = function (world) {
              this.world = world;
          };
          return Manager;
      }());
      exports.default = Manager;
  });
  define("System/EntitySystem", ["require", "exports"], function (require, exports) {
      'use strict';
      Object.defineProperty(exports, "__esModule", { value: true });
      /**
       * This systems renders only entities that match the required components.
       */
      var EntitySystem = /** @class */ (function () {
          function EntitySystem() {
              this.components = [];
              this.world = null;
          }
          EntitySystem.prototype.processEntities = function (entities) {
              for (var i = 0; i < entities.length; i++) {
                  this.update(entities[i]);
              }
          };
          /**
           * Get list of components to work with this system
           */
          EntitySystem.prototype.getComponents = function () {
              return this.components;
          };
          EntitySystem.prototype.added = function (entity) {
          };
          ;
          EntitySystem.prototype.addedToWorld = function () {
          };
          ;
          EntitySystem.prototype.removed = function (entity) {
          };
          EntitySystem.prototype.setWorld = function (world) {
              this.world = world;
          };
          return EntitySystem;
      }());
      exports.default = EntitySystem;
  });
  define("System/VoidSystem", ["require", "exports"], function (require, exports) {
      'use strict';
      Object.defineProperty(exports, "__esModule", { value: true });
      /**
       * This System only renders once per update and is decoupled from the entities. This can be used to
       * update some data or clear the canvas on the screen
       */
      var VoidSystem = /** @class */ (function () {
          function VoidSystem() {
              this.world = null;
          }
          VoidSystem.prototype.added = function (entity) {
          };
          ;
          VoidSystem.prototype.addedToWorld = function () {
          };
          ;
          VoidSystem.prototype.removed = function (entity) {
          };
          VoidSystem.prototype.setWorld = function (world) {
              this.world = world;
          };
          return VoidSystem;
      }());
      exports.default = VoidSystem;
  });
  define("World", ["require", "exports", "System/EntitySystem", "System/VoidSystem"], function (require, exports, EntitySystem_1, VoidSystem_1) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      /**
       * The world contains all entities, systems and managers
       */
      var World = /** @class */ (function () {
          function World() {
              this.entities = [];
              this.voidSystems = [];
              this.entitySystems = [];
              this.managers = [];
              this.initialized = false;
          }
          /**
           * Add entity to the world
           */
          World.prototype.addEntity = function (entity) {
              var slot = this.getFreeEntitySlot();
              entity.setWorld(this);
              if (slot != null) {
                  this.entities[slot] = entity;
              }
              else {
                  slot = this.entities.length;
                  this.entities.push(entity);
              }
              entity.setIndex(slot);
              this.entityAdded(entity);
          };
          /**
           * remove entity from the world
           */
          World.prototype.removeEntity = function (entity) {
              var index = entity.getIndex();
              if (index === null) {
                  throw new Error("Entity has no index");
              }
              this.entityDeleted(entity);
              delete this.entities[index];
          };
          /**
           * Get entity from world by its id
           */
          World.prototype.getEntity = function (index) {
              if (this.entities[index] == undefined) {
                  throw new Error("No entity found");
              }
              return this.entities[index];
          };
          /**
           * Get all entities from wold
           */
          World.prototype.getEntities = function () {
              var entities = [];
              for (var e = 0, len = this.entities.length; e < len; e++) {
                  var entity = this.entities[e];
                  if (entity == undefined || entity == null) {
                      continue;
                  }
                  entities.push(entity);
              }
              return entities;
          };
          /**
           * Add a System to world
           */
          World.prototype.addSystem = function (system) {
              system.setWorld(this);
              if (system instanceof EntitySystem_1.default === true) {
                  var slot = this.getFreeEntitySystemSlot();
                  if (slot != null) {
                      this.entitySystems[slot] = system;
                  }
                  else {
                      this.entitySystems.push(system);
                  }
              }
              else if (system instanceof VoidSystem_1.default === true) {
                  var slot = this.getFreeEntitySystemSlot();
                  if (slot != null) {
                      this.voidSystems[slot] = system;
                  }
                  else {
                      this.voidSystems.push(system);
                  }
              }
          };
          /**
           * After all systems has been added, this should be called to initiate them
           * @method init
           */
          World.prototype.init = function () {
              for (var i = 0, len = this.entitySystems.length; i < len; i++) {
                  var system = this.entitySystems[i];
                  system.addedToWorld();
              }
              for (var i = 0, len = this.voidSystems.length; i < len; i++) {
                  var system = this.voidSystems[i];
                  system.addedToWorld();
              }
              this.initialized = true;
          };
          /**
           * get a System
           * @method getSystem
           * @param  {string|System} systemClass
           * @return {System}
           */
          World.prototype.getSystem = function (systemClass) {
              for (var i = 0, len = this.entitySystems.length; i < len; i++) {
                  var s = this.entitySystems[i];
                  if (s instanceof systemClass) {
                      return s;
                  }
              }
              for (var i = 0, len = this.voidSystems.length; i < len; i++) {
                  var s = this.voidSystems[i];
                  if (s instanceof systemClass) {
                      return s;
                  }
              }
              throw "System " + systemClass + " not found";
          };
          /**
           * Remove System
           */
          World.prototype.removeSystem = function (systemClass) {
              for (var i = 0, len = this.entitySystems.length; i < len; i++) {
                  var s = this.entitySystems[i];
                  if (s === undefined) {
                      continue;
                  }
                  if (s instanceof systemClass) {
                      delete this.entitySystems[i];
                  }
              }
              for (var i = 0, len = this.voidSystems.length; i < len; i++) {
                  var s = this.voidSystems[i];
                  if (s === undefined) {
                      continue;
                  }
                  if (s instanceof systemClass) {
                      delete this.voidSystems[i];
                  }
              }
          };
          /**
           * Add Manager
           */
          World.prototype.addManager = function (manager) {
              manager.setWorld(this);
              this.managers.push(manager);
          };
          /**
           * Get a manager
           */
          World.prototype.getManager = function (managerClass) {
              for (var i = 0, len = this.managers.length; i < len; i++) {
                  var manager = this.managers[i];
                  if (manager instanceof managerClass) {
                      return this.managers[i];
                  }
              }
              throw "Manager " + name + " not found";
          };
          /**
           * Update the world
           */
          World.prototype.update = function () {
              if (this.initialized === false) {
                  throw new Error("Not initialized");
              }
              this.updateEntities();
              this.updateVoidSystem();
              this.updateEntitySystem();
          };
          /**
           * Update void systems
           */
          World.prototype.updateVoidSystem = function () {
              for (var s = 0, sLen = this.voidSystems.length; s < sLen; s++) {
                  var system = this.voidSystems[s];
                  system.update();
              }
          };
          /**
           * Update entity systems
           */
          World.prototype.updateEntitySystem = function () {
              for (var s = 0, sLen = this.entitySystems.length; s < sLen; s++) {
                  var system = this.entitySystems[s];
                  var entities = this.getEntitiesForSystem(system);
                  system.processEntities(entities);
              }
          };
          /**
           * Get all entities that fit a systems requirements(components)
           * @param system
           */
          World.prototype.getEntitiesForSystem = function (system) {
              var components = system.getComponents();
              var entities = [];
              for (var i = 0; i < components.length; i++) {
                  entities.push.apply(entities, this.getEntitiesWithComponent(components[i]));
              }
              return entities;
          };
          /**
           * Get a list of entities that match a component
           */
          World.prototype.getEntitiesWithComponent = function (component) {
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
          };
          /**
           * Update all entities state
           */
          World.prototype.updateEntities = function () {
              var entities = this.entities;
              var entitiesLength = entities.length;
              for (var i = 0; i < entitiesLength; i++) {
                  var entity = entities[i];
                  if (!entity.isAlive() && entity.isRemove()) {
                      this.removeEntity(entity);
                  }
              }
          };
          /**
           * recycle entityslots
           */
          World.prototype.getFreeEntitySlot = function () {
              for (var e = 0, len = this.entities.length; e < len; e++) {
                  var entity = this.entities[e];
                  if (entity == null || entity == undefined) {
                      return e;
                  }
              }
              return null;
          };
          /**
           * recycle systemslot
           */
          World.prototype.getFreeEntitySystemSlot = function () {
              for (var s = 0, len = this.entitySystems.length; s < len; s++) {
                  var system = this.entitySystems[s];
                  if (system == undefined || system == null) {
                      return s;
                  }
              }
              return null;
          };
          /**
           * notify systems for new entity
           */
          World.prototype.entityAdded = function (entity) {
              for (var s = 0, len = this.voidSystems.length; s < len; s++) {
                  var system = this.voidSystems[s];
                  system.added(entity);
              }
              for (var s = 0, len = this.entitySystems.length; s < len; s++) {
                  var system = this.entitySystems[s];
                  system.added(entity);
              }
          };
          /**
           * notify systems for deleted entity
           * @method entityDeleted
           * @param {Entity} entity
           */
          World.prototype.entityDeleted = function (entity) {
              for (var s = 0, len = this.voidSystems.length; s < len; s++) {
                  var system = this.voidSystems[s];
                  system.removed(entity);
              }
              for (var s = 0, len = this.entitySystems.length; s < len; s++) {
                  var system = this.entitySystems[s];
                  system.removed(entity);
              }
          };
          World.prototype.getEntitySystems = function () {
              return this.entitySystems;
          };
          World.prototype.getVoidSystems = function () {
              return this.voidSystems;
          };
          World.prototype.getManagers = function () {
              return this.managers;
          };
          return World;
      }());
      exports.default = World;
  });
  define("Scene", ["require", "exports", "World"], function (require, exports, World_1) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      /**
       * The current scene with is rendered on screen.
       */
      var Scene = /** @class */ (function () {
          function Scene(name) {
              this.name = name;
              this.world = new World_1.default();
          }
          /**
           * Starts the initialisation of the world
           */
          Scene.prototype.run = function () {
              this.world.init();
          };
          /**
           * Updates the world object
           */
          Scene.prototype.update = function () {
              this.world.update();
          };
          return Scene;
      }());
      exports.default = Scene;
  });
  define("Core", ["require", "exports"], function (require, exports) {
      'use strict';
      Object.defineProperty(exports, "__esModule", { value: true });
      /**
       * Complex Core. This class handles the rendering of the current scene.
       */
      var Core = /** @class */ (function () {
          function Core() {
              this.scene = null;
          }
          Core.getInstance = function () {
              if (!Core.instance) {
                  Core.instance = new Core();
              }
              return Core.instance;
          };
          /**
           * load a scene to be rendered
           */
          Core.prototype.loadScene = function (scene) {
              this.scene = scene;
              this.scene.load();
              this.scene.run();
          };
          /**
           * render the loaded scene
           */
          Core.prototype.update = function () {
              if (this.scene) {
                  this.scene.update();
              }
          };
          Core.prototype.getScene = function () {
              return this.scene;
          };
          Core.instance = null;
          return Core;
      }());
      exports.default = Core;
      ;
  });
  define("Complex", ["require", "exports", "Core", "Entity", "Component", "Manager", "Scene", "System/EntitySystem", "System/VoidSystem", "World"], function (require, exports, Core_1, Entity_1, Component_1, Manager_1, Scene_1, EntitySystem_2, VoidSystem_2, World_2) {
      'use strict';
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Complex = Core_1.default;
      exports.Entity = Entity_1.default;
      exports.Component = Component_1.default;
      exports.Manager = Manager_1.default;
      exports.Scene = Scene_1.default;
      exports.EntitySystem = EntitySystem_2.default;
      exports.VoidSystem = VoidSystem_2.default;
      exports.World = World_2.default;
  });
  
  return collect(); 
})();
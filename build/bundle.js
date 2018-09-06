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

  var __extends = (this && this.__extends) || (function () {
      var extendStatics = function (d, b) {
          extendStatics = Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
              function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
          return extendStatics(d, b);
      }
      return function (d, b) {
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  define("cxComponent", ["require", "exports"], function (require, exports) {
      "use strict";
      exports.__esModule = true;
      /**
       * This is a bare component.
       * It's used to store specific data related to an cxEntity. This data will then be processed by a cxSystem.
       */
      var cxComponent = /** @class */ (function () {
          function cxComponent() {
              this.tag = null;
          }
          return cxComponent;
      }());
      exports["default"] = cxComponent;
  });
  define("cxEntity", ["require", "exports"], function (require, exports) {
      "use strict";
      exports.__esModule = true;
      /**
       * An entity is a object that holds many components. Those components define the behaviour of an entity.
       */
      var cxEntity = /** @class */ (function () {
          function cxEntity(name) {
              if (name === void 0) { name = "Entity"; }
              this.components = [];
              this.alive = true;
              this.remove = false;
              this.world = null;
              this.index = null;
              this.name = name;
          }
          /**
           * Add a component to the entity
           */
          cxEntity.prototype.addComponent = function (component) {
              var slot = this._getFreeSlot();
              if (slot != null) {
                  this.components[slot] = component;
              }
              else {
                  this.components.push(component);
              }
          };
          /**
           * Get a component from the entity by its tag name
           */
          cxEntity.prototype.getComponents = function (componentName) {
              var components = [];
              for (var i = 0, len = this.components.length; i < len; i++) {
                  var component = this.components[i];
                  if (component.tag === componentName) {
                      components.push(component);
                  }
              }
              return components;
          };
          /**
           * Get a component from the entity by its tag name
           */
          cxEntity.prototype.hasComponent = function (componentName) {
              for (var i = 0, len = this.components.length; i < len; i++) {
                  var component = this.components[i];
                  if (component.tag === componentName) {
                      return true;
                  }
              }
              return false;
          };
          /**
           * remove a component from the entity
           */
          cxEntity.prototype.removeComponent = function (componentName) {
              for (var i = 0, len = this.components.length; i < len; i++) {
                  var component = this.components[i];
                  if (component.tag == componentName) {
                      delete this.components[i];
                  }
              }
          };
          /**
           * Get all components from the entity
           */
          cxEntity.prototype.getAllComponents = function () {
              return this.components;
          };
          /**
           * Reuses old component slots in the array
           */
          cxEntity.prototype._getFreeSlot = function () {
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
          cxEntity.prototype.destroy = function () {
              this.alive = false;
              this.remove = true;
          };
          /**
           * Get the worl object from the entity
           */
          cxEntity.prototype.getWorld = function () {
              return this.world;
          };
          /**
           * Set the worldobject
           */
          cxEntity.prototype.setWorld = function (world) {
              this.world = world;
          };
          cxEntity.prototype.setIndex = function (index) {
              this.index = index;
          };
          cxEntity.prototype.getIndex = function () {
              return this.index;
          };
          cxEntity.prototype.isAlive = function () {
              return this.alive;
          };
          cxEntity.prototype.isRemove = function () {
              return this.remove;
          };
          return cxEntity;
      }());
      exports["default"] = cxEntity;
  });
  define("cxSystem", ["require", "exports"], function (require, exports) {
      "use strict";
      exports.__esModule = true;
      /**
       * Abstract System. A system is responsible that your game works. It holds all the business logic and processes the
       * entities based on the data in the components
       */
      var cxSystem = /** @class */ (function () {
          function cxSystem() {
              this.tag = null;
              this.world = null;
          }
          cxSystem.prototype.setWorld = function (value) {
              this.world = value;
          };
          cxSystem.prototype.getTag = function () {
              return this.tag;
          };
          return cxSystem;
      }());
      exports["default"] = cxSystem;
  });
  define("cxManager", ["require", "exports"], function (require, exports) {
      "use strict";
      exports.__esModule = true;
      var cxManager = /** @class */ (function () {
          function cxManager() {
              this.tag = null;
              this.world = null;
          }
          cxManager.prototype.getTag = function () {
              return this.tag;
          };
          cxManager.prototype.getWorld = function () {
              return this.world;
          };
          cxManager.prototype.setWorld = function (world) {
              this.world = world;
          };
          return cxManager;
      }());
      exports["default"] = cxManager;
  });
  define("System/cxEntitySystem", ["require", "exports", "cxSystem"], function (require, exports, cxSystem_1) {
      "use strict";
      exports.__esModule = true;
      /**
       * This systems renders only entities that match the required components.
       */
      var cxEntitySystem = /** @class */ (function (_super) {
          __extends(cxEntitySystem, _super);
          function cxEntitySystem() {
              var _this = _super !== null && _super.apply(this, arguments) || this;
              _this.components = [];
              return _this;
          }
          cxEntitySystem.prototype.processEntities = function (entities) {
              for (var i = 0; i < entities.length; i++) {
                  this.update(entities[i]);
              }
          };
          cxEntitySystem.prototype.getComponents = function () {
              return this.components;
          };
          return cxEntitySystem;
      }(cxSystem_1["default"]));
      exports["default"] = cxEntitySystem;
  });
  define("System/cxVoidSystem", ["require", "exports", "cxSystem"], function (require, exports, cxSystem_2) {
      "use strict";
      exports.__esModule = true;
      /**
       * This system only renders once per update and is decoupled from the entities. This can be used to
       * update some data or clear the canvas on the screen
       */
      var cxVoidSystem = /** @class */ (function (_super) {
          __extends(cxVoidSystem, _super);
          function cxVoidSystem() {
              return _super !== null && _super.apply(this, arguments) || this;
          }
          return cxVoidSystem;
      }(cxSystem_2["default"]));
      exports["default"] = cxVoidSystem;
  });
  define("cxWorld", ["require", "exports", "System/cxEntitySystem", "System/cxVoidSystem"], function (require, exports, cxEntitySystem_1, cxVoidSystem_1) {
      "use strict";
      exports.__esModule = true;
      /**
       * The world contains all entities, systems and managers
       */
      var cxWorld = /** @class */ (function () {
          function cxWorld() {
              this.entities = [];
              this.voidSystems = [];
              this.entitySystems = [];
              this.managers = [];
              this.tag = 'cx.world';
              this.initialized = false;
          }
          /**
           * Add entity to the world
           */
          cxWorld.prototype.addEntity = function (entity) {
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
          cxWorld.prototype.removeEntity = function (entity) {
              var index = entity.getIndex();
              if (index === null) {
                  throw new Error('Entity has no index');
              }
              this.entityDeleted(entity);
              delete this.entities[index];
          };
          /**
           * Get entity from world by its id
           */
          cxWorld.prototype.getEntity = function (index) {
              if (this.entities[index] == undefined) {
                  throw new Error('No entity found');
              }
              return this.entities[index];
          };
          /**
           * Get all entities from wold
           */
          cxWorld.prototype.getEntities = function () {
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
           * Add a system to world
           */
          cxWorld.prototype.addSystem = function (system) {
              system.setWorld(this);
              if (system instanceof cxEntitySystem_1["default"] === true) {
                  var slot = this.getFreeEntitySystemSlot();
                  if (slot != null) {
                      this.entitySystems[slot] = system;
                  }
                  else {
                      this.entitySystems.push(system);
                  }
              }
              else if (system instanceof cxVoidSystem_1["default"] === true) {
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
          cxWorld.prototype.init = function () {
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
           * get a system
           * @method getSystem
           * @param  {string|cxSystem} system
           * @return {cxSystem}
           */
          cxWorld.prototype.getSystem = function (system) {
              var systemName = "";
              if (typeof system === "string") {
                  systemName = system;
              }
              else {
                  systemName = system.getTag() || "";
              }
              for (var i = 0, len = this.entitySystems.length; i < len; i++) {
                  var system_1 = this.entitySystems[i];
                  if (system_1.getTag() === systemName) {
                      return system_1;
                  }
              }
              for (var i = 0, len = this.voidSystems.length; i < len; i++) {
                  var system_2 = this.voidSystems[i];
                  if (system_2.getTag() === systemName) {
                      return system_2;
                  }
              }
              throw "System " + systemName + " not found";
          };
          /**
           * Remove system
           */
          cxWorld.prototype.removeSystem = function (system) {
              var systemName = "";
              if (typeof system === "string") {
                  systemName = system;
              }
              else {
                  systemName = system.getTag() || '';
              }
              for (var i = 0, len = this.entitySystems.length; i < len; i++) {
                  var system_3 = this.entitySystems[i];
                  if (system_3 === undefined) {
                      continue;
                  }
                  if (system_3.getTag() == systemName) {
                      delete this.entitySystems[i];
                  }
              }
              for (var i = 0, len = this.voidSystems.length; i < len; i++) {
                  var system_4 = this.voidSystems[i];
                  if (system_4 === undefined) {
                      continue;
                  }
                  if (system_4.getTag() == systemName) {
                      delete this.voidSystems[i];
                  }
              }
          };
          /**
           * Add Manager
           */
          cxWorld.prototype.addManager = function (manager) {
              manager.setWorld(this);
              this.managers.push(manager);
          };
          /**
           * Get a manager
           */
          cxWorld.prototype.getManager = function (name) {
              for (var i = 0, len = this.managers.length; i < len; i++) {
                  var manager = this.managers[i];
                  if (manager.getTag() === name) {
                      return this.managers[i];
                  }
              }
              throw "Manager " + name + " not found";
          };
          /**
           * Update the world
           */
          cxWorld.prototype.update = function () {
              if (this.initialized === false) {
                  throw new Error('Not initialized');
              }
              this.updateEntities();
              this.updateVoidSystem();
              this.updateEntitySystem();
          };
          /**
           * Update void systems
           */
          cxWorld.prototype.updateVoidSystem = function () {
              for (var s = 0, sLen = this.voidSystems.length; s < sLen; s++) {
                  var system = this.voidSystems[s];
                  system.update();
              }
          };
          /**
           * Update entity systems
           */
          cxWorld.prototype.updateEntitySystem = function () {
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
          cxWorld.prototype.getEntitiesForSystem = function (system) {
              var components = system.getComponents();
              var entities = [];
              for (var i = 0; i < components.length; i++) {
                  entities.concat.apply(entities, this.getEntitiesWithComponent(components[i]));
              }
              return entities;
          };
          /**
           * Get a list of entities that match a component
           * @param name
           */
          cxWorld.prototype.getEntitiesWithComponent = function (name) {
              var entities = this.entities;
              var entitiesLength = entities.length;
              var filteredComponents = [];
              for (var i = 0; i < entitiesLength; i++) {
                  var entity = entities[i];
                  if (entity.hasComponent(name)) {
                      filteredComponents.push(entity);
                  }
              }
              return filteredComponents;
          };
          /**
           * Update all entities state
           */
          cxWorld.prototype.updateEntities = function () {
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
          cxWorld.prototype.getFreeEntitySlot = function () {
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
          cxWorld.prototype.getFreeEntitySystemSlot = function () {
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
          cxWorld.prototype.entityAdded = function (entity) {
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
           * @param {cxEntity} entity
           */
          cxWorld.prototype.entityDeleted = function (entity) {
              for (var s = 0, len = this.voidSystems.length; s < len; s++) {
                  var system = this.voidSystems[s];
                  system.removed(entity);
              }
              for (var s = 0, len = this.entitySystems.length; s < len; s++) {
                  var system = this.entitySystems[s];
                  system.removed(entity);
              }
          };
          cxWorld.prototype.getEntitySystems = function () {
              return this.entitySystems;
          };
          cxWorld.prototype.getVoidSystems = function () {
              return this.voidSystems;
          };
          cxWorld.prototype.getManagers = function () {
              return this.managers;
          };
          return cxWorld;
      }());
      exports["default"] = cxWorld;
  });
  define("cxScene", ["require", "exports", "cxWorld"], function (require, exports, cxWorld_1) {
      "use strict";
      exports.__esModule = true;
      /**
       * The current scene with is rendered on screen.
       */
      var cxScene = /** @class */ (function () {
          function cxScene(name) {
              this.name = name;
              this.world = new cxWorld_1["default"]();
          }
          /**
           * Updates the world object
           */
          cxScene.prototype.update = function () {
              this.world.update();
          };
          return cxScene;
      }());
      exports["default"] = cxScene;
  });
  define("cxCore", ["require", "exports"], function (require, exports) {
      'use strict';
      exports.__esModule = true;
      /**
       * Complex Core. This class handles the rendering of the current scene.
       */
      var cxCore = /** @class */ (function () {
          function cxCore() {
              this.scene = null;
          }
          cxCore.getInstance = function () {
              if (!cxCore.instance) {
                  cxCore.instance = new cxCore();
              }
              return cxCore.instance;
          };
          /**
           * load a scene to be rendered
           */
          cxCore.prototype.loadScene = function (scene) {
              this.scene = scene;
              this.scene.load();
          };
          /**
           * render the loaded scene
           */
          cxCore.prototype.update = function () {
              if (this.scene) {
                  this.scene.update();
              }
          };
          cxCore.prototype.getScene = function () {
              return this.scene;
          };
          cxCore.instance = null;
          return cxCore;
      }());
      exports["default"] = cxCore;
      ;
  });
  define("Complex", ["require", "exports", "cxCore", "cxEntity", "cxComponent", "cxManager", "cxScene", "cxSystem", "System/cxEntitySystem", "System/cxVoidSystem", "cxWorld"], function (require, exports, cxCore_1, cxEntity_1, cxComponent_1, cxManager_1, cxScene_1, cxSystem_3, cxEntitySystem_2, cxVoidSystem_2, cxWorld_2) {
      'use strict';
      exports.__esModule = true;
      exports.Complex = cxCore_1["default"];
      exports.cxEntity = cxEntity_1["default"];
      exports.cxComponent = cxComponent_1["default"];
      exports.cxManager = cxManager_1["default"];
      exports.cxScene = cxScene_1["default"];
      exports.cxSystem = cxSystem_3["default"];
      exports.cxEntitySystem = cxEntitySystem_2["default"];
      exports.cxVoidSystem = cxVoidSystem_2["default"];
      exports.cxWorld = cxWorld_2["default"];
  });
  
  return collect(); 
})();
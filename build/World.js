"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var EntitySystem_1 = __importDefault(require("./System/EntitySystem"));
var VoidSystem_1 = __importDefault(require("./System/VoidSystem"));
var Core_1 = __importDefault(require("./Core"));
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
            Core_1.default.getInstance().log("World", "Added EntitySystem", system);
        }
        else if (system instanceof VoidSystem_1.default === true) {
            var slot = this.getFreeEntitySystemSlot();
            if (slot != null) {
                this.voidSystems[slot] = system;
            }
            else {
                this.voidSystems.push(system);
            }
            Core_1.default.getInstance().log("World", "Added VoidSystem", system);
        }
    };
    /**
     * After all systems has been added, this should be called to initiate them
     * @method init
     */
    World.prototype.init = function () {
        Core_1.default.getInstance().log("World", "Initializing");
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
        Core_1.default.getInstance().log("World", "Manager added", manager);
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
//# sourceMappingURL=World.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cxEntitySystem_1 = __importDefault(require("./System/cxEntitySystem"));
var cxVoidSystem_1 = __importDefault(require("./System/cxVoidSystem"));
/**
 * The world contains all entities, systems and managers
 */
var cxWorld = /** @class */ (function () {
    function cxWorld() {
        this.entities = [];
        this.voidSystems = [];
        this.entitySystems = [];
        this.managers = [];
        this.tag = "cx.world";
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
            throw new Error("Entity has no index");
        }
        this.entityDeleted(entity);
        delete this.entities[index];
    };
    /**
     * Get entity from world by its id
     */
    cxWorld.prototype.getEntity = function (index) {
        if (this.entities[index] == undefined) {
            throw new Error("No entity found");
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
        if (system instanceof cxEntitySystem_1.default === true) {
            var slot = this.getFreeEntitySystemSlot();
            if (slot != null) {
                this.entitySystems[slot] = system;
            }
            else {
                this.entitySystems.push(system);
            }
        }
        else if (system instanceof cxVoidSystem_1.default === true) {
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
            systemName = system.tag || "";
        }
        for (var i = 0, len = this.entitySystems.length; i < len; i++) {
            var system_1 = this.entitySystems[i];
            if (system_1.tag === systemName) {
                return system_1;
            }
        }
        for (var i = 0, len = this.voidSystems.length; i < len; i++) {
            var system_2 = this.voidSystems[i];
            if (system_2.tag === systemName) {
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
            systemName = system.tag || "";
        }
        for (var i = 0, len = this.entitySystems.length; i < len; i++) {
            var system_3 = this.entitySystems[i];
            if (system_3 === undefined) {
                continue;
            }
            if (system_3.tag == systemName) {
                delete this.entitySystems[i];
            }
        }
        for (var i = 0, len = this.voidSystems.length; i < len; i++) {
            var system_4 = this.voidSystems[i];
            if (system_4 === undefined) {
                continue;
            }
            if (system_4.tag == systemName) {
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
            if (manager.tag === name) {
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
            throw new Error("Not initialized");
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
            entities.push.apply(entities, this.getEntitiesWithComponent(components[i]));
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
exports.default = cxWorld;
//# sourceMappingURL=cxWorld.js.map
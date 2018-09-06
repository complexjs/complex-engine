"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = cxEntity;

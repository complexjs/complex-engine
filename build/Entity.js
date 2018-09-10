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
//# sourceMappingURL=Entity.js.map
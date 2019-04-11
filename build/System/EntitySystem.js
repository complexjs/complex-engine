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
//# sourceMappingURL=EntitySystem.js.map
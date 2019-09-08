import Entity from './Entity';
import Manager from './Manager';
import System from './System';
import EntitySystem from './System/EntitySystem';
import VoidSystem from './System/VoidSystem';

/**
 * The world contains all entities, systems and managers
 */
class World {
    constructor() {
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

        /** @var {number} */
        this.ticks = 0;
    }

    /**
     * Creates and adds a new entity
     * @param {Component[]} components
     * @return {Entity}
     */
    createEntity(components) {
        let slot = this._getFreeEntitySlot();
        const entity = new Entity();

        if (slot != null) {
            this.entities[slot] = entity;
        } else {
            slot = this.entities.length;
            this.entities.push(entity);
        }

        components.forEach(c => entity.addComponent(c));
        entity.setIndex(slot);
        this._entityAdded(entity);
        return entity;
    }

    /**
     * Add entity to the world
     * @param { Entity} entity
     * @returns { World }
     */
    addEntity(entity) {
        let slot = this._getFreeEntitySlot();

        if (slot != null) {
            this.entities[slot] = entity;
        } else {
            slot = this.entities.length;
            this.entities.push(entity);
        }

        entity.setIndex(slot);
        this._entityAdded(entity);

        return this;
    }

    /**
     * remove entity from the world
     * @param {Entity} entity
     * @returns {World}
     * @private
     * @throws Error
     */
    _removeEntity(entity) {
        const index = entity.getIndex();
        if (index === null) {
            throw new Error('Entity has no index');
        }

        this._entityDeleted(entity);
        return this;
    }

    /**
     * Get entity from world by its id
     * @param {number} index
     * @returns {Entity}
     * @throws Error
     */
    getEntity(index) {
        if (this.entities[index] == undefined) {
            throw new Error('No entity found');
        }
        return this.entities[index];
    }

    /**
     * Get all entities from wold
     * @returns {Entity[]}
     */
    getEntities() {
        return this.entities;
    }

    /**
     * Add new void system to the world
     * @param {VoidSystem} system
     */
    addVoidSystem(system) {
        system.setWorld(this);
        let slot = this._getFreeEntitySystemSlot();
        if (slot != null) {
            this.voidSystems[slot] = system;
        } else {
            this.voidSystems.push(system);
        }
        return this;
    }

    /**
     * Add new entity system to the world
     * @param {EntitySystem} system
     */
    addEntitySystem(system) {
        system.setWorld(this);
        let slot = this._getFreeEntitySystemSlot();
        if (slot != null) {
            this.entitySystems[slot] = system;
        } else {
            this.entitySystems.push(system);
        }
        return this;
    }

    /**
     * After all systems has been added, this should be called to initiate them
     * @return {World}
     */
    init() {
        for (let i = 0, len = this.entitySystems.length; i < len; i++) {
            let system = this.entitySystems[i];
            system.addedToWorld();
        }

        for (let i = 0, len = this.voidSystems.length; i < len; i++) {
            let system = this.voidSystems[i];
            system.addedToWorld();
        }

        this.initialized = true;

        return this;
    }

    /**
     * get a System
     * @param  {Function} systemClass Class constructor
     * @return {System}
     * @throws Error
     */
    getSystem(systemClass) {
        for (let i = 0, len = this.entitySystems.length; i < len; i++) {
            let s = this.entitySystems[i];
            if (s instanceof systemClass) {
                return s;
            }
        }

        for (let i = 0, len = this.voidSystems.length; i < len; i++) {
            let s = this.voidSystems[i];
            if (s instanceof systemClass) {
                return s;
            }
        }

        throw 'System ' + systemClass + ' not found';
    }

    /**
     * Remove System
     * @param {Function} systemClass Class constructor
     * @returns {World}
     */
    removeSystem(systemClass) {
        const entitySystems = this.entitySystems;
        const eLen = entitySystems.length;
        const newESystems = [];

        for (let i = 0; i < eLen; i++) {
            const system = entitySystems[i];
            if (!system instanceof systemClass) {
                newESystems.push(system);
            }
        }

        this.entitySystems = newESystems;

        const voidSystems = this.voidSystems;
        const vLen = voidSystems.length;
        const newVSystems = [];

        for (let i = 0; i < vLen; i++) {
            const system = voidSystems[i];
            if (!system instanceof systemClass) {
                newVSystems.push(system);
            }
        }
        this.voidSystems = newVSystems;

        return this;
    }

    /**
     * Add Manager
     * @param {Manager} manager Manager instance
     * @returns {World}
     */
    addManager(manager) {
        manager.setWorld(this);
        this.managers.push(manager);

        return this;
    }

    /**
     * Get a manager
     * @param { Function} managerClass Manager class constructor
     * @returns {Manager}
     * @throws Error
     */
    getManager(managerClass) {
        for (let i = 0, len = this.managers.length; i < len; i++) {
            let manager = this.managers[i];
            if (manager instanceof managerClass) {
                return this.managers[i];
            }
        }

        throw 'Manager ' + name + ' not found';
    }

    /**
     * Update the world
     * @throws Error
     */
    update() {
        if (this.initialized === false) {
            throw new Error('Not initialized');
        }

        this._updateEntities()
            ._updateVoidSystem()
            ._updateEntitySystem();

        this.ticks++;
    }

    /**
     * Update void systems
     * @private
     * @returns {World}
     */
    _updateVoidSystem() {
        for (let s = 0, sLen = this.voidSystems.length; s < sLen; s++) {
            let system = this.voidSystems[s];
            system.update();
        }
        return this;
    }

    /**
     * Update entity systems
     * @private
     * @returns {World}
     */
    _updateEntitySystem() {
        for (let s = 0, sLen = this.entitySystems.length; s < sLen; s++) {
            const system = this.entitySystems[s];
            const entities = this.getEntitiesWithComponents(system.components);
            system.processEntities(entities);
        }
    }

    /**
     *
     * @param {Entity} entity
     * @param components
     * @private
     */
    _checkIfEntityHasComponents(entity, components) {
        for (let i = 0; i < components.length; i++) {
            if (!entity.hasComponent(components[i])) {
                return false;
            }
        }
        return true;
    }

    /**
     * Get a list of entities that match a component
     * @param {Function} component
     * @returns {Entity[]}
     */
    getEntitiesWithComponent(component) {
        const entities = this.entities;
        const entitiesLength = entities.length;
        const filteredComponents = [];

        for (let i = 0; i < entitiesLength; i++) {
            const entity = entities[i];
            if (entity.hasComponent(component)) {
                filteredComponents.push(entity);
            }
        }

        return filteredComponents;
    }

    /**
     * Get a list of entities that match a component
     * @param {Function[]} components
     * @returns {Entity[]}
     */
    getEntitiesWithComponents(components) {
        const matchingEntities = [];
        for (let i = 0; i < this.entities.length; i++) {
            const entity = this.entities[i];
            if (this._checkIfEntityHasComponents(entity, components)) {
                matchingEntities.push(entity);
            }
        }
        return matchingEntities;
    }

    /**
     * Update all entities state
     * @private
     * @returns {World}
     */
    _updateEntities() {
        this.entities = this.entities.filter((entity) => {
            if (!entity.isAlive() && entity.isRemove()) {
                this._removeEntity(entity);
                return false;
            }
            return true;
        });

        return this;
    }

    /**
     * recycle entityslots
     * @private
     * @returns {number | null}
     */
    _getFreeEntitySlot() {
        for (let e = 0, len = this.entities.length; e < len; e++) {
            let entity = this.entities[e];
            if (entity === null || entity === undefined) {
                return e;
            }
        }
        return null;
    }

    /**
     * recycle systemslot
     * @private
     * @return {number | null}
     */
    _getFreeEntitySystemSlot() {
        for (let s = 0, len = this.entitySystems.length; s < len; s++) {
            let system = this.entitySystems[s];
            if (system === undefined || system === null) {
                return s;
            }
        }
        return null;
    }

    /**
     * notify systems for new entity
     * @param {Entity} entity
     * @private
     * @returns {World}
     */
    _entityAdded(entity) {
        for (let s = 0, len = this.voidSystems.length; s < len; s++) {
            let system = this.voidSystems[s];
            system.added(entity);
        }

        for (let s = 0, len = this.entitySystems.length; s < len; s++) {
            let system = this.entitySystems[s];
            system.added(entity);
        }
        return this;
    }

    /**
     * notify systems for deleted entity
     * @param {Entity} entity
     * @private
     * @returns {World}
     */
    _entityDeleted(entity) {
        for (let s = 0, len = this.voidSystems.length; s < len; s++) {
            let system = this.voidSystems[s];
            system.removed(entity);
        }

        for (let s = 0, len = this.entitySystems.length; s < len; s++) {
            let system = this.entitySystems[s];
            system.removed(entity);
        }
    }

    /**
     * @return {EntitySystem[]}
     */
    getEntitySystems() {
        return this.entitySystems;
    }

    /**
     * @returns {VoidSystem[]}
     */
    getVoidSystems() {
        return this.voidSystems;
    }

    /**
     * @return {Manager[]}
     */
    getManagers() {
        return this.managers;
    }
}

export default World;

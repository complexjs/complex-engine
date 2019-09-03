import System from './System';
import Entity from './Entity';
import Manager from './Manager';
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
     * @throws Error
     */
    removeEntity(entity) {
        const index = entity.getIndex();
        if (index === null) {
            throw new Error('Entity has no index');
        }

        this._entityDeleted(entity);
        delete this.entities[index];

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
        let entities = [];
        for (let e = 0, len = this.entities.length; e < len; e++) {
            let entity = this.entities[e];
            if (entity == undefined || entity == null) {
                continue;
            }
            entities.push(entity);
        }
        return entities;
    }

    /**
     * Add a System to world
     * @param { EntitySystem | VoidSystem} system System instance
     * @returns {World}
     * @throws Error
     */
    addSystem(system) {
        system.setWorld(this);

        if (system instanceof EntitySystem === true) {
            let slot = this._getFreeEntitySystemSlot();
            if (slot != null) {
                this.entitySystems[slot] = system;
            } else {
                this.entitySystems.push(system);
            }
        } else if (system instanceof VoidSystem === true) {
            let slot = this._getFreeEntitySystemSlot();
            if (slot != null) {
                this.voidSystems[slot] = system;
            } else {
                this.voidSystems.push(system);
            }
        } else {
            throw new Error('Object seems not to be a System');
        }
        return this;
    }

    /**
     * After all systems has been added, this should be called to initiate them
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
        this.entitySystems = this.entitySystems.filter((system) => {
            return !(system instanceof systemClass);
        });

        this.voidSystems = this.voidSystems.filter((system) => {
            return !(system instanceof systemClass);
        });

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
            const entities = this._getEntitiesForSystem(system);
            system.processEntities(entities);
        }
    }

    /**
     * Get all entities that fit a systems requirements(components)
     * @param {EntitySystem} system
     * @private
     * @returns {Entity[]}
     */
    _getEntitiesForSystem(system) {
        const components = system.getComponents();
        const entities = [];
        for (let i = 0; i < components.length; i++) {
            entities.push(...this.getEntitiesWithComponent(components[i]));
        }
        return entities;
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
     * Update all entities state
     * @private
     * @returns {World}
     */
    _updateEntities() {
        const entities = this.entities;
        const entitiesLength = entities.length;

        for (let i = 0; i < entitiesLength; i++) {
            const entity = entities[i];

            if (!entity.isAlive() && entity.isRemove()) {
                this.removeEntity(entity);
            }
        }

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

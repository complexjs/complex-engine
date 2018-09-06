"use strict";

import cxSystem from './cxSystem';
import cxEntity from './cxEntity';
import cxManager from './cxManager';
import cxEntitySystem from './System/cxEntitySystem';
import cxVoidSystem from './System/cxVoidSystem';

/**
 * The world contains all entities, systems and managers
 */
export default class cxWorld {
    protected entities: cxEntity[] = [];
    protected voidSystems: cxVoidSystem[] = [];
    protected entitySystems: cxEntitySystem[] = [];
    protected managers: cxManager[] = [];
    protected tag: string = 'cx.world';
    protected initialized: boolean = false;

    /**
     * Add entity to the world
     */
    public addEntity(entity: cxEntity): void {
        let slot = this.getFreeEntitySlot();
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
     */
    public removeEntity(entity: cxEntity): void {
        const index = entity.getIndex();
        if (index === null) {
            throw new Error('Entity has no index');
        }

        this.entityDeleted(entity);
        delete this.entities[index];
    }

    /**
     * Get entity from world by its id
     */
    public getEntity(index: number): cxEntity {
        if (this.entities[index] == undefined) {
            throw new Error('No entity found');
        }
        return this.entities[index];
    }

    /**
     * Get all entities from wold
     */
    public getEntities(): cxEntity[] {
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
     * Add a system to world
     */
    public addSystem(system: cxEntitySystem | cxVoidSystem): void {
        system.setWorld(this);

        if (system instanceof cxEntitySystem === true) {
            let slot = this.getFreeEntitySystemSlot();
            if (slot != null) {
                this.entitySystems[slot] = <cxEntitySystem>system;
            } else {
                this.entitySystems.push(<cxEntitySystem>system);
            }
        } else if (system instanceof cxVoidSystem === true) {
            let slot = this.getFreeEntitySystemSlot();
            if (slot != null) {
                this.voidSystems[slot] = <cxVoidSystem>system;
            } else {
                this.voidSystems.push(<cxVoidSystem>system);
            }
        }
    }

    /**
     * After all systems has been added, this should be called to initiate them
     * @method init
     */
    public init(): void {
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
     * get a system
     * @method getSystem
     * @param  {string|cxSystem} system
     * @return {cxSystem}
     */
    public getSystem(system: string | cxSystem): cxSystem {
        let systemName = "";
        if (typeof system === "string") {
            systemName = system;
        } else {
            systemName = system.getTag() || "";
        }

        for (let i = 0, len = this.entitySystems.length; i < len; i++) {
            let system = this.entitySystems[i];
            if (system.getTag() === systemName) {
                return system;
            }
        }

        for (let i = 0, len = this.voidSystems.length; i < len; i++) {
            let system = this.voidSystems[i];
            if (system.getTag() === systemName) {
                return system;
            }
        }

        throw "System " + systemName + " not found";
    }

    /**
     * Remove system
     */
    public removeSystem(system: cxSystem | string): void {
        let systemName = "";
        if (typeof system === "string") {
            systemName = system;
        } else {
            systemName = system.getTag() || '';
        }

        for (let i = 0, len = this.entitySystems.length; i < len; i++) {
            let system = this.entitySystems[i];
            if (system === undefined) {
                continue;
            }
            if (system.getTag() == systemName) {
                delete this.entitySystems[i];
            }
        }

        for (let i = 0, len = this.voidSystems.length; i < len; i++) {
            let system = this.voidSystems[i];
            if (system === undefined) {
                continue;
            }
            if (system.getTag() == systemName) {
                delete this.voidSystems[i];
            }
        }
    }

    /**
     * Add Manager
     */
    public addManager(manager: cxManager): void {
        manager.setWorld(this);
        this.managers.push(manager);
    }

    /**
     * Get a manager
     */
    public getManager(name: string): cxManager {
        for (let i = 0, len = this.managers.length; i < len; i++) {
            let manager = this.managers[i];
            if (manager.getTag() === name) {
                return this.managers[i];
            }
        }

        throw "Manager " + name + " not found";
    }

    /**
     * Update the world
     */
    public update(): void {
        if (this.initialized === false) {
            throw new Error('Not initialized');
        }

        this.updateEntities();
        this.updateVoidSystem();
        this.updateEntitySystem();
    }

    /**
     * Update void systems
     */
    private updateVoidSystem(): void {
        for (let s = 0, sLen = this.voidSystems.length; s < sLen; s++) {
            let system = this.voidSystems[s];
            system.update();
        }
    }

    /**
     * Update entity systems
     */
    private updateEntitySystem(): void {
        for (let s = 0, sLen = this.entitySystems.length; s < sLen; s++) {
            const system = this.entitySystems[s];

            const entities = this.getEntitiesForSystem(system);
            system.processEntities(entities);
        }
    }

    /**
     * Get all entities that fit a systems requirements(components)
     * @param system
     */
    private getEntitiesForSystem(system: cxEntitySystem): cxEntity[] {
        const components = system.getComponents();
        const entities: cxEntity[] = [];
        for (let i = 0; i < components.length; i++) {
            entities.concat(...this.getEntitiesWithComponent(components[i]));
        }

        return entities;
    }

    /**
     * Get a list of entities that match a component
     * @param name
     */
    private getEntitiesWithComponent(name: string): cxEntity[] {
        const entities = this.entities;
        const entitiesLength = entities.length;
        const filteredComponents = [];

        for (let i = 0; i < entitiesLength; i++) {
            const entity = entities[i];
            if (entity.hasComponent(name)) {
                filteredComponents.push(entity);
            }
        }

        return filteredComponents;
    }

    /**
     * Update all entities state
     */
    private updateEntities() {
        const entities = this.entities;
        const entitiesLength = entities.length;

        for (let i = 0; i < entitiesLength; i++) {
            const entity = entities[i];

            if (!entity.isAlive() && entity.isRemove()) {
                this.removeEntity(entity);
            }
        }
    }

    /**
     * recycle entityslots
     */
    private getFreeEntitySlot(): number | null {
        for (let e = 0, len = this.entities.length; e < len; e++) {
            let entity = this.entities[e];
            if (entity == null || entity == undefined) {
                return e;
            }
        }
        return null;
    }

    /**
     * recycle systemslot
     */
    private getFreeEntitySystemSlot(): number | null {
        for (let s = 0, len = this.entitySystems.length; s < len; s++) {
            let system = this.entitySystems[s];
            if (system == undefined || system == null) {
                return s;
            }
        }
        return null;
    }

    /**
     * notify systems for new entity
     */
    protected entityAdded(entity: cxEntity): void {
        for (let s = 0, len = this.voidSystems.length; s < len; s++) {
            let system = this.voidSystems[s];
            system.added(entity);
        }

        for (let s = 0, len = this.entitySystems.length; s < len; s++) {
            let system = this.entitySystems[s];
            system.added(entity);
        }
    }

    /**
     * notify systems for deleted entity
     * @method entityDeleted
     * @param {cxEntity} entity
     */
    protected entityDeleted(entity: cxEntity): void {
        for (let s = 0, len = this.voidSystems.length; s < len; s++) {
            let system = this.voidSystems[s];
            system.removed(entity);
        }

        for (let s = 0, len = this.entitySystems.length; s < len; s++) {
            let system = this.entitySystems[s];
            system.removed(entity);
        }
    }

    public getEntitySystems(): cxEntitySystem[] {
        return this.entitySystems;
    }

    public getVoidSystems(): cxVoidSystem[] {
        return this.voidSystems;
    }

    public getManagers(): cxManager[] {
        return this.managers;
    }
}

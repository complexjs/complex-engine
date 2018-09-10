"use strict";

import System from "./System";
import Entity from "./Entity";
import Manager from "./Manager";
import EntitySystem from "./System/EntitySystem";
import VoidSystem from "./System/VoidSystem";

/**
 * The world contains all entities, systems and managers
 */
export default class World {
    protected entities: Entity[] = [];
    protected voidSystems: VoidSystem[] = [];
    protected entitySystems: EntitySystem[] = [];
    protected managers: Manager[] = [];
    protected initialized: boolean = false;

    /**
     * Add entity to the world
     */
    public addEntity(entity: Entity): void {
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
    public removeEntity(entity: Entity): void {
        const index = entity.getIndex();
        if (index === null) {
            throw new Error("Entity has no index");
        }

        this.entityDeleted(entity);
        delete this.entities[index];
    }

    /**
     * Get entity from world by its id
     */
    public getEntity(index: number): Entity {
        if (this.entities[index] == undefined) {
            throw new Error("No entity found");
        }
        return this.entities[index];
    }

    /**
     * Get all entities from wold
     */
    public getEntities(): Entity[] {
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
     */
    public addSystem(system: EntitySystem | VoidSystem): void {
        system.setWorld(this);

        if (system instanceof EntitySystem === true) {
            let slot = this.getFreeEntitySystemSlot();
            if (slot != null) {
                this.entitySystems[slot] = <EntitySystem>system;
            } else {
                this.entitySystems.push(<EntitySystem>system);
            }
        } else if (system instanceof VoidSystem === true) {
            let slot = this.getFreeEntitySystemSlot();
            if (slot != null) {
                this.voidSystems[slot] = <VoidSystem>system;
            } else {
                this.voidSystems.push(<VoidSystem>system);
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
     * get a System
     * @method getSystem
     * @param  {string|System} systemClass
     * @return {System}
     */
    public getSystem(systemClass: Function): System {
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

        throw "System " + systemClass + " not found";
    }

    /**
     * Remove System
     */
    public removeSystem(systemClass: Function): void {
        for (let i = 0, len = this.entitySystems.length; i < len; i++) {
            let s = this.entitySystems[i];
            if (s === undefined) {
                continue;
            }

            if (s instanceof systemClass) {
                delete this.entitySystems[i];
            }
        }

        for (let i = 0, len = this.voidSystems.length; i < len; i++) {
            let s = this.voidSystems[i];
            if (s === undefined) {
                continue;
            }
            if (s instanceof systemClass) {
                delete this.voidSystems[i];
            }
        }
    }

    /**
     * Add Manager
     */
    public addManager(manager: Manager): void {
        manager.setWorld(this);
        this.managers.push(manager);
    }

    /**
     * Get a manager
     */
    public getManager(managerClass: Function): Manager {
        for (let i = 0, len = this.managers.length; i < len; i++) {
            let manager = this.managers[i];
            if (manager instanceof managerClass) {
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
            throw new Error("Not initialized");
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
    private getEntitiesForSystem(system: EntitySystem): Entity[] {
        const components = system.getComponents();
        const entities: Entity[] = [];
        for (let i = 0; i < components.length; i++) {
            entities.push(...this.getEntitiesWithComponent(components[i]));
        }
        return entities;
    }

    /**
     * Get a list of entities that match a component
     */
    private getEntitiesWithComponent(component: Function): Entity[] {
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
    protected entityAdded(entity: Entity): void {
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
     * @param {Entity} entity
     */
    protected entityDeleted(entity: Entity): void {
        for (let s = 0, len = this.voidSystems.length; s < len; s++) {
            let system = this.voidSystems[s];
            system.removed(entity);
        }

        for (let s = 0, len = this.entitySystems.length; s < len; s++) {
            let system = this.entitySystems[s];
            system.removed(entity);
        }
    }

    public getEntitySystems(): EntitySystem[] {
        return this.entitySystems;
    }

    public getVoidSystems(): VoidSystem[] {
        return this.voidSystems;
    }

    public getManagers(): Manager[] {
        return this.managers;
    }
}

import System from "./System";
import Entity from "./Entity";
import Manager from "./Manager";
import EntitySystem from "./System/EntitySystem";
import VoidSystem from "./System/VoidSystem";
/**
 * The world contains all entities, systems and managers
 */
export default class World {
    protected entities: Entity[];
    protected voidSystems: VoidSystem[];
    protected entitySystems: EntitySystem[];
    protected managers: Manager[];
    protected initialized: boolean;
    /**
     * Add entity to the world
     */
    addEntity(entity: Entity): void;
    /**
     * remove entity from the world
     */
    removeEntity(entity: Entity): void;
    /**
     * Get entity from world by its id
     */
    getEntity(index: number): Entity;
    /**
     * Get all entities from wold
     */
    getEntities(): Entity[];
    /**
     * Add a System to world
     */
    addSystem(system: EntitySystem | VoidSystem): void;
    /**
     * After all systems has been added, this should be called to initiate them
     * @method init
     */
    init(): void;
    /**
     * get a System
     * @method getSystem
     * @param  {string|System} systemClass
     * @return {System}
     */
    getSystem(systemClass: Function): System;
    /**
     * Remove System
     */
    removeSystem(systemClass: Function): void;
    /**
     * Add Manager
     */
    addManager(manager: Manager): void;
    /**
     * Get a manager
     */
    getManager<T extends Manager>(managerClass: Function): T;
    /**
     * Update the world
     */
    update(): void;
    /**
     * Update void systems
     */
    private updateVoidSystem;
    /**
     * Update entity systems
     */
    private updateEntitySystem;
    /**
     * Get all entities that fit a systems requirements(components)
     * @param system
     */
    private getEntitiesForSystem;
    /**
     * Get a list of entities that match a component
     */
    private getEntitiesWithComponent;
    /**
     * Update all entities state
     */
    private updateEntities;
    /**
     * recycle entityslots
     */
    private getFreeEntitySlot;
    /**
     * recycle systemslot
     */
    private getFreeEntitySystemSlot;
    /**
     * notify systems for new entity
     */
    protected entityAdded(entity: Entity): void;
    /**
     * notify systems for deleted entity
     * @method entityDeleted
     * @param {Entity} entity
     */
    protected entityDeleted(entity: Entity): void;
    getEntitySystems(): EntitySystem[];
    getVoidSystems(): VoidSystem[];
    getManagers(): Manager[];
}

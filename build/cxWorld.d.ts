import cxSystem from './cxSystem';
import cxEntity from './cxEntity';
import cxManager from './cxManager';
import cxEntitySystem from './System/cxEntitySystem';
import cxVoidSystem from './System/cxVoidSystem';
/**
 * The world contains all entities, systems and managers
 */
export default class cxWorld {
    protected entities: cxEntity[];
    protected voidSystems: cxVoidSystem[];
    protected entitySystems: cxEntitySystem[];
    protected managers: cxManager[];
    protected tag: string;
    protected initialized: boolean;
    /**
     * Add entity to the world
     */
    addEntity(entity: cxEntity): void;
    /**
     * remove entity from the world
     */
    removeEntity(entity: cxEntity): void;
    /**
     * Get entity from world by its id
     */
    getEntity(index: number): cxEntity;
    /**
     * Get all entities from wold
     */
    getEntities(): cxEntity[];
    /**
     * Add a system to world
     */
    addSystem(system: cxEntitySystem | cxVoidSystem): void;
    /**
     * After all systems has been added, this should be called to initiate them
     * @method init
     */
    init(): void;
    /**
     * get a system
     * @method getSystem
     * @param  {string|cxSystem} system
     * @return {cxSystem}
     */
    getSystem(system: string | cxSystem): cxSystem;
    /**
     * Remove system
     */
    removeSystem(system: cxSystem | string): void;
    /**
     * Add Manager
     */
    addManager(manager: cxManager): void;
    /**
     * Get a manager
     */
    getManager(name: string): cxManager;
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
     * @param name
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
    protected entityAdded(entity: cxEntity): void;
    /**
     * notify systems for deleted entity
     * @method entityDeleted
     * @param {cxEntity} entity
     */
    protected entityDeleted(entity: cxEntity): void;
    getEntitySystems(): cxEntitySystem[];
    getVoidSystems(): cxVoidSystem[];
    getManagers(): cxManager[];
}

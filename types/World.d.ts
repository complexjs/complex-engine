import { VoidSystem, EntitySystem, Manager, Entity } from '../src/Complex';

export interface World {
    entities: Entity[];
    voidSystems: VoidSystem[];
    entitySystem: EntitySystem[];
    managers: Manager[];
    initialized: boolean;

    addEntity(entity: Entity): void;
    emoveEntity(entity: Entity): void;
    getEntity(index: number): Entity;
    getEntities(): Entity[];
    addSystem(system: EntitySystem | VoidSystem): void;
    init(): void;
    getSystem<T extends System>(systemVlass: Function): T;
    removeSystem(systemVlass: Function): void;
    addManager(manager: Manager): void;
    getManager<T extends Manager>(managerClass: Function): T
    uodate(): void;
    
    updateVoidSystem();
    updateEntitySystem();
    getEntitiesForSystem(system: EntitySystem): Entity[];
    getEntitiesWithComponent(componentClass: Function): Entity[];
    updateEntities(): void;
    getFreeEntitySlot(): number | null;
    getFreeEntitySystemSlot(): number | null;

    entityAdded(entity: Entity): void;
    entityDeleted(entity: Entity): void;
    getEntitySystems(): EntitySystem[];
    getVoidSystems(): VoidSystem[];
    getManagers(): Manager[];


}

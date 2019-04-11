import Entity from "./Entity";
import World from "./World";
/**
 * Abstract System. A System is responsible that your game works. It holds all the business logic and processes the
 * entities based on the data in the components
 */
export interface System {
    /**
     * get notified when System is added to world
     */
    addedToWorld(): void;
    /**
     * get notified when entity is added to world
     */
    added(entity: Entity): void;
    /**
     * get notified when entity is removed from world
     */
    removed(entity: Entity): void;
    /**
     * Attach system to a world instance
     * @param {World} value
     */
    setWorld(value: World): void;
}

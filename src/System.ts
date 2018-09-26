import Entity from "./Entity";
import World from "./World";

/**
 * Abstract System. A System is responsible that your game works. It holds all the business logic and processes the
 * entities based on the data in the components
 */
export default abstract class System {
    world: World | null = null;

    /**
     * get notified when System is added to world
     */
    public addedToWorld(): void {
    }

    /**
     * get notified when entity is added to world
     */
    public added(entity: Entity): void {
    }

    /**
     * get notified when entity is removed from world
     */
    public removed(entity: Entity): void {
    }

    public setWorld(value: World): void {
        this.world = value;
    }
}

import cxEntity from "./cxEntity";
import cxWorld from "./cxWorld";
/**
 * Abstract System. A system is responsible that your game works. It holds all the business logic and processes the
 * entities based on the data in the components
 */
export default abstract class cxSystem {
    protected world: cxWorld | null;
    abstract readonly tag: string;
    /**
     * get notified when system is added to world
     */
    addedToWorld(): void;
    /**
     * get notified when entity is added to world
     */
    added(entity: cxEntity): void;
    /**
     * get notified when entity is removed from world
     */
    removed(entity: cxEntity): void;
    setWorld(value: cxWorld): void;
}

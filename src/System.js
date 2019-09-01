import Entity from "./Entity";
import World from "./World";

/**
 * Abstract System. A System is responsible that your game works. It holds all the business logic and processes the
 * entities based on the data in the components
 */
class System {
    constructor() {
        /**  @var {World | null} */
        this.world = null;
    }

    /**
     * get notified when System is added to world
     */
    addedToWorld() { }

    /**
     * get notified when entity is added to world
     * @param {Entity} entity
     */
    added(entity) { }

    /**
     * get notified when entity is removed from world
     * @param {Entity} entity
     */
    removed(entity) { }

    /**
     *
     * @param {World} world
     */
    setWorld(world) {
        this.world = world;
    }
}

export default System

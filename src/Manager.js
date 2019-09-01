import { World } from "./Complex";

class Manager {
    constructor() {
        /** @var { World | null} */
        this.world = null;
    }

    /**
     * @returns {World | null}
     */
    getWorld() {
        return this.world;
    }

    /**
     * 
     * @param {World | null} world
     */
    setWorld(world) {
        this.world = world;
    }
}

export default Manager;
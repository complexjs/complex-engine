"use strict";

import {World} from "./Complex";

export default abstract class Manager {
    protected world: World | null = null;

    public getWorld(): World | null {
        return this.world;
    }

    public setWorld(world: World) {
        this.world = world;
    }
}

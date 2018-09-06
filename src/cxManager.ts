"use strict";

import {cxWorld} from './Complex';

export default class cxManager {
    protected tag: string | null = null;
    protected world: cxWorld | null = null;

    public getTag(): string | null {
        return this.tag;
    }

    public getWorld(): cxWorld | null {
        return this.world;
    }

    public setWorld(world: cxWorld) {
        this.world = world;
    }

}

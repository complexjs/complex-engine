"use strict";

import cxWorld from './cxWorld';

/**
 * The current scene with is rendered on screen.
 */
export default abstract class cxScene {
    protected name: string;
    protected world: cxWorld;

    constructor(name: string) {
        this.name = name;
        this.world = new cxWorld();
    }

    /**
     * Called when the world is loaded by the ComplexCore. In this method your stage should be loaded/created
     */
    public abstract load(): void;

    /**
     * Starts the initialisation of the world
     */
    public run(): void {
        this.world.init();
    }

    /**
     * Updates the world object
     */
    public update(): void {
        this.world.update();
    }
}

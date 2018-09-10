'use strict';

import Scene from './Scene';

/**
 * Complex Core. This class handles the rendering of the current scene.
 */
export default class Core {
    protected scene: Scene | null = null;
    private static instance: Core | null = null;

    private constructor() {

    }

    public static getInstance(): Core {
        if (!Core.instance) {
            Core.instance = new Core();
        }
        return Core.instance;
    }

    /**
     * load a scene to be rendered
     */
    public loadScene(scene: Scene): void {
        this.scene = scene;
        this.scene.load();
        this.scene.run();
    }

    /**
     * render the loaded scene
     */
    public update(): void {
        if (this.scene) {
            this.scene.update();
        }
    }

    public getScene(): Scene | null {
        return this.scene;
    }
};

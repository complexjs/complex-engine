'use strict';

import cxScene from './cxScene';

/**
 * Complex Core. This class handles the rendering of the current scene.
 */
export default class cxCore {
    protected scene: cxScene | null = null;
    private static instance: cxCore | null = null;

    protected constructor() {

    }

    public static getInstance(): cxCore {
        if (!cxCore.instance) {
            cxCore.instance = new cxCore();
        }
        return cxCore.instance;
    }

    /**
     * load a scene to be rendered
     */
    public loadScene(scene: cxScene): void {
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

    public getScene(): cxScene | null {
        return this.scene;
    }
};

import cxScene from './cxScene';
/**
 * Complex Core. This class handles the rendering of the current scene.
 */
export default class cxCore {
    protected scene: cxScene | null;
    private static instance;
    protected constructor();
    static getInstance(): cxCore;
    /**
     * load a scene to be rendered
     */
    loadScene(scene: cxScene): void;
    /**
     * render the loaded scene
     */
    update(): void;
    getScene(): cxScene | null;
}

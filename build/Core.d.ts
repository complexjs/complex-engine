import Scene from './Scene';
/**
 * Complex Core. This class handles the rendering of the current scene.
 */
export default class Core {
    protected scene: Scene | null;
    private static instance;
    private constructor();
    static getInstance(): Core;
    /**
     * load a scene to be rendered
     */
    loadScene(scene: Scene): void;
    /**
     * render the loaded scene
     */
    update(): void;
    getScene(): Scene | null;
}

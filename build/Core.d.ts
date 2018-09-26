import Scene from './Scene';
/**
 * Complex Core. This class handles the rendering of the current scene.
 */
export default class Core {
    protected scene: Scene | null;
    private static instance;
    protected logger: Function;
    private constructor();
    static getInstance(): Core;
    /**
     *
     */
    log(tag: string, ...data: any[]): void;
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

export interface Core {
    scene: Scene | null;
    instance: Core | null;

    private constructor();
    static getInstance(): Core;

    loadScene(scene: Scene): void;
    update(): void;
    getScene(): Scene | null;
}
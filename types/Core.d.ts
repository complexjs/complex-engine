import { Scene } from './Scene';

export interface Core {
    scene: Scene | null;
    instance: Core | null;

    constructor();
    getInstance(): Core;

    loadScene(scene: Scene): void;
    update(): void;
    getScene(): Scene | null;
}

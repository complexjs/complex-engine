import World from '../src/World';

export interface Scene {
    name: string;
    world: World;

    load(): void;
    run(): void;
    update(): void;

}
import World from '../src/World';

export interface Manager {
    world: World;
    getWorld(): World | null;
    setWorld(): World | null;
}
import World from '../src/World';
import Entity from '../src/Entity';

export interface System {
    world: World;
    addedToWorld(): void;
    added(entity: Entity): void;
    removed(entity: Entity): void;
    setWorld(world: World): void;
}
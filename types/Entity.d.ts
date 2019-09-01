import { Component } from '../src/Complex';

export interface Entity {
    name: string;
    components: Component[];
    alive: boolean;
    remove: boolean;
    world: World | null;
    index: number | null;

    addComponent(component: Component): void;
    getComponents(component: Function): Component[];
    getAllComponents(): Component[];
    hasComponent(component: Function): boolean;
    removeComponent(component: Function): void;
    destroy(): void;
    getWorld(): World | null;
    setWorld(world: World | null): void;
    getIndex(): number;
    setIndex(i: number): void;
    isAlive(): boolean;
    isRemove(): boolean;
}
import { cxWorld } from './Complex';
export default class cxManager {
    protected tag: string | null;
    protected world: cxWorld | null;
    getTag(): string | null;
    getWorld(): cxWorld | null;
    setWorld(world: cxWorld): void;
}

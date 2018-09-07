import { cxWorld } from "./Complex";
export default abstract class cxManager {
    protected world: cxWorld | null;
    abstract readonly tag: string;
    getWorld(): cxWorld | null;
    setWorld(world: cxWorld): void;
}

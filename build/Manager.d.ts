import { World } from "./Complex";
export default abstract class Manager {
    protected world: World | null;
    getWorld(): World | null;
    setWorld(world: World): void;
}

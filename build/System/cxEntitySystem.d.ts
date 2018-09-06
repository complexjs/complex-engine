import cxSystem from '../cxSystem';
import cxEntity from '../cxEntity';
/**
 * This systems renders only entities that match the required components.
 */
export default abstract class cxEntitySystem extends cxSystem {
    protected components: string[];
    processEntities(entities: cxEntity[]): void;
    /**
     * @method update
     * @param {cxEntity} entity
     */
    protected abstract update(entity: cxEntity): void;
    getComponents(): string[];
}

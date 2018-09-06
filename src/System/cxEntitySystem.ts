"use strict";

import cxSystem from '../cxSystem';
import cxEntity from '../cxEntity';

/**
 * This systems renders only entities that match the required components.
 */
export default abstract class cxEntitySystem extends cxSystem {
    protected components: string[] = [];

    public processEntities(entities: cxEntity[]): void {
        for (let i = 0; i < entities.length; i++) {
            this.update(entities[i]);
        }
    }

    /**
     * @method update
     * @param {cxEntity} entity
     */
    protected abstract update(entity: cxEntity): void;

    public getComponents(): string[] {
        return this.components;
    }
}

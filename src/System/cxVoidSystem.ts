"use strict";

import cxSystem from '../cxSystem';

/**
 * This system only renders once per update and is decoupled from the entities. This can be used to
 * update some data or clear the canvas on the screen
 */
export default abstract class cxVoidSystem extends cxSystem {

    /**
     * update system
     */
    public abstract update(): void;
}

"use strict";

import cxSystem from '../cxSystem';
import NotImplemented from '../Exception/NotImplemented';

/**
 * @class cxVoidSystem
 */
export default class cxVoidSystem extends cxSystem
{
    constructor()
    {
        super();

        /**
         * Type of the world
         * @property type
         * @type {String}
         */
        this.type = cxSystem.getTypeVoid();
    }

    /**
     * update system
     * @method update
     */
    update () {
        throw new NotImplemented();
    }

}

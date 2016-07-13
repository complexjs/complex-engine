"use strict";

import cxSystem from '../cxSystem';


/**
 * A void system
 */
export default class cxVoidSystem extends cxSystem
{
    constructor()
    {
        super();

        /**
         * Type of the world
         * @type {string}
         */
        this.type = cxSystem.getTypeVoid();
    }

    /**
     * update system
     */
    update ()
    {

    }

    /**
     * render system
     */
    render ()
    {

    }
}

module.exports = cxVoidSystem;

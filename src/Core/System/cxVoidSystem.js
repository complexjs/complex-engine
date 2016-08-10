"use strict";

let cxSystem = require('../cxSystem');

/**
 * A void system
 */
module.exports = class cxVoidSystem extends cxSystem
{
    constructor()
    {
        super();

        /**
         * Type of the world
         * @type String
         */
        this.type = cxSystem.getTypeVoid();
    }

    /**
     * update system
     */
    update () {
        throw 'Method not implemented';
    }

    /**
     * render system
     */
    render () {
        throw 'Method not implemented';
    }
}

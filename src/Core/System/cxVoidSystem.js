"use strict";

let cxSystem = require('../cxSystem');
let NotImplemented = require('../Exception/NotImplemented');

/**
 * @class cxVoidSystem
 */
module.exports = class cxVoidSystem extends cxSystem
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

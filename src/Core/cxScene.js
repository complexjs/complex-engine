"use strict";

let cxWorld = require('./cxWorld');
let NotImplemented = require('./Exception/NotImplemented');

/**
 * The current scene with is rendered on screen
 * @class cxScene
 */
module.exports = class cxScene {
    /**
     * @method constructor
     * @param {String} name
     */
    constructor( name ) {
        /**
         * @property name
         * @type {String}
         */
        this.name = name;

        /**
         * @property world
         * @type {cxWorld}
         */
        this.world = new cxWorld();

        /**
         * @property cx
         * @type {Complex}
         */
        this.cx = null;
    }

    /**
     * Called when the world is loaded by the ComplexCore
     * @method load
     */
    load () {
        throw new NotImplemented();
    }

    /**
     * Updates the worldobject
     * @method update
     */
    update () {
        this.world.step();
    }
}

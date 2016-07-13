"use strict";

import cxWorld from './cxWorld'

/**
 * The current scene with is rendered on screen
 */
export default class cxScene
{
    /**
     * [constructor description]
     * @param  {string} name Name of the scene
     */
    constructor( name )
    {
        /**
         * Name of the scene
         * @type {String}
         */
        this.name = name;

        /**
         * The world
         * @type {cxWorld}
         */
        this.world = new cxWorld();

        /**
         * Complex Core
         * @type {Complex}
         */
        this.cx = null;
    }

    /**
     * Called when the world is loaded by the ComplexCore
     */
    load ()
    {

    }

    /**
     * Updates the worldobject
     */
    update ()
    {
        this.world.step();
    }
}

"use strict";

/**
 * @class cxManager
 */
export default class cxManager {
    constructor() {
        /**
         * @property tag
         * @type {String}
         */
        this.tag = null;

        /**
         * @property world
         * @type {cxWorld}
         */
        this.world = null;
    }

    /**
     * @method getTag
     * @return {String}
     */
    getTag () {
        return this.tag;
    }

    /**
     * @method getWorld
     * @return {cxWorld}
     */
    getWorld () {
        return this.world;
    }

}

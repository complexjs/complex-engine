"use strict";

/**
 * Abstract System
 * @class cxSystem
 */
export default class cxSystem {
    constructor () {
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
     * get notified when system is added to world
     * @method addedToWorld
     */
    addedToWorld () {

    }

    /**
     * get notified when entity is added to world
     * @method added
     * @param {cxEntity} entity
     */
    added (entity) {

    }

    /**
     * get notified when entity is removed from world
     * @method removed
     * @param {cxEntity} entity
     */
    removed ( entity ) {

    }

    /**
     * 
     * @return string
     */
    static getTypeProcess () {
        return "type_process";
    }

    /**
     * @return string
     */
    static getTypeVoid () {
        return "type_void";
    }
}

/**
 * Created by fabs on 2/2/14.
 */

/**
 *  Custom Object
 * @type {*}
 */
Behaviour = Class.extend({

    init : function() {
    },
    /**
     * called the first time
     * @param entity
     */
    setup : function ( entity ) {
        this.entity = entity;
        this.onSetup();
    },

    /**
     *
     */
    onSetup : function(){
        this.initialized = true;
    },

    /**
     *
     */
    update : function(){
    }
})
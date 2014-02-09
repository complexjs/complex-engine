/**
 * Custom system
 * @type {*|void}
 */
var BehaviourSystem = cx.System.extend({
    /**
     * constructor
     */
    init : function() {
        this._super(['BehaviourComponent']);
        this.tag = "BehaviourSystem";
    },

    /**
     * override update method of cx.System
     * @param entity
     * @param components
     */
    update : function( entity, components ) {
        var behaviourComponent = components["BehaviourComponent"];

        if ( !behaviourComponent.initialized ) {
            behaviourComponent.script.setup( entity );
        }

        behaviourComponent.script.update();
    }
});
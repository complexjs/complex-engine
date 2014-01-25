var BehaviourSystem = cx.System.extend({
    init : function() {
        this._super(['BehaviourComponent']);
        this.tag = "BehaviourSystem";
    },

    update : function( entity, components ) {
        var behaviourComponent = components["BehaviourComponent"];

        if ( !behaviourComponent.initialized ) {
            behaviourComponent.script.setup( entity );
        }

        behaviourComponent.script.update();
    }
});
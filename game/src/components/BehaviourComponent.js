var BehaviourComponent = cx.Component.extend({
    init : function( script ) {
        this._super();
        this.name = 'BehaviourComponent';
        this.tag = this.name;

        this.script = script;
    }
});
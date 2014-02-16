/**
 * create a system to use PIXI render engine
 * @type {*|void}
 */
var DebugSystem = cx.System.extend({
    element : null,
    world : null,

    init : function( world ){
        this._super( );
        this.type = this.TYPE_VOID;
        this.tag = "TagSystem";

        this.world = world;
        this.element = document.getElementById("debugView");
    },

    update : function ( ) {
        this.element.innerHTML = this.world.entities.length;
    }
});
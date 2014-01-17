var DrawSystem = cx.System.extend({
    init : function( world ){
	    this._super();
	    this.world = world;

	    this.type = this.TYPE_PROCESS;
	    this.tag = "DrawSystem";

	    this.setComponents(['Draw', 'Position']);

	    this.canvasSystem = this.world.getSystem('CanvasSystem');
	    this.context = this.canvasSystem.context;
	}, 

	update : function ( entity , components) {
	    var position = components['Position'];
	    var draw = components['Draw'];
	    console.log("update")
	    
	    this.context.fillRect(position.x, position.y, 5, 5);
	}

});
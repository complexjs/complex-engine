var DrawSystem = cx.System.extend({
    init : function( _world ){
	    this._super( ['Draw', 'Position'] );
	    var world = _world;

	    this.tag = "DrawSystem";


	    this.canvasSystem = world.getSystem('CanvasSystem');
	    this.context = this.canvasSystem.context;
	}, 

	update : function ( entity , components) {
	    var position = components['Position'];
	    var draw = components['Draw'];
	    
	    this.context.fillRect(position.x, position.y, 5, 5);
	}

});
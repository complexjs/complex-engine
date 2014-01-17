var DrawSystem = cx.System.extend({
    init : function(){
	    this._super();
	    console.log(this);
	    this.tag = "DrawSystem";
	    this.components.push("Draw", 'Position');
	    this.canvasSystem = this.world.getSystem('CanvasSystem');
	    this.context = this.canvasSystem.context;
	}, 
	
	update : function ( entity , components) {
	    var position = components['Position']
	    var draw = components['Draw']
	    
	    this.context.fillRect(position.x, position.y, 5, 5);
	}

});
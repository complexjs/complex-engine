var DrawSystem = cx.System.extend({
    init : function( _world ){
	    this._super( );
	    this.type = this.TYPE_VOID;
	    this.tag = "DrawSystem";

        this.stage = new PIXI.Stage(0xEEFFFF);
        
	    
	    this.renderer = new PIXI.CanvasRenderer(this.canvasSystem.width, this.canvasSystem.height, this.canvasSystem.canvas);
	}, 

	update : function ( entity , components) {
	    
	    this.renderer.render(this.stage);
	    
	    //this.context.fillRect(position.x, position.y, size.x, size.y);
	}

});
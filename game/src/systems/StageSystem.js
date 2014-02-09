/**
 * create a system to use PIXI render engine
 * @type {*|void}
 */
var StageSystem = cx.System.extend({
    init : function( canvasId, width, height ){
	    this._super( );
	    this.type = this.TYPE_VOID;
	    this.tag = "StageSystem";
	    
	    this.canvas = document.getElementById(canvasId);
	    this.width = width;
	    this.height = height;

        this.stage = new PIXI.Stage(0x000000);
	    this.renderer = new PIXI.CanvasRenderer(this.width, this.height, this.canvas);
	}, 

	update : function ( entity , components) {
	    this.renderer.render(this.stage);
	},
	
	add : function ( pixiComponent ) {
	    this.stage.addChild(pixiComponent);
	}

});
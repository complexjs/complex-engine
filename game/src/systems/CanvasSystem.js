var CanvasSystem = cx.System.extend({
	init : function( canvasId, width, height ){
		this._super();
	    this.type = this.TYPE_VOID;
		
		this.canvas = document.getElementById(canvasId);
		this.width = width;
		this.height = height;
	    this.context = this.canvas.getContext("2d");
	    this.tag = 'CanvasSystem';
	},
	update : function(){
		//this.context.clearRect(0, 0, this.width, this.height);
	}
});
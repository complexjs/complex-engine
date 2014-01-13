var CanvasSystem = function( canvasId, width, height){
	cx.System().call();

	this.canvas = document.getElementById(canvasId);
	this.width = width;
	this.height = height;
    this.context = this.canvas.getContext("2d");
    this.tag = 'CanvasSystem';
    this.type = this.TYPE_VOID;
}

CanvasSystem.prototype = new cx.System();
CanvasSystem.prototype.constructor = CanvasSystem;

CanvasSystem.prototype.update = function(){
	this.context.clearRect(0, 0, this.width, this.height);
}
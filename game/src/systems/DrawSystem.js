var DrawSystem = function( ) {
    cx.System.call()

    this.tag = "DrawSystem";
    this.components.push("Draw", 'Position');
    this.canvasSystem = this.world.getSystem('CanvasSystem');
    this.context = this.canvasSystem.context;

}
DrawSystem.prototype = new cx.System();
DrawSystem.prototype.constructor = DrawSystem;

DrawSystem.prototype.update = function ( entity , components) {
    var position = components['Position']
    var draw = components['Draw']
    
    this.context.fillRect(position.x, position.y, 5, 5);
}
var PositionSystem = function() {
    cx.System.call()
    this.init();
}
PositionSystem.prototype = new cx.System();
PositionSystem.prototype.constructor = PositionSystem;
PositionSystem.prototype.init = function() {
    this.tag = "PositionSystem";
    this.components.push("Position");
}
PositionSystem.prototype.update = function ( entity ) {
    
}
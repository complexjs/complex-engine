var DrawSystem = function() {
    cx.System.call()
    this.init();
}
DrawSystem.prototype = new cx.System();
DrawSystem.prototype.constructor = DrawSystem;
DrawSystem.prototype.init = function() {
    this.tag = "DrawSystem";
    this.components.push("Draw");
}
DrawSystem.prototype.update = function ( entity ) {

}
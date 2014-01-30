var PositionComponent = cx.Component.extend({
    
    x : 0, 
    y : 0,
    velocity : {
      x : 0,
      y : 0,
    },
    init : function( x, y){
        this._super("PositionComponent");
        this.x = x;
        this.y = y;
    } 
});
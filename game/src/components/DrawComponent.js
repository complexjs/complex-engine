var DrawComponent = cx.Component.extend({
    size : { x : 0, y : 0 },
    color : "#000",
    init : function(color, x, y){
        this._super("DrawComponent");
        this.color = color;
        this.size.x = x;
        this.size.y = y;
        
    }
    
});
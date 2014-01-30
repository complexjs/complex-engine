var SpriteComponent = cx.Component.extend({
    init : function( texture, x, y, width, height) {
        this._super("Sprite");
        this.sprite = new PIXI.Sprite(texture);
        this.sprite.position.x = x;
        this.sprite.position.y = y;
        
        this.sprite.anchor.x = 0.5;
        this.sprite.anchor.y = 0.5;
        
        if ( width ) {
            this.sprite.width = width;
        }
        if ( height ) {
            this.sprite.height = height;
        }
    }
});
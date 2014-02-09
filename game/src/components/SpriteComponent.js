// @src/components/SpriteBehaviour.js

//Create a new Component
var SpriteComponent = cx.Component.extend({
    /**
     * create the constructor
     * @param texture
     * @param x
     * @param y
     * @param width (optional)
     * @param height (optional)
     */
    init : function( texture, x, y, width, height) {
        //call the Component constructor and pass unique tag for your component.
        // the tag is used later to retrive your component
        this._super("Sprite");

        //create a sprite from your texture
        this.sprite = new PIXI.Sprite(texture);
        //pass the data
        this.sprite.position.x = x;
        this.sprite.position.y = y;

        //fix the rotation anchor point
        this.sprite.anchor.x = 0.5;
        this.sprite.anchor.y = 0.5;

        //set width ( optional)
        if ( width ) {
            this.sprite.width = width;
        }
        if ( height ) {
            this.sprite.height = height;
        }
    }
});
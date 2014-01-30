var PlayerBehaviour = cx.Behaviour.extend({

	positionComponent : null,
    init : function() {
        this._super();
    },

    setup : function ( entity ) {
    	this.entity = entity;
    	this.spriteComponent = entity.getComponent("Sprite");
    	this.sprite = this.spriteComponent.sprite;
    },

    update : function(){
    	this.sprite.rotation -= 0.02;
    	
    //	this.sprite.position.x = cx.Input.Mouse.x;
    //	this.sprite.position.y = cx.Input.Mouse.y;
    }
});
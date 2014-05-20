var MissileBehaviour =  Behaviour.extend({

    init : function() {
        this._super();
        this.TAG = "MissileBehaviour";
    },

    setup : function ( world, entity ) {
        //save the entity into the behaviour script
        this.entity = entity;

        //store the world object for later
        this.world = world;

        //load a component of the entity
        this.spriteComponent = entity.getComponent("Sprite");
        this.spriteComponent = entity.getComponent("Sprite");

        //get the sprite of the component
        this.sprite = this.spriteComponent.sprite;
    },

    update : function(){
        this.sprite.position.y-=1;
        this.sprite.rotation+=1;
        
        if ( this.sprite.position.y > cx.App.data.screenSize.y ) {
            LOG.d(this, "missile out of screen");
        }
    }
});
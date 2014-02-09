//create a new Behaviour extending game/src/components/BehaviourComponent
var PlayerBehaviour = Behaviour.extend({
    //placeholder for out component
	positionComponent : null,

    angle : 0,
    //create a constructor
    init : function() {
        //call the BehaviourComponent constructor
        this._super();
    },

    //override the setup function
    setup : function ( entity ) {
        //save the entity into the behaviour script
    	this.entity = entity;

        //load a component of the entity
    	this.spriteComponent = entity.getComponent("Sprite");

        //get the sprite of the component
    	this.sprite = this.spriteComponent.sprite;
    },

    //override the update function called every tick
    update : function(){
        var velocity = 3;
        var position = this.sprite.position;

        //check if the 'A' key is pressed
        if ( cx.Input.Keyboard.isKeyPressed("A") ) {
            position.x -= velocity;
        }

        //check if the 'A' key is pressed
        if ( cx.Input.Keyboard.isKeyPressed("D") ) {
            position.x += velocity;
        }
    }
});
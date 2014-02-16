//create a new Behaviour extending game/src/components/BehaviourComponent
var PlayerBehaviour = Behaviour.extend({
    //placeholder for out component
	positionComponent : null,

    angle : 0,
    world : null,

    //create a constructor
    init : function() {
        //call the BehaviourComponent constructor
        this._super();
    },

    //override the setup function
    setup : function ( world, entity ) {
        //save the entity into the behaviour script
    	this.entity = entity;

        //store the world object for later
        this.world = world;

        //load a component of the entity
    	this.spriteComponent = entity.getComponent("Sprite");

        //get the sprite of the component
    	this.sprite = this.spriteComponent.sprite;
        this.onSetup();
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

        if ( cx.Input.Keyboard.isKeyPressed(" ") ) {
            this.shoot();
        }
    },

    /**
     *
     */
    shoot : function() {
        var missile = new cx.Entity();
        var playerSpriteComponent = new SpriteComponent(PIXI.Texture.fromImage('assets/playerShip1_blue.png'), this.sprite.position.x, 280, 30, 30);

        missile.addComponent( playerSpriteComponent );
        missile.addComponent( new BehaviourComponent(new MissileBehaviour()) );

        this.world.getSystem('StageSystem').add(playerSpriteComponent.sprite);
        this.world.addEntity(missile);
    }
});
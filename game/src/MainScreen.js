/**
 *
 * @type {*|void}
 */
/*
    The screen is an object which holds all your currently used data.
    For example if you want to create a loading animation or a HomeScreen then you simply
    create a new Screen and create all the used entities. The Screen have then to be set to the engine ('engine.setScreen(new HomeScreen())')
 */
var MainScreen = cx.Screen.extend({
    /**
     * constructor
     */
    init : function(){
        this._super();
        this.tag = "MainScreen";
    },

    /**
     *  called when this screen will be replaced
     */
    hide : function() {

    },

    /**
     * called when this screen is set
     */
    show : function(){
        var world = this.world;

        world.addManager( new TagManager() );
        
        this.stats = new Stats();
        this.stats.setMode(0);
        this.stats.domElement.style.position = 'absolute';
        this.stats.domElement.style.left = '0px';
        this.stats.domElement.style.top = '0px';
        document.body.appendChild( this.stats.domElement );

        //Systems
        world.addSystem( new StageSystem( 'screen', 480 ,320 ) );
        world.addSystem( new BehaviourSystem() );
        world.addSystem( new DebugSystem() );

        //create the player
        var player = new cx.Entity();
        var playerSpriteComponent = new SpriteComponent(PIXI.Texture.fromImage('assets/playerShip1_blue.png'), 240, 280, 30, 30);

        player.addComponent( playerSpriteComponent );
        player.addComponent( new BehaviourComponent(new PlayerBehaviour( world )) );

        world.getSystem('StageSystem').add(playerSpriteComponent.sprite);
        world.addEntity(player);

    },

    /**
     * called before update
     */
    preUpdate : function(){
        this.stats.begin();
    },

    /**
     * called after update
     */
    postUpdate : function(){
        this.stats.end();    
    }
});
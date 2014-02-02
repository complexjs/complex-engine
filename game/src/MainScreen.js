var MainScreen = cx.Screen.extend({
    init : function(){
        this._super();
        this.tag = "MainScreen";
    },

    show : function(){
        
        this.world.addManager( new TagManager() );
        
        this.stats = new Stats();
        this.stats.setMode(0);
        this.stats.domElement.style.position = 'absolute';
        this.stats.domElement.style.left = '0px';
        this.stats.domElement.style.top = '0px';
        
        document.body.appendChild( this.stats.domElement );

         //Systems
        this.world.addSystem(new PositionSystem());
        this.world.addSystem( new StageSystem( 'screen', 480 ,320 ) );
        this.world.addSystem( new BehaviourSystem() );
        
        
        
            var player = new cx.Entity();
            var playerSpriteComponent = new SpriteComponent(PIXI.Texture.fromImage('assets/star_4.png'), Math.random()*480, Math.random()*320, 30, 30);
            
            player.addComponent( playerSpriteComponent );
            player.addComponent( new BehaviourComponent(new PlayerBehaviour()) );
            
            this.world.getSystem('StageSystem').add(playerSpriteComponent.sprite);
    
            this.world.addEntity(player);
    },
    
    preUpdate : function(){
        this.stats.begin();
    },
    
    postUpdate : function(){
        this.stats.end();    
    },
});
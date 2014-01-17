var MainScreen = cx.Screen.extend({
    init : function(){
        this._super();
        this.tag = "MainScreen";
    },

    show : function(){
         var player = new cx.Entity();
        player.addComponent(new cx.Component({
            name : 'Position',
            x : 0,
            y : 0
        }));
        
        player.addComponent(new cx.Component({
            name : 'Draw',
            x : 0,
            y : 0
        }));

        //this.world.addSystem(new PositionSystem());
        this.world.addSystem(new CanvasSystem('screen', 480 ,320));
        this.world.addSystem(new DrawSystem( this.world ));

        this.world.addEntity(player);
    }
});
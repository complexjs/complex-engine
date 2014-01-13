var MainScreen = function(){
    cx.Screen.call();  
}

MainScreen.prototype = new cx.Screen();
MainScreen.prototype.constructor = MainScreen;
MainScreen.prototype.show = function() {

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
    this.world.addSystem(new PositionSystem());
    this.world.addSystem(new DrawSystem());
    this.world.addSystem(new CanvasSystem('screen', 480 ,320));
    this.world.addEntity(player);
}

function Extend(OriginalClass){
    var SubClass = function(){
        OriginalClass.call();
    }
    SubClass.prototype = new OriginalClass();
    SubClass.prototype.constructor = SubClass;

    return SubClass;
}
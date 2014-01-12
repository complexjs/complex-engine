var MainScreen = function(){
    cx.Screen.call();
  
}
MainScreen.prototype = new cx.Screen();
MainScreen.prototype.constructor = MainScreen;
MainScreen.prototype.init = function() {

    var player = new cx.Entity();
    player.addComponent(new cx.Component({
        name : 'asdf',
        x : 0,
        y : 0
    }));
    player.addComponent(new cx.Component({
        name : 'Draw',
        x : 0,
        y : 0
    }));
    this.world.addSystem(new PositionSystem())
    this.world.addSystem(new DrawSystem())
    this.world.addEntity(player);
}

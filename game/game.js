function loaded () {
    var engine = cx.init();


    var PositionSystem = function() {
        cx.System.call()
        this.init();
    }
    PositionSystem.prototype = new cx.System();
    PositionSystem.prototype.constructor = PositionSystem;
    PositionSystem.prototype.init = function() {
        this.tag = "PositionSystem";
        this.components.push("Position");
    }
    PositionSystem.prototype.update = function ( entity ) {
    }

    var DrawSystem = function() {
        cx.System.call()
        this.init();
    }
    DrawSystem.prototype = new cx.System();
    DrawSystem.prototype.constructor = DrawSystem;
    DrawSystem.prototype.init = function() {
        this.tag = "DrawSystem";
        this.components.push("Draw");
    }
    DrawSystem.prototype.update = function ( entity ) {
    }

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
    engine.addSystem(new PositionSystem())
    engine.addSystem(new DrawSystem())
    engine.addEntity(player);


    
}
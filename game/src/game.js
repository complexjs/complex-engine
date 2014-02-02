cx.App.config({
  customScripts : [
    "src/MainScreen.js",
    "src/systems/PositionSystem.js",
    "src/systems/DrawSystem.js",
    "src/systems/CanvasSystem.js",
    "src/systems/BehaviourSystem.js",
    "src/systems/StageSystem.js",
    
    "src/components/BehaviourComponent.js",
    "src/components/PositionComponent.js",
    "src/components/DrawComponent.js",
    "src/components/SpriteComponent.js",
    
    "src/behaviours/PlayerBehaviour.js",
    
    "src/manager/TagManager.js",
    
    "src/libs/pixi.js",
    "src/libs/stats.js",
  ],
  scriptRoot : "../complex/"
});

cx.App.load(document.getElementsByTagName("head")[0], loaded);

function loaded () {
    Log.d('game', "loaded");
    var engine = cx.App.init();
    
    engine.setScreen(new MainScreen());

    cx.App.loadComplete();
}
cx.config({
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
    
    "src/libs/pixi.js",
    "src/libs/stats.js",
  ],
  scriptRoot : "../complex/"
});

cx.load(document.getElementsByTagName("head")[0], loaded);

function loaded () {
    var engine = cx.init();
    
    engine.setScreen(new MainScreen());

   cx.loadComplete();
}
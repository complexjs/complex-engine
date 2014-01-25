cx.config({
  customScripts : [
    "src/MainScreen.js",
    "src/systems/PositionSystem.js",
    "src/systems/DrawSystem.js",
    "src/systems/CanvasSystem.js",
    "src/systems/BehaviourSystem.js",
    
    "src/api/Keyboard.js",

    "src/components/BehaviourComponent.js",
    
    "src/behaviours/PlayerBehaviour.js",
  ],
  scriptRoot : "../complex/"
});

cx.load(document.getElementsByTagName("head")[0], loaded);

function loaded () {
    var engine = cx.init();
    Keyboard.init();
    engine.setScreen(new MainScreen());

   cx.loadComplete();
}
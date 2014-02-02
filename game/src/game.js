
cx.App.use([        
    "src/MainScreen.js",
    "src/systems/BehaviourSystem.js",
    "src/systems/StageSystem.js",
    
    "src/components/BehaviourComponent.js",
    "src/components/PositionComponent.js",
    "src/components/SpriteComponent.js",

    "src/behaviours/Behaviour.js",
    "src/behaviours/PlayerBehaviour.js",

    "src/manager/TagManager.js",
    
    "src/libs/pixi.js",
    "src/libs/stats.js"
]);

cx.App.load(document.getElementsByTagName("head")[0], loaded);

function loaded () {
    Log.d('game', "loaded");
    var engine = cx.App.init();
    
    engine.setScreen(new MainScreen());

    cx.App.loadComplete();
}
//Configure all used scripts
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

//load the scripts into an element and define the callback called after all scripts where loaded
cx.App.load(document.getElementsByTagName("head")[0], loaded);

//loaded callback
function loaded () {
    Log.d('game', "loaded");
    //initialize complex engine
    var engine = cx.App.init();

    //set a screen
    engine.setScreen(new MainScreen());

    //launch the game
    cx.App.loadComplete();
}
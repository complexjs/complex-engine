//Configure all used scripts
//like used libraries, custom screens, custom components and custom systems and more
cx.App.use([        
    "src/MainScreen.js",
    "src/systems/BehaviourSystem.js",
    "src/systems/StageSystem.js",
    "src/systems/DebugSystem.js",

    "src/components/BehaviourComponent.js",
    "src/components/SpriteComponent.js",

    "src/behaviours/Behaviour.js",
    "src/behaviours/PlayerBehaviour.js",
    "src/behaviours/MissileBehaviour.js",

    "src/manager/TagManager.js",
    
    "src/libs/pixi.js",
    "src/libs/stats.js"
]);

//load the scripts into an element and define the callback called after all scripts where loaded
cx.App.load(document.getElementsByTagName("head")[0], loaded);

//loaded callback
//This callback is called when all scripts above have been loaded
function loaded () {
    //initialize complex engine
    var engine = cx.App.init();
    
    //set a screen
    //this screen will be called every tick
    engine.setScreen(new MainScreen());

    //launch the game
    cx.App.loadComplete();
}
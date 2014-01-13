cx.config({
  customScripts : [
    "src/MainScreen.js",
    "src/systems/PositionSystem.js",
    "src/systems/DrawSystem.js",
    "src/systems/CanvasSystem.js",
  ],
  scriptRoot : "../complex/"
});

cx.load(document.getElementsByTagName("head")[0], loaded);


function loaded () {
    var engine = cx.init();
    engine.setScreen(new MainScreen());

   cx.loadComplete();
}
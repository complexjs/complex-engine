cx.config({
  customScripts : [
    "src/MainScreen.js",
    "src/systems/PositionSystem.js",
    "src/systems/DrawSystem.js",
  ],
  scriptRoot : "../complex/"
});

cx.load(document.getElementsByTagName("head")[0], loaded);


function loaded () {
    var engine = cx.init();
    engine.setScreen(new MainScreen());

    window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            function( callback ){
              window.setTimeout(callback, 1000 / 60);
            };
    })();


    (function animloop(){
        requestAnimFrame(animloop);
        cx.update();
    })();
}
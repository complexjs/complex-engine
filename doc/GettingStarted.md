# Installation

* Create a new empty folder for your project
* Create a new `package.json` for your project
* Install npm dependencies gulp, browserify, babelify, babel-preset-es2015, complex-engine
* Create an basic HTML file
* Create the `src` folder. In here you gamecode will be created
* Create an `src/App.js`. This will be the entrypoint of your game
* Create a new scene in `src/Scene/MyNewScene.js`

Now we are ready to start coding

## Setup Gulp
Since it should run in the browser we need to bundle our app/game with browserify. And since wi want to use
the fancy features from ES6 we need babel to transpile it.


    gulp.task('build', function () {
        return browserify({
            entries: ['./src/App.js'],
        })
        .transform(babelify, { presets : ['es2015']})
        .bundle()
        .pipe(source('App.js'))
        .pipe(gulp.dest('dist'));
    });

## Start Complex
Now in our entrypoint which is `src/App.js` we have to setup our complex instance, load our desired scene and start the rendering.


    import {Complex} from 'complex-engine';
    import MainScene from './Scene/MainScene';

    let cx = new Complex();

    window.onload = () => {
        let scene = new MainScene();
        cx.loadScene(scene);
    
        cx.start();
    };

## Create the cxScene

Now the only thing we need until we can start to code our game, is to create the scene we wan to render


    'use strict';
    
    import {cxScene, cxEntity} from 'complex-engine';
    
    export default class MainScene extends cxScene {
        constructor() {
            super("MainScene");
        }
    
        load() {
            // Here we create all the required entities, load the used systems.
            ...
            
            //At the end we have to call
            this.world.init();
        }
    };
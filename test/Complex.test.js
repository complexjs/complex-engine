'use strict';

let test = require('unit.js');
let Complex = require('../bin/Complex').Complex;

describe('Complex', function(){
    it('should load a scene', function(){

        let MockScene = require('./Mock/MockScene');

        let cx = new Complex();
        cx.loadScene(new MockScene());

        test.object(cx.scene);
    });

    it('should not load a invalid scene', function(){
        class MyScene {

        }

        let cx = new Complex();
        test.exception(function() {
            cx.loadScene(new MyScene());
        });
    });


});

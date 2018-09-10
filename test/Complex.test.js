'use strict';

let test = require('unit.js');
let Complex = require('../').Complex;

describe('Complex', function () {
    it('should load a scene', function () {

        let MockScene = require('./Mock/MockScene');

        let cx = new Complex();
        cx.loadScene(new MockScene());

        test.object(cx.getScene());
    });

    it('should not load a invalid scene', function () {
        class MyScene {

        }

        let cx = new Complex();
        test.exception(function () {
            cx.loadScene(new MyScene());
        });
    });
});

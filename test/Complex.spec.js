'use strict';
import { expect } from 'chai';
import { Complex } from '../src';

describe('Complex', function() {
    it('should load a scene', function() {

        let MockScene = require('./Mock/MockScene');

        let cx = new Complex();
        cx.loadScene(new MockScene());

        expect(cx.getScene()).to.be.not.null;
    });

    it('should not load a invalid scene', function() {
        class MyScene {

        }

        let cx = new Complex();
        expect(function() {
            cx.loadScene(new MyScene());
        }).to.throw();
    });
});

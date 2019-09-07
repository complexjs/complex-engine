'use strict';
import { expect } from 'chai';
import Engine from '../src/Engine';
import MockScene from './Mock/MockScene';

describe('Complex', function() {
    it('should load a scene', function() {


        let cx = new Engine();
        cx.useScene(new MockScene());

        expect(cx.getScene()).to.be.not.null;
    });

    it('should not load a invalid scene', function() {
        class MyScene {

        }

        let cx = new Engine();
        expect(function() {
            cx.loadScene(new MyScene());
        }).to.throw();
    });

    it('compose simple scene via func', function() {
        const engine = new Engine();
        engine.simpleScene(function() {
            this.foo = 'bar';
        });

        const scene = engine.getScene();

        expect(scene.foo).to.be.equal('bar');
        expect(scene.world).to.be.not.null;
    });
});

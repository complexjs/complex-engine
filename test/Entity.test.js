'use strict';

let test = require('unit.js');
let cxEntity = require('../').Entity;

describe('Entity', function () {

    it('add single component', function () {
        let MockComponent = require('./Mock/MockComponent');
        let entity = new cxEntity();
        entity.addComponent(new MockComponent());
        test.array(entity.getAllComponents()).hasLength(1);
    });

    it('add multiple components', function () {
        let MockComponent = require('./Mock/MockComponent');
        let entity = new cxEntity();
        entity.addComponent(new MockComponent());
        entity.addComponent(new MockComponent());
        entity.addComponent(new MockComponent());
        test.array(entity.getAllComponents()).hasLength(3);
    });

    it('get single component ', function () {
        let MockComponent = require('./Mock/MockComponent');
        let entity = new cxEntity();
        entity.addComponent(new MockComponent());
        let comp = entity.getComponents(MockComponent);
        test.array(comp).hasLength(1);
    });

    it('get multiple components', function () {
        let MockComponent = require('./Mock/MockComponent');
        let entity = new cxEntity();
        entity.addComponent(new MockComponent());
        entity.addComponent(new MockComponent());
        entity.addComponent(new MockComponent());
        let comp = entity.getComponents(MockComponent);
        test.array(comp).hasLength(3);
    });

    it('get non existent Component', function () {
        let MockComponent = require('./Mock/MockComponent');
        let entity = new cxEntity();
        let comp = entity.getComponents(MockComponent);
        test.array(comp).isEmpty();
    });

    it('has component', function () {
        let MockComponent = require('./Mock/MockComponent');
        let entity = new cxEntity();
        entity.addComponent(new MockComponent());
        let comp = entity.hasComponent(MockComponent);
        test.bool(comp).isTrue();
    });

    it('check has non existent component ', function () {
        let MockComponent = require('./Mock/MockComponent');
        let entity = new cxEntity();
        let comp = entity.hasComponent(MockComponent);
        test.bool(comp).isFalse();
    });

    it('remove component', function () {
        let MockComponent = require('./Mock/MockComponent');

        let entity = new cxEntity();
        entity.addComponent(new MockComponent());
        entity.removeComponent(MockComponent);
        test.array(entity.getAllComponents()).hasLength(0);
    });

    it('remove non existent component', function () {
        let MockComponent = require('./Mock/MockComponent');
        let entity = new cxEntity();
        //entity.addComponent(new MockComponent());
        entity.removeComponent(MockComponent);
        test.array(entity.getAllComponents()).hasLength(0);
    });

    it('get all components', function () {
        let MockComponent = require('./Mock/MockComponent');
        let entity = new cxEntity();
        entity.addComponent(new MockComponent());
        entity.addComponent(new MockComponent());
        test.array(entity.getAllComponents()).hasLength(2);
    });

    it('destroy entity', function () {
        let entity = new cxEntity();
        entity.destroy();
        test.bool(entity.isAlive()).isFalse();
        test.bool(entity.isRemove()).isTrue();
    });
});

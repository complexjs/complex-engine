import { expect } from 'chai';
import cxEntity from '../src/Entity';
import MockComponent from './Mock/MockComponent';
import sinon from 'sinon';

describe('Entity', function() {

    it('add single component', function() {
        let entity = new cxEntity();
        entity.addComponent(new MockComponent());
        expect(entity.getAllComponents()).to.have.lengthOf(1);
    });

    it('add multiple components', function() {
        let entity = new cxEntity();
        entity.addComponent(new MockComponent());
        entity.addComponent(new MockComponent());
        entity.addComponent(new MockComponent());
        expect(entity.getAllComponents()).to.have.lengthOf(3);
    });

    it('get single component ', function() {
        let entity = new cxEntity();
        entity.addComponent(new MockComponent());
        let comp = entity.getComponents(MockComponent);
        expect(comp).to.have.lengthOf(1);
    });

    it('get multiple components', function() {
        let entity = new cxEntity();
        entity.addComponent(new MockComponent());
        entity.addComponent(new MockComponent());
        entity.addComponent(new MockComponent());
        let comp = entity.getComponents(MockComponent);
        expect(comp).to.have.lengthOf(3);
    });

    it('get non existent Component', function() {
        let entity = new cxEntity();
        let comp = entity.getComponents(MockComponent);
        expect(comp).to.have.lengthOf(0);
    });

    it('has component', function() {
        let entity = new cxEntity();
        entity.addComponent(new MockComponent());
        let comp = entity.hasComponent(MockComponent);
        expect(comp).to.be.true;
    });

    it('check has non existent component ', function() {
        let entity = new cxEntity();
        let comp = entity.hasComponent(MockComponent);
        expect(comp).to.be.false;
    });

    it('remove component', function() {
        let entity = new cxEntity();
        entity.addComponent(new MockComponent());
        entity.removeComponent(MockComponent);
        expect(entity.getAllComponents()).to.have.lengthOf(0);
    });

    it('remove non existent component', function() {
        let entity = new cxEntity();
        //entity.addComponent(new MockComponent());
        entity.removeComponent(MockComponent);
        expect(entity.getAllComponents()).to.have.lengthOf(0);
    });

    it('get all components', function() {
        let entity = new cxEntity();
        entity.addComponent(new MockComponent());
        entity.addComponent(new MockComponent());
        expect(entity.getAllComponents()).to.have.lengthOf(2);

    });

    it('destroy entity', function() {
        let entity = new cxEntity();
        entity.destroy();
        expect(entity.isAlive()).to.be.false;
        expect(entity.isRemove()).to.be.true;
    });

    it('add listener', function() {
        const entity = new cxEntity();
        const callback = sinon.spy();
        entity.addListener('foo', function() {
            callback();
        });

        entity.emit('foo');
        expect(callback.called).to.be.true;
    });

    it('add multiple listener', function() {
        const entity = new cxEntity();
        const callback = sinon.spy();
        const callback2 = sinon.spy();
        entity.addListener('foo', function() {
            callback();
        });

        entity.addListener('foo', function() {
            callback2();
        });

        entity.emit('foo');
        expect(callback.called).to.be.true;
        expect(callback2.called).to.be.true;
    });

    it('remove listener', function() {
        const entity = new cxEntity();
        const callback = sinon.spy();
        entity.addListener('foo', function() {
            callback();
        });

        entity.removeListener('foo');

        expect(entity.listeners).to.be.empty
    });

    it('emit event', function() {
        const entity = new cxEntity();
        const callback = sinon.spy();
        const callback2 = sinon.spy();
        entity.addListener('foo', function() {
            callback();
        });

        entity.addListener('bar', function() {
            callback2();
        });

        entity.emit('foo');
        expect(callback.called).to.be.true;
        expect(callback2.called).to.be.false;
    });

});

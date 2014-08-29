/**
 * The component object
 *
 * @constructor
 * @param {[type]} data [description]
 */
var Component = function()
{
    GameObject.call(this);
};

Component.prototype = Object.create(GameObject.prototype);
Component.prototype.constructor = Component;
Component.prototype.name = 'cx.Component';

cx.Component = Component;

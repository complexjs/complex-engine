/**
 * Represents a manager to handle additional data
 * @type {*}
 */

/**
 * @constructor
 */
var Manager = function()
{
    cx.GameObject.call(this);
    this.tag = null;
    this.world = null;
}

Manager.prototype = Object.create(cx.GameObject.prototype);
Manager.prototype.constructor = Manager;

cx.Manager = Manager;

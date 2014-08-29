/**
 * Represents a manager to handle additional data
 *
 * @constructor
 */
var Manager = function()
{
    GameObject.call(this);

    this.world = null;
};

Manager.prototype = Object.create(GameObject.prototype);
Manager.prototype.constructor = Manager;
Manager.prototype.name = 'cx.Manager';

cx.Manager = Manager;

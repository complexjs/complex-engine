/**
 * Represents a manager to handle additional data
 * @type {*}
 */
(function(){

    /**
     * @constructor
     */
    var Manager = function()
    {
        cx.GameObject.call(this);
        this.tag = null;
        this.world = null;
    }

    Manager.prototype = Object.create(cx.GameObject);
    Manager.prototype.constructor = Manager;

    cx.Manager = Manager;
})();

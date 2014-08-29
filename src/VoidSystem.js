(function(){

    /**
     * @constructor
     */
    var VoidSystem = function()
    {
        cx.System.call(this);
        this.type = cx.System.TYPE_VOID;
    }

    VoidSystem.prototype = Object.create(cx.System);
    VoidSystem.prototype.consctructor = VoidSystem;

    /**
    * Called every tick
    */
    VoidSystem.prototype.update = function ()
    {

    }

    cx.VoidSystem = VoidSystem;
})();

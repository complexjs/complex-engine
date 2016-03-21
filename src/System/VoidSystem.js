/**
 * A void system
 */
class cxVoidSystem extends cxSystem
{
    constructor()
    {
        super();

        /**
         * Type of the world
         * @type {string}
         */
        this.type = cxSystem.getTypeVoid();
    }

    /**
     * update system
     */
    update ()
    {

    }

    /**
     * render system
     */
    render ()
    {

    }
}

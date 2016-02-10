/**
 * 
 */
class cxSystem
{
    constructor ()
    {
        /**
         * @type {string}
         */
        this.tag = null;

        /**
         * @type {cxWorld}
         */
        this.world = null;
    }

    /**
     * get notified when system is added to world
     */
    addedToWorld ()
    {

    }

    /**
     * get notified when entity is added to world
     * @param  {cxEntity} entity
     */
    added (entity)
    {

    }

    /**
     * get notified when entity is removed from world
     * @param  {cxEntity} entity
     */
    removed ( entity )
    {

    }

    /**
     * @return string
     */
    static getTypeProcess ()
    {
        return "type_process";
    }

    /**
     * @return string
     */
    static getTypeVoid ()
    {
        return "type_void";
    }
}

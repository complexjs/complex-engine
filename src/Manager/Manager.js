/**
 * 
 */
class cxManager
{
    constructor()
    {
        /**
         * Tag
         * @type {string}
         */
        this.tag = null;

        /**
         * @type {cxWorld}
         */
        ths.world = null;
    }

    /**
     * @return {string}
     */
    getTag ()
    {
        return this.tag;
    }

    /**
     * @return {cxWorld}
     */
    getWorld ()
    {
        return this.world;
    }


}

/**
 * @constructor
 */
var GameObject = function()
{
};

GameObject.prototype.name = 'cx.GameObject';

GameObject.prototype.isOneOf = function(gameObjs)
{
    var gameObjsLength = gameObjs.length,
        gameObj = null,
        i = 0;

    var isOneOf = false;

    for (i = 0; i < gameObjsLength; ++i)
    {
        gameObj = gameObjs[i];
        isOneOf = this.isA(gameObj);

        if (!isOneOf)
        {
            return false;
        }
    }

    return isOneOf;
};

GameObject.prototype.isA = function(gameObj)
{
    if (typeof gameObj == 'function')
    {
        return this.name == gameObj.prototype.name;
    }
    else
    {
        return this.name == gameObj;
    }
};

cx.GameObject = GameObject;
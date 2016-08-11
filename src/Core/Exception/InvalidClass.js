'use strict';

module.exports = class InvalidClassError extends Error {
    constructor( className ){
        super('Object have to be instance of '+className);
    }
}

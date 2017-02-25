'use strict';

export default class InvalidClassError extends Error {
    constructor( className ){
        super('Object have to be instance of '+className);
    }
}

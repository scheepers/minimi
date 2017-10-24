/**
 * @file UserAdaptor.js
 * MongoDB service adaptor
 *
 * Requires host and port attributes to be set schemata section of config.json:
 *
 * "mongo-example": {
 *   "adaptor": "UserAdaptor",
 *   "host": "localhost",
 *   "port": 27017
 * }
 *
 */

"use strict";

const
  MongoAdaptor = require('./MongoAdaptor')

class UserAdaptor extends MongoAdaptor{

  /**
   * @inherit
   */
  constructor(minimi, name, schema){
    super(minimi, name, schema)
  }

}

module.exports = UserAdaptor
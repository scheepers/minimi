/**
 * @file UserWrapper.js
 * MongoDB service wrapper
 *
 * Requires host and port attributes to be set schemata section of config.json:
 *
 * "user": {
 *   "wrapper": "UserWrapper",
 *   "host": "localhost",
 *   "port": 27017
 * }
 *
 */

"use strict";

const
  MongoWrapper = require('./MongoWrapper')

class UserWrapper extends MongoWrapper{

  /**
   * @inherit
   */
  constructor(minimi, name, schema){
    super(minimi, name, schema)
  }

}

module.exports = UserWrapper
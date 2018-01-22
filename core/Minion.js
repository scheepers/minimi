/**
 * @file Minion.js
 * Basic configurable object.
 */

"use strict";


module.exports = class Minion {

  /**
   * Creates a new minion
   * @param  {string} name   Minion name
   * @param  {object} minimi main boot strap
   */
  constructor(name, minimi){

    this.name = name
    this.minimi = minimi

    var
      config = this.getConfig(),
      service = config.service
        ? typeof config.service == 'string'
          ? config.service
          : config.service.name
        : 'Service',
      stash = config.stash
        ? typeof config.stash == 'string'
          ? config.stash
          : config.stash.name
        : 'Stash',
      path = config.path || config.schema

    console.log(
      'Minion [' + name + '] reporting for duty\n  ' +
      'Stash:   ' + stash + '\n  ' +
      'Schema:  ' + config.schema + '\n  ' +
      'Service: ' + service + '\n  ' +
      'Path: ' + path + '\n'
    )

    this.service = new (require('./' + service))(this)
    this.stash = new (require('./' + stash))(this)
    this.schema = require('../schema/' + config.schema)
  }


  // ----- Accessors -----


  /**
   * Returns the config for this minion
   */
  getConfig(){
    return this.minimi.config.minions[this.name]
  }


  // ----- Utility -----


  /**
   * Dispose of the minion.
   */
  dispose(){
    this.service.stop()
    this.stash.close()
  }
}

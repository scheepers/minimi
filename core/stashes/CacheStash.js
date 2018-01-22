/**
 * @file CacheStash.js
 * Basic Memory Stash.
 */

"use strict";


class CacheStash {

  /**
   * Creates a new data stash
   * @param  {string} name   [description]
   * @param  {object} config [description]
   * @param  object minimi main boot strap
   */
  constructor(name, config, minimi){
    super(name, config, minimi)
    this.cache = []
  }


  // ----- CRUD methods -----


  /**
   * @inherit
   */
  create(entity){
    this.cache.push[entity]
    return [entity]
  }

  /**
   * @inherit
   */
  read(criteria){
    return []
  }

  /**
   * @inherit
   */
  update(criteria, entity){
    return []
  }

  /**
   * @inherit
   */
  delete(criteria){
    return []
  }
}
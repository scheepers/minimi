/**
 * @file RESTAdaptor.js
 * Contains main service implementation.
 */

"use strict";

const 
  jsonSchemaForm = require('json-schema-form-js'),
  bodyParser = require('body-parser')

class RESTAdaptor {

  /**
   * Constructs a new RESTAdaptor
   * @param  object bootstrap [description]
   * @param  string name      [description]
   * @param  object schema    [description]
   */
  constructor(bootstrap, name, schema){
    this.bootstrap = bootstrap,
    this.config = bootstrap.config.schemata[name],
    this.name = name,
    this.schema = schema
    var
      thisObject = this,
      defaultMethods = ['get', 'post', 'put', 'delete', 'patch'],
      defaultMiddleWare = {
        'get': bodyParser.urlencoded({ extended: false }),
        'post': bodyParser.json()
      },
      methods = this.config
        ? this.config.methods || defaultMethods
        : defaultMethods
    for (var method in defaultMethods){
      if (methods[method]){
        (
          (method) => {
            if (defaultMiddleWare[method]) {
              bootstrap.app[method](
                '/' + name,
                defaultMiddleWare[method]
              )
            }
            bootstrap.app[method](
              '/' + name,
              (request, response) => {
                let result
                if (result = thisObject[method](request, response)){
                  response.send(result)
                }
              }
            )          
          }
        )(methods[method])
      }
    }
  }

  /**
   * Process a GET request
   * @param  object request  Express request object
   * @param  object response Express response object
   */
  get(request, response) { 
    return JSON.stringify(request.query) 
  }

  /**
   * Process a POST request
   * @param  object request  Express request object
   * @param  object response Express response object
   */
  post(request, response) { 
    return JSON.stringify(request.body)
  }

  /**
   * Process a PUT request
   * @param  object request  Express request object
   * @param  object response Express response object
   */
  put(request, response) {
    return 'TODO' 
  }

  /**
   * Process a DELETE request
   * @param  object request  Express request object
   * @param  object response Express response object
   */
  delete(request, response) { 
    return 'TODO' 
  }

  /**
   * Process a PATCH request
   * @param  object request  Express request object
   * @param  object response Express response object
   */
  patch(request, response) { 
    return 'TODO' 
  }

}

module.exports = RESTAdaptor
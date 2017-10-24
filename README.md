# minimi

minimal microservice implementation


## System requirements

1. NodeJS


## Install

In the root of minimi, run:
```
npm install
```


## Configure

minimi exposes a microservice per JSON schema in the [schema folder](./schema) using [wrappers](./wrappers).
You may change this behavior by assigning Wrappers to schemata in [config.json](./config.json).

```
{

	"name": "example minimi instance",
	"port": 3000,

	"schema": {

		"schema-name": {
			"wrapper": "MySchemaWrapper",
		}

	}

}
```


## Start

From the folder containing minimi, run:
```
node minimi
```


## Request

Make requests to schema at:
```
http://localhost:3000/schema-name
```

Request methods are responded to with request data and parameters formatted as JSON:
* GET, DELETE & Patch - request parameters encoded in the url.
* POST and PUT - request body.
* PATCH - both request parameters and body.

This is not particularly useful in itself, but the idea is to extend the JsonAdapter as per MongoWrapper.


## Extend

[MongoWrapper](./wrappers/MongoWrapper.js) is an example of extending the [RestWrapper](./wrappers/RestWrapper.js).

With a local MongoDB service running and an example [config.json](./config.json):
```
{

	"name": "example",
	"port": 3000,

	"schema": {

		"user": {
			"wrapper": "MongoWrapper",
			"host": "localhost",
			"port": 27017
		}

	}

}
```

Instances of user objects may be persisted, retrieved, updated and deleted within a store with the same name as the schema.

Visit:
```
http://localhost:3000/schema-name
```
to view an HTML form generated using [json-schema-form-js](https://www.npmjs.com/package/json-schema-form-js) based on the schema.

TODO: Add validation


## Reference

http://json-schema.org/
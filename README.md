# minimi

minimal microservice implementation


## System requirements

1. NodeJS


## Installation

In the root of minimi, run:
```
npm install
```


## Running

From the folder containing minimi, run:
```
node minimi
```


## Testing

In a browser, visit:
```
http:/localhost:3000/schema-name
```

Where schema-name may be the name of any JSON schema within the schemata folder.

## Configuration

minimi will by default expose a RESTfull service per JSON schema dropped into the schemata folder using a RestAdapter, within the adaptor folder.
You may change this behavior by specifying different Adaptors and controllers within config.json.
You may drop your own Adaptors in the adaptors/custom folder.

## Links

http://json-schema.org/
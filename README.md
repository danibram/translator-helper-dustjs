# translator-helper-dustjs  [![Dependency Status](https://david-dm.org/danibram/translator-helper-dustjs.svg)](https://david-dm.org/danibram/translator-helper-dustjs)

A little helper for dustjs to load dynamic templates, with variables.

## Getting Started
Install the module with: `npm install translator-helper-dustjs`

Its important to add a global variable to pass the kraken config to the module, i put in my index.js this after load kraken config
```javascript
...
app = module.exports = express();
app.use(kraken(options));
GLOBAL._app = app;
...
```
On your controllers file or wethever you load dust, add the helper like another.

```javascript
...
var dust = require('dustjs-linkedin');
require('dustjs-helpers');
require('translator-helper-dustjs');
...
```


## Examples
On your properties files (index.properties)
```javascript
...
jobs.acme.title=Company Acme
jobs.hernes.title=Company Hernes
...
```

On your dust template files, pass to the t helper the key (jobs.acme.title -> companyName = "acme"), the properties file (index in this case), and the lang (in my case "EN_us")
```javascript
...
{@t key="jobs.{companyName}.title" bundle="index" lang="{lang}" /}
...
```
And the result will be
```javascript
...
Company Acme
...
```

## Contributing
Please fell free to contribute, i´m not a real expert of dustJs

## Release History
_(Nothing yet)_

## License
Copyright (c) 2014 Daniel Biedma Ramos
Licensed under the MIT license.

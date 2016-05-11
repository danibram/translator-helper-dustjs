# translator-helper-dustjs  [![Dependency Status](https://david-dm.org/danibram/translator-helper-dustjs.svg)](https://david-dm.org/danibram/translator-helper-dustjs)

A little helper for dustjs to load i18n translations dynamically, with variables, based on https://github.com/mikesparr/Kraken_Example_i18n_Helper. Feel free to comment, copy or burn this code =P

### New version supporting kraken 2. Check the 1.x for kraken 1 and 2.x for kraken 2.

## Getting Started
Install the module with: `npm install translator-helper-dustjs`

Its important to add a global variable to pass the kraken config to the module, i put in my index.js this after load kraken config
```javascript
/* ... */
app = module.exports = express();
app.use(kraken(options));
global._app = app;
/* ... */
```

##### KrakenJs 2

```javascript
/* ... */
//In your config file, using tag 2.x
    "dust": {
        "helpers": [
            "dust-makara-helpers",
            "translator-helper-dustjs"
        ]
    },
/* ... */
```

##### KrakenJs 1

```javascript
/* ... */
// On your controllers file or wethever you load dust, add the helper like another, using tag 1.x
var dust = require('dustjs-linkedin');
require('dustjs-helpers');
require('translator-helper-dustjs');
/* ... */
```


## Examples
On your properties files (index.properties)
```javascript
/* ... */
jobs.acme.title=Company Acme
jobs.hernes.title=Company Hernes
/* ... */
```

On your dust template files, pass to the t helper the key (jobs.acme.title -> companyName = "acme"), the properties file (index in this case), and the lang (in my case "EN_us")
```javascript
/* ... */
{@t key="jobs.{companyName}.title" bundle="index" lang="{lang}" /}
/* ... */
```
And the result will be
```javascript
/* ... */
Company Acme
/* ... */
```

## Contributing
Please fell free to contribute, i´m not a real expert of dustJs

## Release History
###(2.x)

- Supporting krakenJs 2

###(1.x)

- Supporting krakenJs 1

## License
Copyright (c) 2015 Daniel Biedma Ramos
Licensed under the MIT license.

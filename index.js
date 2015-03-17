/**
 * Created by danibram on 17/03/2015.
 */


(function (dust) {
    "use strict"

    var spud = require('spud'),
        fs = require('fs'),
        path = require('path'),
        resolver = require('file-resolver'),
        config = GLOBAL._app.kraken;

    var i18n = config.get('i18n'),
        res = resolver.create({ root: i18n.contentPath, ext: 'properties', fallback: i18n.fallback});

    //Create a helper called 'bundleString'
    dust.helpers.t = function (chunk, context, bodies, params) {

        //Retrieve the key value from the template parameters.
        var key = dust.helpers.tap(params.key, chunk, context);

        //Retrieve the desired bundle
        var bundle = dust.helpers.tap(params.bundle, chunk, context);

        var lang = dust.helpers.tap(params.lang, chunk, context);

        return chunk.map(function(chunk) {

            var locality = lang;
            var props = res.resolve(bundle, locality).file || i18n.contentPath;
            var value;

            spud.deserialize(fs.createReadStream(props), path.extname(props).substr(1),  function (err, data) {
                if (err) {
                    console.log("Err: " + err);
                    chunk.end("");
                    return;
                }

                var namespace = key.split('.');

                while (data && namespace.length) {
                    data = data[namespace.shift()];
                }

                if (data === undefined || data === null) {
                    chunk.end("");
                    return;
                }
                chunk.end(data);
            });
        });
    };

})(typeof exports !== 'undefined' ? module.exports = require('dustjs-helpers') : dust);
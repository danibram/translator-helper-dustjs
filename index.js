/**
 * Created by danibram on 11/05/2015.
 */

module.exports = function (dust) {
    "use strict"

    var spud = require('spud'),
        fs = require('fs'),
        path = require('path'),
        fr = require('file-resolver'),
        config = global._app.kraken;

    var i18n = config.get('i18n'),
        res = fr.create({root: i18n.contentPath, fallback: i18n.fallback, ext: 'properties'});

    //Create a helper called 'bundleString'
    dust.helpers.t = function (chunk, context, bodies, params) {

        //Retrieve the key value from the template parameters.
        var key = context.resolve(params.key);

        //Retrieve the desired bundle
        var bundle = context.resolve(params.bundle);

        var lang = context.resolve(params.lang);

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
};

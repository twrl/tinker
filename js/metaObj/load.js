define(['./core'], function ($$) {
    
    // This is a loader plugin for Require.js
    // All it does is look up a class name in the metaobject core files manifest
    // and requires it as a script
    
    return {
        load: function (name, require, load, config) {
            var fn = $$.hierarchicalSeek(name.split('.'), $$.filesManifest, true),
                url = require.toUrl(fn);
            require(url, function(data) { 
                load(data); 
            });
        }
    };
    
});
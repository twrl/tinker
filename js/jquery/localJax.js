/*
    
    localJax - AJAX emulation on the local filesystem
    
    Copyright © Tom Robbins 2012
    Licensed under the EUPL, version 1.1 only
    See http://joinup.ec.europa.eu/software/page/eupl
    
*/

// Dependencies: underscore.js, jQuery, jQuery.twFile (http://jquery.tiddlywiki.org/twFile.html)

var mod = function (_, $) {
    
    $.localJax = {
                    
        // This is the custom transport for doing PUT and GET against a local file
        fileTransport:  function (options, originalOptions, jqXHR) {
                            if (options.isLocal) {
                                return {
                                    send:   function (headers, complete) {
                                                var path = $.twFile.convertUriToLocalPath(options.url),
                                                    data;
                                                if (options.type === 'GET') {
                                                    data = $.twFile.load(path);
                                                    complete(200, 'OK', { text : data });
                                                } else if (options.type === 'PUT') {
                                                    data = _.isObject(options.data) ? JSON.stringify(options.data) : options.data;
                                                    $.twFile.save(path, data);
                                                    complete(204, 'No Content');
                                                }
                                            },
                                    abort:  function () {}
                                };
                            }
                        },
                    
    };
    
    $.ajaxTransport('text json xml', $.localJax.fileTransport);
    
};

// Use AMD if available, otherwise invoke _ and jQuery directly
if (define && define.amd) define(['undercore', 'jquery', 'jquery/twFile'], mod)
else mod(_, jQuery);

delete mod;

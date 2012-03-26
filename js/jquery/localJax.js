/*
    
    localJax - Advanced AJAX emulation on the local filesystem
    
    Copyright © Tom Robbins 2012
    Licensed under the EUPL, version 1.1 only
    
*/

define(['underscore', 'jquery', 'jquery/twFile'], function (_, $) {
    
    $.localJax = {
        
        // These are some useful functions for identifying the type of query
        isLocal:        function (options) {
                            return (options.url.lastIndexOf('file:', 0) === 0);
                        },
                    
    /*    isFileReq:      function (options) {
                            return  this.isLocal(options) && 
                                ((options.type === 'PUT') || ((options.type === 'GET') && this.isTrivialQuery(options)));
                        }, */
                    
        isTrivialQuery: function (options) {
                            return  (_.isString(options.data) && options.data === '') ||
                                _.isEmptyObject(options.data);
                        },
                    
        // This is the custom transport for doing PUT and GET against a local file
        fileTransport:  function (options, originalOptions, jqXHR) {
                            if (this.isLocal(options)) {
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
    
    $.ajaxTransport('*', $.localJax.fileTransport);
    
});

define(['./core', 'underscore'], function ($$, _) {
   
    // Method is a type member, so is declared using only a local and never a
    //   qualified name.
    //
    // Method(name, returnType, {parameters}?, impl?)
    //   returnType may be either a metaobject type name, a builtin javascript 
    //   type, or the word 'void'
    $$.Method = function () {
        var argsArray = [].prototype.slice.apply(arguments),
            name = argsArray.shift(),
            returnType = argsArray.shift(),
            parameters = (_.isEmpty(argsArray) || _.isFunction(argsArray[0])) ? {} : argsArray.shift(),
            impl = _.isFunction(argsArray[0]) ? argsArray.shift() : null;
            
        this.localName = name;
        this.definingType = {};
        
        this.isAbstract = _.isNull(impl);
        
        // If returnType is a metaobject type, get the metaobject
        this.returnType = returnType;
        
        // Do something with parameters - they will have to validate on call
        this.parameters = parameters;
        
        // If there is a method implementation, we want it - then we can wrap it
        this.implementation = impl;
            
    };
    
    return $$.Method;
});
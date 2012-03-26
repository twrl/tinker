define([], function () {
   
    var $$ = function (qn) {
    
        if (arguments.length == 1 && qn instanceof String) {
            // If there is precisely one string argument, then we want to seek
            //  the metaobject with that qualified name and return it
            var vector = qn.split('.');
            return $$.hierarchicalSeek(vector, $$.rootNamespace);
        }
       
    };
    
    $$.hierarchicalSeek = function (vector, context, unstructured) {
        
        if (vector.length === 0) {
            return context;
        } else if (unstructured) {
            var ln = vector.shift();
            $$.hierarchicalSeek(vector, context[ln], true);
        } else {
            var ln = vector.shift();
            $$.hierarchicalSeek(vector, context.children[ln]);
        }
        
    };
    
    // Hierarchical mapping of qualified names to file paths
    $$.filesManifest = {};
    
    // ----- Namespace Support -----
    
    // Namespace(nsname, content...)
    $$.Namespace = function () {
        var argsArray = [].prototype.slice.apply(arguments),
            nsname = argsArray.shift(),
            nsparent = argsArray.shift(),
            i;
        // Remaining args should be content...
        
        this.localName = nsname;
        this.parentNamespace = nsparent;
        
        this.children = {};
        for (i in argsArray) {
            var childName = argsArray[i].localName;
            this.children[childName] = argsArray[i];
            this.children[childName].namespace = this;
        }
    };
   
    $$.rootNamespace = new $$.Namespace('');
    
   
});
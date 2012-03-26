define(['./core'], function ($$) {
    
    // This method defines a new interface
    $$.Interface = function () {
        
        var argsArray = [].prototype.slice.apply(arguments),
            hclassName = argsArray.shift().split('.'),
            inheritance = argsArray[0] instanceof Array ? argsArray.shift() : [],
            i;
            
        // Everything left in argsArray should be contents of this class
        
        this.localName = hclassName.pop();
        
        // TODO: Convert strings to metaobjects...
        this.ancestors = inheritance;
        
        this.namespace = $$.hierarchicalSeek(hclassName, $$.rootNamespace);
        
        this.children = {};
        for (i in argsArray) {
            var childName = argsArray[i].localName;
            this.children[childName] = argsArray[i];
            this.children[childName].declaringType = this;
        }
        
    };
    
    return $$.Interface;
    
});
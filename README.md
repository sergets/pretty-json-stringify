# pretty-json-stringify [![Build Status](https://travis-ci.org/sergets/pretty-json-stringify.svg?branch=master)](https://travis-ci.org/sergets/pretty-json-stringify) [![npm module](https://img.shields.io/npm/v/pretty-json-stringify.svg?style=flat)](https://www.npmjs.com/package/pretty-json-stringify)
A naive function that adds customizeable indents to JSON data (pretty-prints JSON whitespace).
You can define whether any object or array should either be collapsed to one line or expanded with one item on each line.

## Syntax
````js
var JSONString = prettyJSONStringify(objectToStringify, params);
````

## Example
````js
var prettyJSONStringify = require('pretty-json-stringify');

prettyJSONStringify({
    simple : [1, 2, 3],
    tooShort : [4],
    doNotExpand : [5, 6, 7],
    level1 : { 
        level2_1 : {
            a : 1
        },
        level2_2containsExpanded : {
            a : 1,
            doExpand : ['expanded'] // If any portion of object contains something told to be expanded, parent
                                    // object is expanded regardless of whether it is told to be expanded itself
        },
        level2_3 : {
            a : 1
        },
    }
}, {
    shouldExpand : function(object, level, key) {
        if (key == 'doNotExpand') return false;
        if (key == 'doExpand') return true;
        if (Array.isArray(object) && object.length < 2) return false;
        if (level >= 2) return false;
        return true;
    }
});
````
This returns
````json
{
    "simple" : [
        1,
        2,
        3
    ],
    "tooShort" : [4],
    "doNotExpand" : [5, 6, 7],
    "level1" : {
        "level2_1" : { "a" : 1 },
        "level2_2containsExpanded" : {
            "a" : 1,
            "doExpand" : [
                "expanded"
            ]
        },
        "level2_3" : { "a" : 1 }
    }
}
````

Also following "code-style" parameters can be applied (any passed string is inserted as is, it is user's responsibility to keep it valid whitespace):
- `tab` (default: 4 spaces)
- `spaceBeforeColon` (default: 1 space)
- `spaceAfterColon` (default: 1 space)
- `spaceAfterComma` (default: 1 space)
- `spaceInsideObject` (inserted after opening and before closing braces, default: 1 space)
- `spaceInsideArray` (inserted after opening and before closing braces, default: empty string).

If `shouldExpand` parameter is not passed, it expands every object whose plain JSON is longer that 25 characters.


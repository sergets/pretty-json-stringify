var stringify = require('./index');

require('chai').should()

describe('pretty-json', function() {
    it('should deal with non-JSON types exactly like native JSON.stringify', function() {
        var testData = {
            a : function() {},
            b : undefined,
            c : typeof Symbol == 'function' && Symbol('abc'),
            d : {
                e : function() {},
                f : -Infinity,
                g : Object,
                h : new Date()
            },
            i : [
                function() {},
                new String('test'),
                undefined,
                'real value',
                /.*/
            ],
            j : { 
                toJSON : 'text'
            },
            k : {
                toJSON : function() {
                    return 'something';
                }
            },
            l : {
                toJSON : function() {
                    return function() {};
                }
            }
        };

        JSON.stringify(JSON.parse(JSON.stringify(testData)))
            .should.equal(
                JSON.stringify(JSON.parse(stringify(testData)))
            );
    });

    it('should use params as described', function() {
        var testData = {
            A : [
                'a', 'b'
            ],
            B : {
                a : 'a', b : 'b'
            },
            a : [
                'a', 'b'
            ],
            b : {
                a : 'a', b : 'b'
            }
        };

        stringify(testData, {
            tab : '\t',
            spaceBeforeColon : '',
            spaceAfterColon : '  ',
            spaceAfterComma : '  ',
            spaceInsideObject : '',
            spaceInsideArray : ' ',
            shouldExpand : function(obj, level, key) {
                return !key || /[A-Z]/.test(key);
            }
        })
            .should.equal(
                '{\n' +
                '\t"A":  [\n' +
                '\t\t"a",\n' +
                '\t\t"b"\n' +
                '\t],\n' + 
                '\t"B":  {\n' +
                '\t\t"a":  "a",\n' +
                '\t\t"b":  "b"\n' +
                '\t},\n' + 
                '\t"a":  [ "a",  "b" ],\n' + 
                '\t"b":  {"a":  "a",  "b":  "b"}\n' + 
                '}'
            );

        stringify(testData, {
            shouldExpand : function(obj, level, key) {
                return !key || /[A-Z]/.test(key);
            }
        })
            .should.equal(
                '{\n' +
                '    "A" : [\n' +
                '        "a",\n' +
                '        "b"\n' +
                '    ],\n' + 
                '    "B" : {\n' +
                '        "a" : "a",\n' +
                '        "b" : "b"\n' +
                '    },\n' + 
                '    "a" : ["a", "b"],\n' + 
                '    "b" : { "a" : "a", "b" : "b" }\n' + 
                '}'
            );
    });
});

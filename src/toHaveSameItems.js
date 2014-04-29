beforeEach(function() {
    "use strict";
    jasmine.addMatchers({
        toHaveSameItems: function(util, customEqualityTesters) {
            function isObject(obj) {
                return Object.prototype.toString.apply(obj) === '[object Object]';
            }
            function craftMessage(actual, expected, mistmatches) {
                if(mistmatches.length === 0) {
                    return "Expected collection " + JSON.stringify(actual) + " are not equal to " + JSON.stringify(expected);
                }
                return ["Expected collection are equal, but:"].concat(mistmatches.map(function(m) {
                    return 'at ' + m + ': expected ' + JSON.stringify(expected[m]) + ', actual ' + JSON.stringify(actual[m]);
                })).join('\n    ');
            }
            function compareArrays(actual, expected) {
                var mismatches = [];
                actual.forEach(function(item, i) {
                    if(!util.equals(item, expected[i], customEqualityTesters)) {
                        mismatches.push(i);
                    }
                });
                return mismatches;
            }
            function compareHashes(actual, expected) {
                var mismatches = [];
                Object.keys(actual).forEach(function(key) {
                    if(!util.equals(actual[key], expected[key], customEqualityTesters)) {
                        mismatches.push(key);
                    }
                });
                Object.keys(expected).forEach(function(key) {
                    if(!util.equals(actual[key], expected[key], customEqualityTesters) && mismatches.indexOf(key) === -1) {
                        mismatches.push(key);
                    }
                });
                return mismatches;
            }
            return {
                compare: function(actual, expected) {
                    if(!Array.isArray(actual) && !isObject(actual)) {
                        throw new Error('Actual must be an Array or Object');
                    }
                    if(!Array.isArray(expected) && !isObject(expected)) {
                        throw new Error('Expectation must be an Array or Object');
                    }
                    var mismatches;
                    if(Array.isArray(actual) && Array.isArray(expected)) {
                        if(actual.length !== expected.length) {
                            return {
                                pass: false,
                                message: 'Array sizes doest match! Actual size: ' + actual.length + ', expected size: ' + expected.length
                            };
                        }
                        mismatches = compareArrays(actual, expected);
                    }
                    else if(isObject(actual) && isObject(expected)) {
                        mismatches = compareHashes(actual, expected);
                    }
                    return {
                        pass: mismatches.length === 0,
                        message: craftMessage(actual, expected, mismatches)
                    };
                }
            };
        }
    });
});

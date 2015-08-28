beforeEach(function() {
    jasmine.addMatchers({
        toHaveLength: function(util, customEqualityTesters) {
            "use strict";
            return {
                compare: function(actual, expected) {
                    if(!actual.hasOwnProperty || !actual.hasOwnProperty('length')) {
                        throw new Error('Actual must have length property');
                    }
                    var pass = actual.length === expected;
                    return {
                        pass: pass,
                        message: 'Expected to have '+ (pass ? 'not ' : '') +'length ' + expected + ', but actual length is ' + actual.length
                    };
                }
            };
        }
    });
});

beforeEach(function() {
    'use strict';
    function stringify(entity) {
        try {
            return JSON.stringify(entity);
        } catch(e) {
            return entity;
        }
    }
    jasmine.addMatchers({
        toHaveSameItems: function(util, customEqualityTesters) {
            function isObject(obj) {
                return Object.prototype.toString.apply(obj) === '[object Object]';
            }
            function craftMessage(actual, expected, mismatches) {
                if(mismatches.length === 0) {
                    return 'The collections do not match in length or objects. \n Expected collection:' + stringify(actual) + ' is not equal to ' + stringify(expected);
                }
                return ['The collections have equal length, but do not match.'].concat(mismatches.map(function(m) {
                    return 'At ' + m.index + ': expected ' + stringify(m.expected) + ', actual ' + stringify(m.actual);
                })).join('\n    ');
            }
            function compareArraysSorted(actual, expected) {
                var mismatches = [];
                actual.forEach(function(item, i) {
                    if(!util.equals(item, expected[i], customEqualityTesters)) {
                        mismatches.push({index: i, actual: item, expected: expected[i]});
                    }
                });
                return mismatches;
            }
            function compareArraysIgnoreSort(actual, expected) {
                expected = expected.slice(0);
                var mismatches = [];
                actual.forEach(function(item, i) {
                    var foundIndex = -1;
                    expected.some(function(expectedItem, i) {
                        if(util.equals(item, expectedItem, customEqualityTesters)) {
                            foundIndex = i;
                            return true;
                        }
                    });
                    if(foundIndex > -1) {
                        expected.splice(foundIndex, 1)
                    } else {
                        mismatches.push({index: i, actual: item, expected: null});
                    }
                });
                mismatches = mismatches.concat(expected.map(function(val, i) {
                    return {index: actual.length+i, actual: null, expected: val};
                }));
                return mismatches;
            }
            function compareHashes(actual, expected) {
                var mismatches = {};
                Object.keys(actual).forEach(function(key) {
                    if(!util.equals(actual[key], expected[key], customEqualityTesters)) {
                        mismatches[key] = {index: key, actual: actual[key], expected: expected[key]};
                    }
                });
                Object.keys(expected).forEach(function(key) {
                    if(!util.equals(actual[key], expected[key], customEqualityTesters) && !mismatches[key]) {
                        mismatches[key] = {index: key, actual: actual[key], expected: expected[key]};
                    }
                });
                return Object.keys(mismatches).map(function(key) {
                    return mismatches[key];
                });
            }
            return {
                compare: function(actual, expected, ignoreOrder) {
                    if(!Array.isArray(actual) && !isObject(actual)) {
                        throw new Error('Actual must be an Array or Object. Is type: ' + typeof actual);
                    }
                    if(!Array.isArray(expected) && !isObject(expected)) {
                        throw new Error('Expectation must be an Array or Object. Is type: ' + typeof expected);
                    }
                    var mismatches;
                    if(Array.isArray(actual) && Array.isArray(expected)) {
                        if(actual.length !== expected.length) {
                            return {
                                pass: false,
                                message: 'Array length differs! Actual length: ' + actual.length + ', expected length: ' + expected.length
                            };
                        }
                        if(ignoreOrder) {
                            mismatches = compareArraysIgnoreSort(actual, expected);
                        } else {
                            mismatches = compareArraysSorted(actual, expected);
                        }
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

beforeEach(function() {
    jasmine.addMatchers({
        toHaveUniqueItems: function(util, customEqualityTesters) {
            "use strict";
            function customIndexOf(array, value, start) {
                for(var i = start || 0; i<array.length; i++) {
                    if(util.equals(value, array[i], customEqualityTesters)) {
                        return i;
                    }
                }
                return -1;
            }
            function craftMessage(duplicates, pass) {
                return pass ? 'All items in the array are unique' : 'Array contains duplicates: \n'+duplicates.map(function(dupe) {
                    return JSON.stringify(dupe[2])+' at '+dupe[0]+' and '+dupe[1];
                }).join('\n');
            }
            return {
                compare: function(actual, expected) {
                    if(!Array.isArray(actual)) {
                        throw new Error("Actual is not Array. It is of type: " + typeof actual );
                    }
                    if(expected) {
                        throw new Error("Expectation isn't needed.");
                    }
                    var duplicates = [];
                    actual.forEach(function(item, i) {
                        var index = customIndexOf(actual, item, i+1);
                        if(index > -1) {
                            duplicates.push([i, index, item]);
                        }
                    });
                    var pass = duplicates.length === 0;
                    return {
                        pass: pass,
                        message: craftMessage(duplicates, pass)
                    };
                }
            };
        }
    });
});

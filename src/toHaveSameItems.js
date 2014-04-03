beforeEach(function() {
    jasmine.addMatchers({
        toHaveSameItems: function(util, customEqualityTesters) {
            "use strict";
            function craftMessage(actual, mistmatches) {
                if(mistmatches.length === 0) {
                    return "Expected collection " + JSON.stringify(actual) + " are not equal";
                }
                return ["Expected collection are equal, but:"].concat(mistmatches.map(function(m) {
                    return 'at ' + m[0] + ': expected ' + JSON.stringify(m[1]) + ', actual ' + JSON.stringify(m[2]);
                })).join('\n    ');
            }
            return {
                compare: function(actual, expected) {
                    if(!Array.isArray(actual)) {
                        throw new Error('Actual is not Array');
                    }
                    if(!Array.isArray(expected)) {
                        throw new Error('Expectation is not Array');
                    }
                    if(actual.length !== expected.length) {
                        return {
                            pass: false,
                            message: 'Array sizes doest match! Actual size: ' + actual.length + ', expected size: ' + expected.length
                        };
                    }
                    var mistmatches = [];
                    actual.forEach(function(item, i) {
                        if(!util.equals(item, expected[i], customEqualityTesters)) {
                            mistmatches.push([i, item, expected[i]]);
                        }
                    });
                    return {
                        pass: mistmatches.length === 0,
                        message: craftMessage(actual, mistmatches)
                    };
                }
            };
        }
    });
});

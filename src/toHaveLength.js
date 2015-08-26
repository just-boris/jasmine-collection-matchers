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

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

jasmine.Expectation.Factory = function(options) {
    options = options || {};
    options.isNot = true;

    var expect = new jasmine.Expectation(options);
    options.isNot = false;
    expect.not = new jasmine.Expectation(options);

    return expect;
};
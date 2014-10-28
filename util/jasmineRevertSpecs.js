jasmine.Expectation.Factory = function(options) {
    options = options || {};
    options.isNot = true;

    var expect = new Expectation(options);
    options.isNot = false;
    expect.not = new Expectation(options);

    return expect;
};
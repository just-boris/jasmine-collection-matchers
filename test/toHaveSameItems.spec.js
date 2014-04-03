require('../index');

describe("toHaveSameItems", function() {
    it("should accept Array in actual", function() {
        expect(function() {
            expect('string').toHaveSameItems([]);
        }).toThrowError('Actual is not Array')
    });

    it("should accept Array in actual", function() {
        expect(function() {
            expect([]).not.toHaveSameItems('actual');
        }).toThrowError('Expectation is not Array')
    });

    it("should compare arrays by length", function () {
        expect([1,2,3]).not.toHaveSameItems([1,2,3,4]);
    });

    it("should compare arrays content", function() {
        expect([1,2,3]).not.toHaveSameItems([1,2,4]);
    });

    it("should require strict element order", function() {
        expect([1,2,3]).not.toHaveSameItems([3,1,2]);
    });

    it("passing test", function() {
        expect([1,2,3]).toHaveSameItems([1,2,3]);
    })
});

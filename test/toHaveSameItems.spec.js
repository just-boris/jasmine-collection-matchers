require('../index');

describe("toHaveSameItems", function() {
    it("should accept Array in actual", function() {
        expect(function() {
            expect('string').toHaveSameItems([]);
        }).toThrowError('Actual must be an Array or Object')
    });

    it("should accept Array in expectation", function() {
        expect(function() {
            expect([]).not.toHaveSameItems('actual');
        }).toThrowError('Expectation must be an Array or Object')
    });

    describe("match arrays", function() {
        it("should compare by length", function () {
            expect([1,2,3]).not.toHaveSameItems([1,2,3,4]);
        });

        it("should compare content", function() {
            expect([1,2,3]).not.toHaveSameItems([1,2,4]);
        });

        it("should require strict element order", function() {
            expect([1,2,3]).not.toHaveSameItems([3,1,2]);
        });

        it("passing test", function() {
            expect([1,2,3]).toHaveSameItems([1,2,3]);
        });
    });

    describe("match collections", function () {
        it("should compare keys", function() {
            expect({a: 1, b:2}).not.toHaveSameItems({a: 1});
        });

        it("should require all keys from expectation in object", function() {
            expect({a: 1}).not.toHaveSameItems({a: 1, b:2});
        });

        it("should compare content", function() {
            expect({a: 1, b:2}).not.toHaveSameItems({a: 2, b: 2});
        });

        it("passing test", function() {
            expect({a: 1, b:2}).toHaveSameItems({a: 1, b: 2});
        });
    });

});

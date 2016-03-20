require('../index');

describe("toHaveSameItems", function() {
    it("should accept Array in actual", function() {
        expect(function() {
            expect('string').toHaveSameItems([]);
        }).toThrowError('Actual must be an Array or Object. Is type: '
          + typeof('string'))
    });

    it("should accept Array in expectation", function() {
        expect(function() {
            expect([]).not.toHaveSameItems('actual');
        }).toThrowError('Expectation must be an Array or Object. Is type: '
          + typeof('actual'))
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

    describe("match arrays ignore order", function() {
        it("should compare by length", function () {
            expect([1,2,3]).not.toHaveSameItems([1,2,3,4], true);
        });

        it("should compare content", function() {
            expect([1,2,3]).not.toHaveSameItems([1,2,4], true);
        });

        it("should ignore element order", function() {
            expect([1,2,3]).toHaveSameItems([3,1,2], true);
        });

        it("passing test", function() {
            expect([1,2,3]).toHaveSameItems([1,2,3], true);
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

    describe("match arrays to collections", function () {
        it("should compare keys", function() {
            var array = new Array();
            array['a'] = 1;
            array['b'] = 2;

            expect(array).not.toHaveSameItems({a: 1});
            expect(array).toHaveSameItems({a: 1, b: 2});
            expect(array).not.toHaveSameItems({a: 1, b: 2, c: 3});
        });

        it("should compare indexes", function() {
            expect([0,1]).not.toHaveSameItems({0: 0});
            expect([0,1]).toHaveSameItems({0: 0, 1: 1});
            expect([0,1]).not.toHaveSameItems({0: 0, 1: 1, 2: 2});
        });
    });

    describe("match collections to arrays", function () {
        it("should compare keys", function() {
            var array1 = new Array();
            array1['a'] = 1;

            expect({a: 1, b: 2}).not.toHaveSameItems(array1);

            var array2 = new Array();
            array2['a'] = 1;
            array2['b'] = 2;

            expect({a: 1, b: 2}).toHaveSameItems(array2);

            var array3 = new Array();
            array3['a'] = 1;
            array3['b'] = 2;
            array3['c'] = 3;

            expect({a: 1, b: 2}).not.toHaveSameItems(array3);
        });

        it("should compare indexes", function() {
            expect({0: 0, 1: 1}).not.toHaveSameItems([0]);
            expect({0: 0, 1: 1}).toHaveSameItems([0,1]);
            expect({0: 0, 1: 1}).not.toHaveSameItems([0,1,2]);
        });
    });

});

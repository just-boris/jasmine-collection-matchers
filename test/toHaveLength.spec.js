require('../index');

describe("toHaveLength", function() {
    it("should throw exception when actual hasn't length", function() {
        expect(function() {
            expect(2).toHaveLength(2);
        }).toThrowError('Actual must have length property')
    });

    describe("size of Array", function() {
        it("should compare by length", function () {
            expect([1,2,3]).not.toHaveLength(4);
        });

        it("passing test", function() {
            expect([1,2,3]).toHaveLength(3);
        });
    });

    describe("size of String", function() {
        it("should compare by length", function () {
            expect("abc").not.toHaveLength(4);
        });

        it("passing test", function() {
            expect("abc").toHaveLength(3);
        });
    });
});

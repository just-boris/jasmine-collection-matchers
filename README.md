## jasmine-collection-matchers [![Build Status](https://travis-ci.org/just-boris/jasmine-collection-matchers.svg?branch=master)](https://travis-ci.org/just-boris/jasmine-collection-matchers)

> A set matchers which hepls you comparing collection

If you are using standard jasmine toEqual when comparing arrays, you may get the following error

```
Message:
  Expected [ 1, 2, 3, 4, 5, 6 ] to equal [ 1, 2, 3, 4, 4, 6 ].
```

There is a hard to notice that fifth element is wrong. This module adds a new matchers specially for collection that prints more detailed error message about the values difference.

```
Message:
  Expected collection are equal, but:
    at 4: expected 5, actual 4
```

Much clearer!

## Usage:

**Node JS:**

Install via `npm`:
```
npm install jasmine-collection-matchers
```
Require into your tests and use:

```js
require('jasmine-collection-matchers')

it('should match collection', function() {
    expect([1,2]).toHaveSameItems([1,2])
});
```

**Browser**

Include combined matchers file:

```html
<script src="/node_modules/jasmine-collection-matchers/lib/pack.js"></script>
```

Now you can use new matchers

```js
it('should match collection', function() {
    expect([1,2]).toHaveSameItems([1,2])
});
```

## Matchers

### expect(&lt;Array, Object&gt;).toHaveSameItems(&lt;Array, Object&gt;)

Expect that passed arrays or objects are identical. If not, prints the difference.

### expect(&lt;Array&gt;).toHaveUniqueItems()

Expect that all items in array are unique. If not, prints indexes of duplicates

### expect(&lt;Array, String&gt;).toHaveLength()

Check that item has expected length. Throw exception when actual hasn't length property

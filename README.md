## jasmine-collection-matchers [![Build Status](https://travis-ci.org/just-boris/jasmine-collection-matchers.svg?branch=master)](https://travis-ci.org/just-boris/jasmine-collection-matchers)

> A set matchers which helps compare collections

If you are using standard jasmine toEqual when comparing arrays, you may get the following error:

```
Message:
  Expected [ 1, 2, 3, 4, 5, 6 ] to equal [ 1, 2, 3, 4, 4, 6 ].
```

It can be hard to notice that fifth element is wrong. This module adds new matchers specially for collections that will print more detailed error messages about the values differences.

```
Message:
  The collections have equal length, but do not match.
    At 4: expected 5, actual 4
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

### expect(&lt;Array, Object&gt;).toHaveSameItems(&lt;Array, Object&gt;, [&lt;boolean&gt; ignoreSort])

Validates that passed arrays or objects are identical. If not, prints the difference.

`ignoreSort` &mdash; ignore items order while comparing arrays. Default to `false`.

### expect(&lt;Array&gt;).toHaveUniqueItems()

Validates that all items in array are unique. If not, prints indexes of duplicates

### expect(&lt;Array, String&gt;).toHaveLength(&lt;Number&gt;)

**Throws if actual does not have a length property**

Validates the length vs. the expectation.

# Collection [![License][badge_license]][link_license] [![NPM][badge_npm]][link_npm]

[![Travis Build][badge_build]][link_build]
[![Codacy grade][badge_grade]][link_grade]
[![Code Coverage][badge_coverage]][link_coverage]
[![Latest Release][badge_release]][link_npm]
[![Downloads][badge_downloads]][link_npm]
[![GitHub issues][badge_issues]][link_issues]

*By [ARCANEDEV&copy;](http://www.arcanedev.net/)*

A collection/array helper inspired from Laravel's `Illuminate\Support\Collection` that allows you to handle arrays like a champion.

Feel free to check out the [releases][link_releases], [license][link_license], and [contribution guidelines][link_contributing].

## Installation

You can install the package via the `npm` command:

```bash
npm install laravel-collection --save
```

With `yarn`:

```bash
yarn add laravel-collection
```

## Available methods :

|   |  |  |  |  |
| --- | --- | --- | --- | --- |
| [all](#all) | [average](#average) | [avg](#avg) | [chunk](#chunk) | [collapse](#collapse) | 
| [combine](#combine) | [concat](#concat) | [contains](#contains) | [containsStrict](#containsstrict) | [count](#count) | 
| [diff](#diff) | [diffKeys](#diffkeys) | [each](#each) | [every](#every) | [except](#except) | 
| [filter](#filter) | [first](#first) | [flatMap](#flatmap) | [flatten](#flatten) | [flip](#flip) | 
| [forget](#forget) | [forPage](#forpage) | [get](#get) | [groupBy](#groupby) | [has](#has) | 
| [implode](#implode) | [intersect](#intersect) | [isEmpty](#isempty) | [isNotEmpty](#isnotempty) | [keyBy](#keyby) | 
| [keys](#keys) | [last](#last) | [macro](#macro) | [make](#make) | [map](#map) | 
| [mapWithKeys](#mapwithkeys) | [max](#max) | [median](#median) | [merge](#merge) | [min](#min) | 
| [mode](#mode) | [nth](#nth) | [only](#only) | [partition](#partition) | [pipe](#pipe) | 
| [pluck](#pluck) | [pop](#pop) | [prepend](#prepend) | [pull](#pull) | [push](#push) | 
| [put](#put) | [random](#random) | [reduce](#reduce) | [reject](#reject) | [reverse](#reverse) | 
| [search](#search) | [shift](#shift) | [shuffle](#shuffle) | [slice](#slice) | [sort](#sort) | 
| [sortBy](#sortby) | [sortByDesc](#sortbydesc) | [splice](#splice) | [split](#split) | [sum](#sum) | 
| [take](#take) | [tap](#tap) | [times](#times) | [toArray](#toarray) | [toJson](#tojson) | 
| [transform](#transform) | [union](#union) | [unique](#unique) | [uniqueStrict](#uniquestrict) | [values](#values) | 
| [when](#when) | [where](#where) | [whereStrict](#wherestrict) | [whereIn](#wherein) | [whereInStrict](#whereinstrict) | 
| [whereNotIn](#wherenotin) | [whereNotInStrict](#wherenotinstrict) | [zip](#zip) |  |  |  

### `all()`

The `all` method returns the underlying array represented by the collection:

```js
new Collection([1, 2, 3]).all();

// [1, 2, 3]
```

### `average()`

Alias for the [`avg`](#avg) method.

### `avg()`

The `avg` method returns the [average value](https://en.wikipedia.org/wiki/Average) of a given key:

```js
let average = new Collection([{'foo': 10}, {'foo': 10}, {'foo': 20}, {'foo': 40}]).avg('foo');

// 20

let average = new Collection([1, 1, 2, 4]).avg();

// 2
```

### `chunk()`

The `chunk` method breaks the collection into multiple, smaller collections of a given size:

```js
let collection = new Collection([1, 2, 3, 4, 5, 6, 7]);
let chunks     = collection.chunk(4);

chunks.toArray();

// [[1, 2, 3, 4], [5, 6, 7]]
```

### `collapse()`

The `collapse` method collapses a collection of arrays into a single, flat collection:

```js
let collection = new Collection([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
let collapsed = collection.collapse();

collapsed.all();

// [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

### `combine()`

The `combine` method combines the keys of the collection with the values of another array or collection:

```js
let collection = new Collection(['name', 'age']);
let combined   = collection.combine(['George', 29]);

combined.all();

// ['name': 'George', 'age': 29]
```

### `concat()`

The `concat` method concat the two arrays/collection into a single collection:

```js
let collection = new Collection([1, 2, 3]);
let concatenated = collection.concat(['a', 'b', 'c']);

concatenated.all();
// [1, 2, 3, 'a', 'b', 'c']
```

### `contains()`

The `contains` method determines whether the collection contains a given item:


```js
let collection = new Collection({'name': 'Desk', 'price': 100});

collection.contains('Desk');
// true

collection.contains('New York');
// false
```

You may also pass a key / value pair to the `contains` method, which will determine if the given pair exists in the collection:

```js
let collection = new Collection([
    {'product': 'Desk', 'price': 200},
    {'product': 'Chair', 'price': 100}
]);

collection.contains('product', 'Bookcase');
// false
```

### `containsStrict()`

> Coming soon&hellip;

### `count()`

The `count` method returns the total number of items in the collection:

```js
let collection = new Collection([1, 2, 3, 4]);

collection.count();
// 4
```

### `diff()`

The `diff` method compares the collection against another collection or a plain array based on its values. This method will return the values in the original collection that are not present in the given collection:

```js
let collection = new Collection([1, 2, 3, 4, 5]);

let diff = collection.diff([2, 4, 6, 8]);

diff.all();

// [1, 3, 5]
```

### `diffKeys()`

The `diffKeys` method compares the collection against another collection or a plain array based on its keys. This method will return the key / value pairs in the original collection that are not present in the given collection:

```js
let collection = new Collection({
    'one': 10,
    'two': 20,
    'three': 30,
    'four': 40,
    'five': 50
});

let diff = collection.diffKeys({
    'two': 2,
    'four': 4,
    'six': 6,
    'eight': 8
});

diff.all();
// {'one': 10, 'three': 30, 'five': 50}
```

### `each()`

The `each` method iterates over the items in the collection and passes each item to a callback:

```js
let collection = new Collection({'one': 1, 'two': 2, 'three': 3}).each(function (item, key) {
    //
});
```

If you would like to stop iterating through the items, you may return `false` from your callback:

```js
let collection = new Collection({'one': 1, 'two': 2, 'three': 3}).each(function (item, key) {
    if (item > 2) {
        return false;
    }
});
```

### `every()`

The `every` method may be used to verify that all elements of a collection pass a given truth test:

```js
let result = new Collection([1, 2, 3, 4]).every(function (value, key) {
    return value > 2;
});
// false
```

### `except()`

The `except` method returns all items in the collection except for those with the specified keys:

```js
let collection = new Collection({'product_id': 1, 'price': 100, 'discount': false});
let filtered = collection.except(['price', 'discount']);

filtered.all();
// {product_id: 1}
```

For the inverse of `except`, see the [`only`](#only) method.

### `filter()`

The `filter` method filters the collection using the given callback, keeping only those items that pass a given truth test:

```js
let collection = new Collection([1, 2, 3, 4]);
let filtered = collection.filter(function (value, key) {
    return value > 2;
});

filtered.all();
// [3, 4]
```

If no callback is supplied, all entries of the collection that are equivalent to `false` will be removed:

```js
let collection = new Collection([1, 2, 3, null, false, '', 0, []]);

collection.filter().all();
// [1, 2, 3]
```

For the inverse of `filter`, see the [`reject`](#reject) method.

### `first()`

The `first` method returns the first element in the collection that passes a given truth test:

```js
new Collection([1, 2, 3, 4]).first(function (value, key) {
    return value > 2;
});
// 3
```

You may also call the `first` method with no arguments to get the first element in the collection. If the collection is empty, `null` is returned:

```js
new Collection([1, 2, 3, 4]).first();
// 1
```

### `flatMap()`

The `flatMap` method iterates through the collection and passes each value to the given callback. The callback is free to modify the item and return it, thus forming a new collection of modified items. Then, the array is flattened by a level:

```js
let collection = new Collection([
    {'name': 'Sally'},
    {'school': 'Arkansas'},
    {'age': 28}
]);

let flattened = collection.flatMap((values) => {
    let object = Object.assign({}, values);
    
    Object.keys(object).map((k) => {
        let value = object[k];
        if (typeof value === 'string')
            object[k] = value.toUpperCase();
    });

    return object;
});

flattened.all();
// {'name': 'SALLY', 'school': 'ARKANSAS', 'age': 28}
```

### `flatten()`

The `flatten` method flattens a multi-dimensional collection into a single dimension:

```js
let collection = new Collection({'name': 'taylor', 'languages': ['php', 'javascript']});
let flattened = collection.flatten();

flattened.all();
// ['taylor', 'php', 'javascript'];
```

You may optionally pass the function a "depth" argument:

```js
let collection = new Collection({
    'Apple': [
        {'name': 'iPhone 6S', 'brand': 'Apple'},
    ],
    'Samsung': [
        {'name': 'Galaxy S7', 'brand': 'Samsung'}
    ],
});

let products = collection.flatten(1);

console.log(products.values().all());
/*
[ 
    { name: 'iPhone 6S', brand: 'Apple' },
    { name: 'Galaxy S7', brand: 'Samsung' } 
]
*/
```

In this example, calling `flatten` without providing the depth would have also flattened the nested arrays, resulting in `['iPhone 6S', 'Apple', 'Galaxy S7', 'Samsung']`. Providing a depth allows you to restrict the levels of nested arrays that will be flattened.

### `flip()`

The `flip` method swaps the collection's keys with their corresponding values:

```js
let collection = new Collection({'name': 'taylor', 'framework': 'laravel'});
let flipped = collection.flip();

flipped.all();
// {'taylor': 'name', 'laravel': 'framework'}
```

### `forget()`

The `forget` method removes an item from the collection by its key:

```js
let collection = new Collection({
    'name': 'taylor', 'framework': 'laravel'
});

collection.forget('name');

collection.all();
// { 'framework': 'laravel' }
```

> Unlike most other collection methods, `forget` does not return a new modified collection; it modifies the collection it is called on.

### `forPage()`

The `forPage` method returns a new collection containing the items that would be present on a given page number. The method accepts the page number as its first argument and the number of items to show per page as its second argument:

```js
let collection = new Collection([1, 2, 3, 4, 5, 6, 7, 8, 9]);
let chunk = collection.forPage(2, 3);

chunk.all();
// [4, 5, 6]
```

### `get()`

The `get` method returns the item at a given key. If the key does not exist, `null` is returned:

```js
let collection = new Collection({
    'name': 'taylor', 'framework': 'laravel'
});

let value = collection.get('name');
// taylor
```

You may optionally pass a default value as the second argument:

```js
let collection = new Collection({
    'name': 'taylor', 'framework': 'laravel'
});

let value = collection.get('foo', 'default-value');
// default-value
```

You may even pass a callback as the default value. The result of the callback will be returned if the specified key does not exist:

```js
let collection = new Collection({
    'name': 'taylor', 'framework': 'laravel'
});

let value = collection.get('email', function() {
    return 'default-value';
});
// default-value
```

### `groupBy()`

The `groupBy` method groups the collection's items by a given key:

```js
let collection = new Collection([
    {'account_id': 'account-x10', 'product': 'Chair'},
    {'account_id': 'account-x10', 'product': 'Bookcase'},
    {'account_id': 'account-x11', 'product': 'Desk'},
]);

let grouped = collection.groupBy('account_id');

grouped.all();
/*
{
    'account-x10': [
        { account_id: 'account-x10', product: 'Chair' },
        { account_id: 'account-x10', product: 'Bookcase' }
    ],
    'account-x11': [
        { account_id: 'account-x11', product: 'Desk' }
    ]
}
*/
```

In addition to passing a string `key`, you may also pass a callback. The callback should return the value you wish to key the group by:

```js
let grouped = collection.groupBy(function (item, key) {
    return item['account_id'].substr(item['account_id'].length - 3);
});

grouped.all();
/*
{ 
    x10: [ 
        { account_id: 'account-x10', product: 'Chair' },
        { account_id: 'account-x10', product: 'Bookcase' }
    ],
    x11: [
        { account_id: 'account-x11', product: 'Desk' }
    ] 
}
*/
```
### `has()`

The `has` method determines if a given key exists in the collection:


```js
let collection = new Collection({
    'account_id': 1, 'product': 'Desk'
});

collection.has('product');
// true
```

### `implode()`

The `implode` method joins the items in a collection. Its arguments depend on the type of items in the collection. If the collection contains arrays or objects, you should pass the key of the attributes you wish to join, and the "glue" string you wish to place between the values:

```js
let collection = new Collection([
    {'account_id': 1, 'product': 'Desk'},
    {'account_id': 2, 'product': 'Chair'},
]);

collection.implode('product', ', ');
// Desk, Chair
```

If the collection contains simple strings or numeric values, simply pass the "glue" as the only argument to the method:

```js
new Collection([1, 2, 3, 4, 5]).implode('-');
// '1-2-3-4-5'
```

### `intersect()`

The `intersect` method removes any values from the original collection that are not present in the given array or collection. The resulting collection will preserve the original collection's keys:

```js
let collection = new Collection(['Desk', 'Sofa', 'Chair']);
let intersect = collection.intersect(['Desk', 'Chair', 'Bookcase']);

intersect.all();
// [ 'Desk', 'Chair' ]
```

### `isEmpty()`

The `isEmpty` method returns `true` if the collection is empty; otherwise, `false` is returned:

```js
new Collection([]).isEmpty();

// true
```

### `isNotEmpty()`

The `isNotEmpty` method returns `true` if the collection is not empty; otherwise, `false` is returned:

```js
new Collection([]).isNotEmpty();

// false
```

### `keyBy()`

The `keyBy` method keys the collection by the given key. If multiple items have the same key, only the last one will appear in the new collection:

```js
let collection = new Collection([
    {'product_id': 'prod-100', 'name': 'desk'},
    {'product_id': 'prod-200', 'name': 'chair'},
]);

let keyed = collection.keyBy('product_id');

keyed.all();

/*
{ 
    'prod-100': { product_id: 'prod-100', name: 'desk' },
    'prod-200': { product_id: 'prod-200', name: 'chair' }
}
*/
```

You may also pass a callback to the method. The callback should return the value to key the collection by:

```js
let keyed = collection.keyBy(function (item) {
    return item['product_id'].toUpperCase();
});

keyed.all();

/*
{ 
    'PROD-100': { product_id: 'prod-100', name: 'desk' },
    'PROD-200': { product_id: 'prod-200', name: 'chair' }
}
*/
```

### `keys()`

The `keys` method returns all of the collection's keys:

```js
let collection = new Collection({
    'prod-100': {'product_id': 'prod-100', 'name': 'Desk'},
    'prod-200': {'product_id': 'prod-200', 'name': 'Chair'},
});

let keys = collection.keys();

keys.all();

// [ 'prod-100', 'prod-200' ]
```

### `last()`

The `last` method returns the last element in the collection that passes a given truth test:

```js
new Collection([1, 2, 3, 4]).last(function (value, key) {
    return value < 3;
})

// 2
```

You may also call the `last` method with no arguments to get the last element in the collection. If the collection is empty, `null` is returned:

```js
new Collection([1, 2, 3, 4]).last()

// 4
```

### `macro()`

The `macro` method allows you to extend the `Collection` class with your own custom functions:

```js
Collection.macro('uppercase', function () {
    return this.map((item) => item.toUpperCase())
});

let collection = new Collection(['a', 'b', 'c']);

collection.uppercase().all();

// [ 'A', 'B', 'C' ]
```

### `make()`

The `make` method allows you to initiate a `Collection` object without the `new` keyword:

```js
let collection = Collection.make([1, 2, 3, 4, 5]);

collection.all();
// [ 1, 2, 3, 4, 5 ]
```

### `map()`

The `map` method iterates through the collection and passes each value to the given callback. The callback is free to modify the item and return it, thus forming a new collection of modified items:

```js
let collection = new Collection([1, 2, 3, 4, 5]);
let multiplied = collection.map(function (item, key) {
    return item * 2;
});

multiplied.all();

// [2, 4, 6, 8, 10]
```

> Like most other collection methods, `map` returns a new collection instance; it does not modify the collection it is called on. If you want to transform the original collection, use the `transform` method.

### `mapWithKeys()`

The `mapWithKeys` method iterates through the collection and passes each value to the given callback. The callback should return an associative array containing a single key / value pair:

```js
let collection = new Collection([
    {
        'name': 'John',
        'department': 'Sales',
        'email': 'john@example.com'
    },{
        'name': 'Jane',
        'department': 'Marketing',
        'email': 'jane@example.com'
    }
]);

let keyed = collection.mapWithKeys(function (item) {
    return [item['email'], item['name']];
});

keyed.all();

/*
{ 
    'john@example.com': 'John',
    'jane@example.com': 'Jane'
}
*/
```

### `max()`

The `max` method returns the maximum value of a given key:

```js
let max = new Collection([{'foo': 10}, {'foo': 20}]).max('foo');

// 20

let max = new Collection([1, 2, 3, 4, 5]).max();

// 5
```

### `median()`

The `median` method returns the [median value](https://en.wikipedia.org/wiki/Median) of a given key:

```js
let collection = new Collection([{'foo': 10}, {'foo': 10}, {'foo': 20}, {'foo': 40}]);

collection.median('foo');
// 15

let collection = new Collection([1, 1, 2, 4]);

collection.median();
// 1.5
```

### `merge()`

The `merge` method merges the given array or collection with the original collection. If a string key in the given items matches a string key in the original collection, the given items's value will overwrite the value in the original collection:

```js
let collection = new Collection({'product_id': 1, 'price': 100});

let merged = collection.merge({'price': 200, 'discount': false});

merged.all()

// { 'product_id': 1, 'price': 200, 'discount': false }
```

If the given items's keys are numeric, the values will be appended to the end of the collection:

```js
let collection = new Collection(['Desk', 'Chair']);
let merged = collection.merge(['Bookcase', 'Door']);

console.log(merged.all());

// [ 'Desk', 'Chair', 'Bookcase', 'Door' ]
```

### `min()`

The `min` method returns the minimum value of a given key:

```js
let collection = new Collection([{'foo': 10}, {'foo': 20}]);

collection.min('foo');
// 10

let collection = new Collection([1, 2, 3, 4, 5]);

collection.min();
// 1
```

### `mode()`

The `mode` method returns the [mode value](https://en.wikipedia.org/wiki/Mode_(statistics)) of a given key:

```js
let collection = new Collection([{'foo': 10}, {'foo': 10}, {'foo': 20}, {'foo': 40}]);

collection.mode('foo');
// [ 10 ]

let collection = new Collection([1, 1, 2, 4]);

collection.mode();
// [ 1 ]
```

### `nth()`

The `nth` method creates a new collection consisting of every n-th element:

```js
let collection = new Collection(['a', 'b', 'c', 'd', 'e', 'f']);

collection.nth(4).all();
// [ 'a', 'e' ]
```

You may optionally pass an offset as the second argument:

```js
collection.nth(4, 1).all();
// [ 'b', 'f' ]
```

### `only()`

The `only` method returns the items in the collection with the specified keys:

```js
let collection = new Collection({
    'product_id': 1, 'name': 'Desk', 'price': 100, 'discount': false
});

let filtered = collection.only(['product_id', 'name']);

filtered.all();
// { product_id: 1, name: 'Desk' }
```

For the inverse of `only`, see the [`except`](#except) method.

### `partition()`

The `partition` method may be combined with the [destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) to separate elements that pass a given truth test from those that do not:

```js
let collection = new Collection([1, 2, 3, 4, 5, 6]);
let [first, second] = collection.partition(function (item) {
    return item < 3;
});

console.log(first);  // [ 1, 2 ]
console.log(second); // [ 3, 4, 5, 6 ]
```

### `pipe()`

The `pipe` method passes the collection to the given callback and returns the result:

```js
let collection = new Collection([1, 2, 3]);

let piped = collection.pipe(function ($collection) {
    return $collection.sum();
});
        
// 6
```

### `pluck()`

The `pluck` method retrieves all of the values for a given key:

```js
let collection = new Collection([
    {'product_id': 'prod-100', 'name': 'Desk'},
    {'product_id': 'prod-200', 'name': 'Chair'},
]);

let plucked = collection.pluck('name');

plucked.all();

// [ 'Desk', 'Chair' ]
```

You may also specify how you wish the resulting collection to be keyed:

```js
let plucked = collection.pluck('name', 'product_id');

plucked.all();
// { 'prod-100': 'Desk', 'prod-200': 'Chair' }
```

### `pop()`

The `pop` method removes and returns the last item from the collection:

```js
let collection = new Collection([1, 2, 3, 4, 5]);

collection.pop();
// 5

collection.all();
// [1, 2, 3, 4]
```

### `prepend()`

The `prepend` method adds an item to the beginning of the collection:

```js
let collection = new Collection([1, 2, 3, 4, 5]);

collection.prepend(0);

collection.all();
// [0, 1, 2, 3, 4, 5]
```

You may also pass a second argument to set the key of the prepended item:

```js
let collection = new Collection({'one': 1, 'two': 2});

collection.prepend(0, 'zero');

collection.all();

// { 'zero': 0, 'one': 1, 'two': 2 }
```

> The 

### `pull()`

The `pull` method removes and returns an item from the collection by its key:

```js
let collection = new Collection({
    'product_id': 'prod-100', 'name': 'Desk'
});

collection.pull('name');

// 'Desk'

collection.all();

// { product_id: 'prod-100' }
```

### `push()`

The `push` method appends an item to the end of the collection:

```js
let collection = new Collection([1, 2, 3, 4]);

collection.push(5);

collection.all();
// [ 1, 2, 3, 4, 5 ]
```

### `put()`

The `put` method sets the given key and value in the collection:

```js
let collection = new Collection({'product_id': 1, 'name': 'Desk'});

collection.put('price', 100);

collection.all();
// { product_id: 1, name: 'Desk', price: 100 }
```

### `random()`

The `random` method returns a random item from the collection:

```js
let collection = new Collection([1, 2, 3, 4, 5]);

collection.random();
// 4 - (retrieved randomly)
```

You may optionally pass an integer to `random` to specify how many items you would like to randomly retrieve. A collection of items is always returned when explicitly passing the number of items you wish to receive:

```js
let collection = new Collection([1, 2, 3, 4, 5]);

collection.random(3).all();
// [ 2, 4, 3 ] - (retrieved randomly)
```

### `reduce()`

The `reduce` method reduces the collection to a single value, passing the result of each iteration into the subsequent iteration:

```js
let collection = new Collection([1, 2, 3]);

let total = collection.reduce(function (carry, item) {
    return carry + item;
});
// 6
```

The value for `carry` on the first iteration is `null`; however, you may specify its initial value by passing a second argument to `reduce`:

```js
let total = collection.reduce(function (carry, item) {
    return carry + item;
}, 4);

// 10
```

### `reject()`

The `reject` method filters the collection using the given callback. The callback should return true if the item should be removed from the resulting collection:

```js
let collection = new Collection([1, 2, 3, 4]);

let filtered = collection.reject(function (value, key) {
    return value > 2;
});

filtered.all();
// [ 1, 2 ]
```

For the inverse of the `reject` method, see the [`filter`](#filter) method.

### `reverse()`

The `reverse` method reverses the order of the collection's items:

```js
let collection = new Collection([1, 2, 3, 4, 5]);

let reversed = collection.reverse();

reversed.all();

// [ 5, 4, 3, 2, 1 ]
```

### `search()`

The `search` method searches the collection for the given value and returns its key if found. If the item is not found, `false` is returned.

```js
let collection = new Collection([2, 4, 6, 8]);

collection.search(4);
// 1
```

The search is done using a "loose" comparison, meaning a string with an integer value will be considered equal to an integer of the same value. To use "strict" comparison, pass `true` as the second argument to the method:

```js
collection.search('4', true);

// false
```

Alternatively, you may pass in your own callback to search for the first item that passes your truth test:

```js
collection.search(function (item, key) {
    return item > 5;
});

// 2
```

### `shift()`

The `shift` method removes and returns the first item from the collection:

```js
let collection = new Collection([1, 2, 3, 4, 5]);

collection.shift();
// 1

collection.all();
// [ 2, 3, 4, 5 ]
```

### `shuffle()`

The `shuffle` method randomly shuffles the items in the collection:

```js
let collection = new Collection([1, 2, 3, 4, 5]);

let shuffled = collection.shuffle();

shuffled.all();
// [ 5, 1, 2, 3, 4 ] - (generated randomly)
```

### `slice()`

The `slice` method returns a slice of the collection starting at the given index:

```js
let collection = new Collection([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

let slice = collection.slice(4);

slice.all();
// [ 5, 6, 7, 8, 9, 10 ]
```

If you would like to limit the size of the returned slice, pass the desired size as the second argument to the method:

```js
let slice = collection.slice(4, 2);

slice.all();
// [ 5, 6 ]
```

The returned slice will preserve keys by default. If you do not wish to preserve the original keys, you can use the [`values`](#values) method to reindex them.

### `sort()`

The `sort` method sorts the collection. The sorted collection keeps the original array keys, so in this example we'll use the [`values`](#values) method to reset the keys to consecutively numbered indexes:

```js
let collection = new Collection([5, 3, 1, 2, 4]);

let sorted = collection.sort();

sorted.values().all();
// [ 1, 2, 3, 4, 5 ]
```

If your sorting needs are more advanced, you may pass a callback to `sort` with your own algorithm.

> If you need to sort a collection of nested arrays or objects, see the [`sortBy`](#sortby) and [`sortByDesc`](#sortbydesc) methods.

### `sortBy()`

The `sortBy` method sorts the collection by the given key. The sorted collection keeps the original array keys, so in this example we'll use the [`values`](#values) method to reset the keys to consecutively numbered indexes:

```js
let collection = new Collection([
    {'name': 'Desk', 'price': 200},
    {'name': 'Chair', 'price': 100},
    {'name': 'Bookcase', 'price': 150}
]);

let sorted = collection.sortBy('price');

sorted.values().all();
/*
[ 
    { name: 'Chair', price: 100 },
    { name: 'Bookcase', price: 150 },
    { name: 'Desk', price: 200 }
]
*/
```

You can also pass your own callback to determine how to sort the collection values:

```js
let collection = new Collection([
    {'name': 'Desk', 'colors': ['Black', 'Mahogany']},
    {'name': 'Chair', 'colors': ['Black']},
    {'name': 'Bookcase', 'colors': ['Red', 'Beige', 'Brown']},
]);

let sorted = collection.sortBy(function (product, key) {
    return product['colors'].length;
});

sorted.values().all();
/*
 [
    { name: 'Chair', colors: [ 'Black' ] },
    { name: 'Desk', colors: [ 'Black', 'Mahogany' ] },
    { name: 'Bookcase', colors: [ 'Red', 'Beige', 'Brown' ] } 
 ]
 */
```

### `sortByDesc()`

This method has the same signature as the [`sortBy`](#sortby) method, but will sort the collection in the opposite order.

### `splice()`

The `splice` method removes and returns a slice of items starting at the specified index:

```js
let collection = new Collection([1, 2, 3, 4, 5]);

let chunk = collection.splice(2);

chunk.all();
// [ 3, 4, 5 ]

collection.all();
// [ 1, 2 ]
```

You may pass a second argument to limit the size of the resulting chunk:

```js
let collection = new Collection([1, 2, 3, 4, 5]);

let chunk = collection.splice(2, 1);

chunk.all();
// [ 3 ]

collection.all();
// [ 1, 2, 4, 5 ]
```

In addition, you can pass a third argument containing the new items to replace the items removed from the collection:

```js
let collection = new Collection([1, 2, 3, 4, 5]);

let chunk = collection.splice(2, 1, [10, 11]);

chunk.all();
// [ 3 ]

collection.all();
// [ 1, 2, 10, 11, 4, 5 ]
```

### `split()`

The `split` method breaks a collection into the given number of groups:

```js
let collection = new Collection([1, 2, 3, 4, 5]);

let groups = collection.split(3);

groups.toArray();
// [ [ 1, 2 ], [ 3, 4 ], [ 5 ] ]
```

### `sum()`

The `sum` method returns the sum of all items in the collection:

```js
Collection.make([1, 2, 3, 4, 5]).sum();

// 15
```

If the collection contains nested arrays or objects, you should pass a key to use for determining which values to sum:

```js
let collection = new Collection([
    {'name': 'JavaScript: The Good Parts', 'pages': 176},
    {'name': 'JavaScript: The Definitive Guide', 'pages': 1096},
]);

collection.sum('pages');
// 1272
```

In addition, you may pass your own callback to determine which values of the collection to sum:

```js
let collection = new Collection([
    {'name': 'Chair', 'colors': ['Black']},
    {'name': 'Desk', 'colors': ['Black', 'Mahogany']},
    {'name': 'Bookcase', 'colors': ['Red', 'Beige', 'Brown']},
]);

collection.sum(function (product) {
    return product['colors'].length;
});
// 6
```

### `take()`

The `take` method returns a new collection with the specified number of items:

```js
let collection = new Collection([0, 1, 2, 3, 4, 5]);

let chunk = collection.take(3);

chunk.all();
// [ 0, 1, 2 ]
```

You may also pass a negative integer to take the specified amount of items from the end of the collection:

```js
let collection = new Collection([0, 1, 2, 3, 4, 5]);

let chunk = collection.take(-2);

chunk.all();
// [ 4, 5 ]
```

### `tap()`

The `tap` method passes the collection to the given callback, allowing you to "tap" into the collection at a specific point and do something with the items while not affecting the collection itself:

```js
let result = Collection.make([2, 4, 3, 1, 5])
    .sort()
    .tap(function (collection) {
        console.log(collection.values().toArray()); 
        // [ 1, 2, 3, 4, 5 ]
    })
    .shift();

console.log(result);
// 1
```

### `times()`

The static `times` method creates a new collection by invoking the callback a given amount of times:

```js
let collection = Collection.times(10, function (number) {
    return number * 9;
});

collection.all();
// [ 9, 18, 27, 36, 45, 54, 63, 72, 81, 90 ]
```

### `toArray()`

The `toArray` method converts the collection into a plain array:

```js
let collection = new Collection({'name': 'Desk', 'price': 200});

collection.toArray();
/*
 [
    [ 'Desk', 200 ]
 ]
 */
```

> `toArray` also converts all of the collection's nested objects to an array. If you want to get the raw underlying array, use the `all` method instead.

### `toJson()`

The `toJson` method converts the collection into a JSON serialized string:

```js
let collection = new Collection({'name': 'Desk', 'price': 200});

collection.toJson();
// '{"name":"Desk","price":200}'
```

### `transform()`

The `transform` method iterates over the collection and calls the given callback with each item in the collection. The items in the collection will be replaced by the values returned by the callback:

```js
let collection = new Collection([1, 2, 3, 4, 5]);

collection.transform(function (item, key) {
    return item * 2;
});

collection.all();
// [ 2, 4, 6, 8, 10 ]
```

> Unlike most other collection methods, `transform` modifies the collection itself. If you wish to create a new collection instead, use the `map` method.

### `union()`

The `union` method adds the given array to the collection. If the given array contains keys that are already in the original collection, the original collection's values will be preferred:

```js
let collection = new Collection({'1': ['a'], '2': ['b']});

let union = collection.union({'3': ['c'], '1': ['b']});

union.all();
// { '1': [ 'a' ], '2': [ 'b' ], '3': [ 'c' ] }
```

### `unique()`

The `unique` method returns all of the unique items in the collection. The returned collection keeps the original array keys, so in this example we'll use the [`values`](#values) method to reset the keys to consecutively numbered indexes:

```js
let collection = new Collection([1, 1, 2, 2, 3, 4, 2]);

let unique = collection.unique();

unique.values().all();
// [ 1, 2, 3, 4 ]
```

When dealing with nested arrays or objects, you may specify the key used to determine uniqueness:

```js
let collection = new Collection([
    {'name': 'iPhone 6', 'brand': 'Apple', 'type': 'phone'},
    {'name': 'iPhone 5', 'brand': 'Apple', 'type': 'phone'},
    {'name': 'Apple Watch', 'brand': 'Apple', 'type': 'watch'},
    {'name': 'Galaxy S6', 'brand': 'Samsung', 'type': 'phone'},
    {'name': 'Galaxy Gear', 'brand': 'Samsung', 'type': 'watch'},
]);

let unique = collection.unique('brand');

unique.values().all();
/*
[ 
    { name: 'iPhone 6', brand: 'Apple', type: 'phone' },
    { name: 'Galaxy S6', brand: 'Samsung', type: 'phone' } 
]
*/
```

You may also pass your own callback to determine item uniqueness:

```js
let unique = collection.unique(function (item) {
    return item['brand']+item['type'];
});

unique.values().all();
/*
[ 
    { name: 'iPhone 6', brand: 'Apple', type: 'phone' },
    { name: 'Apple Watch', brand: 'Apple', type: 'watch' },
    { name: 'Galaxy S6', brand: 'Samsung', type: 'phone' },
    { name: 'Galaxy Gear', brand: 'Samsung', type: 'watch' } 
]
*/
```

The `unique` method uses "loose" comparisons when checking item values, meaning a string with an integer value will be considered equal to an integer of the same value. Use the [`uniqueStrict`](#uniquestrict) method to filter using "strict" comparisons.

### `uniqueStrict()`

> Coming soon&hellip;

### `values()`

The `values` method returns a new collection with the keys reset to consecutive integers:

```js
let collection = new Collection({
    '10': {'product': 'Desk', 'price': 200},
    '11': {'product': 'Desk', 'price': 200}
});

let values = collection.values();

values.all();

/*
[ 
    { product: 'Desk', price: 200 },
    { product: 'Desk', price: 200 } 
]
*/
```

### `when()`

The `when` method will execute the given callback when the first argument given to the method evaluates to `true`:

```js
let collection = new Collection([1, 2, 3]);

collection.when(true, function (collect) {
    return collect.push(4);
});

collection.all();
// [ 1, 2, 3, 4 ]
```

### `where()`

The `where` method filters the collection by a given key / value pair:

```js
let collection = new Collection([
    {'product': 'Desk', 'price': 200},
    {'product': 'Chair', 'price': 100},
    {'product': 'Bookcase', 'price': 150},
    {'product': 'Door', 'price': 100}
]);

let filtered = collection.where('price', 100);

filtered.all();
/*
[
    { product: 'Chair', price: 100 },
    { product: 'Door', price: 100 } 
]
*/
```

> The `where` method uses "loose" comparisons when checking item values, meaning a string with an integer value will be considered equal to an integer of the same value. Use the [`whereStrict`](#wherestrict) method to filter using "strict" comparisons.

### `whereStrict()`

> Coming soon&hellip;

### `whereIn()`

The `whereIn` method filters the collection by a given key / value contained within the given array:

```js
let collection = new Collection([
    {'product': 'Desk', 'price': 200},
    {'product': 'Chair', 'price': 100},
    {'product': 'Bookcase', 'price': 150},
    {'product': 'Door', 'price': 100}
]);

let filtered = collection.whereIn('price', [150, 200]);

filtered.all();
/*
[ 
    { product: 'Desk', price: 200 },
    { product: 'Bookcase', price: 150 } 
]
*/
```

> The `whereIn` method uses "loose" comparisons when checking item values, meaning a string with an integer value will be considered equal to an integer of the same value. Use the [`whereInStrict`](#whereinstrict) method to filter using "strict" comparisons.

### `whereInStrict()`

> Coming soon&hellip;

### `whereNotIn()`

The `whereNotIn` method filters the collection by a given key / value not contained within the given array:

```js
let collection = new Collection([
    {'product': 'Desk', 'price': 200},
    {'product': 'Chair', 'price': 100},
    {'product': 'Bookcase', 'price': 150},
    {'product': 'Door', 'price': 100}
]);

let filtered = collection.whereNotIn('price', [150, 200]);

filtered.all();
/*
[ 
    { product: 'Chair', price: 100 },
    { product: 'Door', price: 100 }
]
*/
```

The `whereNotIn` method uses "loose" comparisons when checking item values, meaning a string with an integer value will be considered equal to an integer of the same value. Use the [`whereNotInStrict`](#wherenotinstrict) method to filter using "strict" comparisons.

### `whereNotInStrict()`

> Coming soon&hellip;

### `zip()`

The `zip` method merges together the values of the given array with the values of the original collection at the corresponding index:

```js
let collection = new Collection(['Chair', 'Desk']);

let zipped = collection.zip([100, 200]);

zipped.all();

// [ [ 'Chair', 100 ], [ 'Desk', 200 ] ]
```

## Contribution

Any ideas are welcome. Feel free to submit any issues or pull requests, please check the [contribution guidelines][link_contributing].

## Security

If you discover any security related issues, please email arcanedev.maroc@gmail.com instead of using the issue tracker.

## Credits

- [ARCANEDEV][link_author]
- [All Contributors][link_contributors]

[link_license]:      https://github.com/ARCANESCRIPTS/Collection/blob/master/LICENSE.md
[link_build]:        https://travis-ci.org/ARCANESCRIPTS/Collection
[link_grade]:        https://www.codacy.com/app/ARCANESCRIPTS/Collection
[link_coverage]:     https://www.codacy.com/app/ARCANESCRIPTS/Collection
[link_npm]:          https://www.npmjs.com/package/laravel-collection
[link_issues]:       https://github.com/ARCANESCRIPTS/Collection/issues
[link_author]:       https://github.com/arcanedev-maroc
[link_contributors]: https://github.com/ARCANESCRIPTS/Collection/graphs/contributors
[link_releases]:     https://github.com/ARCANESCRIPTS/Collection/releases
[link_contributing]: https://github.com/ARCANESCRIPTS/Collection/blob/master/CONTRIBUTING.md

[badge_license]:   https://img.shields.io/npm/l/laravel-collection.svg?style=flat-square
[badge_build]:     https://img.shields.io/travis/ARCANESCRIPTS/Collection/master.svg?style=flat-square
[badge_grade]:     https://img.shields.io/codacy/grade/[id].svg?style=flat-square
[badge_coverage]:  https://img.shields.io/codacy/coverage/[id]/master.svg?style=flat-square
[badge_npm]:       https://img.shields.io/badge/npm-%E2%9C%93-brightgreen.svg?style=flat-square
[badge_release]:   https://img.shields.io/npm/v/laravel-collection.svg?style=flat-square
[badge_downloads]: https://img.shields.io/npm/dt/laravel-collection.svg?style=flat-square
[badge_issues]:    https://img.shields.io/github/issues/ARCANESCRIPTS/Collection.svg?style=flat-square

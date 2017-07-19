import Collection from '../dist/Collection';
import dataset from './fixtures/data';

describe('#all()', () => {
    it('should get all #1', () => {
        let collect = new Collection;

        expect(collect).toBeInstanceOf(Collection);
        expect(collect.all()).toEqual([]); // Default to array
    });

    it('should get all #2', () => {
        let collect = new Collection(dataset.words);

        expect(collect).toBeInstanceOf(Collection);
        expect(collect.all()).toEqual(dataset.words);
    });

    it('should get all #3', () => {
        let collect = new Collection(dataset.persons);

        expect(collect).toBeInstanceOf(Collection);
        expect(collect.all()).toEqual(dataset.persons);
    });
});

describe('#average()', () => {
    it('should return the average', () => {
        const numbCol = new Collection([1, 2, 3, 4, 5, 6, 7, 8, 9]);

        expect(numbCol).toBeInstanceOf(Collection);
        expect(numbCol.average()).toBe(5);
        expect(numbCol.avg()).toBe(5);

        const objectCol = new Collection({
            '3': { id: 3, name: 'Product 3', price: 200.0 },
            '1': { id: 1, name: 'Product 1', price: 100.0 },
            '2': { id: 2, name: 'Product 2', price: 200.0 },
            '4': { id: 4, name: 'Product 4', price: 300.0 },
            '5': { id: 5, name: 'Product 5', price: 300.0 }
        });

        expect(objectCol).toBeInstanceOf(Collection);
        expect(objectCol.avg('price')).toEqual(220);
        expect(Collection.make([2, 4, 4, 6, 8]).unique().avg()).toEqual(5);
    });
});

describe('#chunk()', () => {
    it('should return the collection in chunks #1', () => {
        const collection = new Collection(dataset.numbers);

        expect(collection).toBeInstanceOf(Collection);
        expect(collection.chunk(5).all()).toEqual([[1, 2, 3, 4, 5], [6, 7, 8, 9, 10]]);
    });

    it('should return the collection in chunks #2', () => {
        const collection = new Collection(dataset.products);

        expect(collection).toBeInstanceOf(Collection);
        expect(collection.chunk(3).all()).toEqual([
            [
                {id: 1, name: 'Product 1', brand: 'Brand 1', price: 100},
                {id: 2, name: 'Product 2', brand: 'Brand 1', price: '200'},
                {id: 3, name: 'Product 3', brand: 'Brand 2', price: 200}
            ],[
                {id: 4, name: 'Product 4', brand: 'Brand 3', price: 300},
                {id: 5, name: 'Product 5', brand: 'Brand 3', price: 300}
            ]
        ]);
    });
});

describe('#collapse()', () => {
    it('should collapse a collection', () => {
        const uncollapsed = [[1], [{}, 5, {}], ['foo', 'bar']];

        const collection = new Collection(uncollapsed);
        const collapsed  = collection.collapse();

        expect(collection).toBeInstanceOf(Collection);
        expect(collapsed.all()).toEqual([1, {}, 5, {}, 'foo', 'bar']);
        expect(collection.all()).toEqual(uncollapsed);
    });
});

describe('#combine()', () => {
    it('should combine #1', () => {
        const collection = new Collection(['name', 'number']);
        const combined   = collection.combine(['Steven Gerrard', 8]);

        expect(combined).toBeInstanceOf(Collection);
        expect(combined.all()).toEqual({name: 'Steven Gerrard', number: 8});
        expect(collection.all()).toEqual(['name', 'number']);
    });

    it('should combine #2', () => {
        const collection = new Collection(['name', 'number']);
        const combined   = collection.combine(Collection.make(['Steven Gerrard', 8]));

        expect(combined).toBeInstanceOf(Collection);
        expect(combined.all()).toEqual({name: 'Steven Gerrard', number: 8});
        expect(collection.all()).toEqual(['name', 'number']);
    });
});

describe('#concat()', () => {
    it('should concat #1', () => {
        const concatenated = new Collection([1, 2, 3, 4, 5, 6])
            .concat(['a', 'b', 'c'])
            .concat([
                {foo: 'Foo'},
                {bar: 'Bar'},
                {qux: 'Qux'}
            ])
            .concat({
                foo: 'Foo',
                bar: 'Bar',
                qux: 'Qux'
            });

        expect(concatenated).toBeInstanceOf(Collection);
        expect(concatenated.count()).toEqual(15);
        expect(concatenated.all()).toEqual([
            1, 2, 3, 4, 5, 6,
            'a', 'b', 'c',
            {'foo': 'Foo'}, {'bar': 'Bar'}, {'qux': 'Qux'},
            'Foo', 'Bar', 'Qux'
        ]);
    });

    it('should concat #2', () => {
        const collection = Collection.make([1, 2, 3, 4, 5, 6])
            .concat(Collection.make(['a', 'b', 'c']))
            .concat(Collection.make([
                {foo: 'Foo'},
                {bar: 'Bar'},
                {qux: 'Qux'}
            ]))
            .concat(Collection.make({
                foo: 'Foo',
                bar: 'Bar',
                qux: 'Qux'
            }));

        expect(collection).toBeInstanceOf(Collection);
        expect(collection.count()).toEqual(15);
        expect(collection.all()).toEqual([
            1, 2, 3, 4, 5, 6,
            'a', 'b', 'c',
            {'foo': 'Foo'}, {'bar': 'Bar'}, {'qux': 'Qux'},
            'Foo', 'Bar', 'Qux'
        ]);
    });
});

describe('#contains()', () => {
    it('should return whether the collection contains a given item #1', () => {
        const collection = new Collection({
            id: 8,
            name: 'Steven Gerrard'
        });

        expect(collection.contains('id')).toBeTruthy();
        expect(collection.contains('name')).toBeTruthy();
        expect(collection.contains('age')).toBeFalsy();
    });

    it('should return whether the collection contains a given item #2', () => {
        const collection = new Collection({
            id: 8,
            name: 'Steven Gerrard'
        });

        expect(collection.contains('name', 'Steven Gerrard')).toBeTruthy();
        expect(collection.contains('id', 8)).toBeTruthy();

        expect(collection.contains('name', 'Steven Jobs')).toBeFalsy();
        expect(collection.contains('id', 18)).toBeFalsy();
    });

    it('should return whether the collection contains a given item #3', () => {
        const collection = new Collection([1, 2, 3, 4, 5]);

        expect(collection.contains((value) => value < 5)).toBeTruthy();
        expect(collection.contains((value) => value > 5)).toBeFalsy();
        expect(collection.contains(4)).toBeTruthy();
    });

    it('should return whether the collection contains a given item #4', () => {
        let collection = new Collection({'name': 'Desk', 'price': 100});

        expect(collection.contains('Desk')).toBeTruthy();
        expect(collection.contains(100)).toBeTruthy();

        expect(collection.contains('New York')).toBeFalsy();
        expect(collection.contains(400)).toBeFalsy();
    });
});

describe('#count()', () => {
    it('should return the number of the items in the collection', () => {
        let collection = new Collection;

        expect(collection).toBeInstanceOf(Collection);
        expect(collection.count()).toBe(0);

        collection = (new Collection(dataset.persons));

        expect(collection).toBeInstanceOf(Collection);
        expect(collection.count()).toBe(3);

        collection = (new Collection(dataset.products));

        expect(collection).toBeInstanceOf(Collection);
        expect(collection.count()).toBe(5);
    });
});

describe('#diff()', () => {
    it('should return the missing values from collection', () => {
        const collection = new Collection([1, 2, 3, 4, 5]);
        const diffOne    = collection.diff([1, 2, 3, 9]);

        expect(diffOne).toBeInstanceOf(Collection);
        expect(diffOne.all()).toEqual([4, 5]);

        const diffTwo = collection.diff(new Collection([1, 2, 3, 9]));

        expect(diffTwo).toBeInstanceOf(Collection);
        expect(diffTwo.all()).toEqual([4, 5]);

        expect(collection.all()).toEqual([1, 2, 3, 4, 5]);
    });
});

describe('#diffKeys()', () => {
    it('should compare the collection against another collection or a plain JavaScript object based on its keys', () => {
        const data = {
            a: 'a',
            b: 'b',
            c: 'c',
            d: 'd'
        };

        const diff = {
            b: 'b',
            d: 'd'
        };

        const collection = new Collection(data);
        const diffOne = collection.diffKeys(diff);

        expect(diffOne.all()).toEqual({ a: 'a', c: 'c' });
        expect(collection.all()).toEqual(data);

        const diffCollection = new Collection(diff);
        const diffTwo = collection.diffKeys(diffCollection);

        expect(diffTwo.all()).toEqual({ a: 'a', c: 'c' });
    });
});

describe('#each()', () => {
    it('should iterate over the collection #1', () => {
        let sum = 0;
        const collection = new Collection(dataset.numbers);
        const afterEach  = collection.each(function (item) {
            sum += item;
        });

        expect(afterEach).toEqual(collection);
        expect(afterEach.all()).toEqual(dataset.numbers);
        expect(sum).toEqual(55);
    });

    it('should iterate over the collection #2', () => {
        let sum = 0;
        const collection = new Collection(dataset.numbers);
        const afterEach  = collection.each((item) => {
            if (item > 5) sum += item;
        });

        expect(afterEach).toEqual(collection);
        expect(afterEach.all()).toEqual(dataset.numbers);
        expect(sum).toEqual(40);
    });

    it('should iterate over the collection #3', () => {
        let sum = 0;
        const collection = new Collection({a: 1, b: 2, c: 3, d: 4, e:5, f: 6, g: 7, h: 8, i: 9, j: 10});
        const afterEach  = collection.each((item) => {
            sum += item;
        });

        expect(afterEach).toEqual(collection);
        expect(afterEach.all()).toEqual({a: 1, b: 2, c: 3, d: 4, e:5, f: 6, g: 7, h: 8, i: 9, j: 10});
        expect(sum).toEqual(55);
    });
});

describe('#every()', () => {
    it('should verify that all elements of a collection pass a given truth test', () => {
        const collection = new Collection([1, 2, 3, 4]);

        expect(collection.every((value) => value > 2)).toBeFalsy();
        expect(collection.every((value) => value < 2)).toBeFalsy();
        expect(collection.every((value) => value <= 4)).toBeTruthy();
        expect(collection.every((value) => value > 0)).toBeTruthy();
    });
});

describe('#except()', () => {
    it('should return everything except specified properties', () => {
        const collection = new Collection(dataset.products[1]);

        expect(collection.except(['id', 'brand']).all()).toEqual({'name': 'Product 1', 'price': 100});
        expect(collection.all()).toEqual(dataset.products[1]);
    });
});

describe('#filter()', () => {
    it('should filter by a callback based on value: array items', () => {
        const collection = new Collection([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

        const filtered = collection.filter(item => item > 5);

        expect(filtered.all()).toEqual([6, 7, 8, 9, 10]);
        expect(collection.all()).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    });

    it('should filter by a callback based on value: object items', () => {
        const collection = new Collection(dataset.products);

        const filtered = collection.filter(product => product.id >= 3);

        expect(filtered.all()).toEqual([
            {"id": 3, "name": "Product 3", "brand": "Brand 2", "price": 200},
            {"id": 4, "name": "Product 4", "brand": "Brand 3", "price": 300},
            {"id": 5, "name": "Product 5", "brand": "Brand 3", "price": 300}
        ]);
        expect(collection.all()).toEqual(dataset.products);
    });

    it('should filter by a callback based on value & key: object items', () => {
        const collection = new Collection(dataset.persons);

        const filtered = collection.filter((person, key) => {
            return key > 1 && person != 'Jane';
        });

        expect(filtered.all()).toEqual(['Bob']);
    });

    it('should filter by removing falsy values if no callback is passed', () => {
        const collection = new Collection([0, 1, 2, null, 3, 4, undefined, 5, 6, 7, [], 8, 9, {}, 10]);

        const filtered = collection.filter();

        expect(filtered.all()).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

        expect(collection.all()).toEqual([0, 1, 2, null, 3, 4, undefined, 5, 6, 7, [], 8, 9, {}, 10]);
    });
});

describe('#first()', () => {
    it('Can get the first: array of items', () => {
        let collection = new Collection(dataset.words);

        expect(collection).toBeInstanceOf(Collection);
        expect(collection.first()).toBe('foo');
    });

    it('Can get the first: object of items', () => {
        let collection = new Collection(dataset.persons);

        expect(collection).toBeInstanceOf(Collection);
        expect(collection.first()).toBe('John');
    });

    it('Can get the first with a callback: object of items #1', () => {
        let collection = new Collection(dataset.persons);

        expect(collection).toBeInstanceOf(Collection);
        expect(collection.first(item => item !== 'John')).toBe('Jane');
    });

    it('Can get the first with a callback: object of items #2', () => {
        let collection = new Collection(dataset.products);

        expect(collection).toBeInstanceOf(Collection);
        expect(collection.first((product) => product.price >= 180))
            .toEqual({id: 2, name: 'Product 2', brand: 'Brand 1', price: '200'});
    });
});

describe('#flatMap()', () => {
    it('should iterate through the collection and passes each value to the given callback', () => {
        const collection = new Collection(dataset.persons);

        const flatMapped = collection.flatMap((values) => values.map((value) => value.toUpperCase()));

        expect(flatMapped.all()).toEqual({'1': 'JOHN', '2': 'JANE', '3': 'BOB'});

        expect(collection.all()).toEqual(dataset.persons);
    });
});

describe('#flatten()', () => {
    it('should flatten a multi-dimensional object', () => {
        let collection = new Collection({
            name: 'ARCANEDEV',
            languages: ['JavaScript', 'PHP', 'Laravel', 'ES6', 'VueJS']
        });

        expect(collection.flatten().all()).toEqual(['ARCANEDEV', 'JavaScript', 'PHP', 'Laravel', 'ES6', 'VueJS']);

        const data = {
            Apple: [
                { name: 'iPhone 6S', brand: 'Apple' },
            ],
            Samsung: [
                { name: 'Galaxy S7', brand: 'Samsung' }
            ]
        };

        collection = new Collection(data);

        expect(collection.flatten(1).all()).toEqual([
            { name: 'iPhone 6S', brand: 'Apple' },
            { name: 'Galaxy S7', brand: 'Samsung' }
        ]);

        collection = new Collection(data);

        expect(collection.flatten().all()).toEqual(['iPhone 6S', 'Apple', 'Galaxy S7', 'Samsung']);

    });
});

describe('#flip()', () => {
    it('should return a collection with keys and values flipped', () => {
        const collection = new Collection(dataset.persons);

        expect(collection.flip().all()).toEqual({
            John: '1',
            Jane: '2',
            Bob: '3'
        });

        expect(collection.all()).toEqual(dataset.persons);
    });
});

describe('#forPage()', () => {
    it('should return a collection containing the items that would be present on a given page number', () => {
        const collection = new Collection(dataset.numbers);

        expect(collection.forPage(1, 3).all()).toEqual([1, 2, 3]);
        expect(collection.forPage(2, 3).all()).toEqual([4, 5, 6]);
        expect(collection.forPage(3, 3).all()).toEqual([7, 8, 9]);
        expect(collection.forPage(4, 3).all()).toEqual([10]);

        expect(collection.all()).toEqual(dataset.numbers);
    });
});

describe('#forget()', () => {
    it('should forget the given key and value', () => {
        const collection = new Collection({
            '1': 'John',
            '2': 'Jane',
            '3': 'Bob'
        });

        expect(collection.count()).toEqual(3);
        expect(collection.isEmpty()).toBeFalsy();

        expect(collection.forget('1')).toBeInstanceOf(Collection);
        expect(collection.all()).toEqual({'2': 'Jane', '3': 'Bob'});

        expect(collection.forget('3')).toBeInstanceOf(Collection);
        expect(collection.all()).toEqual({'2': 'Jane'});

        expect(collection.forget('2')).toBeInstanceOf(Collection);
        expect(collection.all()).toEqual({});
        expect(collection.count()).toEqual(0);
        expect(collection.isEmpty()).toBeTruthy();

        expect(collection.forget('4')).toBeInstanceOf(Collection);
        expect(collection.all()).toEqual({});
    });
});

describe('#get()', () => {
    it('should return the item at a given key', () => {
        const collection = new Collection({
            name: 'ARCANEDEV',
            email: 'arcanedev@gmail.com'
        });

        expect(collection.get('name')).toEqual('ARCANEDEV');
        expect(collection.get('phone')).toBeNull();
        expect(collection.get('phone', 'No phone yet')).toEqual('No phone yet');
        expect(collection.get('phone', () => 'No phone yet')).toEqual('No phone yet');
    });
});

describe('#groupBy()', () => {
    it('should group the collections items by a given key #1', () => {
        const collection = new Collection(dataset.products);

        expect(collection.groupBy('brand').all()).toEqual({
            'Brand 1': [
                {id: 1, name: 'Product 1', brand: 'Brand 1', price: 100},
                {id: 2, name: 'Product 2', brand: 'Brand 1', price: '200'}
            ],
            'Brand 2': [
                {id: 3, name: 'Product 3', brand: 'Brand 2', price: 200}
            ],
            'Brand 3': [
                {id: 4, name: 'Product 4', brand: 'Brand 3', price: 300},
                {id: 5, name: 'Product 5', brand: 'Brand 3', price: 300}
            ]
        });

        expect(collection.all()).toEqual(dataset.products);
    });

    it('should group the collections items by a given key #2', () => {
        const collection = new Collection(dataset.products);
        const grouped = collection.groupBy(item => item.brand.replace(/\s+/g, '-').toLowerCase());

        expect(grouped.all()).toEqual({
            'brand-1': [
                {id: 1, name: 'Product 1', brand: 'Brand 1', price: 100},
                {id: 2, name: 'Product 2', brand: 'Brand 1', price: '200'}
            ],
            'brand-2': [
                {id: 3, name: 'Product 3', brand: 'Brand 2', price: 200}
            ],
            'brand-3': [
                {id: 4, name: 'Product 4', brand: 'Brand 3', price: 300},
                {id: 5, name: 'Product 5', brand: 'Brand 3', price: 300}
            ]
        });
    });

    it('should group the collections items by a given key #3', () => {
        const collection = new Collection(dataset.tasks);

        expect(collection.groupBy('parent_id').all()).toEqual({
            "10": [
                {
                    'id': 21,
                    'parent_id': 10,
                    'title': 'Task 21',
                    'description': 'Consequuntur et ab cum sit omnis architecto maiores est voluptate cupiditate odio sed assumenda.'
                },
                {
                    'id': 22,
                    'parent_id': 10,
                    'title': 'Task 22',
                    'description': 'Consequuntur et ab cum sit omnis architecto maiores est voluptate cupiditate odio sed assumenda.'
                }
            ],
            null: [
                {
                    'id': 10,
                    'parent_id': null,
                    'title': 'Task 10',
                    'description': 'Consequuntur et ab cum sit omnis architecto maiores est voluptate cupiditate odio sed assumenda.'
                }
            ]
        });
    });
});

describe('#has()', () => {
    it('should determine if a key exists in the collection #1', () => {
        const collection = new Collection({hero: 'Spoderman', powers: ['sweg']});

        expect(collection.has('hero')).toBeTruthy();
        expect(collection.has('powers')).toBeTruthy();
        expect(collection.has('dank')).toBeFalsy();

        expect(collection.has('hero', 'powers')).toBeTruthy();
        expect(collection.has('hero', 'dank')).toBeFalsy();
        expect(collection.has('dank', 'powers')).toBeFalsy();

        expect(collection.all()).toEqual({hero: 'Spoderman', powers: ['sweg']});
    });

    it('should determine if a key exists in the collection #2', () => {
        const collections = new Collection(['foo', 'bar']);

        expect(collections.has(0)).toBeTruthy();
        expect(collections.has(1)).toBeTruthy();
        expect(collections.has(2)).toBeFalsy();

        expect(collections.has(0, 1)).toBeTruthy();
        expect(collections.has(0, 2)).toBeFalsy();
        expect(collections.has(1, 2)).toBeFalsy();

        expect(collections.all()).toEqual(['foo', 'bar']);
    });
});

describe('#implode()', () => {
    it('should glue together the collection', () => {
        expect(new Collection([1, 2, 3, 4]).implode(', '))
            .toEqual('1, 2, 3, 4');

        expect(new Collection(dataset.products).implode('name', ' | '))
            .toEqual('Product 1 | Product 2 | Product 3 | Product 4 | Product 5');
    });
});

describe('#intersect()', () => {
    it('should return the matching values from collection', () => {
        const collection = new Collection([1, 2, 3, 4, 5]);
        const expected = [1, 2, 3];

        expect(collection.intersect([1, 2, 3, 9]).all()).toEqual(expected);
        expect(collection.intersect(new Collection([1, 2, 3, 9])).all()).toEqual(expected);
        expect(collection.all()).toEqual([1, 2, 3, 4, 5]);
    });
});

describe('#isEmpty() & #isNotEmpty()', () => {
    it('can check if the collection is empty', () => {
        let collection = new Collection;

        expect(collection.isEmpty()).toBeTruthy();
        expect(collection.isNotEmpty()).toBeFalsy();

        collection = Collection.make();

        expect(collection.isEmpty()).toBeTruthy();
        expect(collection.isNotEmpty()).toBeFalsy();

        collection = Collection.make(dataset.numbers);

        expect(collection.isEmpty()).toBeFalsy();
        expect(collection.isNotEmpty()).toBeTruthy();
        expect(collection.count()).toEqual(10);

        collection = Collection.make(dataset.tasks);

        expect(collection.isEmpty()).toBeFalsy();
        expect(collection.isNotEmpty()).toBeTruthy();
        expect(collection.count()).toEqual(3);
    });
});

describe('#keyBy()', () => {
    it('should key the collection by the given key', () => {
        const collection = new Collection(dataset.products);

        expect(collection.keyBy('brand').all()).toEqual({
            'Brand 1': {id: 2, name: 'Product 2', brand: 'Brand 1', price: '200'},
            'Brand 2': {id: 3, name: 'Product 3', brand: 'Brand 2', price: 200},
            'Brand 3': {id: 5, name: 'Product 5', brand: 'Brand 3', price: 300}
        });

        expect(collection.keyBy(item => item.brand.replace(/\s+/g, '-').toLowerCase()).all()).toEqual({
            'brand-1': {id: 2, name: 'Product 2', brand: 'Brand 1', price: '200'},
            'brand-2': {id: 3, name: 'Product 3', brand: 'Brand 2', price: 200},
            'brand-3': {id: 5, name: 'Product 5', brand: 'Brand 3', price: 300}
        });

        expect(collection.all()).toEqual(dataset.products);
    });
})

describe('#keys()', () => {
    it('Can get keys from empty items', () => {
        let collection = new Collection;

        expect(collection).toBeInstanceOf(Collection);

        expect(collection.keys().all()).toEqual([]);
    });

    it('Can get keys from an array of items', () => {
        let collection = new Collection(dataset.words);

        expect(collection).toBeInstanceOf(Collection);
        expect(collection.keys()).toEqual(new Collection([0, 1, 2, 3]));
    });

    it('Can get keys: object of items #1', () => {
        let collection = new Collection({'foo': 'bar', 'baz': 'qux'});

        expect(collection).toBeInstanceOf(Collection);
        expect(collection.keys()).toEqual(new Collection(['foo', 'baz']));
    });

    it('Can get keys: object of items #2', () => {
        let collection = new Collection(dataset.products);

        expect(collection).toBeInstanceOf(Collection);
        expect(collection.keys()).toEqual(new Collection(['1', '2', '3', '4', '5'])); // (°_° ) Yep, javascript did the sorting by itself
    });
});

describe('#last()', () => {
    it('should return the last item from the collection #1', () => {
        const collection = new Collection(dataset.numbers);

        expect(collection.last()).toEqual(10);
        expect(collection.all()).toEqual(dataset.numbers);
    });

    it('should return the last item from the collection #2', () => {
        const collection = new Collection(dataset.persons);

        expect(collection.last()).toEqual({'3': 'Bob'});
        expect(collection.all()).toEqual(dataset.persons);
    });

    it('should return the last item from the collection #3', () => {
        const collection = new Collection(dataset.numbers);

        expect(collection.last(item => item < 6)).toEqual(5);
        expect(collection.all()).toEqual(dataset.numbers);
    });
});

describe('#macro()', () => {
    it('should be able to register a custom macro/method', () => {
        Collection.macro('uppercase', function () {
            return this.map((item) => item.toUpperCase())
        });

        const collection = new Collection(['a', 'b', 'c']);

        expect(collection.uppercase().all()).toEqual(['A', 'B', 'C']);
        expect(collection.all()).toEqual(['a', 'b', 'c']);

        Collection.macro('prefix', function (prefix) {
            return this.map((item) => prefix + item);
        });

        expect(new Collection(['a', 'b', 'c']).prefix('xoxo').all()).toEqual(['xoxoa', 'xoxob', 'xoxoc']);
    });
});

describe('#map()', () => {
    it('should map over and modify the collection', () => {
        const collection = new Collection(dataset.numbers);

        expect(collection.map((item) => item * 2).all())
            .toEqual([2, 4, 6, 8, 10, 12, 14, 16, 18, 20]);
        expect(collection.all()).toEqual(dataset.numbers);

        expect(collection.map((item, key) => key * 2).all())
            .toEqual([0, 2, 4, 6, 8, 10, 12, 14, 16, 18]);
        expect(collection.all()).toEqual(dataset.numbers);
    });

    it('should map over an object and modify the object', () => {
        const collection = new Collection({
            foo: 1,
            bar: 2,
            baz: 3,
        });

        const multiplied = collection.map((item) => item * 2);

        expect(multiplied.all()).toEqual({
            foo: 2, bar: 4, baz: 6,
        });

        expect(collection.all()).toEqual({
            foo: 1, bar: 2, baz: 3,
        });
    });
});

describe('#mapWithKeys()', () => {
    it('should map over an object and modify the object by returning an array containing a single key/value pair #1', () => {
        const collection = new Collection(dataset.products);

        expect(collection.mapWithKeys((product) => [product.name, product.price]).all()).toEqual({
            'Product 1': 100,
            'Product 2': '200',
            'Product 3': 200,
            'Product 4': 300,
            'Product 5': 300
        });

        expect(collection.all()).toEqual(dataset.products);
    });

    it('should map over an object and modify the object by returning an array containing a single key/value pair #2', () => {
        const collection = new Collection({
            player1: {
                name: 'John',
                department: 'Sales',
                email: 'john@example.com'
            },
            player2: {
                name: 'Jane',
                department: 'Marketing',
                email: 'jane@example.com'
            }
        });

        expect(collection.mapWithKeys((item) => [item.email, item.name]).all()).toEqual({
            'john@example.com': 'John',
            'jane@example.com': 'Jane',
        });

        expect(collection.all()).toEqual({
            player1: {
                name: 'John',
                department: 'Sales',
                email: 'john@example.com'
            },
            player2: {
                name: 'Jane',
                department: 'Marketing',
                email: 'jane@example.com'
            }
        });
    });
});

describe('#max()', () => {
    it('should return the maximum value #1', () => {
        const collection = new Collection([-100, 200, 300, -500]);

        expect(collection.max()).toEqual(300);
        expect(collection.all()).toEqual([-100, 200, 300, -500]);
    });

    it('should return the maximum value #2', () => {
        const collection = new Collection([
            {value: -100},
            {value: 200},
            {value: 300},
            {value: -500},
            {other: false}
        ]);

        expect(collection.max('value')).toEqual(300);
        expect(collection.all()).toEqual([
            {value: -100},
            {value: 200},
            {value: 300},
            {value: -500},
            {other: false}
        ]);
    });
});

describe('#median()', () => {
    it('should return the median value with array collection', () => {
        expect(Collection.make([1, 2, 2, 4]).median()).toEqual(2);
        expect(Collection.make([1, 3, 3, 6, 7, 8, 9]).median()).toEqual(6);
    });

    it('should return the median value by key #1', () => {
        const collection = new Collection([
            {foo: 1}, {foo: 2}, {foo: 2}, {foo: 4}
        ]);

        expect(collection.median('foo')).toEqual(2);
    });

    it('should return the median value by key #2', () => {
        const collection = new Collection([
            {foo: 1}, {foo: 3}, {foo: 3}, {foo: 6}, {foo: 7}, {foo: 8}, {foo: 9}
        ]);

        expect(collection.median('foo')).toEqual(6);
    });

    it('should return even median collection', () => {
        expect(Collection.make([{foo: 0}, {foo: 3}]).median('foo')).toEqual(1.5);
    });

    it('should return the median value even with an out of order collection', () => {
        expect(Collection.make([{foo: 0}, {foo: 5}, {foo: 3}]).median('foo')).toEqual(3);
    });

    it('must return null if the collection is empty', () => {
        expect(Collection.make().median()).toBeNull();
    });
});

describe('#merge()', () => {
    it('should return the merged collection #1', () => {
        const collection = new Collection({
            name: 'John DOE',
            age: 30
        });

        const merge = collection.merge({
            spouse: {
                name: 'Jane DOE',
                age: 25
            }
        });

        expect(merge.all()).toEqual({
            name: 'John DOE',
            age: 30,
            spouse: {
                name: 'Jane DOE',
                age: 25
            }
        });

        expect(collection.all()).toEqual({
            name: 'John DOE',
            age: 30
        });
    });

    it('should return the merged collection #2', () => {
        const collection = new Collection({
            id: 1,
            price: 29
        });

        const merged = collection.merge({
            price: 400,
            discount: false
        });

        expect(merged.all()).toEqual({
            id: 1,
            price: 400,
            discount: false
        });
    });

    it('should return the merged collection #3', () => {
        const collection = new Collection(['Unicorn', 'Rainbow']);

        const merged = collection.merge(['Sunshine', 'Rainbow']);

        expect(merged.all()).toEqual(['Unicorn', 'Rainbow', 'Sunshine', 'Rainbow']);

        expect(collection.all()).toEqual(['Unicorn', 'Rainbow']);
    });
});

describe('#min()', () => {
    it('should return the minimum value of a given key #1', () => {
        const collection = new Collection([34, 345345, 34, 11234, 64, 77, 84, 5, 7]);

        expect(collection.min()).toEqual(5);
        expect(collection.all()).toEqual([34, 345345, 34, 11234, 64, 77, 84, 5, 7]);
    });

    it('should return the minimum value of a given key #2', () => {
        const collection = new Collection([
            {worth: 100},
            {worth: 900},
            {worth: 79}
        ]);

        expect(collection.min('worth')).toEqual(79);
        expect(collection.all()).toEqual([
            {worth: 100},
            {worth: 900},
            {worth: 79}
        ]);
    });
});

describe('#mode()', () => {
    it('must return null if collection is empty', () => {
        expect(Collection.make().mode()).toBeNull();
    });

    it('should return the mode value of collection values #1', () => {
        const collection = new Collection([1, 2, 3, 4, 4, 5]);

        expect(collection.mode()).toEqual([4]);
        expect(collection.all()).toEqual([1, 2, 3, 4, 4, 5]);
    });

    it('should return the mode value of collection values #2', () => {
        expect(Collection.make([]).mode()).toBeNull();
        expect(Collection.make([1, 2, 3]).mode()).toEqual([1, 2, 3]);
        expect(Collection.make([1, 1, 2, 4, 4]).mode()).toEqual([1, 4]);
        expect(Collection.make([1, 3, 3, 6, 7, 8, 9]).mode()).toEqual([3]);
    });

    it('should return the mode value of collection values #3', () => {
        const collection = new Collection([
            {foo: 1}, {foo: 1}, {foo: 2}, {foo: 4}
        ]);

        expect(collection.mode('foo')).toEqual([1]);
    });

    it('should return the mode value of collection values #4', () => {
        const collection = new Collection([
            {foo: 1}, {foo: 3}, {foo: 3}, {foo: 6}, {foo: 7}, {foo: 8}, {foo: 9}
        ]);

        expect(collection.mode('foo')).toEqual([3]);
    });

    it('should return the mode value of collection values #5', () => {
        const collection = new Collection([
            {foo: 1}, {foo: 3}, {foo: 3}, {foo: 6}, {foo: 6}
        ]);

        expect(collection.mode('foo')).toEqual([3, 6]);
    });
});

describe('#nth()', () => {
    it('should create a new collection consisting of every n-th element #1', () => {
        const collection = new Collection(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']);

        expect(collection.nth(4).all()).toEqual(['a', 'e', 'i']);
        expect(collection.nth(4, 1).all()).toEqual(['b', 'f']);
        expect(collection.nth(4, 3).all()).toEqual(['d', 'h']);
    });

    it('should create a new collection consisting of every n-th element #2', () => {
        const collection = new Collection(dataset.products);

        expect(collection.nth(2).all()).toEqual([
            {id: 1, name: 'Product 1', brand: 'Brand 1', price: 100},
            {id: 3, name: 'Product 3', brand: 'Brand 2', price: 200},
            {id: 5, name: 'Product 5', brand: 'Brand 3', price: 300}
        ]);

        expect(collection.nth(2, 1).all()).toEqual([
            {id: 2, name: 'Product 2', brand: 'Brand 1', price: '200'},
            {id: 4, name: 'Product 4', brand: 'Brand 3', price: 300}
        ]);

        expect(collection.nth(2, 2).all()).toEqual([
            {id: 3, name: 'Product 3', brand: 'Brand 2', price: 200.0},
            {id: 5, name: 'Product 5', brand: 'Brand 3', price: 300.0}
        ]);
    });
});

describe('#only()', () => {
    it('should only return the specified properties', () => {
        const collection = new Collection(dataset.products[1]);

        expect(collection.only(['id', 'name']).all()).toEqual({id: 1, name: 'Product 1'});
        expect(collection.all()).toEqual(dataset.products[1]);
    });
});

describe('#partition()', () => {
    it('should separate elements that pass a given truth test from those that do not #1', () => {
        const collection = new Collection(dataset.numbers);

        const partitions = collection.partition((item) => item < 6);

        expect(partitions[0]).toEqual([1, 2, 3, 4, 5]);
        expect(partitions[1]).toEqual([6, 7, 8, 9, 10]);
        expect(collection.all()).toEqual(dataset.numbers);
    });

    it('should separate elements that pass a given truth test from those that do not #2', () => {
        const collection = new Collection(dataset.products);

        const partitions = collection.partition((product) => product.price > 250);

        expect(partitions[0]).toEqual([
            {id: 4, name: 'Product 4', brand: 'Brand 3', price: 300},
            {id: 5, name: 'Product 5', brand: 'Brand 3', price: 300}
        ]);
        expect(partitions[1]).toEqual([
            {id: 1, name: 'Product 1', brand: 'Brand 1', price: 100},
            {id: 2, name: 'Product 2', brand: 'Brand 1', price: '200'},
            {id: 3, name: 'Product 3', brand: 'Brand 2', price: 200}
        ]);
        expect(collection.all()).toEqual(dataset.products);
    })
});

describe('#pipe()', () => {
    it('should pass the collection to the given callback and returns the result', () => {
        const collection = new Collection(dataset.numbers);

        expect(collection.pipe((col) => col.sum())).toEqual(55);
        expect(collection.all()).toEqual(dataset.numbers);
    });
});

describe('#pluck()', () => {
    it('should retrieve all of the collection values for a given key', () => {
        const collection = new Collection(dataset.products);

        expect(collection).toBeInstanceOf(Collection);
        expect(collection.pluck('name').all()).toEqual(['Product 1', 'Product 2', 'Product 3', 'Product 4', 'Product 5']);

        expect(collection.pluck('price', 'name').all()).toEqual({
            'Product 1': 100,
            'Product 2': '200',
            'Product 3': 200,
            'Product 4': 300,
            'Product 5': 300
        });

        expect(collection.pluck('name', 'price').all()).toEqual({
            '100': 'Product 1',
            '200': 'Product 3',
            '300': 'Product 5',
        });
    });
});

describe('#pop()', () => {
    it('should remove and returns the last item from the collection #1', () => {
        const collection = new Collection([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

        expect(collection.pop()).toEqual(10);
        expect(collection.all()).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });

    it('should remove and returns the last item from the collection #2', () => {
        const collection = new Collection(dataset.persons);

        expect(collection.pop()).toEqual('Bob');
        expect(collection.all()).toEqual(dataset.persons);
    });
});

describe('#prepend()', () => {
    it('should prepend an item to the beginning of the collection #1', () => {
        let data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const collection = new Collection(data);
        const expected   = [0, ...data];

        expect(collection.prepend(0).all()).toEqual(expected);
        expect(collection.all()).toEqual(expected);
    });

    it('should prepend an item to the beginning of the collection #2', () => {
        const collection = new Collection({first_name: 'John'});
        const expected   = {
            first_name: 'John',
            last_name: 'DOE'
        };

        expect(collection.prepend('DOE', 'last_name').all()).toEqual(expected);
        expect(collection.all()).toEqual(expected);
    });
});

describe('#pull()', () => {
    it('should return the item at a given key and remove it from the collection', () => {
        const data = {
            first_name: 'Joe',
            last_name: 'DOE'
        };

        const first  = new Collection(data);
        const second = new Collection(data);

        expect(first.pull('first_name')).toEqual('Joe');
        expect(first.all()).toEqual({last_name: 'DOE'});

        expect(second.pull('name')).toEqual(null);
        expect(second.all()).toEqual(data);
    });
});

describe('#push()', () => {
    it('should append an item to the end of the collection', () => {
        const data       = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const collection = new Collection(data);
        const expected   = [...data, 4];

        expect(collection.push(4).all()).toEqual(expected);
        expect(collection.all()).toEqual(expected);
    });
});

describe('#put()', () => {
    it('should set the given key and value in the collection', () => {
        const collection = new Collection({foo: 'bar'});
        const expected   = {
            foo: 'bar',
            baz: 'qux'
        };

        expect(collection.put('baz', 'qux').all()).toEqual(expected);
        expect(collection.all()).toEqual(expected);
    });
});

describe('#random()', () => {
    it('should return a random item from the collection #1', () => {
        const collection = new Collection([1, 2, 3, 4, 5]);
        const random = collection.random();

        expect(random).toBeGreaterThanOrEqual(1);
        expect(random).toBeLessThanOrEqual(5);
        expect(collection.count()).toEqual(5);
    });

    it('should return a random item from the collection #2', () => {
        const random = new Collection([1, 2, 3, 4, 5]).random(3);

        expect(random).toBeInstanceOf(Collection);
        expect(random.count()).toEqual(3);

        for (let index of [0, 1, 2]) {
            expect(random.all()[index]).toBeGreaterThanOrEqual(1);
            expect(random.all()[index]).toBeLessThanOrEqual(5);
        }

        expect(random.all()[3]).toBeUndefined();
    });

    it('should return a random item from the collection #3', () => {
        const collection = new Collection([1, 2, 3, 4, 5, 8, 6]);

        collection.random();

        expect(collection.all()).toEqual([1, 2, 3, 4, 5, 8, 6]);
    });
});

describe('#reduce()', () => {
    it('should reduce the collection to a single value #1', () => {
        const collection = new Collection([1, 2, 3, 4, 5, 6, 7]);

        expect(collection.reduce((carry, item) => carry + item)).toEqual(28);

        expect(collection.reduce((carry, item) => carry + item, 4)).toEqual(32);
        expect(collection.all()).toEqual([1, 2, 3, 4, 5, 6, 7]);
    });

    it('should reduce the collection to a single value #2', () => {
        const data = [
            {name: 'Product 1', price: 12},
            {name: 'Product 2', price: 24},
            {name: 'Product 3', price: 36},
        ];
        const collection = new Collection(data);

        expect(collection.reduce((carry, product) => carry + product.price)).toEqual(72);
        expect(collection.reduce((carry, item) => carry + item.price, 8)).toEqual(80);
        expect(collection.reduce((carry, item, key) => key > 0 ? carry + item.price : carry)).toEqual(60);

        expect(collection.all()).toEqual(data);
    });
});

describe('#reject()', () => {
    it('should filter the collection using the given callback #1', () => {
        const collection = new Collection([1, 2, 3, 4]);

        expect(collection.reject((value) => value > 2).all()).toEqual([1, 2]);

        expect(collection.all()).toEqual([1, 2, 3, 4]);
    });

    it('should filter the collection using the given callback #2', () => {
        const collection = new Collection(dataset.products);

        expect(collection.reject((product) => product.price <= 200).all()).toEqual([
            { id: 4, name: 'Product 4', brand: 'Brand 3', price: 300 },
            { id: 5, name: 'Product 5', brand: 'Brand 3', price: 300 }
        ]);

        expect(collection.all()).toEqual(dataset.products);
    });
});

describe('#reverse()', () => {
    it('should reverse the order of the collection items', () => {
        const collection = new Collection([1, 2, 3, 4, 5]);

        expect(collection.reverse().all()).toEqual([5, 4, 3, 2, 1]);
        expect(collection.all()).toEqual([1, 2, 3, 4, 5]);
    });
});

describe('#search()', () => {
    it('should search the collection for the given value and returns its key if found #1', () => {
        const collection = new Collection([2, 4, 6, 8]);

        expect(collection.search(4)).toEqual(1);

        expect(collection.all()).toEqual([2, 4, 6, 8]);
    });

    it('should search the collection for the given value and returns its key if found #2', () => {
        const collection = new Collection([.2, .4, .6, .8]);

        expect(collection.search(.2)).toEqual(0);
        expect(collection.search(.4)).toEqual(1);
        expect(collection.search(.6)).toEqual(2);
        expect(collection.search(.8)).toEqual(3);

        expect(collection.search(.1)).toBeFalsy();
    });

    it('should search the collection for the given value and returns its key if found #3', () => {
        const collection = new Collection([2, 4, 6, 8]);

        // Strict comparison
        expect(collection.search('4')).toEqual(1);
        expect(collection.search('4', true)).toBeFalsy();
    });

    it('should search the collection for the given value and returns its key if found #4', () => {
        const collection = new Collection([2, 4, 6, 8]);

        // With truth test
        expect(collection.search((item) => item > 5)).toEqual(2);
    })
});

describe('#shift()', () => {
    it('should return the first item and remove it from the collection', () => {
        const collection = new Collection([1, 2, 3, 4, 5]);

        expect(collection.shift()).toEqual(1);
        expect(collection.all()).toEqual([2, 3, 4, 5]);
    });
});

describe('#shuffle()', () => {
    it('should shuffle the items in the collection', () => {
        const collection = new Collection([1, 2, 3, 4, 5]);
        const shuffled = collection.shuffle();

        for (let index of [0, 1, 2, 3, 4]) {
            expect(shuffled.all()[index]).toBeGreaterThanOrEqual(1);
            expect(shuffled.all()[index]).toBeLessThanOrEqual(5);
        }

        expect(shuffled.count()).toEqual(5);
        expect(collection.count()).toEqual(5);
    });
});

describe('#slice()', () => {
    it('should return a slice of the collection starting at the given index #1', () => {
        const collection = new Collection([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

        expect(collection.slice(4).all()).toEqual([5, 6, 7, 8, 9, 10]);

        expect(collection.all()).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    });

    it('should return a slice of the collection starting at the given index #2', () => {
        const collection = new Collection([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

        expect(collection.slice(4, 2).all()).toEqual([5, 6]);

        expect(collection.all()).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    });
});

describe('#sort()', () => {
    it('should sort the collection #1', () => {
        const collection = new Collection([5, 3, 1, 2, 10, 4]);

        expect(collection.sort().all()).toEqual([1, 2, 3, 4, 5, 10]);
        expect(collection.all()).toEqual([5, 3, 1, 2, 10, 4]);
    });

    it('should sort the collection #2', () => {
        const collection = new Collection([5, 3, 1, 2, 4]);

        expect(collection.sort((a, b) => b - a).all()).toEqual([5, 4, 3, 2, 1]);
        expect(collection.all()).toEqual([5, 3, 1, 2, 4]);
    });
});

describe('#sortBy()', () => {
    it('should sort the collection by the given key', () => {
        const collection = new Collection([
            { 'name': 'Desk', 'price': 200 },
            { 'name': 'Chair', 'price': 100 },
            { 'name': 'Bookcase', 'price': 150 },
        ]);

        expect(collection.sortBy('price').all()).toEqual([
            { 'name': 'Chair', 'price': 100 },
            { 'name': 'Bookcase', 'price': 150 },
            { 'name': 'Desk', 'price': 200 },
        ]);

        expect(collection.all()).toEqual([
            { 'name': 'Desk', 'price': 200 },
            { 'name': 'Chair', 'price': 100 },
            { 'name': 'Bookcase', 'price': 150 },
        ]);
    });

    it('should sort the collection by the given key #2', () => {
        const collection = new Collection([
            { 'name': 'Desk', 'colors': ['Black', 'Mahogany'] },
            { 'name': 'Chair', 'colors': ['Black'] },
            { 'name': 'Bookcase', 'colors': ['Red', 'Beige', 'Brown'] },
        ]);

        expect(collection.sortBy((product) => product['colors'].length).all()).toEqual([
            { 'name': 'Chair', 'colors': ['Black'] },
            { 'name': 'Desk', 'colors': ['Black', 'Mahogany'] },
            { 'name': 'Bookcase', 'colors': ['Red', 'Beige', 'Brown'] },
        ]);

        expect(collection.all()).toEqual([
            { 'name': 'Desk', 'colors': ['Black', 'Mahogany'] },
            { 'name': 'Chair', 'colors': ['Black'] },
            { 'name': 'Bookcase', 'colors': ['Red', 'Beige', 'Brown'] },
        ]);
    });
});

describe('#sortByDesc()', () => {
    it('should reverse sort the collection by the given key #1', () => {
        const collection = new Collection([
            { 'name': 'Desk', 'price': 200 },
            { 'name': 'Chair', 'price': 100 },
            { 'name': 'Bookcase', 'price': 150 },
        ]);

        expect(collection.sortByDesc('price').all()).toEqual([
            { 'name': 'Desk', 'price': 200 },
            { 'name': 'Bookcase', 'price': 150 },
            { 'name': 'Chair', 'price': 100 },
        ]);
    });

    it('should reverse sort the collection by the given key #2', () => {
        const collection = new Collection([
            { 'name': 'Bookcase', 'colors': ['Red', 'Beige', 'Brown'] },
            { 'name': 'Chair', 'colors': ['Black'] },
            { 'name': 'Desk', 'colors': ['Black', 'Mahogany'] },
        ]);

        expect(collection.sortByDesc((product, key) => product['colors'].length).all()).toEqual([
            { 'name': 'Bookcase', 'colors': ['Red', 'Beige', 'Brown'] },
            { 'name': 'Desk', 'colors': ['Black', 'Mahogany'] },
            { 'name': 'Chair', 'colors': ['Black'] },
        ]);

        expect(collection.all()).toEqual([
            { 'name': 'Bookcase', 'colors': ['Red', 'Beige', 'Brown'] },
            { 'name': 'Chair', 'colors': ['Black'] },
            { 'name': 'Desk', 'colors': ['Black', 'Mahogany'] },
        ]);
    });
});

describe('#splice()', () => {
    it('should remove and returns a slice of items starting at the specified index #1', () => {
        const collection = new Collection([1, 2, 3, 4, 5]);

        expect(collection.splice(2).all()).toEqual([3, 4, 5]);

        expect(collection.all()).toEqual([1, 2]);
    });

    it('should remove and returns a slice of items starting at the specified index #2', () => {
        const collection = new Collection([1, 2, 3, 4, 5]);

        expect(collection.splice(2, 1).all()).toEqual([3]);

        expect(collection.all()).toEqual([1, 2, 4, 5]);
    });

    it('should remove and returns a slice of items starting at the specified index #3', () => {
        const collection = new Collection([1, 2, 3, 4, 5]);

        expect(collection.splice(2, 1, [10, 11]).all()).toEqual([3]);

        expect(collection.all()).toEqual([1, 2, 10, 11, 4, 5]);
    });
});

describe('#split()', () => {
    it('should split a collection into the given number of groups', () => {
        const collection = new Collection([1, 2, 3, 4, 5]);

        expect(collection.split(1).all()).toEqual([[1, 2, 3, 4, 5]]);
        expect(collection.split(2).all()).toEqual([[1, 2, 3], [4, 5]]);
        expect(collection.split(3).all()).toEqual([[1, 2], [3, 4], [5]]);

        expect(collection.split(4).all()).toEqual([[1], [2], [3], [4], [5]]);
        expect(collection.split(5).all()).toEqual([[1], [2], [3], [4], [5]]);
        expect(collection.split(6).all()).toEqual([[1], [2], [3], [4], [5]]);

        expect(collection.all()).toEqual([1, 2, 3, 4, 5]);
    });
});

describe('#sum()', () => {
    it('can calculate the sum: array of items', () => {
        const collection = new Collection([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

        expect(collection).toBeInstanceOf(Collection);
        expect(collection.sum()).toEqual(55);
    });

    it('can calculate the sum: object of items', () => {
        const collection = new Collection([
            {'name': 'Product 1', 'price': 10},
            {'name': 'Product 2', 'price': 20},
            {'name': 'Product 3', 'price': 30},
        ]);

        expect(collection).toBeInstanceOf(Collection);
        expect(collection.sum('price')).toEqual(60);
    });
});

describe('#take()', () => {
    it('should return a new collection with the specified number of items #1', () => {
        const collection = new Collection([0, 1, 2, 3, 4, 5]);

        expect(collection.take(3).all()).toEqual([0, 1, 2]);
        expect(collection.all()).toEqual([0, 1, 2, 3, 4, 5]);
    });

    it('should return a new collection with the specified number of items #2', () => {
        const collection = new Collection([0, 1, 2, 3, 4, 5]);

        expect(collection.take(-2).all()).toEqual([4, 5]);
        expect(collection.all()).toEqual([0, 1, 2, 3, 4, 5]);
    });
});

describe('#tap()', () => {
    it('should passes the collection to the given callback', () => {
        let tapped = null;

        const number = new Collection([2, 4, 3, 1, 5])
            .sort()
            .tap((collection) => {
                tapped = collection.all();
            })
            .shift();

        expect(tapped).toEqual([2, 3, 4, 5]);
        expect(number).toEqual(1);
    });
});

describe('#toArray()', () => {
    it('should convert the collection to array', () => {
        // With array
        const arrayCol = new Collection([1, 2, 3, 'b', 'c', 'ø']);

        expect(arrayCol).toBeInstanceOf(Collection);
        expect(arrayCol.toArray()).toEqual([1, 2, 3, 'b', 'c', 'ø']);

        // With object
        const objectCol = new Collection({
            name: 'Service 1',
            features: [
                'Feature 1',
                'Feature 2',
                'Feature 3'
            ]
        });

        expect(objectCol).toBeInstanceOf(Collection);
        expect(objectCol.toArray()).toEqual(['Service 1', ['Feature 1', 'Feature 2', 'Feature 3']]);
    });
});

describe('#toJson()', () => {
    it('should convert the collection to array', () => {
        const collection = new Collection({
            id: 1,
            name: 'Product 1',
            price: 20.5
        });

        expect(collection).toBeInstanceOf(Collection);
        expect(collection.toJson()).toEqual('{"id":1,"name":"Product 1","price":20.5}');
    });
});

describe('#times()', () => {
    it('should create a new collection with a given amount of times', () => {
        const collection = Collection.make().times(10);

        expect(collection.all()).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    });

    it('should create a new empty collection if the given number is incorrect', () => {
        let expected = [];

        expect(Collection.make().times(true).all()).toEqual(expected);
        expect(Collection.make().times(0).all()).toEqual(expected);
        expect(Collection.make().times(-10).all()).toEqual(expected);
    });

    it('should create a new collection by invoking the callback a given amount of times', () => {
        const collection = Collection.make().times(10, (number) => number * 9);

        expect(collection.all()).toEqual([9, 18, 27, 36, 45, 54, 63, 72, 81, 90]);
    });
});

describe('#transform()', () => {
    it('should iterate over the collection and transform it #1', () => {
        const collection  = new Collection([1, 2, 3, 4, 5]);
        const transformed = collection.transform(item => item * 2);
        const expected    = [2, 4, 6, 8, 10];

        expect(transformed.all()).toEqual(expected);
        expect(collection.all()).toEqual(expected);
    });

    it('should iterate over the collection and transform it #2', () => {
        const collection = new Collection({foo: 1, bar: 2, baz: 3});

        const transformed = collection.transform(item => item * 2);

        const expected = {foo: 2, bar: 4, baz: 6};

        expect(transformed.all()).toEqual(expected);
        expect(collection.all()).toEqual(expected);
    });
});

describe('#union()', () => {
    it('should add the given object to the collection', () => {
        const collection = new Collection({a: 'A', b: 'B'});

        // If the given object contains keys that are already in the collection, the collections values will be preferred
        expect(collection.union({a: 'AAA', c: 'CCC', b: 'BBB'}).all()).toEqual({a: 'A', b: 'B', c: 'CCC'});

        expect(collection.all()).toEqual({a: 'A', b: 'B'});
    });
});

describe('#unique()', () => {
    it('Can filter by uniqueness: array of items', () => {
        expect(new Collection([1, 2, 3, 1, 2, 3]).unique().all()).toEqual([1, 2, 3]);

        expect(new Collection([1, 2, 3, 1, 2, 3, '3']).unique().all()).toEqual([1, 2, 3, '3']);
    });

    it('Can filter by uniqueness: object of items', () => {
        const collection = new Collection(dataset.products);

        expect(collection).toBeInstanceOf(Collection);
        expect(collection.unique('brand').all()).toEqual([
            {'brand': 'Brand 1', 'id': 1, 'name': 'Product 1', 'price': 100},
            {'brand': 'Brand 2', 'id': 3, 'name': 'Product 3', 'price': 200},
            {'brand': 'Brand 3', 'id': 4, 'name': 'Product 4', 'price': 300}
        ]);
        expect(collection.unique('price').all()).toEqual([
            {'brand': 'Brand 1', 'id': 1, 'name': 'Product 1', 'price': 100},
            {'brand': 'Brand 1', 'id': 2, 'name': 'Product 2', 'price': '200'},
            {'brand': 'Brand 2', 'id': 3, 'name': 'Product 3', 'price': 200},
            {'brand': 'Brand 3', 'id': 4, 'name': 'Product 4', 'price': 300}
        ]);
    });

    it('Can filter by uniqueness: callback condition', () => {
        const collection = new Collection(dataset.products);

        expect(collection).toBeInstanceOf(Collection);
        expect(collection.unique((item) => item.price >= 300 ? item.price / 3 : item.price).all()).toEqual([
            {'brand': 'Brand 1', 'id': 1, 'name': 'Product 1', 'price': 100},
            {'brand': 'Brand 1', 'id': 2, 'name': 'Product 2', 'price': '200'},
            {'brand': 'Brand 2', 'id': 3, 'name': 'Product 3', 'price': 200}
        ]);
    });
});

describe('#values()', () => {
    it('should return the object values from the items', () => {
        const data = {'foo': 'bar', 'baz': 'qux', 1: 2, 3: 4};
        const collection = new Collection(data);

        expect(collection).toBeInstanceOf(Collection);
        expect(collection.values().all()).toEqual([2, 4, 'bar', 'qux']);
        expect(collection.all()).toEqual(data); // Assert the the original items doesn't change
    });
});

describe('#when()', () => {
    it('should execute the given callback when the first argument given to the method evaluates to true #1', () => {
        let collection = new Collection([1, 2, 3]);

        collection.when(true, (c) => { c.push(4); });

        expect(collection.all()).toEqual([1, 2, 3, 4]);

        collection = new Collection([1, 2, 3]);

        collection.when(false, (c) => { c.push(4); });

        expect(collection.all()).toEqual([1, 2, 3]);
    });

    it('should execute the given callback when the first argument given to the method evaluates to true #2', () => {
        let collection = new Collection([1, 2, 3]);

        collection.when(true, (c) => { c.push(4); }, (c) => { c.push(5); });

        expect(collection.all()).toEqual([1, 2, 3, 4]);

        collection = new Collection([1, 2, 3]);

        collection.when(false, (c) => { c.push(4); }, (c) => { c.push(5); });

        expect(collection.all()).toEqual([1, 2, 3, 5]);
    });
});

describe('#where()', () => {
    it('should return everything that matches', () => {
        const collection = new Collection(dataset.products);

        let expected = [
            {id: 3, name: 'Product 3', brand: 'Brand 2', price: 200}
        ];

        expect(collection.where('price', 200).all()).toEqual(expected);
        expect(collection.where('price', '===', 200).all()).toEqual(expected);

        expected = [
            {id: 2, name: 'Product 2', brand: 'Brand 1', price: '200'},
            {id: 3, name: 'Product 3', brand: 'Brand 2', price: 200}
        ];

        expect(collection.where('price', '=', 200).all()).toEqual(expected);
        expect(collection.where('price', '==', 200).all()).toEqual(expected);

        expect(collection.all()).toEqual(dataset.products);

        expect(collection.where('price', '!==', 200).all()).toEqual([
            {id: 1, name: 'Product 1', brand: 'Brand 1', price: 100},
            {id: 2, name: 'Product 2', brand: 'Brand 1', price: '200'},
            {id: 4, name: 'Product 4', brand: 'Brand 3', price: 300},
            {id: 5, name: 'Product 5', brand: 'Brand 3', price: 300}
        ]);

        expect(collection.all()).toEqual(dataset.products);

        expected = [
            {id: 1, name: 'Product 1', brand: 'Brand 1', price: 100},
            {id: 4, name: 'Product 4', brand: 'Brand 3', price: 300},
            {id: 5, name: 'Product 5', brand: 'Brand 3', price: 300}
        ];

        expect(collection.where('price', '!=', 200).all()).toEqual(expected);
        expect(collection.where('price', '<>', 200).all()).toEqual(expected);

        expect(collection.where('price', '<', 100).all()).toEqual([]);

        expect(collection.where('price', 100).all()).toEqual([
            {id: 1, name: 'Product 1', brand: 'Brand 1', price: 100}
        ]);

        expect(collection.where('price', '<=', 150).all()).toEqual([
            {id: 1, name: 'Product 1', brand: 'Brand 1', price: 100}
        ]);

        expect(collection.where('price', '>', 100).all()).toEqual([
            {id: 2, name: 'Product 2', brand: 'Brand 1', price: '200'},
            {id: 3, name: 'Product 3', brand: 'Brand 2', price: 200},
            {id: 4, name: 'Product 4', brand: 'Brand 3', price: 300},
            {id: 5, name: 'Product 5', brand: 'Brand 3', price: 300}
        ]);

        expect(collection.where('price', '>=', 150).all()).toEqual([
            {id: 2, name: 'Product 2', brand: 'Brand 1', price: '200'},
            {id: 3, name: 'Product 3', brand: 'Brand 2', price: 200},
            {id: 4, name: 'Product 4', brand: 'Brand 3', price: 300},
            {id: 5, name: 'Product 5', brand: 'Brand 3', price: 300}
        ]);
    });

    it('should strictly filter the collection by a given key / value pair', () => {
        const collection = new Collection([
            { 'product': 'Desk', 'price': 200 },
            { 'product': 'Chair', 'price': 100 },
            { 'product': 'Bookcase', 'price': 150 },
            { 'product': 'Door', 'price': '100' },
        ]);

        const filtered = collection.where('price', 100);

        expect(filtered.all()).toEqual([{ 'product': 'Chair', 'price': 100 }]);

        expect(collection.all()).toEqual([
            { 'product': 'Desk', 'price': 200 },
            { 'product': 'Chair', 'price': 100 },
            { 'product': 'Bookcase', 'price': 150 },
            { 'product': 'Door', 'price': '100' },
        ]);
    });
});

describe('#whereIn()', () => {
    it('should return everything that matches within', () => {
        const collection = new Collection(dataset.products);

        expect(collection.whereIn('id', [1, 3]).all()).toEqual([
            {id: 1, name: 'Product 1', brand: 'Brand 1', price: 100},
            {id: 3, name: 'Product 3', brand: 'Brand 2', price: 200}
        ])

        expect(collection.all()).toEqual(dataset.products);

        expect(collection.whereIn('price', [100, 300]).all()).toEqual([
            {id: 1, name: 'Product 1', brand: 'Brand 1', price: 100},
            {id: 4, name: 'Product 4', brand: 'Brand 3', price: 300},
            {id: 5, name: 'Product 5', brand: 'Brand 3', price: 300}
        ]);

        expect(collection.all()).toEqual(dataset.products);
    });
});

describe('#whereNotIn()', () => {
    it('should filter the collection by a given key / value not contained within the given array', () => {
        const collection = new Collection(dataset.products);

        expect(collection.whereNotIn('price', ['100', 200]).all()).toEqual([
            {id: 1, name: 'Product 1', brand: 'Brand 1', price: 100},
            {id: 2, name: 'Product 2', brand: 'Brand 1', price: '200'},
            {id: 4, name: 'Product 4', brand: 'Brand 3', price: 300},
            {id: 5, name: 'Product 5', brand: 'Brand 3', price: 300}
        ]);

        expect(collection.all()).toEqual(dataset.products);
    });
});

describe('#zip()', () => {
    it('should merge together the values of the given array with the values of the collection at the corresponding index', () => {
        const collection = new Collection(['Chair', 'Desk']);

        expect(collection.zip([100, 200]).all()).toEqual([['Chair', 100], ['Desk', 200]]);

        expect(collection.all()).toEqual(['Chair', 'Desk']);
    });
});

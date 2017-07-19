import CollectionInterface from './CollectionInterface';
import * as _ from 'lodash';
import {type} from "os";

class Collection implements CollectionInterface
{
    // Properties
    //----------------------------------

    /**
     * The collection items.
     * 
     * @type {any}
     */
    protected items: any;

    // Constructor
    //----------------------------------

    /**
     * Collection Constructor.
     * 
     * @param  {any}  items 
     */
    constructor(items: any = []) {
        this.items = items;
    }

    // Main Methods
    //----------------------------------

    /**
     * Get all of the items in the collection.
     * 
     * @return {any}
     */
    all(): any {
        return this.items;
    }

    /**
     * Alias for the "avg" method.
     *
     * @param  {any}  key
     *
     * @return {number}
     */
    average(key?: any): number {
        return this.avg(key);
    }

    /**
     * Get the average value of a given key.
     *
     * @param  {any}  key
     *
     * @return {number}
     */
    avg(key?: any): number {
        let count = this.count();

        return count !== 0 ? this.sum(key) / count : null;
    }

    /**
     * Chunk the underlying collection array.
     *
     * @param  {number}  size
     *
     * @return {Collection}
     */
    chunk(size: number): Collection {
        return Collection.make(
            _.chunk(this.values().all(), size)
        );
    }

    /**
     * Collapse the collection of items into a single array.
     *
     * @return {Collection}
     */
    collapse(): Collection {
        return Collection.make(
            [].concat(...this.items)
        );
    }

    /**
     * Create a collection by using this collection for keys and another for its values.
     *
     * @param  {any}  items
     *
     * @return {Collection}
     */
    combine(items: any): Collection {
        items = items instanceof Collection ? items.values().toArray() : items;

        return Collection.make(
            _.zipObject(this.items, items)
        );
    }

    /**
     * Push all of the given items onto the collection.
     *
     * @param  {Array|Object} items
     *
     * @return {Collection}
     */
    concat(items: any): Collection {
        let list = [];

        if (items instanceof Collection) {
            list = items.toArray();
        }
        else if (typeof items === 'object') {
            _.forEach(items, function(value) {
                list.push(value);
            });
        }

        return Collection.make(
            _.concat(this.items, list)
        );
    }

    /**
     * Check the collection contains an item.
     *
     * @param  {any}  key
     * @param  {any}  value
     *
     * @return {boolean}
     */
    contains(key: any, value?: any): boolean {
        if (value !== undefined)
            return this.items[key] !== undefined && this.items[key] === value;

        if (typeof key === 'function')
            return (this.items.filter((item, index) => key(item, index)).length > 0);

        if (this.isArray())
            return this.items.indexOf(key) !== -1;

        return this.items[key] !== undefined;
    }

    /**
     * Count the number of items in the collection.
     *
     * @return {number}
     */
    count(): number {
        return this.isArray() ? this.items.length : Object.keys(this.items).length;
    }

    /**
     * Get the items in the collection that are not present in the given items.
     *
     * @param  {any}  values
     *
     * @return {Collection}
     */
    diff(values: any): Collection {
        return Collection.make(
            _.difference(this.items, (values instanceof Collection) ? values.toArray() : values)
        );
    }

    /**
     * Get the items in the collection whose keys are not present in the given items.
     *
     * @param  {any}  object
     *
     * @return {Collection}
     */
    diffKeys(object: any): Collection {
        const objectKeys = (object instanceof Collection) ? object.keys().toArray() : Object.keys(object);

        return Collection.make(this.items).only(
            this.keys().toArray().filter(item => objectKeys.indexOf(item) === -1)
        );
    }

    /**
     * Execute a callback over each item.
     *
     * @param  {item}  callback
     *
     * @return {Collection}
     */
    each(callback: any): Collection {
        _.forEach(this.items, (value, key) => {
            callback(value, key, this.items);
        });

        return this;
    }

    /**
     * Determine if all items in the collection pass the given test.
     *
     * @param  {any}  callback
     *
     * @return boolean
     */
    every(callback: any): boolean {
        return _.every(this.items, callback);
    }

    /**
     * Get all items except for those with the specified keys.
     *
     * @param  {any}  properties
     *
     * @return {Collection}
     */
    except(properties: any): Collection {
        const collection = {};

        this.each((value, key) => {
            if (properties.indexOf(key) === -1)
                collection[key] = value;
        });

        return Collection.make(collection);
    }

    /**
     * Run a filter over each of the items.
     *
     * @param  {any}  callback
     *
     * @return {Collection}
     */
    filter(callback?: any): Collection {
        return Collection.make(
            _.filter(this.items, callback || function (item) {
                    if (item === undefined || item === null)
                        return false;

                    if (_.isArray(item))
                        return item.length > 0;

                    if (typeof item === 'object')
                        return Object.keys(item).length;

                    return item;
                })
        );
    }

    /**
     * Get the first item from the collection.
     *
     * @param {function} callback
     *
     * @return {any}
     */
    first(callback?: any): any {
        let keys = Object.keys(this.items);

        if (typeof callback === 'function') {
            for (let key of keys) {
                if (callback(this.items[key], key)) {
                    return this.items[key];
                }
            }
        }

        return this.items[keys[0]];
    }

    /**
     * Map a collection and flatten the result by a single level.
     *
     * @param  {any}  callback
     *
     * @return {Collection}
     */
    flatMap(callback: any): Collection {
        const values = [];

        Object.keys(this.items).forEach((property) => {
            values.push(this.items[property]);
        });

        const newValues  = callback(values);
        const collection = {};

        Object.keys(this.items).forEach((value, index) => {
            collection[value] = newValues[index];
        });

        return Collection.make(collection);
    };

    /**
     * Get a flattened array of the items in the collection.
     *
     * @param  {number}  depth
     *
     * @return {Collection}
     */
    flatten(depth?: number): Collection {
        let collection = [];
        let flattenDepth = depth || Infinity;
        let fullyFlattened = false;

        const flat = items => {
            collection = [];

            if (_.isArray(items)) {
                items.forEach((item) => {
                    if (typeof item === 'string') {
                        collection.push(item);
                    }
                    else if (_.isArray(item)) {
                        collection = collection.concat(item);
                    }
                    else {
                        Object.keys(item).forEach((property) => {
                            collection = collection.concat(item[property]);
                        });
                    }
                });
            }
            else {
                Object.keys(items).forEach((property) => {
                    if (typeof items[property] === 'string') {
                        collection.push(items[property]);
                    }
                    else if (_.isArray(items[property])) {
                        collection = collection.concat(items[property]);
                    }
                    else {
                        Object.keys(items).forEach((prop) => {
                            collection = collection.concat(items[prop]);
                        });
                    }
                });
            }

            fullyFlattened = collection.filter(item => typeof item === 'object').length === 0;
            flattenDepth -= 1;
        };

        flat(this.items);

        while ( ! fullyFlattened && flattenDepth > 0) {
            flat(collection);
        }

        return Collection.make(collection);
    }

    /**
     * Flip the items in the collection.
     *
     * @return {Collection}
     */
    flip(): Collection {
        const collection = {};

        this.each((value, key) => {
            collection[value] = key;
        });

        return Collection.make(collection);
    }

    /**
     * "Paginate" the collection by slicing it into a smaller collection.
     *
     * @param  {number}  page
     * @param  {number}  perPage
     *
     * @return {Collection}
     */
    forPage(page, perPage): Collection {
        return Collection.make(
            this.items.slice((page * perPage) - perPage, page * perPage)
        );
    }

    /**
     * Remove an item from the collection by key.
     *
     * @param  {any}  key
     *
     * @return {Collection}
     */
    forget(key): Collection {
        delete this.items[key];

        return this;
    }

    /**
     * Get an item from the collection by key.
     *
     * @param  {any}  key
     * @param  {any}  defaultValue
     *
     * @return {any}
     */
    get(key, defaultValue:any = null): any {
        if (this.has(key))
            return this.items[key];

        return typeof defaultValue === 'function' ? defaultValue() : defaultValue;
    }

    /**
     * Group an associative array by a field or using a callback.
     *
     * @param  {any}  key
     *
     * @return {Collection}
     */
    groupBy(key: any): Collection {
        const collection = {};

        this.each((item, index) => {
            let resolvedKey;

            resolvedKey = typeof key === 'function' ? key(item, index) : item[key];

            if (collection[resolvedKey] === undefined)
                collection[resolvedKey] = [];

            collection[resolvedKey].push(item);
        });

        return Collection.make(collection);
    }

    /**
     * Determine if an item exists in the collection by key.
     *
     * @param  {any}  key
     *
     * @return {boolean}
     */
    has(...keys): boolean {
        for (let key of keys) {
            if (this.items[key] === undefined)
                return false;
        }

        return true;
    }

    /**
     * Concatenate values of a given key as a string.
     *
     * @param  {any}  key
     * @param  {any}  glue
     *
     * @return {Collection}
     */
    implode(key: any, glue?: any): Collection {
        return glue === undefined
            ? this.items.join(key)
            : this.pluck(key).all().join(glue);
    }

    /**
     * Intersect the collection with the given items.
     *
     * @param  {any}  values
     *
     * @return {Collection}
     */
    intersect(values: any): Collection {
        let intersectValues = values;

        if (values instanceof Collection)
            intersectValues = values.all();

        return this.filter(item => intersectValues.indexOf(item) !== -1);
    }

    /**
     * Determine if the collection is empty or not.
     *
     * @return {boolean}
     */
    isEmpty(): boolean {
        return this.count() === 0;
    }

    /**
     * Determine if the collection is not empty.
     *
     * @return {boolean}
     */
    isNotEmpty(): boolean {
        return ! this.isEmpty();
    }

    /**
     * Key an associative array by a field or using a callback.
     *
     * @param  {any}  key
     *
     * @return {Collection}
     */
    keyBy(key: any): Collection {
        const collection = {};

        this.each(item => {
            collection[typeof key === 'function' ? key(item) : item[key]] = item;
        });

        return Collection.make(collection);
    }

    /**
     * Get the keys of the collection items.
     *
     * @return {Collection}
     */
    keys(): Collection {
        return new Collection(
            this.isArray() ? [...this.items.keys()] : Object.keys(this.items)
        );
    }

    /**
     * Get the last item from the collection.
     *
     * @param  {any}  callback
     *
     * @return {any}
     */
    last(callback?: any): any {
        let items = (typeof callback === 'function') ? this.filter(callback) : this;

        return items.isArray()
            ? _.last(items.toArray())
            : items.only([items.keys().last()]).all();
    }

    /**
     * Register a macro.
     *
     * @param  {string}  name
     * @param  {any}     callback
     */
    static macro(name, callback): void {
        Collection.prototype[name] = callback;
    }

    /**
     * Create a new collection instance if the value isn't one already.
     *
     * @param  {any}  items
     *
     * @return {Collection}
     */
    static make(items?: any) : Collection {
        return new Collection(items);
    }

    /**
     * Run a map over each of the items.
     *
     * @param  {any}  callback
     *
     * @return {Collection}
     */
    map(callback: any): Collection {
        let items = {};

        if (this.isArray())
            items = this.items.map(callback);
        else
            this.each((value, key) => {
                items[key] = callback(value, key);
            });

        return Collection.make(items);
    }

    /**
     * Run an associative map over each of the items.
     *
     * @param  {any}  callback
     *
     * @return {Collection}
     */
    mapWithKeys(callback: any): Collection {
        const collection = {};

        if (_.isArray(this.items)) {
            this.items.forEach((item) => {
                const [keyed, value] = callback(item);
                collection[keyed] = value;
            });
        } else {
            Object.keys(this.items).forEach((key) => {
                const [keyed, value] = callback(this.items[key]);
                collection[keyed] = value;
            });
        }

        return Collection.make(collection);
    }

    /**
     * Get the max value of a given key.
     *
     * @param  {any}  key
     *
     * @return {number}
     */
    max(key?: any): number {
        return typeof key === 'string'
            ? Math.max(...this.pluck(key).all())
            : Math.max(...this.items);
    }

    /**
     * Get the median of a given key.
     *
     * @param  {any}  key
     *
     * @return {number}
     */
    median(key?: any): number {
        const count = this.count();

        if (count == 0)
            return null;

        const values = (key !== undefined ? this.pluck(key) : this).sort().values();
        const middle = count / 2;

        if (count % 2 !== 0)
            return values.get(Math.floor(middle));

        return Collection.make([values.get(middle - 1), values.get(middle)]).average();
    }

    /**
     * Merge the collection with the given items.
     *
     * @param  {any}  obj
     *
     * @return {Collection}
     */
    merge(toMerge: any): Collection {
        return Collection.make(
            _.isArray(toMerge)
                ? this.items.concat(toMerge)
                : Object.assign({}, this.items, toMerge)
        );
    }

    /**
     * Get the min value of a given key.
     *
     * @param  {any}  key
     *
     * @return {number}
     */
    min(key?: any): number {
        return key !== undefined
            ? Math.min(...this.pluck(key).all())
            : Math.min(...this.items);
    }

    /**
     * Get the mode of a given key.
     *
     * @param  {any}  key
     *
     * @return {any}
     */
    mode(key?: any): any {
        // const collection = key !== undefined ? this.pluck(key) : this;
        // let counts       = {};
        //
        // collection.each((value) => {
        //     counts[value] = (counts[value] !== undefined ? counts[value] + 1 : 1);
        // });
        //
        // console.log()
        //
        // const sorted       = Collection.make(Object.keys(counts).sort((a, b) => counts[a] - counts[b]));
        // const highestValue = sorted.last();
        //
        // return sorted.filter((value) => value == highestValue).sort().all();



        const values = [];
        let highestCount = 1;

        if (this.isEmpty())
            return null;

        this.each((item) => {
            const tempValues = values.filter(
                (value) => key === undefined ? value.key === item : value.key === item[key]
            );

            if ( ! tempValues.length) {
                values.push(
                    key === undefined ? {key: item, count: 1} : {key: item[key], count: 1}
                );
            }
            else {
                tempValues[0].count += 1;
                const count = tempValues[0].count;

                if (count > highestCount)
                    highestCount = count;
            }
        });

        return values.filter(value => value.count === highestCount).map(value => value.key);
    }

    /**
     * Create a new collection consisting of every n-th element.
     *
     * @param  {number}  n
     * @param  {number}  offset
     *
     * @return {Collection}
     */
    nth(n, offset?: number): Collection {
        return Collection.make(
            this.toArray()
                .slice(offset || 0)
                .filter((item, index) => index % n === 0)
        );
    }

    /**
     * Get only item with the given properties.
     *
     * @param  {any}  properties
     *
     * @return {Collection}
     */
    only(properties: any): Collection {
        const collection = {};

        this.each((value, key) => {
            if (properties.indexOf(key) !== -1)
                collection[key] = value;
        });

        return Collection.make(collection);
    }

    /**
     * Partition the collection into two arrays using the given callback or key.
     *
     * @param  {any}  callback
     *
     * @return {Array[]}
     */
    partition(callback: any): any {
        const arrays = [[], []];

        this.each((item, key) => {
            arrays[callback(item, key) === true ? 0 : 1].push(item);
        });

        return arrays;
    }

    /**
     * Pass the collection to the given callback and return the result.
     *
     * @param  {any}  callback
     *
     * @return {any}
     */
    pipe(callback: any): any {
        return callback(this);
    }

    /**
     * Get the values of a given key.
     *
     * @param  {string}   value
     * @param  {string?}  key
     *
     * @return {array}
     */
    pluck(value: string, key?: string): Collection {
        const items = this.filter(item => item[value] !== undefined).toArray();

        return Collection.make(
            key === undefined
                ? _.values(_.mapValues(items, value)) // Only values
                : _.mapValues(_.mapKeys(items, (item, index) => item[key]), value) // Key => Value pair
        );
    }

    /**
     * Get and remove the last item from the collection.
     *
     * @return {any}
     */
    pop(): any {
        return this.toArray().pop();
    }

    /**
     * Push an item onto the beginning of the collection.
     *
     * @param  {any}  value
     * @param  {any}  key
     *
     * @return {Collection}
     */
    prepend(value: any, key?: any): Collection {
        if (key === undefined) {
            this.items = [value, ...this.items];

            return this;
        }

        return this.put(key, value);
    }

    /**
     * Get and remove an item from the collection.
     *
     * @param  {any}  key
     *
     * @return {any}
     */
    pull(key: any): any {
        const value = this.items[key] || null;

        this.forget(key);

        return value;
    }

    /**
     * Push an item onto the end of the collection.
     *
     * @param  {any}  item
     *
     * @return {Collection}
     */
    push(item: any): Collection {
        this.items.push(item);

        return this;
    }

    /**
     * Put an item in the collection by key.
     *
     * @param  {any}  key
     * @param  {any}  value
     *
     * @return {Collection}
     */
    put(key: any, value: any): Collection {
        this.items[key] = value;

        return this;
    }

    /**
     * Get one or more items randomly from the collection.
     *
     * @param  {any}  length
     *
     * @return {any}
     */
    random(length?: any): any {
        const randomLength     = length || 1;
        const randomCollection = this.slice().shuffle().take(randomLength);

        return randomLength === 1
            ? randomCollection.first()
            : randomCollection;
    }

    /**
     * Reduce the collection to a single value.
     *
     * @param  {any}  callback
     * @param  {any}  carry
     *
     * @return {any}
     */
    reduce(callback: any, carry?: any): any {
        let result = null;
        let reduceCarry = carry || null;

        this.each((item, key) => {
            result      = callback(reduceCarry, item, key);
            reduceCarry = result;
        });

        return result;
    }

    /**
     * Create a collection of all elements that do not pass a given truth test.
     *
     * @param  {any}  callback
     *
     * @return {Collection}
     */
    reject(callback: any): Collection {
        return this.filter((item, key) => ! callback(item, key));
    }

    /**
     * Reverse items order.
     *
     * @return {Collection}
     */
    reverse(): Collection {
        return Collection.make(
            [].concat(this.items).reverse()
        );
    }

    /**
     * Search the collection for a given value and return the corresponding key if successful.
     *
     * @param  {any}      condition
     * @param  {boolean}  strict
     *
     * @return {any}
     */
    search(condition: any, strict: boolean = false): any {
        let value = typeof condition === 'function'
            ? this.items.filter((value, key) => condition(value, key))[0]
            : condition;

        const itemKey = this.first((item) => {
            return strict === true
                ? item === value
                : (item === Number(value) || item === value.toString());
        });

        const index = this.items.indexOf(itemKey);

        return index === -1 ? false : index;
    }

    /**
     * Get and remove the first item from the collection.
     *
     * @return {any}
     */
    shift(): any {
        return this.toArray().shift();
    }

    /**
     * Shuffle the items in the collection.
     *
     * @return {Collection}
     */
    shuffle(): Collection {
        this.items = _.shuffle(this.items);

        return this;
    }

    /**
     * Slice the underlying collection array.
     *
     * @param  {any}  remove
     * @param  {any}  limit
     *
     * @return {Collection}
     */
    slice(remove?: any, limit?: any): Collection {
        let collection = this.items.slice(remove);

        return Collection.make(
            limit === undefined ? collection : collection.slice(0, limit)
        );
    }

    /**
     * Sort through each item with a callback.
     *
     * @param  {any}  callback
     *
     * @return {Collection}
     */
    sort(callback?: any): Collection {
        const collection = [].concat(this.items);

        collection.sort(callback || ((a, b) => a - b))

        return Collection.make(collection);
    }

    /**
     * Sort the collection using the given callback.
     *
     * @param  any  callback
     *
     * @return {Collection}
     */
    sortBy(callback: any): Collection {
        const collection = [].concat(this.items);
        const condition  = typeof callback === 'function'
            ? (a, b) => {
                if (callback(a) < callback(b)) return -1;
                if (callback(a) > callback(b)) return 1;
                return 0;
            }
            : (a, b) => {
                if (a[callback] < b[callback]) return -1;
                if (a[callback] > b[callback]) return 1;
                return 0;
            };

        return Collection.make(
            collection.sort(condition)
        );
    }

    /**
     * Sort the collection in descending order using the given callback.
     *
     * @param  {any}  callback
     *
     * @return {Collection}
     */
    sortByDesc(callback: any): Collection {
        return this.sortBy(callback).reverse();
    }

    /**
     * Splice a portion of the underlying collection array.
     *
     * @param  {number}  index
     * @param  {any}     limit
     * @param  {any}     replace
     *
     * @return {Collection}
     */
    splice(index: number, limit: any, replace: any): Collection {
        const slicedCollection = this.slice(index, limit);

        this.items = this.diff(slicedCollection.all()).all();

        if (Array.isArray(replace)) {
            for (let iterator = 0, length = replace.length;
                 iterator < length; iterator += 1) {
                this.items.splice(index + iterator, 0, replace[iterator]);
            }
        }

        return slicedCollection;
    }

    /**
     * Split a collection into a certain number of groups.
     *
     * @param  {number}  numberOfGroups
     *
     * @return {Collection}
     */
    split(numberOfGroups: number): Collection {
        return this.chunk(Math.round(this.count() / numberOfGroups));
    }

    /**
     * Get the sum of the given values.
     *
     * @param  {any}  key
     *
     * @return {number}
     */
    sum(key?: any): number {
        return key === undefined && this.isArray()
            ? _.sum(this.items)
            : this.reduce((carry, item) => carry + item[key]);
    }

    /**
     * Take the first or last {limit} items.
     *
     * @param  {number}  length
     *
     * @return {Collection}
     */
    take(limit: number): Collection {
        return Collection.make(
            limit < 0 ? this.items.slice(limit) : this.items.slice(0, limit)
        );
    }

    /**
     * Pass the collection to the given callback and then return it.
     *
     * @param  {any}  callback
     *
     * @return {Collection}
     */
    tap(callback): Collection {
        callback(this);

        return this;
    }

    /**
     * Create a new collection by invoking the callback a given amount of times.
     *
     * @param  {number}  n
     * @param  {any}     callback
     *
     * @return {Collection}
     */
    times(n: number, callback?: any): Collection {
        if (typeof n !== 'number' || n < 1)
            return new Collection;

        const collection = new Collection([...Array(n).keys()].map(n => n + 1));

        return typeof callback === 'function' ? collection.map(callback) : collection;
    }

    /**
     * Convert the collection items to array.
     *
     * @return {any[]}
     */
    toArray(): any[] {
        return this.isArray() ? this.all() : this.values().all();
    }

    /**
     * Convert the collection items to json.
     *
     * @return {string}
     */
    toJson(): string {
        return JSON.stringify(this.items);
    }

    /**
     * Transform each item in the collection using a callback.
     *
     * @param  {any}  callback
     *
     * @return {Collection}
     */
    transform(callback: any): Collection {
        this.items = this.map(callback).all();

        return this;
    }

    /**
     * Union the collection with the given items.
     *
     * @param  {any}  object
     *
     * @return {Collection}
     */
    union(object: any): Collection {
        let items = this.isArray() ? Object.assign({}, this.items) : this.items;

        return Collection.make(
            Object.assign(object, items)
        );
    }

    /**
     * Filter with unique items.
     *
     * @param  {any}  key
     *
     * @return {Collection}
     */
    unique(key?: any): Collection {
        if (key === undefined)
            return this.filter((element, index, self) => self.indexOf(element) === index);

        let collection = [];
        let items      = this.isArray() ? this.items : Object.keys(this.items).map(k => this.items[k]);
        const usedKeys = [];

        for (let item of items) {
            let uniqueKey = typeof key === 'function' ? key(item) : item[key];

            if (usedKeys.indexOf(uniqueKey) === -1) {
                collection.push(item);
                usedKeys.push(uniqueKey);
            }
        }

        return new Collection(collection);
    }

    /**
     * Get only the values.
     *
     * @return {Collection}
     */
    values(): Collection {
        const collection = [];

        Object.keys(this.items).forEach((property) => {
            collection.push(this.items[property]);
        });

        return new Collection(collection);
    }

    /**
     * Apply the callback if the value is truthy.
     *
     * @param  {any}       value
     * @param  {Function}  callback
     *
     * @return {Collection}
     */
    when(value: any, callback: Function, defaultCallback?: any): Collection {
        if (value)
            return callback(this);
        else if (typeof defaultCallback === 'function')
            return defaultCallback(this);

        return this;
    }

    /**
     * Filter items by the given key value pair.
     *
     * @param  {string}  key
     * @param  {any}     operator
     * @param  {any}     value
     *
     * @return {Collection}
     */
    where(key: string, operator: any, value?: any): Collection {
        return this.filter(
            this.operatorForWhere(
                key,
                value === undefined ? '===' : operator,
                value === undefined ? operator : value
            )
        );
    }

    /**
     * Filter items by the given key value pair.
     *
     * @param  {string}  key
     * @param  {any}     values
     *
     * @return {Collection}
     */
    whereIn(key: string, values: any): Collection {
        return this.filter(item => values.indexOf(item[key]) !== -1);
    }

    /**
     * Filter items by the given key value pair.
     *
     * @param  {string}  key
     * @param  {any}     values
     *
     * @return {Collection}
     */
    whereNotIn(key: string, values: any): Collection {
        return this.reject(item => values.indexOf(item[key]) !== -1);
    }

    /**
     * Zip the collection together with one or more arrays.
     *
     * @param  {any}  array
     *
     * @return {Collection}
     */
    zip(array: any): Collection {
        return this.map((item, index) => [item, array[index]]);
    }

    // Other Methods
    //----------------------------------

    /**
     * Check if the items property is an array.
     *
     * @return {boolean}
     */
    protected isArray(): boolean {
        return _.isArray(this.items);
    }

    /**
     * Get an operator checker callback.
     *
     * @param  {any}  key
     * @param  {any}  operator
     * @param  {any}  value
     *
     * @return {Function}
     */
    protected operatorForWhere(key, operator, value): Function
    {
        return (item) => {
            const retrieved = item[key];

            switch (operator) {
                case '!=':
                case '<>':
                    return retrieved != value;

                case '<':
                    return retrieved < value;

                case '>':
                    return retrieved > value;

                case '<=':
                    return retrieved <= value;

                case '>=':
                    return retrieved >= value;

                case '===':
                    return retrieved === value;

                case '!==':
                    return retrieved !== value;

                case '=':
                case '==':
                default:
                    return retrieved == value;
            }
        };
    }
}

export default Collection;

interface CollectionInterface
{
    /**
     * Get all of the items in the collection.
     * 
     * @return {any}
     */
    all(): any;

    /**
     * Calculate the average.
     *
     * @param  {any}  key
     *
     * @return {number}
     */
    average(key?: any): number;

    /**
     * Calculate the average (alias).
     *
     * @param  {any}  key
     *
     * @return {number}
     */
    avg(key?: any): number;

    /**
     * Chunk the underlying collection array.
     *
     * @param  {number}  size
     *
     * @return {CollectionInterface}
     */
    chunk(size: number): CollectionInterface;

    /**
     * Collapse the collection of items into a single array.
     *
     * @return {CollectionInterface}
     */
    collapse(): CollectionInterface;

    /**
     * Create a collection by using this collection for keys and another for its values.
     *
     * @param  {any}  items
     *
     * @return {CollectionInterface}
     */
    combine(items: any): CollectionInterface;

    /**
     * Push all of the given items onto the collection.
     *
     * @param  {any} items
     *
     * @return {CollectionInterface}
     */
    concat(items: any): CollectionInterface;

    /**
     * Check the collection contains an item.
     *
     * @param  {any}  key
     * @param  {any}  operator
     * @param  {any}  value
     *
     * @return {boolean}
     */
    contains(key: any, operator?: any, value?: any): boolean;

    /**
     * Count the number of items in the collection.
     *
     * @return {number}
     */
    count(): number;

    /**
     * Get the items in the collection that are not present in the given items.
     *
     * @param  {any}  values
     *
     * @return {CollectionInterface}
     */
    diff(values: any): CollectionInterface;

    /**
     * Get the items in the collection whose keys are not present in the given items.
     *
     * @param  {any}  object
     *
     * @return {Collection}
     */
    diffKeys(object: any): CollectionInterface;

    /**
     * Execute a callback over each item.
     *
     * @param  {item}  callback
     *
     * @return {Collection}
     */
    each(callback: any): CollectionInterface;

    /**
     * Determine if all items in the collection pass the given test.
     *
     * @param  {any}  callback
     *
     * @return boolean
     */
    every(callback: any): boolean;

    /**
     * Get all items except for those with the specified keys.
     *
     * @param  {any}  properties
     *
     * @return {CollectionInterface}
     */
    except(properties: any): CollectionInterface;

    /**
     * Run a filter over each of the items.
     *
     * @param  {any}  callback
     *
     * @return {Collection}
     */
    filter(callback?: any): CollectionInterface;

    /**
     * Get the first item from the collection.
     *
     * @param {function} callback
     *
     * @return {any}
     */
    first(callback: any): any;

    /**
     * Map a collection and flatten the result by a single level.
     *
     * @param  {any}  callback
     *
     * @return {CollectionInterface}
     */
    flatMap(callback: any): CollectionInterface;

    /**
     * Get a flattened array of the items in the collection.
     *
     * @param  {number}  depth
     *
     * @return {CollectionInterface}
     */
    flatten(depth?: number): CollectionInterface;

    /**
     * Flip the items in the collection.
     *
     * @return {CollectionInterface}
     */
    flip(): CollectionInterface;

    /**
     * "Paginate" the collection by slicing it into a smaller collection.
     *
     * @param  {number}  page
     * @param  {number}  perPage
     *
     * @return {CollectionInterface}
     */
    forPage(page, perPage): CollectionInterface;

    /**
     * Remove an item from the collection by key.
     *
     * @param  {any}  key
     *
     * @return {CollectionInterface}
     */
    forget(key): CollectionInterface;

    /**
     * Get an item from the collection by key.
     *
     * @param  {any}  key
     * @param  {any}  defaultValue
     *
     * @return {any}
     */
    get(key, defaultValue:any): any;

    /**
     * Group an associative array by a field or using a callback.
     *
     * @param  {any}  key
     *
     * @return {CollectionInterface}
     */
    groupBy(key: any): CollectionInterface;

    /**
     * Determine if an item exists in the collection by key.
     *
     * @param  {any}  key
     *
     * @return {boolean}
     */
    has(...key): boolean;

    /**
     * Concatenate values of a given key as a string.
     *
     * @param  {any}  key
     * @param  {any}  glue
     *
     * @return {CollectionInterface}
     */
    implode(key, glue?: any): CollectionInterface;

    /**
     * Intersect the collection with the given items.
     *
     * @param  {any}  values
     *
     * @return {CollectionInterface}
     */
    intersect(values: any): CollectionInterface;

    /**
     * Determine if the collection is empty or not.
     *
     * @return {boolean}
     */
    isEmpty(): boolean;

    /**
     * Determine if the collection is not empty.
     *
     * @return {boolean}
     */
    isNotEmpty(): boolean;

    /**
     * Key an associative array by a field or using a callback.
     *
     * @param  {any}  key
     *
     * @return {CollectionInterface}
     */
    keyBy(key: any): CollectionInterface;

    /**
     * Get the keys of the collection items.
     *
     * @return {CollectionInterface}
     */
    keys(): CollectionInterface;

    /**
     * Get the last item from the collection.
     *
     * @param  {any}  callback
     *
     * @return {any}
     */
    last(callback?: any): any;

    /**
     * Run a map over each of the items.
     *
     * @param  {any}  callback
     *
     * @return {CollectionInterface}
     */
    map(callback: any): CollectionInterface;

    /**
     * Run an associative map over each of the items.
     *
     * @param  {any}  callback
     *
     * @return {CollectionInterface}
     */
    mapWithKeys(callback: any): CollectionInterface;

    /**
     * Get the max value of a given key.
     *
     * @param  {any}  key
     *
     * @return {number}
     */
    max(key?: any): number;

    /**
     * Get the median of a given key.
     *
     * @param  {any}  key
     *
     * @return {number}
     */
    median(key?: any): number;

    /**
     * Merge the collection with the given items.
     *
     * @param  {any}  obj
     *
     * @return {CollectionInterface}
     */
    merge(obj): CollectionInterface;

    /**
     * Get the min value of a given key.
     *
     * @param  {any}  key
     *
     * @return {number}
     */
    min(key?: any): number;

    /**
     * Get the mode of a given key.
     *
     * @param  {any}  key
     *
     * @return {any}
     */
    mode(key?: any): any;

    /**
     * Create a new collection consisting of every n-th element.
     *
     * @param  {number}  n
     * @param  {number}  offset
     *
     * @return {CollectionInterface}
     */
    nth(n, offset?: number): CollectionInterface;

    /**
     * Get only item with the given properties.
     *
     * @param  {any}  properties
     *
     * @return {CollectionInterface}
     */
    only(properties: any): CollectionInterface;

    /**
     * Partition the collection into two arrays using the given callback or key.
     *
     * @param  {any}  callback
     *
     * @return {Array[]}
     */
    partition(callback: any): any;

    /**
     * Pass the collection to the given callback and return the result.
     *
     * @param  {any}  callback
     *
     * @return {any}
     */
    pipe(callback: any): any

    /**
     * Get the values of a given key.
     *
     * @param  {string}   value
     * @param  {string?}  key
     *
     * @return {Collection}
     */
    pluck(value: string, key?: string): CollectionInterface;

    /**
     * Get and remove the last item from the collection.
     *
     * @return {any}
     */
    pop(): any;

    /**
     * Push an item onto the beginning of the collection.
     *
     * @param  {any}  value
     * @param  {any}  key
     *
     * @return {CollectionInterface}
     */
    prepend(value: any, key?: any): CollectionInterface;

    /**
     * Get and remove an item from the collection.
     *
     * @param  {any}  key
     *
     * @return {any}
     */
    pull(key: any): any;

    /**
     * Push an item onto the end of the collection.
     *
     * @param  {any}  item
     *
     * @return {CollectionInterface}
     */
    push(item: any): CollectionInterface;

    /**
     * Put an item in the collection by key.
     *
     * @param  {any}  key
     * @param  {any}  value
     *
     * @return {CollectionInterface}
     */
    put(key: any, value: any): CollectionInterface;

    /**
     * Get one or more items randomly from the collection.
     *
     * @param  {any}  length
     *
     * @return {any}
     */
    random(length?: any): any;

    /**
     * Reduce the collection to a single value.
     *
     * @param  {any}  callback
     * @param  {any}  carry
     *
     * @return {any}
     */
    reduce(callback: any, carry?: any): any;

    /**
     * Create a collection of all elements that do not pass a given truth test.
     *
     * @param  {any}  callback
     *
     * @return {CollectionInterface}
     */
    reject(callback: any): CollectionInterface;

    /**
     * Reverse items order.
     *
     * @return {CollectionInterface}
     */
    reverse(): CollectionInterface;

    /**
     * Search the collection for a given value and return the corresponding key if successful.
     *
     * @param  {any}      condition
     * @param  {boolean}  strict
     *
     * @return {any}
     */
    search(condition: any, strict: boolean): any;

    /**
     * Get and remove the first item from the collection.
     *
     * @return {any}
     */
    shift(): any;

    /**
     * Shuffle the items in the collection.
     *
     * @return {CollectionInterface}
     */
    shuffle(): CollectionInterface;

    /**
     * Slice the underlying collection array.
     *
     * @param  {any}  remove
     * @param  {any}  limit
     *
     * @return {CollectionInterface}
     */
    slice(remove?: any, limit?: any): CollectionInterface;

    /**
     * Sort through each item with a callback.
     *
     * @param  {any}  callback
     *
     * @return {CollectionInterface}
     */
    sort(callback?: any): CollectionInterface;

    /**
     * Sort the collection using the given callback.
     *
     * @param  any  callback
     *
     * @return {CollectionInterface}
     */
    sortBy(callback: any): CollectionInterface;

    /**
     * Sort the collection in descending order using the given callback.
     *
     * @param  {any}  callback
     *
     * @return {CollectionInterface}
     */
    sortByDesc(callback: any): CollectionInterface;

    /**
     * Splice a portion of the underlying collection array.
     *
     * @param  {number}  index
     * @param  {any}     limit
     * @param  {any}     replace
     *
     * @return {CollectionInterface}
     */
    splice(index: number, limit: any, replace: any): CollectionInterface;

    /**
     * Split a collection into a certain number of groups.
     *
     * @param  {number}  numberOfGroups
     *
     * @return {CollectionInterface}
     */
    split(numberOfGroups: number): CollectionInterface;

    /**
     * Get the sum of the given values.
     *
     * @param  {any}  key
     *
     * @return {number}
     */
    sum(key?: any): number;

    /**
     * Take the first or last {limit} items.
     *
     * @param  {number}  length
     *
     * @return {CollectionInterface}
     */
    take(limit: number): CollectionInterface;

    /**
     * Pass the collection to the given callback and then return it.
     *
     * @param  {any}  callback
     *
     * @return {CollectionInterface}
     */
    tap(callback): CollectionInterface;

    /**
     * Create a new collection by invoking the callback a given amount of times.
     *
     * @param  {number}  n
     * @param  {any}     callback
     *
     * @return {CollectionInterface}
     */
    times(n: number, callback?: any): CollectionInterface;

    /**
     * Convert the collection items to array.
     *
     * @return {any[]}
     */
    toArray(): any[];

    /**
     * Convert the collection items to json.
     *
     * @return {string}
     */
    toJson(): string;

    /**
     * Transform each item in the collection using a callback.
     *
     * @param  {any}  callback
     *
     * @return {CollectionInterface}
     */
    transform(callback: any): CollectionInterface;

    /**
     * Union the collection with the given items.
     *
     * @param  {any}  object
     *
     * @return {Collection}
     */
    union(object: any): CollectionInterface;

    /**
     * Filter with unique items.
     *
     * @param  {any}  key
     *
     * @return {CollectionInterface}
     */
    unique(key?: any): CollectionInterface;

    /**
     * Get only the values.
     *
     * @return {Collection}
     */
    values(): CollectionInterface;

    /**
     * Apply the callback if the value is truthy.
     *
     * @param  {any}  value
     * @param  {any}  callback
     *
     * @return {CollectionInterface}
     */
    when(value: any, callback: Function, defaultCallback?: any): CollectionInterface;

    /**
     * Filter items by the given key value pair.
     *
     * @param  {string}  key
     * @param  {any}     operator
     * @param  {any}     value
     *
     * @return {CollectionInterface}
     */
    where(key: string, operator: any, value?: any): CollectionInterface;

    /**
     * Filter items by the given key value pair.
     *
     * @param  {string}  key
     * @param  {any}     values
     *
     * @return {CollectionInterface}
     */
    whereIn(key: string, values: any): CollectionInterface;

    /**
     * Filter items by the given key value pair.
     *
     * @param  {string}  key
     * @param  {any}     values
     *
     * @return {CollectionInterface}
     */
    whereNotIn(key: string, values: any): CollectionInterface;

    /**
     * Zip the collection together with one or more arrays.
     *
     * @param  {any}  array
     *
     * @return {CollectionInterface}
     */
    zip(array: any): CollectionInterface;
}

export default CollectionInterface;

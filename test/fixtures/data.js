export default {
    numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    words: ['foo', 'bar', 'baz', 'qux'],
    persons: {
        '1': 'John',
        '2': 'Jane',
        '3': 'Bob'
    },
    products: {
        '3': {id: 3, name: 'Product 3', brand: 'Brand 2', price: 200},
        '1': {id: 1, name: 'Product 1', brand: 'Brand 1', price: 100},
        '2': {id: 2, name: 'Product 2', brand: 'Brand 1', price: '200'},
        '4': {id: 4, name: 'Product 4', brand: 'Brand 3', price: 300},
        '5': {id: 5, name: 'Product 5', brand: 'Brand 3', price: 300}
    },
    tasks: [
        {
            'id': 10,
            'parent_id': null,
            'title': 'Task 10',
            'description': 'Consequuntur et ab cum sit omnis architecto maiores est voluptate cupiditate odio sed assumenda.'
        },
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
    ]
}

'use strict'

function* upper(items) {
    for(let item of items) {
        try { // if is a string return upper
            yield item.toUpperCase();
        } catch (error) { // if is a number return null
            yield null;
        }
    }
}

var bad_items = ['a', 'B', 1, 'c'];

for (var item of upper(bad_items)) {
    console.log(item);
}
// want to log: A, B, null, C

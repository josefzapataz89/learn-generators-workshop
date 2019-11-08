'use strict'

function* flat(arr) {
    // verify if is an array
    if ( Array.isArray(arr) ) {
        for (let i = 0; i < arr.length; i++) {
            // call the function to get nested array
            yield* flat(arr[i]);
        }
    }
    else { // because if not an array print the value
        yield arr;
    }
}

var A = [1, [2, [3, 4], 5], 6];
for (var f of flat(A)) {
    console.log(f);
}


// [1, [2, [3, 4], 5], 6] -> original array
// 1, [], 6 -> nested array in second position
// 2, [], 5 -> nested array in second position
// 3, 4 -> have not nested array

'use strict'

var fs = require('fs');
    
function readDir(dir) {
    return new Promise(function (resolve, reject) {
        fs.readdir(dir, function (err, res) {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
}

// run(function* () {
//     // almost the same generator as in the callback exercise
//     var exercises = yield readDir('exercises');
//     console.log(exercises); // [ 'look_sync_do_async', ..., 'run_stop_run' ]
// });

function askFoo () {
    return new Promise(function (resolve, reject) {
        resolve('foo');
    });
}

function run (generator) {
    // your code goes here
    var it = generator();

    function go(response) {

        /**
         * Generator.proptype.return example
         */
        // function* gen() {
        //     yield 1;
        //     yield 2;
        //     yield 3;
        //   }
          
        //   var g = gen();
        //   g.next(); // { value: 1, done: false }
        //   g.next(); // { value: 2, done: false }
        //   g.next(); // { value: 3, done: false }
        //   g.next(); // { value: undefined, done: true }
        //   g.return(); // { value: undefined, done: true }
        //   g.return(1); // { value: 1, done: true }

        if(response.done)
            return response.value;

        // Constructing and returning a promise
        return response.value.then((data) => {
                    return go(it.next(data));
                }, (err) => {
                    return go(it.throw(err));
                });
    }

    go(it.next());

}

run(function* () {
    // improve: errors?
    var foo = yield askFoo();
    console.log(foo);
});

/**
 * Official solution
 */

// function getFoo () {
//     return new Promise(function (resolve, reject){
//       resolve('foo');
//     });
//   }
  
//   function run (generator) {
//     var it = generator();
  
//     function go(result) {
//       // take a look also on `Generator.prototype.return`
//       if (result.done) return result.value;
  
//       return result.value.then(function (value) {
//         return go(it.next(value));
//       }, function (error) {
//         return go(it.throw(error));
//       });
  
//     }
  
//     go(it.next());
//   }
  
//   run(function* () {
//     try {
//       var foo = yield getFoo();
//       console.log(foo);
//     } catch (e) {
//       console.log(e);
//     }
//   });
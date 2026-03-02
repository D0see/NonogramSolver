import { solveNonogram } from './solverv4.js';

console.time('easy');

console.log(solveNonogram(
        [
            [1],
            [4],
            [3, 1],
            [2, 1],
            [2]
        ], 
        [
            [1, 2],
            [3],
            [2, 1],
            [1, 1],
            [3],
        ]
    )
);
console.timeEnd('easy');

console.time('medium');

console.log(solveNonogram(
        [
            [1, 1],
            [1 ,1],
            [1, 1],
            [1, 1],
            [1, 1],
            [1, 2],
        ], 
        [
            [1, 1],
            [1, 1],
            [1, 1],
            [1, 1],
            [1, 1],
            [2, 1]
        ]
    )
);
console.timeEnd('medium');

console.time('hard')

console.log(solveNonogram(
        [
            [1, 1],
            [1 ,1],
            [1, 1],
            [1, 1],
            [1, 1],
            [1, 2],
            [1, 1],
            [1, 1],
            [1, 1],
            [1, 1]
        ], 
        [
            [1, 1],
            [1, 1],
            [1, 1],
            [1, 1],
            [1, 1],
            [2, 1],
            [1, 1],
            [1, 1],
            [1, 1],
            [1, 1]
        ]
    )
);

console.timeEnd('hard')


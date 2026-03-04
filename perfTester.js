import { solveNonogram } from './solver.js';
import { solveNonogram as oldSolver} from './oldSolver.js';
import { buildTestGrid } from './generator.js';

for (let i = 10; i < 15; i++) {
    const [rows, columns] = buildTestGrid(i);

    console.time('new ' + i);

    // console.log (
    //     rows, columns
    // );
    // console.log (
        solveNonogram(rows, columns)
    // );

    console.timeEnd('new ' + i);

    // NEW VS OLD //
    
    console.time('old ' + i);
    
    // console.log (
    //     rows, columns
    // );
    // console.log (
        oldSolver(rows, columns)
    // );

    console.timeEnd('old ' + i);
}
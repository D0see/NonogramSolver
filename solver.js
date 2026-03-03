function getArrangements(
    numberArr, 
    totalLength, 
    numOfGaps = totalLength - numberArr.reduce((acc, val) => acc + val, 0), 
    numberArrIndex = 0, 
    currArrangement = [], 
    result = []
) {

    // if we are at the end of an arrangement and no gaps are left, we return the arrangement
    if (numberArrIndex === numberArr.length && numOfGaps === 0) {
        result.push(currArrangement);
        return result;
    }

    if (
        // if we have at least one block to place
        numberArrIndex < numberArr.length && 
        // if this is the first block or the last element was an empty space
        (numberArrIndex === 0 || currArrangement[currArrangement.length - 1] === false)
    ) {
        getArrangements(
            numberArr,
            totalLength, 
            numOfGaps, 
            numberArrIndex + 1,
            [...currArrangement, ...(new Array(numberArr[numberArrIndex])).fill(true)],
            result
        );
    }

    if (numOfGaps > 0) {
        getArrangements(
            numberArr,
            totalLength, 
            numOfGaps - 1, 
            numberArrIndex,
            [...currArrangement, false],
            result
        );
    }

    return result;
}

function colArrangementFitsRow(grid, arrangement, colIndex, rowIndex) {

    return arrangement[rowIndex] === grid[rowIndex][colIndex];
}

function filterPossibleColsArrangements(colsArrangement, nextGrid, rowIndex){

    return colsArrangement.map((currColArrangements, colIndex) =>
        currColArrangements.filter(
            currColArrangement => colArrangementFitsRow(nextGrid, currColArrangement, colIndex, rowIndex)
        )
    );
}

function recursiveSolver(
    rowsArrangements, 
    columnsArrangements, 
    rowIndex = 0, 
    colIndex = 0, 
    currGrid = [], 
    finalGrid = [false]
) {

    if (finalGrid[0]) return finalGrid[0];

    for (let y = rowIndex; y < rowsArrangements.length; y++) {

        for (const rowArrangement of rowsArrangements[y]) {

            const nextGrid = [...currGrid, rowArrangement];

            const possibleColsArrangements = filterPossibleColsArrangements(columnsArrangements, nextGrid, rowIndex);

            //we check that every colsArrangement array holds at least arrangement and if so we continue the solve this branch
            if (possibleColsArrangements.some(arrangements => arrangements.length === 0)) continue;

            //if this was the last row, return the grid (ends the solve)
            if (rowIndex === rowArrangement.length - 1) {
                finalGrid[0] = nextGrid;

                return finalGrid[0];
            }

            recursiveSolver(
                rowsArrangements,
                possibleColsArrangements, 
                rowIndex + 1, 
                colIndex, 
                nextGrid,
                finalGrid
            );

            if (finalGrid[0]) return finalGrid[0];
        }
    }

    return finalGrid[0];
}

export function solveNonogram (
    rows,
    columns
) {

    const rowsArrangements = rows.map(row => getArrangements(row, columns.length));
    const columnsArrangements = columns.map(column => getArrangements(column, rows.length));

    return recursiveSolver(rowsArrangements, columnsArrangements);
}
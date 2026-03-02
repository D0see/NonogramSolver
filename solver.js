function getArrangements(
    blockSizes, 
    lineLength, 
    gaps = lineLength - blockSizes.reduce((acc, val) => acc + val, 0), 
    inputArrIndex = 0, 
    currArrangement = [], 
    arrangements = []
) {

    // if we are at the end of an arrangement and no gaps are left, we return the arrangement
    if (inputArrIndex === blockSizes.length && gaps === 0) {
        arrangements.push(currArrangement);
        return arrangements;
    }

    if (
        // if we have at least one block to place
        inputArrIndex < blockSizes.length && 
        // if this is the first block or the last element was an empty space
        (inputArrIndex === 0 || currArrangement[currArrangement.length - 1] === false)
    ) {
        getArrangements(
            blockSizes,
            lineLength, 
            gaps, 
            inputArrIndex + 1,
            [...currArrangement, ...(new Array(blockSizes[inputArrIndex])).fill(true)],
            arrangements
        );
    }

    if (gaps > 0) {
        getArrangements(
            blockSizes,
            lineLength, 
            gaps - 1, 
            inputArrIndex,
            [...currArrangement, false],
            arrangements
        );
    }

    return arrangements;
}

function arrangementFitsRow(grid, arrangement, colIndex, rowIndex) {

    return arrangement[rowIndex] === grid[rowIndex][colIndex];
}

function filterPossibleColsArrangements(colsArrangement, nextGrid, rowIndex){
    const possibleColsArrangements = [];
    
    for (const [colIndex, currColsArrangements] of colsArrangement.entries()) {
        possibleColsArrangements.push(
            currColsArrangements.filter(
                currColArrangement => arrangementFitsRow(nextGrid, currColArrangement, colIndex, rowIndex)
            )
        );
    }

    return possibleColsArrangements;
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
        const arrangements = rowsArrangements[y];

        for (const rowArrangement of arrangements) {

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
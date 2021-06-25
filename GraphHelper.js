var vertexA = {
    X: 1, // -10,
    Y: 2 // -10
}

var vertexB = {
    X: 4, // -3,
    Y: 4 // -2
}

var vertexD = {
    X: 3,
    Y: 1
}

var vertexE = {
    X: 2,
    Y: 5
}

// First calculate difference in vertices
function calculateVertexDiff(vertexA, vertexB)
{
    return {
        calcX: vertexA.X - vertexB.X,
        calcY: vertexA.Y - vertexB.Y
    }
}

function convertToPositiveNumber(callculation)
{
    if(callculation < 0)
    callculation *= -1;

    return callculation;
}

function setDirectionCoficient(calculatedVertexDiffX, calculatedVertexDiffY)
{
    return calculatedVertexDiffY / calculatedVertexDiffX;
}

function setYFromZeroXCoor(vertexA, vertexB, directionalcoof)
{
    // Determine closest Y to zero
    var closestYToZero = getClosesetToZero(vertexA, vertexB);
    var difffromzero = 0 - closestYToZero.nearbyX;

    // console.log("Difference from zero: " + difffromzero + " directional coof: " + directionalcoof);

    return (difffromzero * directionalcoof) + closestYToZero.nearbyY;
}

function getClosesetToZero(vertexA, vertexB)
{
    var vertexA_X = convertToPositiveNumber(vertexA.X - 0);
    var vertexB_X = convertToPositiveNumber(vertexB.X - 0);

    return vertexA_X < vertexB_X ? { nearbyX:vertexA.X, nearbyY:vertexA.Y, otherY:vertexB.Y } : { nearbyX:vertexB.X, nearbyY:vertexB.Y, otherY:vertexA.Y };
}

// y = ax + b

// Bij nearby x < 0
// van boven naar beneden Y => -
// van beneden naar boven Y => +

// Overall function creating linear function
function getLinearFunctionFromEdge(vertexA, vertexB)
{
    var callculated = calculateVertexDiff(vertexA, vertexB);
    var directionalcoof = setDirectionCoficient(callculated.calcX, callculated.calcY);
    var yfromzeroxcoor = setYFromZeroXCoor(vertexA, vertexB, directionalcoof);

    return { directionalcoof:directionalcoof, yfromzeroxcoor:yfromzeroxcoor };
}

// Testing first part
console.log(getLinearFunctionFromEdge(vertexA, vertexB));
console.log(getLinearFunctionFromEdge(vertexD, vertexE));

////// SECOND PART //////
////// Generate part two based on two edges (4 vertices)

function getCrossSectionPoint(linFunctionA, linFunctionB)
{
    if (linFunctionA.directionalcoof == linFunctionB.directionalcoof) return 0;

    // Calculate X crossing point from two edges (linear funtions)
    // Put directionalcooficient form A together with B
    var directCoofTogether = linFunctionA.directionalcoof - linFunctionB.directionalcoof;
    var yFromZeroTogether = linFunctionB.yfromzeroxcoor - linFunctionA.yfromzeroxcoor;

    var crossingX = yFromZeroTogether/directCoofTogether;
    var crossingY = ((linFunctionA.directionalcoof * crossingX) + linFunctionA.yfromzeroxcoor);

    return { crossingX:crossingX, crossingY:crossingY };
}

// Testing second part
var A = getLinearFunctionFromEdge(vertexA, vertexB);
var D = getLinearFunctionFromEdge(vertexD, vertexE);

var result = getCrossSectionPoint(D,A);
console.log(result);
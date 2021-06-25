const ADD = "+";
const SUB = "-";
const DIV = "/";
const MUL = "*";
const MOD = "%";

const SPRTL= "(";
const SPRTR= ")";

function ExprNode(parentNode)
{
    this.Parent = parentNode;
    this.ChildLeft;
    this.ChildRight;

    this.Operation;
    this.Numbr;
}

function InsertChildNode(parentNode, numbr)
{
    var newChildNode = new ExprNode(parentNode);
    newChildNode.Numbr = numbr;

    return newChildNode;
}

function InsertParentNode(parentNode, operation)
{
    var newChildNode = new ExprNode(parentNode);
    newChildNode.Operation = operation;

    return newChildNode;
}

// Test ExpressionTree => 5+(2*3)
// Returns rootnode
function SetupTestExpressionTree()
{
    	var root = new ExprNode(null);
    	root.Operation = ADD;
    	root.ChildLeft = InsertChildNode(root, 5);
    	root.ChildRight = InsertParentNode(root, MUL);

    	root.ChildRight.ChildLeft = InsertChildNode(root.ChildRight, 2);
    	root.ChildRight.ChildRight = InsertChildNode(root.ChildRight, 3);

    	return root;
}

// Calculate expressiontree with Recursion
var calculated = "";
function CalculateExpressionTree(nextNode)
{
	// 1) Calculate
	if( IsNumber(nextNode.ChildLeft.Numbr) && IsNumber(nextNode.ChildRight.Numbr))
	{
		calculated += nextNode.ChildLeft.Numbr + nextNode.Operation + nextNode.ChildRight.Numbr;
	}
	
	// 2) Go layer deeper (both nodes are operations)
	if(nextNode.ChildLeft.Operation != null && nextNode.ChildRight.Operation != null)
	{
		calculated += nextNode.ChildLeft.Operation;
		CalculateExpressionTree(nextNode.ChildLeft);
		
		calculated += nextNode.ChildRight.Operation;
		CalculateExpressionTree(nextNode.ChildRight);
	}
	
	// 3) Go Left
	if( !IsNumber(nextNode.ChildLeft.Numbr) && IsNumber(nextNode.ChildRight.Numbr))
	{
		calculated += nextNode.ChildLeft.Operation + nextNode.ChildRight.Numbr;
		
		calculated += SPRTL;
			CalculateExpressionTree(nextNode.ChildLeft);
		calculated += SPRTR;
	}
	
	// 4) Go Right
	if(IsNumber(nextNode.ChildLeft.Numbr) && !IsNumber(nextNode.ChildRight.Numbr))
	{
		calculated += nextNode.ChildLeft.Numbr + nextNode.ChildRight.Operation;
		
		calculated += SPRTL;
			CalculateExpressionTree(nextNode.ChildRight);
		calculated += SPRTR;
	}
}

function IsNumber(number)
{
	if(number == null) return false;
	return !number.isNaN;	
}

// Test Setup
var root = SetupTestExpressionTree();
CalculateExpressionTree(root);
console.log(calculated);
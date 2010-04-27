var ASSERT = require("test/assert");
var ReturnType = require("../lib/ReturnType");
var ASTBuilder = require("./astbuilder");

exports.testThatValidASTReturnsSameAST = function() {
    var ast = ASTBuilder.buildValidAST();
    var env = require("../lib/GatherTypeInfo").process(ast).env;
    var otherAST = ReturnType.process(ast, env);
    
    ASSERT.eq(ast, otherAST.ast);
    ASSERT.eq(0, env.errors.length);
};

exports.testThatWrongReturnTypeIsInvalid = function() {
    var ast = buildInvalidParameterAST();
    var env = require("../lib/GatherTypeInfo").process(ast).env;
    var result = ReturnType.process(ast, env);
    
    ASSERT.eq(2, result.env.errors.length);
};

exports.testThatAddWithBadReturnTypeIsInvalid = function() {
    var ast = buildBinaryOperatorAST("Add");
    var env = require("../lib/GatherTypeInfo").process(ast).env;
    var result = ReturnType.process(ast, env);

    ASSERT.eq(2, result.env.errors.length);
};

exports.testThatSubtractWithBadReturnTypeIsInvalid = function() {
    var ast = buildBinaryOperatorAST("Subtract");
    var env = require("../lib/GatherTypeInfo").process(ast).env;
    var result = ReturnType.process(ast, env);

    ASSERT.eq(2, result.env.errors.length);
};

exports.testThatMultiplyWithBadReturnTypeIsInvalid = function() {
    var ast = buildBinaryOperatorAST("Multiply");
    var env = require("../lib/GatherTypeInfo").process(ast).env;
    var result = ReturnType.process(ast, env);
    
    ASSERT.eq(2, result.env.errors.length);
};

exports.testThatDivideWithBadReturnTypeIsInvalid = function() {
    var ast = buildBinaryOperatorAST("Divide");
    var env = require("../lib/GatherTypeInfo").process(ast).env;
    var result = ReturnType.process(ast, env);

    ASSERT.eq(2, result.env.errors.length);
};

exports.testThatNullWithPrimitiveReturnTypeIsInvalid = function() {
    var ast = buildNullAST();
    var env = require("../lib/GatherTypeInfo").process(ast).env;
    var result = ReturnType.process(ast, env);
    
    ASSERT.eq(2, result.env.errors.length);
};

exports.testThatConstructTypeIsInvalid = function() {
    var ast = buildConstructAST();
    var env = require("../lib/GatherTypeInfo").process(ast).env;
    var result = ReturnType.process(ast, env);

    ASSERT.eq(2, result.env.errors.length);
};

exports.testThatThisWithOtherReturnTypeIsInvalid = function() {
    var ast = buildThisAST();
    var env = require("../lib/GatherTypeInfo").process(ast).env;
    var result = ReturnType.process(ast, env);

    ASSERT.eq(2, result.env.errors.length);
};

exports.testThatNegateWithBooleanReturnTypeIsInvalid = function() {
    var ast = buildNegateAST();
    var env = require("../lib/GatherTypeInfo").process(ast).env;
    var result = ReturnType.process(ast, env);

    ASSERT.eq(2, result.env.errors.length);
};

exports.testThatNotWithIntegerReturnTypeIsInvalid = function() {
    var ast = buildNotAST();
    var env = require("../lib/GatherTypeInfo").process(ast).env;
    var result = ReturnType.process(ast, env);

    ASSERT.eq(2, result.env.errors.length);
};

function buildInvalidParameterAST() {
    var ast = ASTBuilder.ProgramNode();
    ast.addChild(ASTBuilder.MainClassNode());
    
    var classNode = ASTBuilder.ClassNode("Bar", null);
    
    var method = ASTBuilder.MethodNode("bar", "boolean");
    
    method.addChild(ASTBuilder.ParameterNode("x", "int"));
    method.addChild(ASTBuilder.ParameterNode("x", "boolean"));
    method.returnExpression = ASTBuilder.IntegerExpression("4");
    
    classNode.addChild(method);
    
    ast.addChild(classNode);
    
    return ast;
}

function buildBinaryOperatorAST(exprType) {
    var ast = ASTBuilder.ProgramNode();
    ast.addChild(ASTBuilder.MainClassNode());

    var classNode = ASTBuilder.ClassNode("Bar", null);

    var method = ASTBuilder.MethodNode("bar", "boolean");

    method.addChild(ASTBuilder.ParameterNode("x", "int"));
    method.addChild(ASTBuilder.ParameterNode("x", "boolean"));
    method.returnExpression = ASTBuilder[exprType + "Expression"](ASTBuilder.IntegerExpression("4"), 
        ASTBuilder.IntegerExpression("6"));

    classNode.addChild(method);

    ast.addChild(classNode);

    return ast;
}

function buildNullAST() {
    var ast = ASTBuilder.ProgramNode();
    ast.addChild(ASTBuilder.MainClassNode());

    var classNode = ASTBuilder.ClassNode("Bar", null);

    var method = ASTBuilder.MethodNode("bar", "boolean");

    method.addChild(ASTBuilder.ParameterNode("x", "int"));
    method.addChild(ASTBuilder.ParameterNode("x", "boolean"));
    method.returnExpression = ASTBuilder.NullExpression();

    classNode.addChild(method);

    ast.addChild(classNode);

    return ast;
}

function buildThisAST() {
    var ast = ASTBuilder.ProgramNode();
    ast.addChild(ASTBuilder.MainClassNode());

    var classNode = ASTBuilder.ClassNode("Bar", null);

    var method = ASTBuilder.MethodNode("bar", "boolean");

    method.addChild(ASTBuilder.ParameterNode("x", "int"));
    method.addChild(ASTBuilder.ParameterNode("x", "boolean"));
    method.returnExpression = ASTBuilder.ThisExpression();

    classNode.addChild(method);

    ast.addChild(classNode);

    return ast;
}

function buildConstructAST() {
    var ast = ASTBuilder.ProgramNode();
    ast.addChild(ASTBuilder.MainClassNode());

    var classNode = ASTBuilder.ClassNode("Bar", null);

    var method = ASTBuilder.MethodNode("bar", "boolean");

    method.addChild(ASTBuilder.ParameterNode("x", "int"));
    method.addChild(ASTBuilder.ParameterNode("x", "boolean"));
    method.returnExpression = ASTBuilder.ConstructExpression("Foo");

    classNode.addChild(method);

    ast.addChild(classNode);

    return ast;
}

function buildNegateAST() {
    var ast = ASTBuilder.ProgramNode();
    ast.addChild(ASTBuilder.MainClassNode());

    var classNode = ASTBuilder.ClassNode("Bar", null);

    var method = ASTBuilder.MethodNode("bar", "boolean");

    method.addChild(ASTBuilder.ParameterNode("x", "int"));
    method.addChild(ASTBuilder.ParameterNode("x", "boolean"));
    method.returnExpression = ASTBuilder.NegateExpression(ASTBuilder.IntegerExpression("7"));

    classNode.addChild(method);

    ast.addChild(classNode);

    return ast;
}

function buildNotAST() {
    var ast = ASTBuilder.ProgramNode();
    ast.addChild(ASTBuilder.MainClassNode());

    var classNode = ASTBuilder.ClassNode("Bar", null);

    var method = ASTBuilder.MethodNode("bar", "int");

    method.addChild(ASTBuilder.ParameterNode("x", "int"));
    method.addChild(ASTBuilder.ParameterNode("x", "boolean"));
    method.returnExpression = ASTBuilder.NotExpression(ASTBuilder.TrueExpression());

    classNode.addChild(method);

    ast.addChild(classNode);

    return ast;
}

function buildOrAST() {
    var ast = ASTBuilder.ProgramNode();
    ast.addChild(ASTBuilder.MainClassNode());

    var classNode = ASTBuilder.ClassNode("Bar", null);

    var method = ASTBuilder.MethodNode("bar", "int");

    method.addChild(ASTBuilder.ParameterNode("x", "int"));
    method.addChild(ASTBuilder.ParameterNode("x", "boolean"));
    method.returnExpression = ASTBuilder.NotExpression(ASTBuilder.TrueExpression());

    classNode.addChild(method);

    ast.addChild(classNode);

    return ast;
}

if (require.main === module)
    require("os").exit(require("test/runner").run(exports));
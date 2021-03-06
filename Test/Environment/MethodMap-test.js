var ASSERT = require("test/assert");
var MethodMap = require("../../lib/Environment").MethodMap;
var VariableMap = require("../../lib/Environment").VariableMap;

exports.testMethodMapConstructor = function() {
    var methodMap = buildTestMethodMap();
    
    ASSERT.eq("foo", methodMap.name);
    ASSERT.eq("int", methodMap.returnType);
    ASSERT.eq([], methodMap.parameters);
};

exports.testAddParameter = function() {
    var methodMap = buildTestMethodMap();
    methodMap.addParameter(new VariableMap("x", "int"));
    methodMap.addParameter(new VariableMap("y", "boolean"));
    
    ASSERT.eq(2, methodMap.parameters.length);
};

exports.testGetParameterType = function() {
    var methodMap = buildTestMethodMap();
    methodMap.addParameter(new VariableMap("x", "int"));
    methodMap.addParameter(new VariableMap("y", "boolean"));
    
    ASSERT.eq("int", methodMap.getParameterType("x"));
    ASSERT.eq("boolean", methodMap.getParameterType("y"));
    ASSERT.throwsError(function() {methodMap.getParameterType("z")});
};

exports.testGetReturnType = function() {
    var methodMap = buildTestMethodMap();
    
    ASSERT.eq("int", methodMap.getReturnType());
};

exports.testHasMultipleOfParameter = function() {
    var methodMap = buildTestMethodMap();
    methodMap.addParameter(new VariableMap("x", "int"));
    methodMap.addParameter(new VariableMap("x", "boolean"));
    methodMap.addParameter(new VariableMap("y", "Foo"));
    
    ASSERT.isTrue(methodMap.hasMultipleOfParameter("x"));
    ASSERT.isFalse(methodMap.hasMultipleOfParameter("y"));
    ASSERT.isFalse(methodMap.hasMultipleOfParameter("z"));
};

exports.testGetKey = function() {
    var methodMap = buildTestMethodMap();
    
    ASSERT.eq("foo", methodMap.getKey());
};

exports.testEquals = function() {
    var methodMap1 = buildTestMethodMap();
    var methodMap2 = buildTestMethodMap();
    
    ASSERT.isTrue(methodMap1.equals(methodMap2));
    ASSERT.isTrue(methodMap2.equals(methodMap1));
    
    var methodMap3 = new MethodMap("foo", "boolean");
    ASSERT.isFalse(methodMap1.equals(methodMap3));
    ASSERT.isFalse(methodMap3.equals(methodMap1));
    
    var methodMap4 = new MethodMap("bar", "int");
    ASSERT.isFalse(methodMap1.equals(methodMap4));
    ASSERT.isFalse(methodMap4.equals(methodMap1));
    
    var methodMap5 = new MethodMap("foo", "int");
    methodMap5.addParameter(new VariableMap("x", "int"));
    methodMap5.addParameter(new VariableMap("y", "boolean"));
    
    var methodMap6 = new MethodMap("foo", "int");
    methodMap6.addParameter(new VariableMap("x", "int"));
    ASSERT.isFalse(methodMap5.equals(methodMap6));
    ASSERT.isFalse(methodMap6.equals(methodMap5));
    
    var methodMap7 = new MethodMap("foo", "int");
    methodMap7.addParameter(new VariableMap("x", "int"));
    methodMap7.addParameter(new VariableMap("y", "int"));
    ASSERT.isFalse(methodMap5.equals(methodMap7));
    ASSERT.isFalse(methodMap7.equals(methodMap5));
};

exports.testToString = function() {
    var methodMap = buildTestMethodMap();
    methodMap.addParameter(new VariableMap("x", "int"));
    methodMap.addParameter(new VariableMap("y", "boolean"));
    
    var expected = "{name: <foo>, returnType: <int>, parameters: <[{name: <x>, type: <int>}, {name: <y>, type: <boolean>}]>}";
    ASSERT.eq(expected, methodMap.toString());
};

function buildTestMethodMap() {
    return new MethodMap("foo", "int");
}

if (require.main === module)
    require("os").exit(require("test/runner").run(exports));
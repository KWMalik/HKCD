// This is a test file for testing full-stack integration. We actually build ASTs for the unit testing portion
// of the project but we are required to submit functional test cases. Since we are writing them, we may as well
// leverage them. This is where they go.

var Parser = require("../lib/parser").Parser;
var Driver = require("../lib/driver").Driver;
var ClassTypes = require("../lib/classtypes");
var MethodOverload = require("../lib/methodoverload");
var MethodOverride = require("../lib/methodoverride");
var FieldDecs = require("../lib/fielddecs");
var ASSERT = require("assert");

exports.testThatDuplicateClassesGetTypeChecked = function() {
    compilingFileResultsInError("Test/Files/TypeChecker/Ours/bad_class_decls.java", "A class named Foo already exists.");
};

exports.testThatDuplicateMethodDeclarationsFails = function() {
    compilingFileResultsInError("Test/Files/TypeChecker/Ours/bad_method_decls.java", "A method named bar has already been defined in this class.");
};

exports.testThatOverridingSuperclassMethodDeclarationWithDifferentArgsOrTypeFails = function() {
    compilingFileResultsInError("Test/Files/TypeChecker/Ours/bad_method_decls.java", "A method named bar has already been defined in this class.");
};

exports.testThatLegalClassDeclarationsDontFail = function() {
    compilingFileResultsInError("Test/Files/TypeChecker/Ours/good_class_decls.java");
};

exports.testThatLegalFieldDeclarationsDontFail = function() {
    compilingFileResultsInError("Test/Files/TypeChecker/Ours/good_field_decls.java");
};

exports.testThatLegalMethodDeclarationsDontFail = function() {
    compilingFileResultsInError("Test/Files/TypeChecker/Ours/good_method_decls.java");
};

exports.testThatDuplicateFieldDeclarationsFail = function() {
    compilingFileResultsInError("Test/Files/TypeChecker/Ours/bad_field_decls.java", "A field named x has already been defined in this class.");
};

function compilingFileResultsInError(filename, error) {
    error = error || null;
    var finished = false;
    var parsed = false;
    try {
        var parser = new Parser(readGrammarFromFile("lib/grammar.json"));
        var ast = parser.parse(readFile(filename));
        parsed = true;
        
        if(ast.errors.length > 0)
            throw new Error("Error in parsing: " + ast.errors[0]);
        
        var driver = new Driver([ClassTypes, MethodOverload, MethodOverride, FieldDecs]);
        var results = driver.process(ast);
        
        finished = true;
    }
    catch (e) {
        ASSERT.equal(error, e.message, "Error message: <" + e.message + "> did not match <" + error + ">");
    }
    
    if(finished && error)
        ASSERT.fail("We were expecting an error but got none!");
}

function readGrammarFromFile(filePath) {
    try
    {
        return JSON.parse(readFile(filePath));
    }
    catch (e)
    {
        print("Error reading grammar file: " + filePath);
    }
}

function readFile(fileName) {
    try
    {
        var filePath = require("file").absolute(fileName);
        return require("file").read(filePath);
    }
    catch (e)
    {
        require("os").exit(-1);
    }
}

if (require.main === module)
    require("os").exit(require("test/runner").run(exports));
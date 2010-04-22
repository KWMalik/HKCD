exports.testNode = require("./astnode-test");
exports.testGatherTypeInfo = require("./gathertypeinfo-test");
//exports.testParser = require("./parser-test");
exports.testDriver = require("./driver-test");
exports.testFieldDecs = require("./fielddecs-test");
exports.testFieldShadow = require("./fieldshadow-test");
exports.testMethodOverload = require("./methodoverload-test");
exports.testMethodOverride = require("./methodoverride-test");
exports.testIntegration = require("./integration-test");
exports.testClassMap = require("./ClassMap-test");
exports.testMethodMap = require("./MethodMap-test");
exports.testClassDecl = require("./ClassDecl-test");
exports.testClassDecl = require("./FieldDecl-test");

if (require.main === module)
    require("os").exit(require("test/runner").run(exports));
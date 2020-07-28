const engine = require('mrules-engine');

const tests = {
    test1: 'TEST 1',
    test2: 'TEST 2',
    test34: {
        testArray: ['PASSED: TEST 3', 'PASSED: TEST 4', 'PASSED: TEST 5']
    }
};

const testRules = [{
    pathTo: 'test1',
    pathFor: 'test1',
    selectorFn: (testName) => `PASSED: ${testName}`
},
{
    pathTo: 'test2.doesntExist',
    pathFor: 'test2',
    selectorFn: (testName) => `PASSED: ${testName}`,
    fallback: 'TEST 2'
},
{
    pathTo: 'test34.testArray.0',
    pathFor: 'test3'
},
{
    pathTo: 'test34.testArray.1',
    pathFor: 'test4'
}, {
    pathTo: 'test34.testArray',
    pathFor: 'test5',
    selectorFn: (array) => array.pop()
}];

const testOutput = engine(tests, testRules);

Object.keys(testOutput).forEach((test, index) => {
    if (testOutput[test] === `PASSED: TEST ${index + 1}`) {
        console.log(testOutput[test]);
    } else {
        console.log('ERROR');
        process.exit(1);
    }
});
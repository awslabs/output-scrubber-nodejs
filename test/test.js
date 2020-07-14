#!/usr/bin/env node

const outputScrubber = require('../index');

// Filters SSNs, 4 digit PINs, and dollar amounts, respectively
const patterns = [
  [/\d{3}-\d{2}-\d{4}/g, 'XXX-XX-XXXX'],
  [/\$[0-9,.]+/g, '$XX.XX'],
  [/\d{4}/g, 'XXXX'],
];

const testCases = [
  'My SSN is 123-45-6789.',
  'My salary is $12,345.67 per year.',
  'My PIN is 1234.',
];

outputScrubber.activate(patterns);

testCases.forEach((testCase) => console.info(testCase));
testCases.forEach((testCase) => console.error(testCase));

outputScrubber.deactivate();

testCases.forEach((testCase) => console.info(testCase));
testCases.forEach((testCase) => console.error(testCase));

var zipcode = require('./zipcode.js');

var zip = process.argv[2];

zipcode.get(zip);
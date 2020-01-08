var fs = require('fs');

var data = {};

data['test.vhd'] = fs.readFileSync('./test/routes/testdata/test.vhd', 'utf-8');
data['testbench.vhd'] = fs.readFileSync('./test/routes/testdata/testbench.vhd', 'utf-8');
data['-mot-upl'] = "#&!upload>";

module.exports = data;
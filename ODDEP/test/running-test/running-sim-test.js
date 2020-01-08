var lemon = require('../../sim/lemon');
var debug = require('debug');
var log = debug('prj7_tot:running-test:lemon:log');

var count = 4;
function receiver() {
    -- count;
    if (count === 0) {
        lemon.setSLOT('running-test', null);
        log('lemon is tested.');
    }
}
lemon.setSLOT('running-test', receiver);

lemon.submit('test', 2, {
    pid : 1000,
    check : false
});
lemon.submit('test1', 2, {
    pid : 1001,
    check : false
});
lemon.submit('test2', 1);
lemon.submit('test2', 1, {
    pid : 1002,
    check : true
});
lemon.submit('test3', 2, {
    pid : 1002,
    check : true
});
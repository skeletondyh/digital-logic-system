$(function() {
    window.onhashchange = function() {
        if (!location.hash) return ;
        console.log(location.hash);
        var locateH = {
            '#left': -1,
            '#right': -2,
            '#backward': -3,
            '#forward': -4
        };
        var index = parseInt($('#index').text() || '1');
        var op = locateH[location.hash];
        console.log(index, op);
        if (op === undefined) op = parseInt(location.hash.substr(1));
        console.log(op);
        switch(op) {
            case -1:
            if (index > 1) -- index;
            break;
            case -2:
            ++ index;
            break;
            case -3:
            index = 1;
            break;
            case -4:
            index = 0;
            break;
            default:
            index = op;
            break;
        }
        console.log(index);
        $('#cIndex').val(index);
        $('#car').submit();
    };

    // 给filter回填数据
    getArgs = function() {
        var args = {};
        var qs = location.search.substr(1);
        var pairs = qs.split('&');
        for (var i = 0; i < pairs.length; ++i) {
            console.log(pairs[i]);
            var pos = pairs[i].indexOf('=');
            if (pos === -1) continue;
            var u1 = pairs[i].substr(0, pos);
            var u2 = pairs[i].substr(pos + 1);
            u2 = u2.replace(/\+/g, ' ');
            u2 = decodeURIComponent(u2);
            args[u1] = u2;
        }
        return args;
    }

    if ($('#index').text()) $('#cIndex').val(parseInt($('#index').text()));
    else $('#cIndex').val(1);
    args = getArgs();
    console.log(args);
    if (args.user) $('#userfilter').val(args.user);
    if (args.pid) $('#pidfilter').val(args.pid);
    if (args.tag) $('#tagfilter').val(args.tag);
    
    // 给表列做链接
    $('table > tbody > tr').click(function() {
        console.log('clicked');
        window.open($(this).find('a').attr('href'));
    })
});
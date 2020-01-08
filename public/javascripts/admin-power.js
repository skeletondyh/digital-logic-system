$(function() {
    function gotUserList(data, status) {
        $('#powertable').children().remove();
        $.each(data, function(i, row) {
            var line = $('<tr></tr>');
            $.each(['uid', 'name', 'nickname', 'power'], function(j, key) {
                var item = $('<td></td>');
                item.attr('data-for', key);
                item.attr('data-uid', row.uid);
                item.text(row[key]);
                line.append(item);
            });
            if (row.uid !== 1 && row.uid !== '1') {
                var items = $('<div></div>');
                $.each(['0', '1', '2'], function(j, key) {
                    var item = $('<button></button>');
                    item.text(key);
                    item.attr('data-kind', 'power');
                    item.attr('data-uid', row.uid);
                    item.attr('data-oper', key);
                    item.addClass('btn');
                    item.addClass('btn-primary');
                    item.addClass('btn-xs');
                    items.append(item);
                });
                items.addClass('btn-group');
                var item = $('<td></td>');
                item.append(items);
                line.append(item);
            }
            $('#powertable').append(line);
        });
        $('button[data-kind="power"]').click(function() {
            var uid = $(this).attr('data-uid');
            var oper = $(this).attr('data-oper');
            $.post('power', {
                uid: uid,
                oper: oper
            }, function(data, status) {
                $('td[data-uid=' + uid + '][data-for="power"]').text(oper);
            });
        });
    }

    $('#powerall').click(function() {
        $.get('search/user?all=1', function(data, status) {
            gotUserList(data, status);
        });
    });
    $('#poweruid').click(function() {
        $.getJSON('search/user', {
            uid: $('#iuserid').val()
        }, function(data, status) {
            gotUserList(data, status);
        });
    });
    $('#powername').click(function() {
        $.getJSON('search/user', {
            name: $('#iusername').val()
        }, function(data, status) {
            gotUserList(data, status);
        });
    });
});
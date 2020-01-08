$(function() {

    function getToken() {
        return Math.random().toString(36).substr(2) + '-' + new Date().getTime();
    }

    function brTagConvert(str) {
        return str.replace(/\n|\r\n/g, '<br>');
    };

    function submitCode(token, pid, tag, code, motivate) {
        $.post('/submit', {
            token: token,
            pid: pid,
            tag: tag,
            code: code,
            stim: motivate
        }, function(data, status) {
            console.log(data, status);
            location.pathname = '/status';
        });
    }

    $('.submit-btn').click(function() {
        $(this).attr('disabled', true);
        $(this).removeClass('btn-danger');
        $(this).addClass('btn-success');
        $(this).text('提交中，等待响应');
        var code = brTagConvert(getCode());
        var pid = location.pathname.match(/\d{4}$/)[0];
        var tag = $('#tagname').val();
        var token = getToken();
        if ($('#motUpl').val()) {
            var uurl = $('#bigbus').attr('action');
            $('#bigbus').attr('action', uurl + '/' + token);
            var data = new FormData($('#bigbus')[0]);
            $.ajax({
                url : $('#bigbus').attr('action'),
                type : 'POST',
                cache : false,
                data : data,
                processData : false,
                contentType : false
            }).done(function(res) {
                submitCode(token, pid, tag, code, '#&!upload>');
            }).fail(function(res) {
                alert('Upload Error!');
            });
        } else {
            var stim = $('#stimCode').val();
            submitCode(token, pid, tag, code, brTagConvert(stim));
        }
    });

});
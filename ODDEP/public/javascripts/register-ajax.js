$(function() {
    var rock = "yvykf07ej800be29TAOLIDIXIACHEDUI8nzoyyz0z5lsdcxr";
    var submit_available = 0;
    $('.alert-danger').hide();
    $('#username').change(function() {
        $.get('register/nameexists?username=' + $('#username').val(), function(data, status) {
            console.log(data, status);
            if (data === 'ok') {
                $('#usernameinput').removeClass('has-error');
                $('#usernameinput').addClass('has-success');
                $('.btn').removeClass('disabled');
                $('#alertusername').hide();
                submit_available |= 1;
            } else {
                $('#usernameinput').removeClass('has-success');
                $('#usernameinput').addClass('has-error');
                $('.btn').addClass('disabled');
                $('#alertusername').show();
                submit_available &= submit_available ^ 1;
            }
        });
    });
    $('#registerbtn').click(function() {
        console.log(submit_available);
        if (submit_available === 7) {
            $.post("", {
                username:$('#username').val(),
                nickname:$('#nickname').val(),
                password:md5($('#password').val() + $('#username').val() + rock)
            }, function(data, status) {
                console.log(data, status);
                if (data === 'ok') {
                    location.href = '/auth/login';
                } else {
                    $('#failed').show();
                }
            });
        }
    });
    var checkPwd = function() {
        if ($('#vepassword').val() === $('#password').val()) {
            $('.pwd').removeClass('has-error');
            $('.pwd').addClass('has-success');
            submit_available |= 2;
            $('#alertpasswd').hide();
        } else {
            $('.pwd').removeClass('has-success');
            $('.pwd').addClass('has-error');
            submit_available &= submit_available ^ 2;
            $('#alertpasswd').show();
        }
    };
    $('#password').change(function() {
        if ($('#vepassword').val()) {
            checkPwd();
        }
    });
    $('#vepassword').change(checkPwd);
    $('#nickname').change(function() {
        if ($('#nickname').val()) {
            submit_available |= 4;
            $('#nickinput').removeClass('has-error');
            $('#nickinput').addClass('has-success');
        } else {
            submit_available &= submit_available ^ 4;
            $('#nickinput').addClass('has-error');
            $('#nickinput').removeClass('has-success');
        }
    });
});
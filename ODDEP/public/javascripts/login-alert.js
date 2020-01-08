$(function() {
    var rock = "yvykf07ej800be29TAOLIDIXIACHEDUI8nzoyyz0z5lsdcxr";
    console.log('loaded');
    window.onhashchange = function() {
        if (location.hash === '#err') {
            $('.alert-danger').show();
        } else {
            $('.alert-danger').hide();
        }
    };
    window.onhashchange();

    $('#rawpass').on('input', function() {
        var username = $('#username').val();
        var rawpass = $(this).val();
        $('#password').val(md5(rawpass + username + rock));
    });
});
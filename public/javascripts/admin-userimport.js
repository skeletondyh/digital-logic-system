$(function() {
    var prepared = 0;
    $('iframe[name="userimportuplres"]').load(function() {
        $('#userimportbtn').removeClass('hidden');
        prepared = 1;
    });

    $('#uimpupl').fileinput({
        language: "zh",
        maxFileSize: 100
    });

    $('#userimportbtn').click(function() {
        if (!prepared) return ;
        prepared = 0;
        $(this).removeClass('btn-danger');
        $(this).addClass('btn-warning');
        $(this).text('请求已发送，处理中');
        $(this).attr('disabled', true);
        var ctx = $(this);
        $.ajax({
            url:'userimport',
            context: ctx,
            type: 'POST',
            success: function(result, status, xhr) {
                this.text('导入成功');
                this.removeClass('btn-warning');
                this.addClass('btn-success');
                this.attr('disabled', null);
            },
            error: function(xhr, status, error) {
                this.text('错误：' + xhr.status + ' ' + xhr.statusText);
                this.removeClass('btn-warning');
                this.addClass('btn-link');
                alert(this.text());
                this.attr('disabled', null);
            }
        });
    })
});
$(function() {
    var editor = ace.edit('editor');
    editor.setTheme("ace/theme/eclipse");
    editor.getSession().setMode('ace/mode/html');
    editor.setOptions({
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true
    });

    // 配置上传控件
    $("#stdmotivate").fileinput({
        language: "zh",
        allowedFileExtensions: ['vhd'],
        maxFileSize: 50
    });
    $("#stdinput").fileinput({
        language: "zh",
        allowedFileExtensions: ['in'],
        maxFileSize: 50
    });
    $("#stdanswer").fileinput({
        language: "zh",
        allowedFileExtensions: ['ans'],
        maxFileSize: 50
    });

    var plain = false;
    var codep = false;

    $('input[type="radio"][value="html"]').click(function() {
        editor.getSession().setMode('ace/mode/html');
        plain = false;
    });
    $('input[type="radio"][value="plain"]').click(function() {
        editor.getSession().setMode('ace/mode/plain_text');
        plain = true;
    });

    $('#typeVisual').click(function() {
        $('#form4visual').show();
        codep = false;
    });
    $('#typeCode').click(function() {
        $('#form4visual').hide();
        codep = true;
    });

    var limit = {};
    $('input[data-type="limit"]').on('pickle-limits', function() {
        limit[$(this).attr('name')] = parseInt($(this).val()) || 99;
    });
    $('input[data-type="limit"]').change(function() {
        $(this).trigger('pickle-limits');
    });

    if ($('#typeCode').attr('checked')) {
        $('#form4visual').hide();
        codep = true;
    }

    $('#submitbtn').click(function() {
        if (codep) {
            limit = ["code"];
        } else {
            $('input[data-type="limit"]').trigger('pickle-limits');
        }
        $(this).attr('disabled', true);
        $(this).removeClass('btn-danger');
        $(this).addClass('btn-success');
        $(this).text('已提交，等待响应中');
        var text = editor.getValue();
        if (plain) {
            text = text.replace(/\r\n|\n/g, '<br>');
        }
        $.post(location.href, {
            title: $('#titleInput').val(),
            source: $('#sourceInput').val(),
            limits: JSON.stringify(limit),
            description: text
        }, function(data, status) {
            console.log(status);
            if (status === 'success') {
                if (location.href.match(/new/)) {
                    location.href = location.href.replace('edit/new', '');
                } else {
                    location.href = location.href.replace('edit/', '');
                }
            } else {
                alert(status);
            }
        });
    })
});
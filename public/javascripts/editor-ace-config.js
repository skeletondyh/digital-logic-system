$(function() {
    var editor = ace.edit("vhdlACE");
    editor.setTheme("ace/theme/white");//white monokai
    editor.getSession().setMode("ace/mode/vhdl");
    editor.setOptions({
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true
    });

    $("#motUpl").fileinput({
        language: "zh",
        allowedFileExtensions: ['vhd'],
        maxFileSize: 50
    });

    editor.commands.addCommand({
        name: 'newFile',
        bindKey: {win: 'Ctrl+N', mac: 'Command+N'},
        exec: function(editor) {

        },
        readOnly: true
    });

    editor.commands.addCommand({
        name: 'saveFile',
        bindKey: {win: 'Ctrl+S', mac: 'Command+S'},
        exec: function(editor) {

        },
        readOnly: false
    });
});
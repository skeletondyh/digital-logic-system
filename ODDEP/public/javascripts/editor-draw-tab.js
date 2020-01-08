$(function() {
    $('body').css('min-height', '0px');
    $('#jumpToVHDL').click(function() {
        var writer = new draw2d.io.json.Writer();
        writer.marshal(app.view, function(json){
            var code = toVHDL(simplifyJSON(app.view, json));
            console.log(code);
            $('#vhdlPreview').text(code);
            $('#modalVHDL').modal({
                keyboard: true
            });
            prettyPrint();
        });
    });
});
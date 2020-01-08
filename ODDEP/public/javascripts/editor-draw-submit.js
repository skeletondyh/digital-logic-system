function getCode() {
    var writer = new draw2d.io.json.Writer();
    var code;
    writer.marshal(app.view, function(json){
        code = toVHDL(simplifyJSON(app.view, json));
        console.log(code);
    });
    while (code == undefined);
    return code;
}
$(function() {
    function parse_vcd(text) {
        var waveform = {};
        var tokens = text.match(/\S+/g);
        var lines = text.split("\n");
        // Get the date
        var index;
        for (index=0;lines[index] != "$date";index++) {}
        waveform.date = lines[index+1];

        // Compiler
        for (index=0;tokens[index] != "$version";index++) {}
        index++;
        var end_index;
        for (end_index = index; tokens[end_index] != "$end"; end_index++) {}
        waveform.compiler_version = tokens.slice(index,end_index).join(" ");

        // Timescale
        for (index=0; tokens[index] != "$timescale"; index++) []
            waveform.timescale = tokens[index+1];

        waveform.variables = {}
        for (index=0; !lines[index].match(/enddefinitions/); index++) {
            var line_tokens = lines[index].match(/\S+/g);
            if (line_tokens == null) continue;
            if (line_tokens[0] == "$var") {
                // $var is token 0
                var type = line_tokens[1];
                var size = line_tokens[2];
                var identifier = line_tokens[3];
                var reference = line_tokens[4];
                if (line_tokens[5] !== '$end') reference += line_tokens[5];
                waveform.variables[identifier] = {"type":type,
                    "size":size,
                    "identifier":identifier,
                    "reference":reference,
                    "values": []
                }
            }
        }
        // lines[index] is the last line before the value change section
        // The next line should be the beginning of variables
        index++;
        var current_time = 0;
        lines.slice(index).filter( function (line) { return !!line }).map( function (line) {
            if (line[0] == "#") {
                current_time = parseInt(line.slice(1));
            }
            else if (line[0] == "$") {
                // This is a directive
                // Ignore it for now
            }
            // The line is a value change
            else if (line[0] != "b") {
                waveform.variables[line.slice(1)].values.push({"time":current_time, "value":(isFinite(line[0])?parseInt(line[0],2):line[0])});
            }
            else { // This is a multibit value
                value = line.match(/\S+/g)[0].slice(1);
                name = line.match(/\S+/g)[1];
                value = isFinite(value)?parseInt(value,2):value;
                waveform.variables[name].values.push({"time":current_time,"value":value});
            }
        });
        waveform.maxTime = current_time;
        return waveform;
    }

    function display_as_text(waveform) {
        var root_element = document.getElementById("root");
        var compiler_div = document.createElement("div");
        compiler_div.appendChild(document.createTextNode("Wavedump created by :" + waveform.compiler_version));
        root_element.appendChild(compiler_div);
        var date_div = document.createElement("div");
        date_div.appendChild(document.createTextNode("Created on: " + waveform.date))
            root_element.appendChild(date_div);
    }

    function getCanvasCoordinates (id, clientX, clientY) {
        var canvasOffset = document.getElementById(id).getBoundingClientRect();
        var offsetX = canvasOffset.left;
        var offsetY = canvasOffset.top;
        return {"x":clientX-offsetX, "y":clientY-offsetY};
    }

    function draw_waveform(waveform,scale) {
        var ctxColor = new Array();
        ctxColor=["rgb(0,0,0)","rgb(255,235,205)","rgb(255,215,0)","rgb(65,105,225)","rgb(0,255,255)","rgb(34,139,34)","rgb(255,0,0)"];
        if (typeof scale === 'undefined') scale = 1;

        var canvas = document.getElementById("waveform_canvas");	
        var ctx = canvas.getContext("2d");
        var variableList = [];

        var height = 600;
        var width = 1100 * scale;
        var textwidth = 150;
        canvas.width.value = width;
        var waveform_height = 50;
        var waveform_bottom = 10;
        var waveform_top = waveform_bottom + waveform_height;

        var numberWaves = 0;
        for (v in waveform.variables) { numberWaves++; }
        height = numberWaves*(10+waveform_height);
        canvas.setAttribute("height",height);
        canvas.setAttribute("width",width);
        ctx.fillStyle = '#fff';
        ctx.fillRect(0,0,width,height);


        function timeToX (time) {
            return (width - textwidth) * (time/waveform.maxTime);
        }
        function xToTime (x) {
            return (x * waveform.maxTime) / (width - textwidth);
        }

        function yToIdentifier(y) {
            return variableList[Math.floor(y/60)];
        }

        function timeToValue(variable,time) {
            var value = variable.values[0].value;
            for (i in variable.values) {
                if (variable.values[i].time > time) {
                    return value;
                }
                value = variable.values[i].value;
            }
            return value;
        }
        var sm=0;
        for (v in waveform.variables) {
            variable = waveform.variables[v];
            var maxValue = 0;
            for (i in variable.values) {
                if (variable.values[i].value > maxValue)
                    maxValue = variable.values[i].value;
            }
            variableList.push(v)
                ctx.beginPath();
            var x = timeToX(0);
            var y = waveform_bottom;
            ctx.fillStyle = variableList.length%2?"rgb(240,240,240)":"rgb(255,255,255)";
            ctx.fillRect(0,waveform_bottom-5,width,waveform_top-5);
            ctx.fillStyle = "rgb(0,0,0)";
            ctx.moveTo(x,y);
            for (i = 0; i < variable.values.length; i++) {
                x = timeToX(variable.values[i].time);
                ctx.lineTo(x,y);
                y = waveform_top - waveform_height*variable.values[i].value/maxValue;
                ctx.lineTo(x,y);
                if (String(variable.values[i].value).match('z')) {
                    var oldStyle = ctx.fillStyle;
                    ctx.fillStyle = "rgb(200,200,255)";
                    ctx.fillRect(x,waveform_bottom-5,timeToX((i+1<variable.values.length)?variable.values[i+1].time:waveform.maxTime),waveform_top-5);
                    ctx.fillStyle = oldStyle;
                }
                if (String(variable.values[i].value).match('x')) {
                    var oldStyle = ctx.fillStyle;
                    ctx.fillStyle = "rgb(200,255,200)";
                    ctx.fillRect(x,waveform_bottom-5,timeToX((i+1<variable.values.length)?variable.values[i+1].time:waveform.maxTime),waveform_top-5);
                    ctx.fillStyle = oldStyle;
                }
            }
            x = timeToX(waveform.maxTime);

            ctx.lineTo(x,y);
            sm=sm % 7;
		    ctx.strokeStyle = ctxColor[sm];
		    sm =sm + 1;
            ctx.stroke();
            ctx.font = "16pt Helvetica";
            ctx.fillText(variable.reference,x,waveform_bottom + waveform_height/2);
            waveform_bottom += waveform_height+10;
            waveform_top += waveform_height+10;
        }
        function mouseHandler (e) {
            coord = getCanvasCoordinates("waveform_canvas",e.clientX,e.clientY);
            var tooltipDiv = document.getElementById("tooltip_div");
            var newText = "Time: " + Math.floor(xToTime(coord.x));
            newText += " Wave: " + waveform.variables[yToIdentifier(coord.y)].reference;
            newText += " Value: " + timeToValue(waveform.variables[yToIdentifier(coord.y)],xToTime(coord.x));
            tooltipDiv.childNodes[0].replaceData(0,100,newText);
            tooltipDiv.style.left = e.clientX+10+'px';
            tooltipDiv.style.top = e.clientY+'px';
        }
        canvas.addEventListener('mousemove',mouseHandler);
        document.getElementById("tooltip_div").addEventListener('mousemove',mouseHandler);
    }



    var token = $('#topdiv').attr('data-token');
    $.get('/tmp/code/' + token + '.vhd', function(data, status) {
        console.log('code preview:', status);
        $('#codePre').text(data);
        prettyPrint();
    });
    $.get('/tmp/log/' + token + '.log', function(data, status) {
        console.log('log preview:', status);
        $('#debugInfo').text(data);
    });

    $('#linkCode').attr('href', '/status/download/code/' + token);
    $('#linkMotivate').attr('href', '/status/download/motivate/' + token);
    $('#linkVCD').attr('href', '/status/download/vcd/' + token);

    $.get($('#linkVCD').attr('href'), function(data, status) {
        console.log(status);
        if (status === 'success') {
            var waveform = parse_vcd(data);
            draw_waveform(waveform);
            var scale = 1;
            $('#zoom_in').click(function() {
                scale *= 1.5;
                draw_waveform(waveform, scale);
            });
            $('#zoom_out').click(function() {
                if (scale > 0.7) scale *= 0.66667;
                draw_waveform(waveform, scale);
            });
            $('#zoom_origin').click(function() {
                scale = 1;
                draw_waveform(waveform, scale);
            });
        }
    });
});

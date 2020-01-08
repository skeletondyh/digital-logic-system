function addLibrary() {
    var width = window.innerWidth;
    var height = window.innerHeight;

    var tween = null;

    var chipInfos = [
        { id: '74LS00', description: '四-二输入与非门', },
        { id: '74LS04', description: '六反相器' },
        { id: '74LS11', description: '三输入与非门' },
        { id: '74LS14', description: '六反相器（施密特触发）' },
        { id: '74LS20', description: '二-四输入与非门' },
        { id: '74LS27', description: '三-三输入与非门' },
        { id: '74LS86', description: '四-二输入异或门' },
        { id: '74LS74', description: '双D触发器（正沿触发）' },
        { id: '74LS75', description: '四位双稳态锁存器' },
        { id: '74LS85', description: '4位数值比较器' },
        { id: '74LS90', description: '二-五-十进制计数器' },
        { id: '74LS125', description: '三态输出四总线缓冲器' },
        { id: '74LS161', description: '4位二进制同步计数器' },
        { id: '74LS253', description: '双4选1数据选择器' }
    ];

    // END_OF_CHIP

    var stage = new Konva.Stage({
        container: 'container',
        width: $("#container").width(),
        height: 500
    });
    console.log('Stage: '+stage.container);

    var layer = new Konva.Layer();

    for (var i = 0; i < 14; i++) {
        //addStar(layer, stage);
        var info = chipInfos[i];
        info.position = {
            x: 10 + Math.floor(i / 5) * 70,
            y: (50 + 20) * (i % 5) + 10
        };
        addChip(info, layer);
    }
    stage.add(layer);
    // draw codes above
    console.log("After draw.");
}

function addChip(chipInfo, layer) {
    var chip = new Konva.Group({
        x: chipInfo.position.x,
        y: chipInfo.position.y,
        draggable: true
    });

    var chipName = new Konva.Text({
        x: 10 + chipInfo.position.x,
        y: 10 + chipInfo.position.y,
        text: chipInfo.id,
        fontSize: 25,
        fontFamily: 'Calibri',
        align: 'center'
    });

    var rect = new Konva.Rect({
        x: chipInfo.position.x,
        y: chipInfo.position.y,
        width: 110,
        height: 50,
        fill: '#b0b4ba',
        stroke: 'black',
        strokeWidth: 4
    });

    chip.add(rect);
    chip.add(chipName);

    for (var i = 1; i <= 14; i++) {
        var pin = new Konva.Circle({
            x: chipPinX(chip, i),
            y: chipPinY(chip, i),
            radius: 5,
            fill: 'b0b4ba',
            stroke: 'black',
            strokeWidth: 4
        });
        chip.add(pin);
    }

    chip.on('mouseover', function() {
        document.body.style.cursor = 'pointer';
    });
    chip.on('mouseout', function() {
        document.body.style.cursor = 'default';
    });


    layer.add(chip);
}

// chip here
function chipPinX(chip, index) {
    if (index <= 7)
        index -= 1;
    else
        index = 14 - index;
    return index * 15 + 10 + chip.attrs.x;
}

function chipPinY(chip, index) {
    if (index <= 7)
        return 0 + chip.attrs.y;
    return 50 + chip.attrs.y;
}

// addLibrary();
/*       以下为转VHDL的测试输入       */
var chipInfos = [{
        "id": "74LS00",
        "description": "四-二输入与非门",
        "pin": { "in": ["port1", "port2", "port4", "port5", "port7", "port9", "port10", "port12", "port13", "port14"], "out": ["port3", "port6", "port8", "port11"], "buffer": [] }
    },
    {
        "id": "74LS04",
        "description": "六反相器",
        "pin": { "in": ["port1", "port3", "port5", "port7", "port9", "port11", "port13", "port14"], "out": ["port2", "port4", "port6", "port8", "port10", "port12"], "buffer": [] }
    },
    {
        "id": "74LS11",
        "description": "三输入与门",
        "pin": { "in": ["port1", "port2", "port3", "port4", "port5", "port7", "port9", "port10", "port11", "port13", "port14"], "out": ["port6", "port8", "port12"], "buffer": [] }
    },
    {
        "id": "74LS14",
        "description": "六反相器（施密特触发）",
        "pin": { "in": ["port1", "port3", "port5", "port7", "port9", "port11", "port13", "port14"], "out": ["port2", "port4", "port6", "port8", "port10", "port12"], "buffer": [] }
    },
    {
        "id": "74LS20",
        "description": "二-四输入与非门",
        "pin": { "in": ["port1", "port2", "port3", "port4", "port5", "port7", "port9", "port10", "port11", "port12", "port13", "port14"], "out": ["port6", "port8"], "buffer": [] }
    },
    {
        "id": "74LS27",
        "description": "三-三输入与非门",
        "pin": { "in": ["port1", "port2", "port3", "port4", "port5", "port7", "port9", "port10", "port11", "port13", "port14"], "out": ["port6", "port8", "port12"], "buffer": [] }
    },
    {
        "id": "74LS86",
        "description": "四-二输入异或门",
        "pin": { "in": ["port1", "port2", "port4", "port5", "port7", "port9", "port10", "port12", "port13", "port14"], "out": ["port3", "port6", "port8", "port11"], "buffer": [] }
    },
    {
        "id": "74LS74",
        "description": "双D触发器（正沿触发）",
        "pin": { "in": ["port1", "port2", "port3", "port4", "port7", "port10", "port11", "port12", "port13", "port14"], "out": ["port5", "port6", "port8", "port9"], "buffer": [] }
    },
    {
        "id": "74LS75",
        "description": "四位双稳态锁存器",
        "pin": { "in": ["port2", "port3", "port4", "port5", "port6", "port7", "port12", "port13"], "out": ["port1", "port8", "port9", "port10", "port11", "port14", "port15", "port16"], "buffer": [] }
    },
    {
        "id": "74LS85",
        "description": "4位数值比较器",
        "pin": { "in": ["port1", "port2", "port3", "port4", "port8", "port9", "port10", "port11", "port12", "port13", "port14", "port15", "port16"], "out": ["port5", "port6", "port7"], "buffer": [] }
    },
    {
        "id": "74LS90",
        "description": "二-五-十进制计数器",
        "pin": { "in": ["port1", "port2", "port3", "port4", "port5", "port6", "port7", "port10", "port13", "port14"], "out": ["port12"], "buffer": ["port8", "port9", "port11"] }
    },
    {
        "id": "74LS125",
        "description": "三态输出四总线缓冲器",
        "pin": { "in": ["port1", "port2", "port4", "port5", "port7", "port9", "port10", "port12", "port13", "port14"], "out": ["port3", "port6", "port8", "port11"], "buffer": [] }
    },
    {
        "id": "74LS161",
        "description": "4位二进制同步计数器",
        "pin": { "in": ["port1", "port2", "port3", "port4", "port5", "port6", "port7", "port8", "port9", "port10", "port16"], "out": ["port15"], "buffer": ["port11", "port12", "port13", "port14"] }
    },
    {
        "id": "74LS253",
        "description": "双4选1数据选择器",
        "pin": { "in": ["port1", "port2", "port3", "port4", "port5", "port6", "port8", "port10", "port11", "port12", "port13", "port14", "port15", "port16"], "out": ["port7", "port9"], "buffer": [] }
    }
];
//测试用全加器元件导线list
var List = {
    "components": [{
            "id": "vcc",
            "type": "entity.VCC",
            "ports": {
                "Port": ["line1", "line2", "line3"]
            }
        },
        {
            "id": "gnd",
            "type": "entity.GND",
            "ports": {
                "Port": ["line9", "line14"]
            }
        },
        {
            "id": "74LS00_1",
            "type": "chips.C74LS00",
            "ports": {
                "port1": ["line4"],
                "port2": ["line5"],
                "port3": ["line6"],
                "port4": ["line6"],
                "port5": ["line7"],
                "port6": ["line8"],
                "port7": ["line9"],
                "port8": ["line10"],
                "port9": ["line11"],
                "port10": ["line12"],
                "port11": ["line13"],
                "port12": ["line3"],
                "port13": ["line10"],
                "port14": ["line2"]
            }
        },
        {
            "id": "74LS86_1",
            "type": "chips.C74LS86",
            "ports": {
                "port1": ["line15"],
                "port2": ["line16"],
                "port3": ["line17"],
                "port4": [],
                "port5": [],
                "port6": [],
                "port7": ["line14", "line18"],
                "port8": ["line19"],
                "port9": ["line11", "line20"],
                "port10": ["line12", "line21"],
                "port11": ["line21"],
                "port12": ["line5", "line22"],
                "port13": ["line4", "line23"],
                "port14": ["line7", "line24", "line15", "line1"]
            }
        },
        {
            "id": "74LS27_1",
            "type": "chips.C74LS27",
            "ports": {
                "port1": ["line13"],
                "port2": ["line25"],
                "port3": ["line16"],
                "port4": [],
                "port5": [],
                "port6": [],
                "port7": [],
                "port8": [],
                "port9": [],
                "port10": [],
                "port11": [],
                "port12": [],
                "port13": ["line8"],
                "port14": ["line24"]
            }
        },
        {
            "id": "input_1",
            "type": "draw2d_circuit_switch_HighLow",
            "ports": {
                "Port": ["line23"]
            }
        },
        {
            "id": "input_2",
            "type": "draw2d_circuit_switch_HighLow",
            "ports": {
                "Port": ["line22"]
            }
        },
        {
            "id": "input_3",
            "type": "draw2d_circuit_switch_HighLow",
            "ports": {
                "Port": ["line20"]
            }
        },
        {
            "id": "output_1",
            "type": "draw2d_circuit_display_Led",
            "ports": {
                "Port": ["line19"]
            }
        },
        {
            "id": "output_2",
            "type": "draw2d_circuit_display_Led",
            "ports": {
                "Port": ["line17"]
            }
        }
    ],
    "connections": [
        { "type": "draw2d.Connection", "id": "line1", "source": { "node": "vcc", "port": "port1" }, "target": { "node": "74LS86_1", "port": "port14" } },
        { "type": "draw2d.Connection", "id": "line2", "source": { "node": "vcc", "port": "port1" }, "target": { "node": "74LS00_1", "port": "port14" } },
        { "type": "draw2d.Connection", "id": "line3", "source": { "node": "vcc", "port": "port1" }, "target": { "node": "74LS00_1", "port": "port12" } },
        { "type": "draw2d.Connection", "id": "line4", "source": { "node": "74LS00_1", "port": "port1" }, "target": { "node": "74LS86_1", "port": "port13" } },
        { "type": "draw2d.Connection", "id": "line5", "source": { "node": "74LS00_1", "port": "port2" }, "target": { "node": "74LS86_1", "port": "port12" } },
        { "type": "draw2d.Connection", "id": "line6", "source": { "node": "74LS00_1", "port": "port3" }, "target": { "node": "74LS00_1", "port": "port4" } },
        { "type": "draw2d.Connection", "id": "line7", "source": { "node": "74LS00_1", "port": "port5" }, "target": { "node": "74LS86_1", "port": "port14" } },
        { "type": "draw2d.Connection", "id": "line8", "source": { "node": "74LS00_1", "port": "port6" }, "target": { "node": "74LS27_1", "port": "port13" } },
        { "type": "draw2d.Connection", "id": "line9", "source": { "node": "74LS00_1", "port": "port7" }, "target": { "node": "gnd", "port": "port1" } },
        { "type": "draw2d.Connection", "id": "line10", "source": { "node": "74LS00_1", "port": "port8" }, "target": { "node": "74LS00_1", "port": "port13" } },
        { "type": "draw2d.Connection", "id": "line11", "source": { "node": "74LS00_1", "port": "port9" }, "target": { "node": "74LS86_1", "port": "port9" } },
        { "type": "draw2d.Connection", "id": "line12", "source": { "node": "74LS00_1", "port": "port10" }, "target": { "node": "74LS86_1", "port": "port10" } },
        { "type": "draw2d.Connection", "id": "line13", "source": { "node": "74LS00_1", "port": "port11" }, "target": { "node": "74LS27_1", "port": "port1" } },
        { "type": "draw2d.Connection", "id": "line14", "source": { "node": "gnd", "port": "port1" }, "target": { "node": "74LS86_1", "port": "port7" } },
        { "type": "draw2d.Connection", "id": "line15", "source": { "node": "74LS86_1", "port": "port1" }, "target": { "node": "74LS86_1", "port": "port14" } },
        { "type": "draw2d.Connection", "id": "line16", "source": { "node": "74LS86_1", "port": "port2" }, "target": { "node": "74LS27_1", "port": "port3" } },
        { "type": "draw2d.Connection", "id": "line17", "source": { "node": "74LS86_1", "port": "port3" }, "target": { "node": "output_2", "port": "port1" } },
        { "type": "draw2d.Connection", "id": "line18", "source": { "node": "74LS86_1", "port": "port7" }, "target": { "node": "74LS27_1", "port": "port7" } },
        { "type": "draw2d.Connection", "id": "line19", "source": { "node": "74LS86_1", "port": "port8" }, "target": { "node": "output_1", "port": "port1" } },
        { "type": "draw2d.Connection", "id": "line20", "source": { "node": "74LS86_1", "port": "port9" }, "target": { "node": "input_3", "port": "port1" } },
        { "type": "draw2d.Connection", "id": "line21", "source": { "node": "74LS86_1", "port": "port10" }, "target": { "node": "74LS86_1", "port": "port11" } },
        { "type": "draw2d.Connection", "id": "line22", "source": { "node": "74LS86_1", "port": "port12" }, "target": { "node": "input_2", "port": "port1" } },
        { "type": "draw2d.Connection", "id": "line23", "source": { "node": "74LS86_1", "port": "port13" }, "target": { "node": "input_1", "port": "port1" } },
        { "type": "draw2d.Connection", "id": "line24", "source": { "node": "74LS86_1", "port": "port14" }, "target": { "node": "74LS27_1", "port": "port14" } },
        { "type": "draw2d.Connection", "id": "line25", "source": { "node": "74LS27_1", "port": "port2" }, "target": { "node": "74LS27_1", "port": "port7" } }
    ]
};
// List=adder_1bit;
// List=addPin();
var signalList; //=signalListMake();

//添加entity中port部分
function entityPort(string) {
    var flagIn = 0;
    var flagOut = 0;
    for (var i = 0; i < List.components.length; i++) {
        if (List.components[i].type == "draw2d_circuit_switch_HighLow") {
            if (flagIn == 0) {
                List.components[i].id = "input_" + (flagIn + 1);
                string = string + "    PORT(\n        " + List.components[i].id;
            } else {
                List.components[i].id = "input_" + (flagIn + 1);
                string = string + "," + List.components[i].id;
            }
            flagIn++;
        }
    }
    if (flagIn != 0)
        string = string + ":in STD_LOGIC";
    for (var i = 0; i < List.components.length; i++) {
        if (List.components[i].type == "draw2d_circuit_display_Led") {
            if (flagIn + flagOut == 0) {
                List.components[i].id = "output_" + (flagOut + 1);
                string = string + "    PORT(\n        " + List.components[i].id;
            } else if (flagOut == 0) {
                List.components[i].id = "output_" + (flagOut + 1);
                string = string + ";\n        " + List.components[i].id;
            } else {
                List.components[i].id = "output_" + (flagOut + 1);
                string = string + "," + List.components[i].id;
            }
            flagOut++;
        }
    }
    if (flagOut != 0)
        string = string + ":out STD_LOGIC";
    if (flagIn + flagOut != 0)
        string = string + "\n    );\n";
    return string;
}

//添加component部分
function architectureComponents(string) {
    var comp = {};
    var len = 0;
    for (var i = 0; i < List.components.length; i++) {
        if ((List.components[i].type != "input") && (List.components[i].type != "output") && (List.components[i].type != "vcc") && (List.components[i].type != "gnd")) {
            if (len > 0) {
                var flag = 0;
                for (var j = 0; j < len; j++) {
                    if (comp[j] == List.components[i].type) { flag = 1; break; }
                }
                if (flag == 0) {
                    comp[len] = List.components[i].type;
                    len++;
                }
            } else {
                comp[len] = List.components[i].type;
                len++;
            }
        }
    }
    for (var i = 0; i < len; i++) {
        for (var j = 0; j < chipInfos.length; j++) {
            if ("chips.C" + chipInfos[j].id == comp[i]) {
                string = string + "    COMPONENT " + "C" + chipInfos[j].id + "\n        PORT(\n";
                string = string + "            " + chipInfos[j].pin.in + ":in STD_LOGIC;\n            " + chipInfos[j].pin.out + ":out STD_LOGIC";
                if (chipInfos[j].pin.buffer.length != 0) {
                    string = string + ";\n            " + chipInfos[j].pin.buffer + ":buffer STD_LOGIC";
                }
                string = string + "\n        );\n    END COMPONENT;\n";
            }
        }

    }
    return string;
}

//添加需要的signal
function architectureSignals(string) {
    var num = 0;
    for (var i = 0; i < signalList.length; i++) {
        if (signalList[i].signalid > num) {
            num = signalList[i].signalid;
        }
    }

    for (i = 0; i <= num; i++) {
        if (i == 0) {
            string = string + "    SIGNAL ";
            string = string + "signal_empty";
        } else {
            string = string + ",";
            string = string + "signal_" + i;
        }
    }
    string = string + ":STD_LOGIC;\n"
    return string;
}

//添加实体语句，包括component应用和连线翻译成语句
function archBegin(string) {
    var num = 1;
    //加component
    for (var i = 0; i < List.components.length; i++) {
        if ((List.components[i].type != "draw2d_circuit_switch_HighLow") && (List.components[i].type != "draw2d_circuit_display_Led") && (List.components[i].type != "entity.VCC") && (List.components[i].type != "entity.GND")) {
            for (var j = 0; j < chipInfos.length; j++) {
                if ("chips.C" + chipInfos[j].id == List.components[i].type) {
                    string = string + "    u" + num + ":C" + chipInfos[j].id + " PORT MAP(";
                }
            }
            //+List.components[i].id+"_in1,"+List.components[i].id+"_in2,"+List.components[i].id+"_out1"
            for (var j in List.components[i].pin) {
                if (j != "port1")
                    string = string + ",";
                string = string + "\n        "
                string = string + j + "=>";
                if (List.components[i].pin[j].length != 0) {
                    for (var k = 0; k < signalList.length; k++) {
                        if (List.components[i].pin[j][0] == signalList[k].id) {
                            string = string + "signal_" + signalList[k].signalid;
                        }
                    }
                    //List.components[i].pin[j][0];
                } else {
                    for (var k = 0; k < chipInfos.length; k++) {
                        if ("chips.C" + chipInfos[k].id == List.components[i].type) {
                            var isIn = false;
                            for (var p = 0; p < chipInfos[k].pin.in.length; p++) {
                                if (chipInfos[k].pin.in[p] == j) {
                                    string = string + "signal_empty";
                                    isIn = true;
                                    break;
                                }
                            }
                            if (isIn == false) {
                                string = string + "OPEN";
                            }
                        }
                    }
                }
            }
            string = string + "\n    );\n";
            num++;
        }
    }
    string = string + "    signal_empty <= '0';\n";
    //vcc
    for (var i = 0; i < List.components.length; i++) {
        if (List.components[i].type == "entity.VCC") {

            if (List.components[i].pin.Port.length != 0) {
                for (var k = 0; k < signalList.length; k++) {
                    if (List.components[i].pin.Port[0] == signalList[k].id) {
                        string = string + "    signal_" + signalList[k].signalid + " <= '1';\n";
                    }
                }
                //List.components[i].pin[j][0];
            }
        }
    }
    //gnd
    for (var i = 0; i < List.components.length; i++) {
        if (List.components[i].type == "entity.GND") {

            if (List.components[i].pin.Port.length != 0) {
                for (var k = 0; k < signalList.length; k++) {
                    if (List.components[i].pin.Port[0] == signalList[k].id) {
                        string = string + "    signal_" + signalList[k].signalid + " <= '0';\n";
                    }
                }
                //List.components[i].pin[j][0];
            }
        }
    }
    //input
    for (var i = 0; i < List.components.length; i++) {
        if (List.components[i].type == "draw2d_circuit_switch_HighLow") {

            if (List.components[i].pin.Port.length != 0) {
                for (var k = 0; k < signalList.length; k++) {
                    if (List.components[i].pin.Port[0] == signalList[k].id) {
                        string = string + "    signal_" + signalList[k].signalid + " <= " + List.components[i].id + ";\n";
                    }
                }
                //List.components[i].pin[j][0];
            }
        }
    }
    //output
    for (var i = 0; i < List.components.length; i++) {
        if (List.components[i].type == "draw2d_circuit_display_Led") {

            if (List.components[i].pin.Port.length != 0) {
                for (var k = 0; k < signalList.length; k++) {
                    if (List.components[i].pin.Port[0] == signalList[k].id) {
                        string = string + "    " + List.components[i].id + " <= " + "signal_" + signalList[k].signalid + ";\n";
                    }
                }
                //List.components[i].pin[j][0];
            }
        }
    }

    return string;
}

function signalListMake() {
    var num = 0;
    for (var i = 0; i < List.connections.length; i++) {
        List.connections[i].signalid = undefined;
        if (i == 0) {
            num++;
            List.connections[i].signalid = num;
        } else {
            for (var j = 0; j < i; j++) {
                if (((List.connections[j].source.node == List.connections[i].source.node) && (List.connections[j].source.port == List.connections[i].source.port)) || ((List.connections[j].source.node == List.connections[i].target.node) && (List.connections[j].source.port == List.connections[i].target.port)) || ((List.connections[j].target.node == List.connections[i].source.node) && (List.connections[j].target.port == List.connections[i].source.port)) || ((List.connections[j].target.node == List.connections[i].target.node) && (List.connections[j].target.port == List.connections[i].target.port))) {
                    List.connections[i].signalid = List.connections[j].signalid;
                    break;
                }
            }
            if (List.connections[i].signalid == undefined) {
                num++;
                List.connections[i].signalid = num;
            }
        }
    }
    return signalList = List.connections;
}

function addPin() {
    for (var i = 0; i < List.components.length; i++) {
        switch (List.components[i].type) {
            case "entity.VCC":
            case "entity.GND":
            case "draw2d_circuit_switch_HighLow":
            case "draw2d_circuit_display_Led":
                List.components[i].pin = { "Port": [] };
                break;
            case "chips.C74LS75":
            case "chips.C74LS85":
            case "chips.C74LS161":
            case "chips.C74LS253":
                List.components[i].pin = { "port1": [], "port2": [], "port3": [], "port4": [], "port5": [], "port6": [], "port7": [], "port8": [], "port9": [], "port10": [], "port11": [], "port12": [], "port13": [], "port14": [], "port15": [], "port16": [] };
                break;
            case "chips.C74LS00":
            case "chips.C74LS04":
            case "chips.C74LS11":
            case "chips.C74LS14":
            case "chips.C74LS20":
            case "chips.C74LS27":
            case "chips.C74LS86":
            case "chips.C74LS74":
            case "chips.C74LS90":
            case "chips.C74LS125":
                List.components[i].pin = { "port1": [], "port2": [], "port3": [], "port4": [], "port5": [], "port6": [], "port7": [], "port8": [], "port9": [], "port10": [], "port11": [], "port12": [], "port13": [], "port14": [] };
                break;
            default:
                List.components[i].pin = {};
                break;
        }
    }
    for (var i = 0; i < List.connections.length; i++) {
        for (var j = 0; j < List.components.length; j++) {
            if ((List.connections[i].source.node == List.components[j].id)) {
                for (var k in List.components[j].pin) {
                    if (k == List.connections[i].source.port) {
                        var len = List.components[j].pin[k].length;
                        List.components[j].pin[k][len] = List.connections[i].id;
                    }
                }
            }
            if (List.connections[i].target.node == List.components[j].id) {
                for (var k in List.components[j].pin) {
                    if (k == List.connections[i].target.port) {
                        var len = List.components[j].pin[k].length;
                        List.components[j].pin[k][len] = List.connections[i].id;
                    }
                }
            }
        }
    }
    return List;
}

function toVHDL(circuit) {
    List = circuit;
    var vhdl = VHDLCode.createNew(circuit);
    var code = vhdl.marshal();
    List = addPin();
    signalList = signalListMake();
    var lib = "library IEEE;\nUSE IEEE.STD_LOGIC_1164.ALL;\nUSE IEEE.STD_LOGIC_ARITH.ALL;\nUSE IEEE.STD_LOGIC_UNSIGNED.ALL;\n\n";
    var entity = "entity main is\n";
    entity = entityPort(entity);
    entity = entity + "end entity;\n\n";
    var arch = "architecture eo_digital of main is\n";
    arch = architectureComponents(arch);
    arch = architectureSignals(arch);
    arch = arch + "begin\n";
    arch = archBegin(arch);
    arch = arch + "end eo_digital;";
    var s = lib + entity + arch;
    return code; //s;
}

function logCanvas(canvas) {
    var writer = new draw2d.io.json.Writer();
    writer.marshal(canvas, function(json) {
        console.log(JSON.stringify(json, null, 2));
    });
}

function simplifyJSON(canvas, circuit) {
    var newCircuit = {};
    var components = [];
    var connections = [];
    $.each(circuit, function(n, value) {
        if (value.type === "Connection") {
            var v = {};
            v.type = "draw2d.Connection";
            v.id = value.id;
            v.source = value.source;
            v.source.type = canvas.getFigure(v.source.node).cssClass;
            v.target = value.target;
            v.target.type = canvas.getFigure(v.target.node).cssClass;
            connections.push(v);
        } else {
            if (value.type === "draw2d_circuit_switch_HighLow") {
                var v = {};
                v.type = value.type;
                v.id = value.id;
                components.push(v);
                if (value.labels.length > 0) {
                    v.name = value.labels[0].text;
                }
            } else if (value.type === "draw2d_circuit_switch_PushButton") {
                var v = {};
                v.type = value.type;
                v.id = value.id;
                components.push(v);
                if (value.labels.length > 0) {
                    v.name = value.labels[0].text;
                }
            } else if (value.type === "draw2d_circuit_display_Led") {
                var v = {};
                v.type = value.type;
                v.id = value.id;
                if (value.labels.length > 0) {
                    v.name = value.labels[0].text;
                }
                components.push(v);
            } else if (value.type === "draw2d_circuit_pulse_50hz") {
                var v = {};
                v.type = value.type;
                v.id = value.id;
                if (value.labels.length > 0) {
                    v.name = value.labels[0].text;
                }
                components.push(v);
            } else if (value.type === "draw2d_circuit_pulse_10hz") {
                var v = {};
                v.type = value.type;
                v.id = value.id;
                if (value.labels.length > 0) {
                    v.name = value.labels[0].text;
                }
                components.push(v);
            } else if (value.type.startsWith("draw2d_circuit_")) {
                var v = {};
                v.type = value.type;
                v.id = value.id;
                v.componentInfo = getComponentInfo(value);
                if (value.labels.length > 0) {
                    v.name = value.labels[0].text;
                }
                components.push(v);
            } else if (value.type.startsWith("C74LS")) {
                var v = {};
                v.type = value.type; // "chips." + 
                v.id = value.id;
                v.componentInfo = getComponentInfo(value);
                if (value.labels.length > 0) {
                    v.name = value.labels[0].text;
                }
                components.push(v);
            } else {
                console.log(value.type + " is not in circuit.");
            }
        }
    });

    newCircuit.components = components;
    newCircuit.connections = connections;
    return newCircuit;
}

function sortByName(a, b) {
    return a.name.localeCompare(b.name);
}

function getComponentInfo(comp) {
    var result = "";
    if (!comp.type.startsWith("C74LS") && !comp.type.startsWith("draw2d_circuit_")) {
        return result;
    }
    var iw = IndentWriter.createNew();

    var _type = eval("new " + comp.type + "()");
    var ports = _type.getPorts();
    var inports = _type.getInputPorts().sort(sortByName);
    inports.data.sort();
    var outports = _type.getOutputPorts().sort(sortByName);
    outports.data.sort();
    
    if (_type.note != null) {
        iw.writeLine("-- " + _type.note);
    }
    iw.writeLine(["Component", comp.type, "IS", "PORT", "("].join(" "));
    iw.incIndent();

    for (var ip in inports.data) {
        var line = "";
        line += [inports.data[ip].name, ":", "in ", "STD_LOGIC"].join(" ");
        if (ip == inports.data.length - 1 && outports.data.length == 0) ;
        else { line += ";" }
        iw.writeLine(line);
    }
    for (var ip in outports.data) {
        var line = "";
        line += [outports.data[ip].name, ":", "out", "STD_LOGIC"].join(" ");
        if (ip == outports.data.length - 1) ;
        else { line += ";" }
        iw.writeLine(line);
    }
    iw.decIndent();
    iw.writeLine(");");
    iw.writeLine(["END", "Component;"].join(" "));
    result = iw.getContent();
    iw.flush();
    var info = {};
    info.info = result;
    info.ports = ports;
    return info;
}

//-----------------------------------------------------------------------------
// 说明：
// "draw2d_circuit_switch_HighLow" 是开关，只有一个输出端口 Port，用来代表输入信号
// "draw2d_circuit_display_Led" 是Led灯，只有一个端口 Port，代表输出信号
/*
var List = {
    "components": [
        // vcc, enable signal for chips
        {
            "type": "entity.VCC",
            "id": "vcc", // 67677-y78f-gy7f-ghm7-ghku88h7f6s4
            "ports": []
        },

        // gnd, ground signal for chips
        {
            "type": "entity.GND",
            "id": "gnd", // 8huk6-uyf6-rtfh-gtfh-gtyfhg6tfhgt
            "ports": []
        },

        // input a0
        {
            "type": "draw2d_circuit_switch_HighLow",
            "id": "switcha0", // -haod-udow-8ddh-8e3edwid9o2h
            "ports": []
        },

        // input a1
        // {
        //  "type": "draw2d_circuit_switch_HighLow",
        //  "id": "switcha1", // -ashd-aasl-iafj-laci9wdi29de
        //  "ports": []
        // },

        // input b0
        {
            "type": "draw2d_circuit_switch_HighLow",
            "id": "switchb0", // -ash0-i3ed-9jwm-dd9uekdma23s
            "ports": []
        },

        // input b1
        // {
        //  "type": "draw2d_circuit_switch_HighLow",
        //  "id": "switchb1", // -89hb-aash-ash2-l8inlidi29de
        //  "ports": []
        // },

        // output d0
        {
            "type": "draw2d_circuit_display_Led",
            "id": "d0",
            "ports": []
        },

        // output c0(carry)
        {
            "type": "draw2d_circuit_display_Led",
            "id": "c0",
            "ports": []
        },

        // nand gates
        {
            "type": "chips.C74LS00",
            "id": "c74ls00", // h-03de-3291-aea8-1d67a355a3b5
            "userData": {},
            "ports": [],
        },

        // not gates
        {
            "type": "chips.C74LS04",
            "id": "c74ls04", // b-5767-8155-c804-14bda7759dc2
            "userData": {},
            "ports": [],
        },

        // xor gate
        {
            "type": "chips.C74LS86",
            "id": "c74ls86", // a-a834-0221-2009-abc2d6bd852a
            "userData": {},
            "ports": [],
        }
    ],
    "connections": [
        {
            "type": "draw2d.Connection",
            "id": "inputa0", // a-dh27-akdh-uee8-dy2e82en8adu
            "source": {
                "node": "switcha0",
                "port": "Port"
            },
            "target": {
                "node": "c74ls86",
                "port": "port02"
            }
        },
        {
            "type": "draw2d.Connection",
            "id": "inputb0",
            "source": {
                "node": "switchb0",
                "port": "Port"
            },
            "target": {
                "node": "c74ls86",
                "port": "port01"
            }
        },
        {
            "type": "draw2d.Connection",
            "id": "dinput1",
            "source": {
                "node": "switcha0",
                "port": "Port"
            },
            "target": {
                "node": "c74ls00",
                "port": "port01"
            }
        },
        {
            "type": "draw2d.Connection",
            "id": "dinput2",
            "source": {
                "node": "switchb0",
                "port": "Port"
            },
            "target": {
                "node": "c74ls00h",
                "port": "port02"
            }
        },
        {
            "type": "draw2d.Connection",
            "id": "outputd0",
            "source": {
                "node": "c74ls86",
                "port": "port03"
            },
            "target": {
                "node": "d0",
                "port": "Port"
            }
        },
        {
            "type": "draw2d.Connection",
            "id": "a0_nand_b0",
            "source": {
                "node": "c74ls00",
                "port": "port03"
            },
            "target": {
                "node": "c74ls04s",
                "port": "port01"
            }
        },
        {
            "type": "draw2d.Connection",
            "id": "outputc0",
            "source": {
                "node": "c74ls86",
                "port": "port03"
            },
            "target": {
                "node": "c0",
                "port": "Port"
            }
        }
    ]
};*/
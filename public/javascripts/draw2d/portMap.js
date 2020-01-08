/*  create by LC on 2017.10.12
    solve the port-mapping problem and the connection problem
*/
const chip_map = {
    "draw2d_circuit_switch_HighLow" : "input",
    "draw2d_circuit_switch_PushButton" : "input",
    "draw2d_circuit_pulse_50hz" : "input",
    "draw2d_circuit_display_Led" : "output",
    "Vcc" : "Vcc",
    "GND" : "GND",
    "draw2d_circuit_display_7Segment" : "seg_output",
    "C74LS00" : "74LS00",
    "C74LS04" : "74LS04",
    "C74LS11" : "74LS11",
    "C74LS14" : "74LS14",
    "C74LS20" : "74LS20",
    "C74LS27" : "74LS27",
    "C74LS86" : "74LS86",
    "C74LS90" : "74LS90",
    "C74LS161" : "74LS161",
    "draw2d_circuit_decoder_BCDto7Seg" : "BCDto7Seg"
};


const port_map = {
    "input" : {
        "Port" : {port : 0, inout : "out"}, 
        "circle" : {port : 0, inout : "out"}},
        
    "output" : {"Port" : {port : 0, inout : "in"}},

    "Vcc" : {"Port_out" : {port : 0, inout : "out"}},
    "GND" : {"Port_out" : {port : 0, inout : "out"}},

    "BCDto7Seg": {
        "in_a" : {port : 1, inout : "in"},
        "in_b" : {port : 2, inout : "in"},
        "in_c" : {port : 3, inout : "in"},
        "in_d" : {port : 4, inout : "in"},
        "out_a" : {port : 5, inout : "out"},
        "out_b" : {port : 6, inout : "out"},
        "out_c" : {port : 7, inout : "out"},
        "out_d" : {port : 8, inout : "out"},
        "out_e" : {port : 9, inout : "out"},
        "out_f" : {port : 10, inout : "out"},
        "out_g" : {port : 11, inout : "out"}
    },

    "seg_output": {
        "port_a" : {port : 0, inout : "out"},
        "port_b" : {port : 1, inout : "out"},
        "port_c" : {port : 2, inout : "out"},
        "port_d" : {port : 3, inout : "out"},
        "port_e" : {port : 4, inout : "out"},
        "port_f" : {port : 5, inout : "out"},
        "port_g" : {port : 6, inout : "out"},

    },

    "74LS00" : {
        "Port_1A": {port : 1, inout : "in"},
        "Port_1B": {port : 2, inout : "in"},
        "Port_1Y": {port : 3, inout : "out"},
        "Port_2A": {port : 4, inout : "in"},
        "Port_2B": {port : 5, inout : "in"},
        "Port_2Y": {port : 6, inout : "out"},
        "Port_3A": {port : 9, inout : "in"},
        "Port_3B": {port : 10, inout : "in"},
        "Port_3Y": {port : 8, inout : "out"},
        "Port_4A": {port : 12, inout : "in"},
        "Port_4B": {port : 13, inout : "in"},
        "Port_4Y": {port : 11, inout : "out"},               
    },
    "74LS04" : {
        "Port_1A": {port : 1, inout : "in"},
        "Port_1Y": {port : 2, inout : "out"},
        "Port_2A": {port : 3, inout : "in"},
        "Port_2Y": {port : 4, inout : "out"},
        "Port_3A": {port : 5, inout : "in"},
        "Port_3Y": {port : 6, inout : "out"},
        "Port_4A": {port : 9, inout : "in"},
        "Port_4Y": {port : 8, inout : "out"},
        "Port_5A": {port : 11, inout : "in"},
        "Port_5Y": {port : 10, inout : "out"},
        "Port_6A": {port : 13, inout : "in"},
        "Port_6Y": {port : 12, inout : "out"},                
    },
    "74LS11" : {
        "Port_1A": {port : 1, inout : "in"},
        "Port_1B": {port : 2, inout : "in"},
        "Port_1C": {port : 13, inout : "in"},
        "Port_1Y": {port : 12, inout : "out"},  
        "Port_2A": {port : 3, inout : "in"},
        "Port_2B": {port : 4, inout : "in"},
        "Port_2C": {port : 5, inout : "in"},
        "Port_2Y": {port : 6, inout : "out"},  
        "Port_3A": {port : 9, inout : "in"},
        "Port_3B": {port : 10, inout : "in"},
        "Port_3C": {port : 11, inout : "in"},
        "Port_3Y": {port : 8, inout : "out"},                 
    },
    "74LS14" : {
        "Port_1A": {port : 1, inout : "in"},
        "Port_1Y": {port : 2, inout : "out"},
        "Port_2A": {port : 3, inout : "in"},
        "Port_2Y": {port : 4, inout : "out"},
        "Port_3A": {port : 5, inout : "in"},
        "Port_3Y": {port : 6, inout : "out"},
        "Port_4A": {port : 9, inout : "in"},
        "Port_4Y": {port : 8, inout : "out"},
        "Port_5A": {port : 11, inout : "in"},
        "Port_5Y": {port : 10, inout : "out"},
        "Port_6A": {port : 13, inout : "in"},
        "Port_6Y": {port : 12, inout : "out"},                
    },
    "74LS20" : {
        "Port_1A": {port : 1, inout : "in"},
        "Port_1B": {port : 2, inout : "in"},
        "Port_NC1": {port : 3, inout : "in"},
        "Port_1C": {port : 4, inout : "in"},
        "Port_1D": {port : 5, inout : "in"},
        "Port_1Y": {port : 6, inout : "out"},
        "Port_2A": {port : 9, inout : "in"},
        "Port_2Y": {port : 8, inout : "out"},
        "Port_NC2": {port : 11, inout : "in"},
        "Port_2B": {port : 10, inout : "in"},
        "Port_2D": {port : 13, inout : "in"},
        "Port_2C": {port : 12, inout : "in"},                
    },
    "74LS27" : {
        "Port_1A": {port : 1, inout : "in"},
        "Port_1B": {port : 2, inout : "in"},
        "Port_2A": {port : 3, inout : "in"},
        "Port_2B": {port : 4, inout : "in"},
        "Port_2C": {port : 5, inout : "in"},
        "Port_2Y": {port : 6, inout : "out"},
        "Port_3A": {port : 9, inout : "in"},
        "Port_3Y": {port : 8, inout : "out"},
        "Port_3C": {port : 11, inout : "in"},
        "Port_3B": {port : 10, inout : "in"},
        "Port_1C": {port : 13, inout : "in"},
        "Port_1Y": {port : 12, inout : "out"},                
    },
    "74LS86" : {
        "Port_1A": {port : 1, inout : "in"},
        "Port_1B": {port : 2, inout : "in"},
        "Port_1Y": {port : 3, inout : "out"},  
        "Port_2A": {port : 4, inout : "in"},
        "Port_2B": {port : 5, inout : "in"},
        "Port_2Y": {port : 6, inout : "out"},  
        "Port_3A": {port : 9, inout : "in"},
        "Port_3B": {port : 10, inout : "in"},
        "Port_3Y": {port : 8, inout : "out"},  
        "Port_4A": {port : 12, inout : "in"},
        "Port_4B": {port : 13, inout : "in"},
        "Port_4Y": {port : 11, inout : "out"},                 
    },
    "74LS90" : {
        "Port_Vcc":{port : 5, inout : "in"},   
        "Port_Q0": {port : 12, inout : "out"},  
        "Port_Q1": {port : 9, inout : "out"},  
        "Port_Q2": {port : 8, inout : "out"},  
        "Port_Q3": {port : 11, inout : "out"},  
        "Port_R1":  {port : 2, inout : "in"},
        "Port_R2": {port : 3, inout : "in"},
        "Port_NC1": {port : 4, inout : "in"},
        "Port_NC2":  {port : 13, inout : "out"},
        "Port_nCP_A":  {port : 14, inout : "in"},
        "Port_nCP_B":  {port : 1, inout : "in"},
        "Port_S1":  {port : 6, inout : "in"},
        "Port_S2":  {port : 7, inout : "in"},
        "Port_GND":{port : 10, inout : "in"},
    },
    "74LS161" : {
        "Port_Vcc":{port : 16, inout : "in"},  
        "Port_Co": {port : 15, inout : "out"},  
        "Port_Q0": {port : 14, inout : "out"},  
        "Port_Q1": {port : 13, inout : "out"},  
        "Port_Q2": {port : 12, inout : "out"},  
        "Port_Q3": {port : 11, inout : "out"},  
        "Port_T":  {port : 10, inout : "in"},
        "Port_nR": {port : 1, inout : "in"},
        "Port_CP": {port : 2, inout : "in"},
        "Port_A":  {port : 3, inout : "in"},
        "Port_B":  {port : 4, inout : "in"},
        "Port_C":  {port : 5, inout : "in"},
        "Port_D":  {port : 6, inout : "in"},
        "Port_P":  {port : 7, inout : "in"},
        "Port_GND":{port : 8, inout : "in"},
        "Port_nLD":{port : 9, inout : "in"},
    }

};

function portMap(json){
    var circuit = {};
    var map = {};
    var json_1 = [];
    var is_7seg = [];

    var seg_map = {
        "port_a" : 0,
        "port_b" : 1,
        "port_c" : 2,
        "port_d" : 3,
        "port_e" : 4,
        "port_f" : 5,
        "port_g" : 6
    }

    //console.log(json);
    
    //unfold the 7_segment

    for(x in json)
    {
        if(json[x].type !== "draw2d_circuit_display_7Segment" && json[x].type !== "Connection") json_1.push(json[x]);

        if(json[x].type === "draw2d_circuit_display_7Segment")
        {
            is_7seg.push(json[x].id);
            
            for(var i = 0; i < 7; ++i)
            {
                var temp = {type : "draw2d_circuit_display_Led", id : json[x].id + String(i), userData : {tagForWave : json[x].userData.tagForWave + "_port_" + String(i)}};
                json_1.push(temp);
            }
        }  
        
        if(json[x].type === "Connection" )
        {
            if(is_7seg.indexOf(json[x].target.node) !== -1)
            {

                var temp = {type : "Connection", source : {node : json[x].source.node, port : json[x].source.port}, target : {node : json[x].target.node + String(seg_map[json[x].target.port]), port : "Port"}};
                json_1.push(temp);
            }
            else
            {
                json_1.push(json[x]);
            }
        }
    }

    for(x in json_1)
    {
        if(json_1[x].type !== "Connection")
        {
            map[json_1[x].id] = String(x);
            circuit[map[json_1[x].id]] = {x:0, y:0, name: chip_map[json_1[x].type], inputs:{}, tag: json_1[x].userData.tagForWave, hash_id: json_1[x].id};
        }
        else
        {
            temp_out_index = map[json_1[x].target.node];
            temp_in_index = map[json_1[x].source.node];
            temp_out_port = port_map[circuit[temp_out_index].name][json_1[x].target.port].port;
            temp_in_port = port_map[circuit[temp_in_index].name][json_1[x].source.port].port;
            if(! circuit[temp_out_index].inputs[temp_out_port]) circuit[temp_out_index].inputs[temp_out_port] = [];
            circuit[temp_out_index].inputs[temp_out_port].push({"num" : temp_in_port, "parent" : parseInt(temp_in_index), "points" : [], "color" : "black", "shape" : 1});
        }
        
    }
    //console.log("circuit: ");
    //console.log(circuit);
    return circuit;

}

function connection_Correct(json)
{
    output = []
    map = {}
    //console.log(json);
    for(x in json)
    {
        if(json[x].type !== "Connection")
        {
            output.push(json[x]);
            map[json[x].id] = chip_map[json[x].type];
        }
        else
        {
            var temp = JSON.parse(JSON.stringify(json[x]));
            //console.log(json[x]);
            //console.log(port_map[map[json[x].source.node]]);
            //if(map[json[x].source.node] !== "input" && json[x].source.port[json[x].source.port.length - 1] !== "Y")
            if(port_map[map[json[x].source.node]][json[x].source.port].inout !== "out")
            {
                var tmp = JSON.parse(JSON.stringify(json[x].source));
                temp.source = JSON.parse(JSON.stringify(temp.target));
                temp.target = JSON.parse(JSON.stringify(tmp));
            }
            output.push(temp);
        }  
    }
    console.log(output);
    return output;
}
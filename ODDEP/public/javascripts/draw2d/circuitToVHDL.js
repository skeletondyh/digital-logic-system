// Created by Chen Yazheng on 2016/11/02

var Port = {
    /**
     * 
     * 
     * @param {any} id
     * @param {any} name
     * @param {any} type
     * @returns
     */
    createNew: function(id, name, type) {
        var port = {
            "id": id,
            "name": name || "port",
            "type": type || "out", // "in", "out"
        };
        /**
         * 
         * 
         * @param {any} name
         */
        port.setName = function(name) { port.name = name; }
        /**
         * 
         * 
         * @returns
         */
        port.getName = function() { return port.name; }
        /**
         * 
         * 
         * @param {any} type
         */
        port.setType = function(type) {
            if (type == "in" || type == "out")
                port.type = type;
            else if (type == "hybrid") {
                port.type = "inout";
            }
        }
        /**
         * 
         * 
         * @returns
         */
        port.getType = function() { return port.type; }
        return port;
    }
};

var VHDLCode = {

    /**
     * Create a new object to manage code structure
     * 
     * @param {any} circuit
     * @returns
     */
    createNew: function(circuit) {

        var code = {
            "libraries": [],
            "entity": {
                "name": "main",
                "ports": [],
                "inports": [],
                "outports": []
            },
            "architecture": {
                "components": [],
                "signals": [],
                "constants": [],
                "behaviour": {
                    "name": "bhv",
                    "devices": []
                }
            },
            "indent": "",
            "indentStr": "    ",
            "circuit": circuit
        };
        code.writer = IndentWriter.createNew();
        
        /**
         * Set json format circuit
         * 
         * @param {any} circuit
         */
        code.setCircuit = function(circuit) { code.circuit = circuit; }
        
        /**
         * Add library for VHDL code
         * 
         * @param {any} library
         */
        code.addLibrary = function(library) { code.libraries.push(library); }
        
        /**
         * Set name for the entity name
         * 
         * @param {any} name
         */
        code.setName = function(name) { code.entity.name = name; }
        
        /**
         * Add port for the entity 
         * 
         * @param {any} port
         */
        code.addPort = function(port) {
            if (port.type == "in") {
                code.entity.inports.push(port);
                code.entity.ports.push(port);
            } else if (port.type == "out") {
                code.entity.outports.push(port);
                code.entity.ports.push(port);
            } else if (port.type == "hybrid") {
                code.entity.ports.push(port);
            }
        }
        /**
         * Remove all ports from entity
         */
        code.clearPorts = function() {
            code.entity.ports 
            = code.entity.inports 
            = code.entity.outports 
            = [];
        }

        /**
         * Generate code for the entity
         * 
         * @returns
         */
        code.marshal = function() {
            var vhdl = "";
            vhdl += code.marshalLibrary();
            vhdl += "\n\n";
            vhdl += code.marshalEntity();
            vhdl += "\n\n";
            vhdl += code.marshalArchitecture();
            return vhdl;
        }

        /**
         * Generate code for libraries
         * 
         * @returns
         */
        code.marshalLibrary = function() {
            var result = "";
            for (var i in code.libraries) {
                var library = code.libraries[i];
                if (library.name.length > 0) { // library name valid
                    result += ["LIBRARY", library.name].join(" ") + ";\n";
                    for (var iu in library.uses) {
                        var use = library.uses[iu];
                        result += ["USE", use].join(" ") + ";\n";
                    }
                }
            }
            return result;
        }

        /**
         * Generate code for Entity declaration
         * 
         * @returns
         */
        code.marshalEntity = function() {
            code.prepareEntity();
            var iw = IndentWriter.createNew();
            iw.writeLine(["ENTITY", code.entity.name, "IS", "PORT("].join(" "));
            iw.incIndent();
            // var result = "";
            // result += ["ENTITY", code.entity.name, "IS", "PORT("].join(" ") + "\n";
            // code.incIndent();
            code.entity.ports.sort(sortByName);
            var end = code.entity.ports.length - 1;
            for (var i in code.entity.ports) {
                var port = code.entity.ports[i];
                var line = [port.name, ":", port.type, "STD_LOGIC"].join(" ");
                if (i == end) ;
                else {
                    line += ";";
                }
                iw.writeLine(line);
            }
            iw.decIndent();
            iw.writeLine(");")
            iw.writeLine("END ENTITY;");
            result = iw.getContent();
            iw.flush();
            return result;
        }

        /**
         * Find all inports and outports and add to entity
         */
        code.prepareEntity = function () {
            var inports_num = 0;
            var outports_num = 0;
            for (var i in code.circuit.components) {
                var comp = code.circuit.components[i];
                if (comp.type == "draw2d_circuit_switch_HighLow") {
                    code.addPort(Port.createNew(id=comp.id, name= comp.name || "input_"+inports_num++
                    ,type = "in"));
                } else if (comp.type == "draw2d_circuit_switch_PushButton") {
                    code.addPort(Port.createNew(id=comp.id, name= comp.name || "input_"+inports_num++
                    ,type = "in"));
                } else if (comp.type == "draw2d_circuit_display_Led") {
                    code.addPort(Port.createNew(id=comp.id, name= comp.name || "output_"+outports_num++
                    ,type = "out"));
                } else if (comp.type == "draw2d_circuit_pulse_50hz") {
                    code.addPort(Port.createNew(id=comp.id, name= comp.name || "input_"+(inports_num++)
                    ,type = "in"));
                } else if (comp.type == "draw2d_circuit_pulse_10hz") {
                    code.addPort(Port.createNew(id=comp.id, name= comp.name || "input_"+(inports_num++)
                    ,type = "in"));
                }
            }
        }

        /**
         * Generate code for architecture
         * 
         * @returns
         */
        code.marshalArchitecture = function() {
            var iw = IndentWriter.createNew();
            
            iw.writeLine(["ARCHITECTURE", code.architecture.behaviour.name, 
                "OF", code.entity.name, "IS"].join(" "));

            code.prepareComponents();
            iw.writeLine(code.marshalArchitectureComponents());
            iw.writeLine(code.marshalArchitectureConstants());
            
            code.prepareSignals();
            iw.writeLine(code.marshalArchitectureSignals());
            
            iw.writeLine(code.marshalArchitectureBehaviour());

            var result = iw.getContent();
            iw.flush();
            return result;
        }

        /**
         * Generate code for components
         * 
         * @returns
         */
        code.marshalArchitectureComponents = function() {
            var result = "\n";
            code.incIndent();
            var circuit = code.circuit;
            var components = code.architecture.components       
            for (var ic in components) {
                var component = components[ic];
                result += code.getComponentInfo(component).info + "\n"; // info need to be prepared for every component
            }
            code.decIndent();
            return result;
        }

        /**
         * Prepare dependencies for components
         */
        code.prepareComponents = function () {
            var circuit = code.circuit;
            var components = code.architecture.components = []; 
            code.architecture.behaviour.devices = [];
            for (var ic in circuit.components) {
                var component = circuit.components[ic];
                if (component.type.startsWith("C74LS") 
                    || component.type.startsWith("draw2d_circuit_display_7Segment")
                    || component.type.startsWith("draw2d_circuit_counter_")
                    || component.type.startsWith("draw2d_circuit_decoder_")
                    ) {
                    component.name = component.type + "_" + ic;
                    var ports = component.componentInfo.ports.data;
                    for (var pi in ports) {
                        // if OPEN
                        var port = ports[pi];
                        if (port.cssClass === "DecoratedInputPort") {
                            port.connectTo = {"name": "LOW"};
                        } else if (port.cssClass === "draw2d_OutputPort") {
                            port.connectTo = {"name": "OPEN"};
                        }
                    }
                    code.architecture.behaviour.devices.push(component);
                }

                if (code.getComponentInfo(component) != null) {
                    if (components.indexOf(component.type) >= 0) {
                        continue;
                    }
                    components.push(component);
                }
            }
        }

        /**
         * Prepare dependencies for signals used in connections
         */
        code.prepareSignals = function () {
            var connections = code.circuit.connections;
            var signals = code.architecture.signals
            var devices = code.architecture.behaviour.devices; 
            for (var si in connections) {
                var conn = connections[si];
                var signal = code.addSignal(signals, conn);
                var src = conn.source;
                var tgt = conn.target;
                if (src.type.startsWith("C74LS")) {
                    var srcDevice = devices.find(function (value) {
                        return value.id === this.node;
                    }, src);
                    var ports = srcDevice.componentInfo.ports.data;
                    var port = ports.find(function (value) {
                        return value.name === this.port;
                    }, src);
                    port.connectTo = signal;
                } else if (src.type.startsWith("draw2d_circuit_decoder_BCDto7Seg")) {
                    var srcDevice = devices.find(function (value) { 
                        return value.id === this.node;
                    }, src);
                    var ports = srcDevice.componentInfo.ports.data;
                    var port = ports.find(function (value) {  
                        return value.name === this.port;
                    }, src);
                    port.connectTo = signal;
                } else if (src.type.startsWith("draw2d_circuit_display_7Segment")) {
                    var srcDevice = devices.find(function (value) { 
                        return value.id === this.node;
                    }, src);
                    var ports = srcDevice.componentInfo.ports.data;
                    var port = ports.find(function (value) {  
                        return value.name === this.port;
                    }, src);
                    port.connectTo = signal;
                } else if (src.type.startsWith("draw2d_circuit_counter_BCDCounter")) {
                    var srcDevice = devices.find(function (value) { 
                        return value.id === this.node;
                    }, src);
                    var ports = srcDevice.componentInfo.ports.data;
                    var port = ports.find(function (value) {  
                        return value.name === this.port;
                    }, src);
                    port.connectTo = signal;
                } else {
                    var port = code.entity.inports.find(function (value) {
                        return value.id === this.node;
                    }, src);
                    port.connectTo = signal;
                }

                if (tgt.type.startsWith("C74LS")) {
                    var tgtDevice = devices.find(function (value) {
                        return value.id === this.node;
                    }, tgt);
                    var ports = tgtDevice.componentInfo.ports.data;
                    var port = ports.find(function (value) {
                        return value.name === this.port;
                    }, tgt);
                    port.connectTo = signal;
                } else if (tgt.type.startsWith("draw2d_circuit_decoder_BCDto7Seg")) {
                    var tgtDevice = devices.find(function (value) { 
                        return value.id === this.node;
                    }, tgt);
                    var ports = tgtDevice.componentInfo.ports.data;
                    var port = ports.find(function (value) {  
                        return value.name === this.port;
                    }, tgt);
                    port.connectTo = signal;
                } else if (tgt.type.startsWith("draw2d_circuit_display_7Segment")) {
                    var tgtDevice = devices.find(function (value) { 
                        return value.id === this.node;
                    }, tgt);
                    var ports = tgtDevice.componentInfo.ports.data;
                    var port = ports.find(function (value) {  
                        return value.name === this.port;
                    }, tgt);
                    port.connectTo = signal;
                } else if (tgt.type.startsWith("draw2d_circuit_counter_BCDCounter")) {
                    var tgtDevice = devices.find(function (value) { 
                        return value.id === this.node;
                    }, tgt);
                    var ports = tgtDevice.componentInfo.ports.data;
                    var port = ports.find(function (value) {  
                        return value.name === this.port;
                    }, tgt);
                    port.connectTo = signal;
                } else {
                    var port = code.entity.outports.find(function (value) {
                        return value.id === this.node;
                    }, tgt);
                    port.connectTo = signal;
                }
            }
        }

        /**
         * Add signal to list from a connection
         * 
         * @param {any} signalList
         * @param {any} connection
         * @returns
         */
        code.addSignal = function (signalList, connection) {
            var src = connection.source;
            var tgt = connection.target;
            var i = 1;
            var signal = {
                "name": "" 
            };
            var name = "signal_" + signalList.length;
            // findByName
            signal.name = name;
            signalList.push(signal);
            return signal;
        }

        /**
         * Generate declarations for signals in architecture
         * 
         * @returns
         */
        code.marshalArchitectureSignals = function() {
            var result = "";
            var iw = IndentWriter.createNew();
            var signals = code.architecture.signals;
            for (var si in signals) {
                var signal = signals[si];
                iw.writeLine(["signal", signal.name, ":", "STD_LOGIC"].join(" ") + ";");
            }
            result = iw.getContent();
            iw.flush();
            return result;
        }

        /**
         * Generate code for constants
         * 
         * @returns
         */
        code.marshalArchitectureConstants = function() {
            var result = "";
            result += ["CONSTANT", "HIGH", ":", "STD_LOGIC:=","1;"].join(" ") + "\n";
            result += ["CONSTANT", "LOW ", ":", "STD_LOGIC:=","0;"].join(" ") + "\n";
            return result;
        }

        /**
         * Generate code for behaviour of architecture
         * 
         * @returns
         */
        code.marshalArchitectureBehaviour = function() {
            var result = "";
            var iw = IndentWriter.createNew();
            iw.writeLine("BEGIN");
            iw.incIndent();
            // Entity I/O ports
            for (var ip in code.entity.inports) {
                var port = code.entity.inports[ip];
                iw.writeLine([port.name, "<=", port.connectTo.name].join(" ") + ";");
            }

            for (var op in code.entity.outports) {
                var port = code.entity.outports[op];
                iw.writeLine([port.name, "<=", port.connectTo.name].join(" ") + ";");
            }

            iw.writeLine();

            // Devices 
            var devices = code.architecture.behaviour.devices;
            for (ci in devices) {
                var device = devices[ci];
                iw.writeLine(["u_" + device.name, ":", "PORT", "MAP", "("].join(" "));

                var ports = device.componentInfo.ports.data;
                for (var pi in ports) {
                    var port = ports[pi];
                    iw.writeLine([port.name, "=>", port.connectTo.name, ","].join(" "));
                }
                iw.writeLine(");");
                iw.writeLine();
            }

            iw.decIndent();
            iw.writeLine(["END", code.architecture.behaviour.name].join(" ") + ";");
            result = iw.getContent();
            iw.flush();
            return result;
        }
        
        /**
         * 
         * 
         * @param {any} comp
         * @returns
         */
        code.getComponentInfo = function(comp) {
            return comp.componentInfo;
        }

        /**
         * 
         */
        code.incIndent = function() {
            code.indent = code.indent + code.indentStr;
        }
        /**
         * 
         */
        code.decIndent = function() {
            if (code.indent.length - code.indentStr.length < 0) code.indent = "";
            else
                code.indent = code.indent.substr(0, code.indent.length - code.indentStr.length);
        }
        /**
         * 
         * 
         * @param {any} indentStr
         */
        code.setIndentStr = function(indentStr) {
            code.indentStr = indentStr;
        }

        code.addLibrary({
            "name": "IEEE",
            "uses": ["IEEE.STD_LOGIC_1164.ALL", "IEEE.STD_LOGIC_ARITH.ALL", "IEEE.STD_LOGIC_UNSIGNED.ALL"]
        });

        return code;
    }
};
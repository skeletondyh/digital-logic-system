// Generated Code for the Draw2D touch HTML5 lib
//                                                        
// http://www.draw2d.org                                  
//                                                        
// Go to the Designer http://www.draw2d.org               
// to design your own shape or download user generated    
//                                                        
var C74LS90 = draw2d.SetFigure.extend({

    NAME: "C74LS90",

    init: function(attr, setter, getter) {
        this._super($.extend({ stroke: 0, bgColor: null, width: 100, height: 176 }, attr), setter, getter);
        var port;
        // Port_nCP_A
        port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(100, 11.647727272727273));
        port.setConnectionDirection(1);
        port.setBackgroundColor("#37B1DE");
        port.setName("Port_nCP_A");
        port.setMaxFanOut(20);
        // Port_NC2
        port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(100, 23.011363636363637));
        port.setConnectionDirection(1);
        port.setBackgroundColor("#37B1DE");
        port.setName("Port_NC2");
        port.setMaxFanOut(20);
        // Port_Q0
        port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(100, 35.51136363636364));
        port.setConnectionDirection(1);
        port.setBackgroundColor("#37B1DE");
        port.setName("Port_Q0");
        port.setMaxFanOut(20);
        // Port_Q3
        port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(100, 46.30681818181819));
        port.setConnectionDirection(1);
        port.setBackgroundColor("#37B1DE");
        port.setName("Port_Q3");
        port.setMaxFanOut(20);
        // Port_GND
        port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(100, 57.102272727272734));
        port.setConnectionDirection(1);
        port.setBackgroundColor("#37B1DE");
        port.setName("Port_GND");
        port.setMaxFanOut(20);
        // Port_Q1
        port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(100, 68.75));
        port.setConnectionDirection(1);
        port.setBackgroundColor("#37B1DE");
        port.setName("Port_Q1");
        port.setMaxFanOut(20);
        // Port_Q2
        port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(100, 80.68181818181819));
        port.setConnectionDirection(1);
        port.setBackgroundColor("#37B1DE");
        port.setName("Port_Q2");
        port.setMaxFanOut(20);
        // Port_nCP_B
        port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(-2.21875, 11.647727272727273));
        port.setConnectionDirection(3);
        port.setBackgroundColor("#37B1DE");
        port.setName("Port_nCP_B");
        port.setMaxFanOut(20);
        // Port_R1
        port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(-2.21875, 23.011363636363637));
        port.setConnectionDirection(3);
        port.setBackgroundColor("#37B1DE");
        port.setName("Port_R1");
        port.setMaxFanOut(20);
        // Port_R2
        port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(-2, 35.51136363636364));
        port.setConnectionDirection(3);
        port.setBackgroundColor("#37B1DE");
        port.setName("Port_R2");
        port.setMaxFanOut(20);
        // Port_NC1
        port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(-2, 45.73863636363637));
        port.setConnectionDirection(3);
        port.setBackgroundColor("#37B1DE");
        port.setName("Port_NC1");
        port.setMaxFanOut(20);
        // Port_Vcc
        port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(-2.21875, 57.102272727272734));
        port.setConnectionDirection(3);
        port.setBackgroundColor("#37B1DE");
        port.setName("Port_Vcc");
        port.setMaxFanOut(20);
        // Port_S1
        port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(-2, 68.75));
        port.setConnectionDirection(3);
        port.setBackgroundColor("#37B1DE");
        port.setName("Port_S1");
        port.setMaxFanOut(20);
        // Port_S2
        port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(-2, 80.68181818181819));
        port.setConnectionDirection(3);
        port.setBackgroundColor("#37B1DE");
        port.setName("Port_S2");
        port.setMaxFanOut(20);
        this.persistPorts = false;
    },

    createShapeElement: function() {
        var shape = this._super();
        this.originalWidth = 100;
        this.originalHeight = 176;
        return shape;
    },

    createSet: function() {
        this.canvas.paper.setStart();

        // BoundingBox
        shape = this.canvas.paper.path("M0,0 L100,0 L100,176 L0,176");
        shape.attr({ "stroke": "none", "stroke-width": 0, "fill": "none" });
        shape.data("name", "BoundingBox");

        // Rectangle
        shape = this.canvas.paper.path('M30.087488663526074 0L0 0L0 173L100 173L100 0L69.91251133647393 0L70 1L69.69615506024411 4.472963553338559L68.79385241571799 7.840402866513614L67.32050807568885 11L65.32088886237943 13.85575219373095L62.85575219373095 16.320888862379434L60 18.32050807568885L56.840402866513614 19.793852415717993L53.47296355333856 20.69615506024411L50 21L46.52703644666144 20.69615506024411L43.159597133486386 19.793852415717993L40 18.32050807568885L37.14424780626905 16.320888862379434L34.679111137620566 13.85575219373095L32.67949192431115 11L31.206147584282007 7.840402866513614L30.30384493975589 4.472963553338559L30 1L30.087488663526074 0Z');
        shape.attr({ "stroke": "#303030", "stroke-width": 1, "fill": "#FFFFFF", "dasharray": null, "opacity": 1 });
        shape.data("name", "Rectangle");

        // Label_Name
        shape = this.canvas.paper.text(0, 0, '74LS90');
        shape.attr({ "x": 21.421875, "y": 163.5, "text-anchor": "start", "text": "74LS90", "font-family": "\"Arial\"", "font-size": 16, "stroke": "none", "fill": "#080808", "stroke-scale": true, "font-weight": "normal", "stroke-width": 0, "opacity": 1 });
        shape.data("name", "Label_Name");

        // Label_nCP_B
        shape = this.canvas.paper.text(0, 0, '~CP_B');
        shape.attr({ "x": 4, "y": 22.5, "text-anchor": "start", "text": "~CP_B", "font-family": "\"Arial\"", "font-size": 8, "stroke": "none", "fill": "#080808", "stroke-scale": true, "font-weight": "normal", "stroke-width": 0, "opacity": 1 });
        shape.data("name", "Label_nCP_B");

        // Label_R1
        shape = this.canvas.paper.text(0, 0, 'R1');
        shape.attr({ "x": 7.78125, "y": 40.5, "text-anchor": "start", "text": "R1", "font-family": "\"Arial\"", "font-size": 8, "stroke": "none", "fill": "#080808", "stroke-scale": true, "font-weight": "normal", "stroke-width": 0, "opacity": 1 });
        shape.data("name", "Label_R1");

        // Label_R2
        shape = this.canvas.paper.text(0, 0, 'R2');
        shape.attr({ "x": 7.7734375, "y": 60, "text-anchor": "start", "text": "R2", "font-family": "\"Arial\"", "font-size": 8, "stroke": "none", "fill": "#080808", "stroke-scale": true, "font-weight": "normal", "stroke-width": 0, "opacity": 1 });
        shape.data("name", "Label_R2");

        // Label_NC
        shape = this.canvas.paper.text(0, 0, 'NC');
        shape.attr({ "x": 7.78125, "y": 80.5, "text-anchor": "start", "text": "NC", "font-family": "\"Arial\"", "font-size": 8, "stroke": "none", "fill": "#080808", "stroke-scale": true, "font-weight": "normal", "stroke-width": 0, "opacity": 1 });
        shape.data("name", "Label_NC");

        // Label_Vcc
        shape = this.canvas.paper.text(0, 0, 'Vcc');
        shape.attr({ "x": 8, "y": 100.5, "text-anchor": "start", "text": "Vcc", "font-family": "\"Arial\"", "font-size": 8, "stroke": "none", "fill": "#080808", "stroke-scale": true, "font-weight": "normal", "stroke-width": 0, "opacity": 1 });
        shape.data("name", "Label_Vcc");

        // Label_S1
        shape = this.canvas.paper.text(0, 0, 'S1');
        shape.attr({ "x": 8, "y": 119.5, "text-anchor": "start", "text": "S1", "font-family": "\"Arial\"", "font-size": 8, "stroke": "none", "fill": "#080808", "stroke-scale": true, "font-weight": "normal", "stroke-width": 0, "opacity": 1 });
        shape.data("name", "Label_S1");

        // Label_S2
        shape = this.canvas.paper.text(0, 0, 'S2');
        shape.attr({ "x": 7.78125, "y": 144.5, "text-anchor": "start", "text": "S2", "font-family": "\"Arial\"", "font-size": 8, "stroke": "none", "fill": "#080808", "stroke-scale": true, "font-weight": "normal", "stroke-width": 0, "opacity": 1 });
        shape.data("name", "Label_S2");

        // Label_Q1
        shape = this.canvas.paper.text(0, 0, 'Q1');
        shape.attr({ "x": 73.3125, "y": 119.5, "text-anchor": "start", "text": "Q1", "font-family": "\"Arial\"", "font-size": 8, "stroke": "none", "fill": "#080808", "stroke-scale": true, "font-weight": "normal", "stroke-width": 0, "opacity": 1 });
        shape.data("name", "Label_Q1");

        // Label_Q2
        shape = this.canvas.paper.text(0, 0, 'Q2');
        shape.attr({ "x": 73.3125, "y": 142, "text-anchor": "start", "text": "Q2", "font-family": "\"Arial\"", "font-size": 8, "stroke": "none", "fill": "#080808", "stroke-scale": true, "font-weight": "normal", "stroke-width": 0, "opacity": 1 });
        shape.data("name", "Label_Q2");

        // Label_Q3
        shape = this.canvas.paper.text(0, 0, 'Q3');
        shape.attr({ "x": 73.3125, "y": 80.5, "text-anchor": "start", "text": "Q3", "font-family": "\"Arial\"", "font-size": 8, "stroke": "none", "fill": "#080808", "stroke-scale": true, "font-weight": "normal", "stroke-width": 0, "opacity": 1 });
        shape.data("name", "Label_Q3");

        // Label_GND
        shape = this.canvas.paper.text(0, 0, 'GND');
        shape.attr({ "x": 63.4921875, "y": 99.5, "text-anchor": "start", "text": "GND", "font-family": "\"Arial\"", "font-size": 8, "stroke": "none", "fill": "#080808", "stroke-scale": true, "font-weight": "normal", "stroke-width": 0, "opacity": 1 });
        shape.data("name", "Label_GND");

        // Label_NC
        shape = this.canvas.paper.text(0, 0, 'NC');
        shape.attr({ "x": 73.3125, "y": 40.5, "text-anchor": "start", "text": "NC", "font-family": "\"Arial\"", "font-size": 8, "stroke": "none", "fill": "#080808", "stroke-scale": true, "font-weight": "normal", "stroke-width": 0, "opacity": 1 });
        shape.data("name", "Label_NC");

        // Label_Q0
        shape = this.canvas.paper.text(0, 0, 'Q0');
        shape.attr({ "x": 73.3125, "y": 62.5, "text-anchor": "start", "text": "Q0", "font-family": "\"Arial\"", "font-size": 8, "stroke": "none", "fill": "#080808", "stroke-scale": true, "font-weight": "normal", "stroke-width": 0, "opacity": 1 });
        shape.data("name", "Label_Q0");

        // Label_nCP_A
        shape = this.canvas.paper.text(0, 0, '~CP_A');
        shape.attr({ "x": 57.640625, "y": 22.5, "text-anchor": "start", "text": "~CP_A", "font-family": "\"Arial\"", "font-size": 8, "stroke": "none", "fill": "#080808", "stroke-scale": true, "font-weight": "normal", "stroke-width": 0, "opacity": 1 });
        shape.data("name", "Label_nCP_A");


        return this.canvas.paper.setFinish();
    },

    applyAlpha: function() {},

    layerGet: function(name, attributes) {
        if (this.svgNodes === null) return null;

        var result = null;
        this.svgNodes.some(function(shape) {
            if (shape.data("name") === name) {
                result = shape;
            }
            return result !== null;
        });

        return result;
    },

    layerAttr: function(name, attributes) {
        if (this.svgNodes === null) return;

        this.svgNodes.forEach(function(shape) {
            if (shape.data("name") === name) {
                shape.attr(attributes);
            }
        });
    },

    layerShow: function(name, flag, duration) {
        if (this.svgNodes === null) return;

        if (duration) {
            this.svgNodes.forEach(function(node) {
                if (node.data("name") === name) {
                    if (flag) {
                        node.attr({ opacity: 0 }).show().animate({ opacity: 1 }, duration);
                    } else {
                        node.animate({ opacity: 0 }, duration, function() { this.hide() });
                    }
                }
            });
        } else {
            this.svgNodes.forEach(function(node) {
                if (node.data("name") === name) {
                    if (flag) { node.show(); } else { node.hide(); }
                }
            });
        }
    },

    calculate: function() {},

    onStart: function() {},

    onStop: function() {},

    getParameterSettings: function() {
        return [];
    },

    /**
     * @method
     */
    addPort: function(port, locator) {
        this._super(port, locator);
        return port;
    },

    /**
     * @method
     * Return an objects with all important attributes for XML or JSON serialization
     *
     * @returns {Object}
     */
    getPersistentAttributes: function() {
        var memento = this._super();

        // add all decorations to the memento
        //
        memento.labels = [];
        this.children.each(function(i, e) {
            var labelJSON = e.figure.getPersistentAttributes();
            labelJSON.locator = e.locator.NAME;
            memento.labels.push(labelJSON);
        });

        return memento;
    },

    /**
     * @method
     * Read all attributes from the serialized properties and transfer them into the shape.
     *
     * @param {Object} memento
     * @returns
     */
    setPersistentAttributes: function(memento) {
        this._super(memento);

        // remove all decorations created in the constructor of this element
        //
        this.resetChildren();

        // and add all children of the JSON document.
        //
        $.each(memento.labels, $.proxy(function(i, json) {
            // create the figure stored in the JSON
            var figure = eval("new " + json.type + "()");

            // apply all attributes
            figure.attr(json);

            // instantiate the locator
            var locator = eval("new " + json.locator + "()");

            // add the new figure as child to this figure
            this.add(figure, locator);
        }, this));
    }
});

/**
 * by 'Draw2D Shape Designer'
 *
 * Custom JS code to tweak the standard behaviour of the generated
 * shape. add your custome code and event handler here.
 *
 *
 */
C74LS90 = C74LS90.extend({

    init: function(attr, setter, getter) {
        this._super(attr, setter, getter);

        // your special code here
        this.attr({resizeable:false});
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());

        this.last_t_2 = false;
        this.last_t_5 = false;
        this.counter_2 = 0;
        this.counter_5 = 0;
    },

    /**
     *  Called by the simulator for every calculation
     *  loop
     *  @required
     **/
    calculate: function() {
        var t_2 = this.getInputPort("Port_nCP_A").getValue();
        var t_5 = this.getInputPort("Port_nCP_B").getValue();
        var falling_2 = this.last_t_2 === true && t_2 === false;
        var falling_5 = this.last_t_5 === true && t_5 === false;

        var r1 = this.getInputPort("Port_R1");
        var r2 = this.getInputPort("Port_R2");
        var s1 = this.getInputPort("Port_S1");
        var s2 = this.getInputPort("Port_S2");
        
        var q0 = this.getOutputPort("Port_Q0");
        var q1 = this.getOutputPort("Port_Q1");
        var q2 = this.getOutputPort("Port_Q2");
        var q3 = this.getOutputPort("Port_Q3");

        if(s1.getValue() === true && s2.getValue() === true)
        {
            this.counter_2 = 1;
            this.counter_5 = 4;
        } else if (r1.getValue() === true && r2.getValue() === true)
        {
            this.counter_2 = 0;
            this.counter_5 = 0;
        } else{
            if (falling_2 === true){
                this.counter_2 = (this.counter_2+1) % 2;
            }
            if (falling_5 === true){
                this.counter_5 = (this.counter_5+1) % 5;
            }
        }
        q0.setValue(this.counter_2 === 1);
        q1.setValue(!!(this.counter_5 & 1));
        q2.setValue(!!(this.counter_5 & 2));
        q3.setValue(!!(this.counter_5 & 4));

        this.last_t_2 = t_2;
        this.last_t_5 = t_5;
    },




    /**
     *  Called if the simulation mode is starting
     *  @required
     **/
    onStart: function() {},

    /**
     *  Called if the simulation mode is stopping
     *  @required
     **/
    onStop: function() {},

    note: "2-5-10-based counter"
});
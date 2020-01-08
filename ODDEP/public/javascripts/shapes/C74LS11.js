// Generated Code for the Draw2D touch HTML5 lib
//                                                        
// http://www.draw2d.org                                  
//                                                        
// Go to the Designer http://www.draw2d.org               
// to design your own shape or download user generated    
//                                                        
var C74LS11 = draw2d.SetFigure.extend({

    NAME: "C74LS11",

    init: function(attr, setter, getter) {
        this._super($.extend({ stroke: 0, bgColor: null, width: 100, height: 176 }, attr), setter, getter);
        var port;
        // Port_Vcc
        port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(100, 11.647727272727273));
        port.setConnectionDirection(1);
        port.setBackgroundColor("#37B1DE");
        port.setName("Port_Vcc");
        port.setMaxFanOut(20);
        // Port_1C
        port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(100, 23.011363636363637));
        port.setConnectionDirection(1);
        port.setBackgroundColor("#37B1DE");
        port.setName("Port_1C");
        port.setMaxFanOut(20);
        // Port_1Y
        port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(100, 35.51136363636364));
        port.setConnectionDirection(1);
        port.setBackgroundColor("#37B1DE");
        port.setName("Port_1Y");
        port.setMaxFanOut(20);
        // Port_3C
        port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(100, 46.30681818181819));
        port.setConnectionDirection(1);
        port.setBackgroundColor("#37B1DE");
        port.setName("Port_3C");
        port.setMaxFanOut(20);
        // Port_3B
        port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(100, 57.38636363636364));
        port.setConnectionDirection(1);
        port.setBackgroundColor("#37B1DE");
        port.setName("Port_3B");
        port.setMaxFanOut(20);
        // Port_3A
        port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(100, 68.75));
        port.setConnectionDirection(1);
        port.setBackgroundColor("#37B1DE");
        port.setName("Port_3A");
        port.setMaxFanOut(20);
        // Port_3Y
        port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(100, 80.68181818181819));
        port.setConnectionDirection(1);
        port.setBackgroundColor("#37B1DE");
        port.setName("Port_3Y");
        port.setMaxFanOut(20);
        // Port_1A
        port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(-2.21875, 11.647727272727273));
        port.setConnectionDirection(3);
        port.setBackgroundColor("#37B1DE");
        port.setName("Port_1A");
        port.setMaxFanOut(20);
        // Port_1B
        port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(-2.21875, 23.011363636363637));
        port.setConnectionDirection(3);
        port.setBackgroundColor("#37B1DE");
        port.setName("Port_1B");
        port.setMaxFanOut(20);
        // Port_2A
        port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(-2, 35.51136363636364));
        port.setConnectionDirection(3);
        port.setBackgroundColor("#37B1DE");
        port.setName("Port_2A");
        port.setMaxFanOut(20);
        // Port_2B
        port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(-2, 45.73863636363637));
        port.setConnectionDirection(3);
        port.setBackgroundColor("#37B1DE");
        port.setName("Port_2B");
        port.setMaxFanOut(20);
        // Port_2C
        port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(-2.21875, 57.102272727272734));
        port.setConnectionDirection(3);
        port.setBackgroundColor("#37B1DE");
        port.setName("Port_2C");
        port.setMaxFanOut(20);
        // Port_2Y
        port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(-2, 68.75));
        port.setConnectionDirection(3);
        port.setBackgroundColor("#37B1DE");
        port.setName("Port_2Y");
        port.setMaxFanOut(20);
        // Port_GND
        port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(-2, 80.68181818181819));
        port.setConnectionDirection(3);
        port.setBackgroundColor("#37B1DE");
        port.setName("Port_GND");
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
        shape = this.canvas.paper.text(0, 0, '74LS11');
        shape.attr({ "x": 21.421875, "y": 163.5, "text-anchor": "start", "text": "74LS11", "font-family": "\"Arial\"", "font-size": 16, "stroke": "none", "fill": "#080808", "stroke-scale": true, "font-weight": "normal", "stroke-width": 0, "opacity": 1 });
        shape.data("name", "Label_Name");

        // Label_1A
        shape = this.canvas.paper.text(0, 0, '1A');
        shape.attr({ "x": 8, "y": 20.5, "text-anchor": "start", "text": "1A", "font-family": "\"Arial\"", "font-size": 8, "stroke": "none", "fill": "#080808", "stroke-scale": true, "font-weight": "normal", "stroke-width": 0, "opacity": 1 });
        shape.data("name", "Label_1A");

        // Label_1B
        shape = this.canvas.paper.text(0, 0, '1B');
        shape.attr({ "x": 7.78125, "y": 40.5, "text-anchor": "start", "text": "1B", "font-family": "\"Arial\"", "font-size": 8, "stroke": "none", "fill": "#080808", "stroke-scale": true, "font-weight": "normal", "stroke-width": 0, "opacity": 1 });
        shape.data("name", "Label_1B");

        // Label_2A
        shape = this.canvas.paper.text(0, 0, '2A');
        shape.attr({ "x": 7.7734375, "y": 60, "text-anchor": "start", "text": "2A", "font-family": "\"Arial\"", "font-size": 8, "stroke": "none", "fill": "#080808", "stroke-scale": true, "font-weight": "normal", "stroke-width": 0, "opacity": 1 });
        shape.data("name", "Label_2A");

        // Label_2B
        shape = this.canvas.paper.text(0, 0, '2B');
        shape.attr({ "x": 7.78125, "y": 80.5, "text-anchor": "start", "text": "2B", "font-family": "\"Arial\"", "font-size": 8, "stroke": "none", "fill": "#080808", "stroke-scale": true, "font-weight": "normal", "stroke-width": 0, "opacity": 1 });
        shape.data("name", "Label_2B");

        // Label_2C
        shape = this.canvas.paper.text(0, 0, '2C');
        shape.attr({ "x": 8, "y": 100.5, "text-anchor": "start", "text": "2C", "font-family": "\"Arial\"", "font-size": 8, "stroke": "none", "fill": "#080808", "stroke-scale": true, "font-weight": "normal", "stroke-width": 0, "opacity": 1 });
        shape.data("name", "Label_2C");

        // Label_2Y
        shape = this.canvas.paper.text(0, 0, '2Y');
        shape.attr({ "x": 8, "y": 119.5, "text-anchor": "start", "text": "2Y", "font-family": "\"Arial\"", "font-size": 8, "stroke": "none", "fill": "#080808", "stroke-scale": true, "font-weight": "normal", "stroke-width": 0, "opacity": 1 });
        shape.data("name", "Label_2Y");

        // Label_GND
        shape = this.canvas.paper.text(0, 0, 'GND');
        shape.attr({ "x": 7.78125, "y": 144.5, "text-anchor": "start", "text": "GND", "font-family": "\"Arial\"", "font-size": 8, "stroke": "none", "fill": "#080808", "stroke-scale": true, "font-weight": "normal", "stroke-width": 0, "opacity": 1 });
        shape.data("name", "Label_GND");

        // Label_3A
        shape = this.canvas.paper.text(0, 0, '3A');
        shape.attr({ "x": 73.3125, "y": 119.5, "text-anchor": "start", "text": "3A", "font-family": "\"Arial\"", "font-size": 8, "stroke": "none", "fill": "#080808", "stroke-scale": true, "font-weight": "normal", "stroke-width": 0, "opacity": 1 });
        shape.data("name", "Label_3A");

        // Label_3Y
        shape = this.canvas.paper.text(0, 0, '3Y');
        shape.attr({ "x": 73.3125, "y": 142, "text-anchor": "start", "text": "3Y", "font-family": "\"Arial\"", "font-size": 8, "stroke": "none", "fill": "#080808", "stroke-scale": true, "font-weight": "normal", "stroke-width": 0, "opacity": 1 });
        shape.data("name", "Label_3Y");

        // Label_3C
        shape = this.canvas.paper.text(0, 0, '3C');
        shape.attr({ "x": 73.3125, "y": 80.5, "text-anchor": "start", "text": "3C", "font-family": "\"Arial\"", "font-size": 8, "stroke": "none", "fill": "#080808", "stroke-scale": true, "font-weight": "normal", "stroke-width": 0, "opacity": 1 });
        shape.data("name", "Label_3C");

        // Label_3B
        shape = this.canvas.paper.text(0, 0, '3B');
        shape.attr({ "x": 73.3125, "y": 100.5, "text-anchor": "start", "text": "3B", "font-family": "\"Arial\"", "font-size": 8, "stroke": "none", "fill": "#080808", "stroke-scale": true, "font-weight": "normal", "stroke-width": 0, "opacity": 1 });
        shape.data("name", "Label_3B");

        // Label_1C
        shape = this.canvas.paper.text(0, 0, '1C');
        shape.attr({ "x": 73.3125, "y": 40.5, "text-anchor": "start", "text": "1C", "font-family": "\"Arial\"", "font-size": 8, "stroke": "none", "fill": "#080808", "stroke-scale": true, "font-weight": "normal", "stroke-width": 0, "opacity": 1 });
        shape.data("name", "Label_1C");

        // Label_1Y
        shape = this.canvas.paper.text(0, 0, '1Y');
        shape.attr({ "x": 73.3125, "y": 62.5, "text-anchor": "start", "text": "1Y", "font-family": "\"Arial\"", "font-size": 8, "stroke": "none", "fill": "#080808", "stroke-scale": true, "font-weight": "normal", "stroke-width": 0, "opacity": 1 });
        shape.data("name", "Label_1Y");

        // Label_Vcc
        shape = this.canvas.paper.text(0, 0, 'Vcc');
        shape.attr({ "x": 68, "y": 20.5, "text-anchor": "start", "text": "Vcc", "font-family": "\"Arial\"", "font-size": 8, "stroke": "none", "fill": "#080808", "stroke-scale": true, "font-weight": "normal", "stroke-width": 0, "opacity": 1 });
        shape.data("name", "Label_Vcc");


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
C74LS11 = C74LS11.extend({

    init: function(attr, setter, getter) {
        this._super(attr, setter, getter);

        // your special code here
    },

    /**
     *  Called by the simulator for every calculation
     *  loop
     *  @required
     **/
    calculate: function() {
        var A1 = this.getInputPort("Port_1A");
        var B1 = this.getInputPort("Port_1B");
        var C1 = this.getInputPort("Port_1C");
        var Y1 = this.getOutputPort("Port_1Y");
        Y1.setValue((A1.getValue() && B1.getValue() && C1.getValue()));

        var A2 = this.getInputPort("Port_2A");
        var B2 = this.getInputPort("Port_2B");
        var C2 = this.getInputPort("Port_2C");
        var Y2 = this.getOutputPort("Port_2Y");
        Y2.setValue((A2.getValue() && B2.getValue() && C2.getValue()));

        var A3 = this.getInputPort("Port_3A");
        var B3 = this.getInputPort("Port_3B");
        var C3 = this.getInputPort("Port_3C");
        var Y3 = this.getOutputPort("Port_3Y");
        Y3.setValue((A3.getValue() && B3.getValue() && C3.getValue()));
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

    note: "Y = A & B & C"
});
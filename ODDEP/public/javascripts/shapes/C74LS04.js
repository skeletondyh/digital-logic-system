// Generated Code for the Draw2D touch HTML5 lib
//                                                        
// http://www.draw2d.org                                  
//                                                        
// Go to the Designer http://www.draw2d.org               
// to design your own shape or download user generated    
//                                                        
var C74LS04 = draw2d.SetFigure.extend({

    NAME: "C74LS04",

    init: function(attr, setter, getter) {
        this._super($.extend({ stroke: 0, bgColor: null, width: 100, height: 178 }, attr), setter, getter);
        var port;
        // Port_Vcc
        port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(100, 11.51685393258427));
        port.setConnectionDirection(1);
        port.setBackgroundColor("#37B1DE");
        port.setName("Port_Vcc");
        port.setMaxFanOut(20);
        // Port_6A
        port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(100, 22.752808988764045));
        port.setConnectionDirection(1);
        port.setBackgroundColor("#37B1DE");
        port.setName("Port_6A");
        port.setMaxFanOut(20);
        // Port_6Y
        port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(100, 35.1123595505618));
        port.setConnectionDirection(1);
        port.setBackgroundColor("#37B1DE");
        port.setName("Port_6Y");
        port.setMaxFanOut(20);
        // Port_5A
        port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(100, 45.78651685393259));
        port.setConnectionDirection(1);
        port.setBackgroundColor("#37B1DE");
        port.setName("Port_5A");
        port.setMaxFanOut(20);
        // Port_5Y
        port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(100, 56.741573033707866));
        port.setConnectionDirection(1);
        port.setBackgroundColor("#37B1DE");
        port.setName("Port_5Y");
        port.setMaxFanOut(20);
        // Port_4A
        port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(100, 67.97752808988764));
        port.setConnectionDirection(1);
        port.setBackgroundColor("#37B1DE");
        port.setName("Port_4A");
        port.setMaxFanOut(20);
        // Port_4Y
        port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(100, 79.77528089887642));
        port.setConnectionDirection(1);
        port.setBackgroundColor("#37B1DE");
        port.setName("Port_4Y");
        port.setMaxFanOut(20);
        // Port_1A
        port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(-2.21875, 11.51685393258427));
        port.setConnectionDirection(3);
        port.setBackgroundColor("#37B1DE");
        port.setName("Port_1A");
        port.setMaxFanOut(20);
        // Port_1Y
        port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(-2.21875, 22.752808988764045));
        port.setConnectionDirection(3);
        port.setBackgroundColor("#37B1DE");
        port.setName("Port_1Y");
        port.setMaxFanOut(20);
        // Port_2A
        port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(-2, 35.1123595505618));
        port.setConnectionDirection(3);
        port.setBackgroundColor("#37B1DE");
        port.setName("Port_2A");
        port.setMaxFanOut(20);
        // Port_2Y
        port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(-2, 45.2247191011236));
        port.setConnectionDirection(3);
        port.setBackgroundColor("#37B1DE");
        port.setName("Port_2Y");
        port.setMaxFanOut(20);
        // Port_3A
        port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(-2.21875, 56.46067415730337));
        port.setConnectionDirection(3);
        port.setBackgroundColor("#37B1DE");
        port.setName("Port_3A");
        port.setMaxFanOut(20);
        // Port_3Y
        port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(-2, 67.97752808988764));
        port.setConnectionDirection(3);
        port.setBackgroundColor("#37B1DE");
        port.setName("Port_3Y");
        port.setMaxFanOut(20);
        // Port_GND
        port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(-2, 79.77528089887642));
        port.setConnectionDirection(3);
        port.setBackgroundColor("#37B1DE");
        port.setName("Port_GND");
        port.setMaxFanOut(20);
        this.persistPorts = false;
    },

    createShapeElement: function() {
        var shape = this._super();
        this.originalWidth = 100;
        this.originalHeight = 178;
        return shape;
    },

    createSet: function() {
        this.canvas.paper.setStart();

        // BoundingBox
        shape = this.canvas.paper.path("M0,0 L100,0 L100,178 L0,178");
        shape.attr({ "stroke": "none", "stroke-width": 0, "fill": "none" });
        shape.data("name", "BoundingBox");

        // Rectangle
        shape = this.canvas.paper.path('M30.087488663525903 0L0 0L0 173L100 173L100 0L69.9125113364741 0L70 1L69.69615506024417 4.472963553338616L68.79385241571816 7.8404028665133865L67.32050807568879 11L65.32088886237955 13.85575219373078L62.85575219373078 16.320888862379547L60 18.320508075688764L56.84040286651339 19.793852415718163L53.472963553338616 20.696155060244166L50 21L46.527036446661384 20.696155060244166L43.15959713348661 19.793852415718163L40 18.320508075688764L37.14424780626922 16.320888862379547L34.67911113762045 13.85575219373078L32.67949192431121 11L31.206147584281837 7.8404028665133865L30.303844939755834 4.472963553338616L30 1L30.087488663525903 0Z');
        shape.attr({ "stroke": "#303030", "stroke-width": 1, "fill": "#FFFFFF", "dasharray": null, "opacity": 1 });
        shape.data("name", "Rectangle");

        // Label_Name
        shape = this.canvas.paper.text(0, 0, '74LS04');
        shape.attr({ "x": 22.421875, "y": 164.5, "text-anchor": "start", "text": "74LS04", "font-family": "\"Arial\"", "font-size": 16, "stroke": "none", "fill": "#080808", "stroke-scale": true, "font-weight": "normal", "stroke-width": 0, "opacity": 1 });
        shape.data("name", "Label_Name");

        // Label_1A
        shape = this.canvas.paper.text(0, 0, '1A');
        shape.attr({ "x": 9, "y": 20.5, "text-anchor": "start", "text": "1A", "font-family": "\"Arial\"", "font-size": 8, "stroke": "none", "fill": "#080808", "stroke-scale": true, "font-weight": "normal", "stroke-width": 0, "opacity": 1 });
        shape.data("name", "Label_1A");

        // Label_1Y
        shape = this.canvas.paper.text(0, 0, '1Y');
        shape.attr({ "x": 8.78125, "y": 40.5, "text-anchor": "start", "text": "1Y", "font-family": "\"Arial\"", "font-size": 8, "stroke": "none", "fill": "#080808", "stroke-scale": true, "font-weight": "normal", "stroke-width": 0, "opacity": 1 });
        shape.data("name", "Label_1Y");

        // Label_2A
        shape = this.canvas.paper.text(0, 0, '2A');
        shape.attr({ "x": 8.7734375, "y": 60, "text-anchor": "start", "text": "2A", "font-family": "\"Arial\"", "font-size": 8, "stroke": "none", "fill": "#080808", "stroke-scale": true, "font-weight": "normal", "stroke-width": 0, "opacity": 1 });
        shape.data("name", "Label_2A");

        // Label_2Y
        shape = this.canvas.paper.text(0, 0, '2Y');
        shape.attr({ "x": 8.78125, "y": 80.5, "text-anchor": "start", "text": "2Y", "font-family": "\"Arial\"", "font-size": 8, "stroke": "none", "fill": "#080808", "stroke-scale": true, "font-weight": "normal", "stroke-width": 0, "opacity": 1 });
        shape.data("name", "Label_2Y");

        // Label_3A
        shape = this.canvas.paper.text(0, 0, '3A');
        shape.attr({ "x": 9, "y": 100.5, "text-anchor": "start", "text": "3A", "font-family": "\"Arial\"", "font-size": 8, "stroke": "none", "fill": "#080808", "stroke-scale": true, "font-weight": "normal", "stroke-width": 0, "opacity": 1 });
        shape.data("name", "Label_3A");

        // Label_3Y
        shape = this.canvas.paper.text(0, 0, '3Y');
        shape.attr({ "x": 9, "y": 119.5, "text-anchor": "start", "text": "3Y", "font-family": "\"Arial\"", "font-size": 8, "stroke": "none", "fill": "#080808", "stroke-scale": true, "font-weight": "normal", "stroke-width": 0, "opacity": 1 });
        shape.data("name", "Label_3Y");

        // Label_GND
        shape = this.canvas.paper.text(0, 0, 'GND');
        shape.attr({ "x": 8.78125, "y": 144.5, "text-anchor": "start", "text": "GND", "font-family": "\"Arial\"", "font-size": 8, "stroke": "none", "fill": "#080808", "stroke-scale": true, "font-weight": "normal", "stroke-width": 0, "opacity": 1 });
        shape.data("name", "Label_GND");

        // Label_4A
        shape = this.canvas.paper.text(0, 0, '4A');
        shape.attr({ "x": 74.3125, "y": 119.5, "text-anchor": "start", "text": "4A", "font-family": "\"Arial\"", "font-size": 8, "stroke": "none", "fill": "#080808", "stroke-scale": true, "font-weight": "normal", "stroke-width": 0, "opacity": 1 });
        shape.data("name", "Label_4A");

        // Label_4Y
        shape = this.canvas.paper.text(0, 0, '4Y');
        shape.attr({ "x": 74.3125, "y": 142, "text-anchor": "start", "text": "4Y", "font-family": "\"Arial\"", "font-size": 8, "stroke": "none", "fill": "#080808", "stroke-scale": true, "font-weight": "normal", "stroke-width": 0, "opacity": 1 });
        shape.data("name", "Label_4Y");

        // Label_5A
        shape = this.canvas.paper.text(0, 0, '5A');
        shape.attr({ "x": 74.3125, "y": 80.5, "text-anchor": "start", "text": "5A", "font-family": "\"Arial\"", "font-size": 8, "stroke": "none", "fill": "#080808", "stroke-scale": true, "font-weight": "normal", "stroke-width": 0, "opacity": 1 });
        shape.data("name", "Label_5A");

        // Label_5Y
        shape = this.canvas.paper.text(0, 0, '5Y');
        shape.attr({ "x": 74.3125, "y": 100.5, "text-anchor": "start", "text": "5Y", "font-family": "\"Arial\"", "font-size": 8, "stroke": "none", "fill": "#080808", "stroke-scale": true, "font-weight": "normal", "stroke-width": 0, "opacity": 1 });
        shape.data("name", "Label_5Y");

        // Label_6A
        shape = this.canvas.paper.text(0, 0, '6A');
        shape.attr({ "x": 74.3125, "y": 40.5, "text-anchor": "start", "text": "6A", "font-family": "\"Arial\"", "font-size": 8, "stroke": "none", "fill": "#080808", "stroke-scale": true, "font-weight": "normal", "stroke-width": 0, "opacity": 1 });
        shape.data("name", "Label_6A");

        // Label_6Y
        shape = this.canvas.paper.text(0, 0, '6Y');
        shape.attr({ "x": 74.3125, "y": 62.5, "text-anchor": "start", "text": "6Y", "font-family": "\"Arial\"", "font-size": 8, "stroke": "none", "fill": "#080808", "stroke-scale": true, "font-weight": "normal", "stroke-width": 0, "opacity": 1 });
        shape.data("name", "Label_6Y");

        // Label_Vcc
        shape = this.canvas.paper.text(0, 0, 'Vcc');
        shape.attr({ "x": 69, "y": 20.5, "text-anchor": "start", "text": "Vcc", "font-family": "\"Arial\"", "font-size": 8, "stroke": "none", "fill": "#080808", "stroke-scale": true, "font-weight": "normal", "stroke-width": 0, "opacity": 1 });
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
C74LS04 = C74LS04.extend({

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
        var Y1 = this.getOutputPort("Port_1Y");
        Y1.setValue(!(A1.getValue()));

        var A2 = this.getInputPort("Port_2A");
        var Y2 = this.getOutputPort("Port_2Y");
        Y2.setValue(!(A2.getValue()));

        var A3 = this.getInputPort("Port_3A");
        var Y3 = this.getOutputPort("Port_3Y");
        Y3.setValue(!(A3.getValue()));

        var A4 = this.getInputPort("Port_4A");
        var Y4 = this.getOutputPort("Port_4Y");
        Y4.setValue(!(A4.getValue()));

        var A5 = this.getInputPort("Port_5A");
        var Y5 = this.getOutputPort("Port_5Y");
        Y5.setValue(!(A5.getValue()));

        var A6 = this.getInputPort("Port_6A");
        var Y6 = this.getOutputPort("Port_6Y");
        Y6.setValue(!(A6.getValue()));
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

    note: "Y = not A"
});
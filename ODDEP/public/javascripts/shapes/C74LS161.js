// Generated Code for the Draw2D touch HTML5 lib
//                                                        
// http://www.draw2d.org                                  
//                                                        
// Go to the Designer http://www.draw2d.org               
// to design your own shape or download user generated    
//                                                        
var C74LS161 = draw2d.SetFigure.extend({            

   NAME: "C74LS161",

   init:function(attr, setter, getter)
   {
     this._super( $.extend({stroke:0, bgColor:null, width:100,height:190},attr), setter, getter);
     var port;
     // Port_Vcc
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(100, 10.789473684210526));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("Port_Vcc");
     port.setMaxFanOut(20);
     // Port_Co
     port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(100, 21.31578947368421));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("Port_Co");
     port.setMaxFanOut(20);
     // Port_Q0
     port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(100, 32.89473684210526));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("Port_Q0");
     port.setMaxFanOut(20);
     // Port_Q1
     port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(100, 42.89473684210526));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("Port_Q1");
     port.setMaxFanOut(20);
     // Port_Q2
     port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(100, 52.89473684210526));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("Port_Q2");
     port.setMaxFanOut(20);
     // Port_Q3
     port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(100, 63.68421052631579));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("Port_Q3");
     port.setMaxFanOut(20);
     // Port_T
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(100, 74.73684210526315));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("Port_T");
     port.setMaxFanOut(20);
     // Port_nR
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(-2.21875, 10.789473684210526));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("Port_nR");
     port.setMaxFanOut(20);
     // Port_CP
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(-2.21875, 21.31578947368421));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("Port_CP");
     port.setMaxFanOut(20);
     // Port_A
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(-2, 32.89473684210526));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("Port_A");
     port.setMaxFanOut(20);
     // Port_B
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(-2, 42.368421052631575));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("Port_B");
     port.setMaxFanOut(20);
     // Port_C
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(-2.21875, 52.89473684210526));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("Port_C");
     port.setMaxFanOut(20);
     // Port_D
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(-2, 63.68421052631579));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("Port_D");
     port.setMaxFanOut(20);
     // Port_P
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(-2.21875, 74.47368421052632));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("Port_P");
     port.setMaxFanOut(20);
     // Port_GND
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(-2.21875, 85.52631578947368));
     port.setConnectionDirection(3);
     port.setBackgroundColor("#37B1DE");
     port.setName("Port_GND");
     port.setMaxFanOut(20);
     // Port_nLD
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(100, 85.52631578947368));
     port.setConnectionDirection(1);
     port.setBackgroundColor("#37B1DE");
     port.setName("Port_nLD");
     port.setMaxFanOut(20);
     this.persistPorts=false;
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 100;
      this.originalHeight= 190;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();

        // BoundingBox
        shape = this.canvas.paper.path("M0,0 L100,0 L100,190 L0,190");
        shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
        shape.data("name","BoundingBox");
        
        // Rectangle
        shape = this.canvas.paper.path('M30.087488663526074 0L0 0L0 190L100 190L100 0L69.91251133647393 0L70 1.098265895953773L69.69615506024411 4.912503324475892L68.79385241571799 8.61084707882992L67.32050807568885 12.080924855491503L65.32088886237943 15.217300097161115L62.85575219373095 17.92467562920274L60 20.120789216074627L56.840402866513614 21.738913057724858L53.47296355333856 22.729881280036807L50 23.063583815028778L46.52703644666144 22.729881280036807L43.159597133486386 21.738913057724858L40 20.120789216074627L37.14424780626905 17.92467562920274L34.679111137620566 15.217300097161115L32.67949192431115 12.080924855491503L31.206147584282007 8.61084707882992L30.30384493975589 4.912503324475892L30 1.098265895953773L30.087488663526074 0Z');
        shape.attr({"stroke":"#303030","stroke-width":1,"fill":"#FFFFFF","dasharray":null,"opacity":1});
        shape.data("name","Rectangle");
        
        // Label_Name
        shape = this.canvas.paper.text(0,0,'74LS161');
        shape.attr({"x":17.96875,"y":177.5,"text-anchor":"start","text":"74LS161","font-family":"\"Arial\"","font-size":16,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
        shape.data("name","Label_Name");
        
        // Label_nR
        shape = this.canvas.paper.text(0,0,'~R');
        shape.attr({"x":8,"y":20.5,"text-anchor":"start","text":"~R","font-family":"\"Arial\"","font-size":8,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
        shape.data("name","Label_nR");
        
        // Label_CP
        shape = this.canvas.paper.text(0,0,'CP');
        shape.attr({"x":7.78125,"y":40.5,"text-anchor":"start","text":"CP","font-family":"\"Arial\"","font-size":8,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
        shape.data("name","Label_CP");
        
        // Label_A
        shape = this.canvas.paper.text(0,0,'A');
        shape.attr({"x":7.7734375,"y":60,"text-anchor":"start","text":"A","font-family":"\"Arial\"","font-size":8,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
        shape.data("name","Label_A");
        
        // Label_B
        shape = this.canvas.paper.text(0,0,'B');
        shape.attr({"x":7.78125,"y":80.5,"text-anchor":"start","text":"B","font-family":"\"Arial\"","font-size":8,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
        shape.data("name","Label_B");
        
        // Label_C
        shape = this.canvas.paper.text(0,0,'C');
        shape.attr({"x":8,"y":100.5,"text-anchor":"start","text":"C","font-family":"\"Arial\"","font-size":8,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
        shape.data("name","Label_C");
        
        // Label_D
        shape = this.canvas.paper.text(0,0,'D');
        shape.attr({"x":8,"y":121,"text-anchor":"start","text":"D","font-family":"\"Arial\"","font-size":8,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
        shape.data("name","Label_D");
        
        // Label_P
        shape = this.canvas.paper.text(0,0,'P');
        shape.attr({"x":7.78125,"y":144.5,"text-anchor":"start","text":"P","font-family":"\"Arial\"","font-size":8,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
        shape.data("name","Label_P");
        
        // Label_Q3
        shape = this.canvas.paper.text(0,0,'Q3');
        shape.attr({"x":73.3125,"y":119.5,"text-anchor":"start","text":"Q3","font-family":"\"Arial\"","font-size":8,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
        shape.data("name","Label_Q3");
        
        // Label_T
        shape = this.canvas.paper.text(0,0,'T');
        shape.attr({"x":80.671875,"y":141.5,"text-anchor":"start","text":"T","font-family":"\"Arial\"","font-size":8,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
        shape.data("name","Label_T");
        
        // Label_Q1
        shape = this.canvas.paper.text(0,0,'Q1');
        shape.attr({"x":73.3125,"y":80.5,"text-anchor":"start","text":"Q1","font-family":"\"Arial\"","font-size":8,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
        shape.data("name","Label_Q1");
        
        // Label_Q2
        shape = this.canvas.paper.text(0,0,'Q2');
        shape.attr({"x":73.3125,"y":100.5,"text-anchor":"start","text":"Q2","font-family":"\"Arial\"","font-size":8,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
        shape.data("name","Label_Q2");
        
        // Label_Co
        shape = this.canvas.paper.text(0,0,'Co');
        shape.attr({"x":73.3125,"y":40.5,"text-anchor":"start","text":"Co","font-family":"\"Arial\"","font-size":8,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
        shape.data("name","Label_Co");
        
        // Label_Q0
        shape = this.canvas.paper.text(0,0,'Q0');
        shape.attr({"x":73.3125,"y":62.5,"text-anchor":"start","text":"Q0","font-family":"\"Arial\"","font-size":8,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
        shape.data("name","Label_Q0");
        
        // Label_Vcc
        shape = this.canvas.paper.text(0,0,'Vcc');
        shape.attr({"x":68,"y":20.5,"text-anchor":"start","text":"Vcc","font-family":"\"Arial\"","font-size":8,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
        shape.data("name","Label_Vcc");
        
        // Label_GND
        shape = this.canvas.paper.text(0,0,'GND');
        shape.attr({"x":7.7734375,"y":160,"text-anchor":"start","text":"GND","font-family":"\"Arial\"","font-size":8,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
        shape.data("name","Label_GND");
        
        // Label_nLD
        shape = this.canvas.paper.text(0,0,'~LD');
        shape.attr({"x":68,"y":159.5,"text-anchor":"start","text":"~LD","font-family":"\"Arial\"","font-size":8,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
        shape.data("name","Label_nLD");
        

        return this.canvas.paper.setFinish();
   },

   applyAlpha: function()
   {
   },

   layerGet: function(name, attributes)
   {
      if(this.svgNodes===null) return null;

      var result=null;
      this.svgNodes.some(function(shape){
         if(shape.data("name")===name){
            result=shape;
         }
         return result!==null;
      });

      return result;
   },

   layerAttr: function(name, attributes)
   {
     if(this.svgNodes===null) return;

     this.svgNodes.forEach(function(shape){
             if(shape.data("name")===name){
                  shape.attr(attributes);
             }
     });
   },

   layerShow: function(name, flag, duration)
   {
      if(this.svgNodes===null) return;

      if(duration){
        this.svgNodes.forEach(function(node){
            if(node.data("name")===name){
                if(flag){
                    node.attr({ opacity : 0 }).show().animate({ opacity : 1 }, duration);
                }
                else{
                    node.animate({ opacity : 0 }, duration, function () { this.hide() });
                }
            }
        });
      }
      else{
          this.svgNodes.forEach(function(node){
              if(node.data("name")===name){
                   if(flag){node.show();}
                   else{node.hide();}
               }
           });
      }
   },

    calculate: function()
    {
    },

    onStart: function()
    {
    },

    onStop:function()
    {
    },

    getParameterSettings: function()
    {
        return [];
    },

    /**
     * @method
     */
    addPort: function(port, locator)
    {
        this._super(port, locator);
        return port;
    },

    /**
     * @method
     * Return an objects with all important attributes for XML or JSON serialization
     *
     * @returns {Object}
     */
    getPersistentAttributes : function()
    {
        var memento = this._super();

        // add all decorations to the memento
        //
        memento.labels = [];
        this.children.each(function(i,e){
            var labelJSON = e.figure.getPersistentAttributes();
            labelJSON.locator=e.locator.NAME;
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
    setPersistentAttributes : function(memento)
    {
        this._super(memento);

        // remove all decorations created in the constructor of this element
        //
        this.resetChildren();

        // and add all children of the JSON document.
        //
        $.each(memento.labels, $.proxy(function(i,json){
            // create the figure stored in the JSON
            var figure =  eval("new "+json.type+"()");

            // apply all attributes
            figure.attr(json);

            // instantiate the locator
            var locator =  eval("new "+json.locator+"()");

            // add the new figure as child to this figure
            this.add(figure, locator);
        },this));
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
C74LS161 = C74LS161.extend({

    init: function(attr, setter, getter){
         this._super(attr, setter, getter);

         // your special code here
        this.attr({resizeable:false});
        this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());

        this.last_t=false;
        this.counter=0;
    },

    /**
     *  Called by the simulator for every calculation
     *  loop
     *  @required
     **/
    calculate:function()
    {
        var t = this.getInputPort("Port_CP").getValue();
        var rising = this.last_t === false && t === true;
        if (rising === true) {
            var a = this.getOutputPort("Port_Q0");
            var b = this.getOutputPort("Port_Q1");
            var c = this.getOutputPort("Port_Q2");
            var d = this.getOutputPort("Port_Q3");
            a.setValue(!!(this.counter & 1));
            b.setValue(!!(this.counter & 2));
            c.setValue(!!(this.counter & 4));
            d.setValue(!!(this.counter & 8));
            this.counter = (this.counter + 1) % 10;
        }
        this.last_t = t;
    },


    /**
     *  Called if the simulation mode is starting
     *  @required
     **/
    onStart:function()
    {
    },

    /**
     *  Called if the simulation mode is stopping
     *  @required
     **/
    onStop:function()
    {
    }
});
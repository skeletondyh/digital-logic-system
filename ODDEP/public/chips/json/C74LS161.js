// Generated Code for the Draw2D touch HTML5 lib
//
// http://www.draw2d.org
//
// Go to the Designer http://www.draw2d.org
// to design your own shape or download user generated
//
var C74LS161 = draw2d.SetFigure.extend({

   NAME: "C74LS161",  // 芯片型号

   init:function(attr, setter, getter)
   {
     this._super( $.extend({stroke:0, bgColor:null, width:219,height:100},attr), setter, getter);
     this.attr({resizeable:false});   // 固定芯片大小
     var port;
     // 以下为端口定义
     // Port
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(11.87214611872146, 1));
     port.setConnectionDirection(0);
     port.setBackgroundColor("#37B1DE");
     port.setName("port16");
     port.setMaxFanOut(20);
     // Port
     port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(23.059360730593607, 1));
     port.setConnectionDirection(0);
     port.setBackgroundColor("#37B1DE");
     port.setName("port15");
     port.setMaxFanOut(20);
     // Port
     port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(33.789954337899545, 1));
     port.setConnectionDirection(0);
     port.setBackgroundColor("#37B1DE");
     port.setName("port14");
     port.setMaxFanOut(20);
     // Port
     port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(44.52054794520548, 1));
     port.setConnectionDirection(0);
     port.setBackgroundColor("#37B1DE");
     port.setName("port13");
     port.setMaxFanOut(20);
     // Port
     port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(55.70776255707762, 1));
     port.setConnectionDirection(0);
     port.setBackgroundColor("#37B1DE");
     port.setName("port12");
     port.setMaxFanOut(20);
     // Port
     port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(66.89497716894977, 1));
     port.setConnectionDirection(0);
     port.setBackgroundColor("#37B1DE");
     port.setName("port11");
     port.setMaxFanOut(20);
     // Port
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(77.6255707762557, 1));
     port.setConnectionDirection(0);
     port.setBackgroundColor("#37B1DE");
     port.setName("port10");
     port.setMaxFanOut(20);
     // Port
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(89.04109589041096, 1));
     port.setConnectionDirection(0);
     port.setBackgroundColor("#37B1DE");
     port.setName("port9");
     port.setMaxFanOut(20);
     // Port
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(11.87214611872146, 99));
     port.setConnectionDirection(2);
     port.setBackgroundColor("#37B1DE");
     port.setName("port1");
     port.setMaxFanOut(20);
     // Port
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(23.059360730593607, 99));
     port.setConnectionDirection(2);
     port.setBackgroundColor("#37B1DE");
     port.setName("port2");
     port.setMaxFanOut(20);
     // Port
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(33.789954337899545, 99));
     port.setConnectionDirection(2);
     port.setBackgroundColor("#37B1DE");
     port.setName("port3");
     port.setMaxFanOut(20);
     // Port
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(44.52054794520548, 99));
     port.setConnectionDirection(2);
     port.setBackgroundColor("#37B1DE");
     port.setName("port4");
     port.setMaxFanOut(20);
     // Port
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(55.70776255707762, 99));
     port.setConnectionDirection(2);
     port.setBackgroundColor("#37B1DE");
     port.setName("port5");
     port.setMaxFanOut(20);
     // Port
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(66.89497716894977, 99));
     port.setConnectionDirection(2);
     port.setBackgroundColor("#37B1DE");
     port.setName("port6");
     port.setMaxFanOut(20);
     // Port
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(77.6255707762557, 99));
     port.setConnectionDirection(2);
     port.setBackgroundColor("#37B1DE");
     port.setName("port7");
     port.setMaxFanOut(20);
     // Port
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(89.04109589041096, 99));
     port.setConnectionDirection(2);
     port.setBackgroundColor("#37B1DE");
     port.setName("port8");
     port.setMaxFanOut(20);
     this.persistPorts=false;
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 219;
      this.originalHeight= 100;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();

        // BoundingBox
        shape = this.canvas.paper.path("M0,0 L219,0 L219,100 L0,100");
        shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
        shape.data("name","BoundingBox");

        // Rectangle
        shape = this.canvas.paper.path('M0 75.82502267294814L0 100L219 100L219 0L0 0L0 24.174977327051863L2.514852619340175 24.3949984216826L6.892523726467402 25.567991859566376L10.999999999999972 27.483339501604576L14.712477851850025 30.082844478906566L17.917155521093434 33.287522148149975L20.516660498395424 37L22.432008140433624 41.107476273532626L23.6050015783174 45.48514738065981L24 50L23.6050015783174 54.51485261934019L22.432008140433624 58.892523726467374L20.516660498395396 63L17.917155521093434 66.71247785185002L14.712477851850025 69.91715552109343L11 72.5166604983954L6.892523726467402 74.43200814043362L2.514852619340189 75.6050015783174L0 75.82502267294814Z');
        shape.attr({"stroke":"#303030","stroke-width":1,"fill":"#FFFFFF","dasharray":null,"opacity":1});
        shape.data("name","Rectangle");

        // Label
        shape = this.canvas.paper.text(0,0,'74LS161');
        shape.attr({"x":81.9609375,"y":50,"text-anchor":"start","text":"74LS161","font-family":"\"Arial\"","font-size":20,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
        shape.data("name","Label");

        // Label
        shape = this.canvas.paper.text(0,0,'~R');
        shape.attr({"x":15.5546875,"y":84,"text-anchor":"start","text":"~R","font-family":"\"Arial\"","font-size":8,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
        shape.data("name","Label");

        // Label
        shape = this.canvas.paper.text(0,0,'CP');
        shape.attr({"x":42.2265625,"y":84,"text-anchor":"start","text":"CP","font-family":"\"Arial\"","font-size":7,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
        shape.data("name","Label");

        // Label
        shape = this.canvas.paper.text(0,0,'A');
        shape.attr({"x":69.8828125,"y":84,"text-anchor":"start","text":"A","font-family":"\"Arial\"","font-size":8,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
        shape.data("name","Label");

        // Label
        shape = this.canvas.paper.text(0,0,'B');
        shape.attr({"x":94,"y":84,"text-anchor":"start","text":"B","font-family":"\"Arial\"","font-size":8,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
        shape.data("name","Label");

        // Label
        shape = this.canvas.paper.text(0,0,'C');
        shape.attr({"x":117.671875,"y":84,"text-anchor":"start","text":"C","font-family":"\"Arial\"","font-size":6,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
        shape.data("name","Label");

        // Label
        shape = this.canvas.paper.text(0,0,'D');
        shape.attr({"x":142.171875,"y":84,"text-anchor":"start","text":"D","font-family":"\"Arial\"","font-size":8,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
        shape.data("name","Label");

        // Label
        shape = this.canvas.paper.text(0,0,'P');
        shape.attr({"x":166,"y":84,"text-anchor":"start","text":"P","font-family":"\"Arial\"","font-size":8,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
        shape.data("name","Label");

        // Label
        shape = this.canvas.paper.text(0,0,'GND');
        shape.attr({"x":181.671875,"y":84,"text-anchor":"start","text":"GND","font-family":"\"Arial\"","font-size":8,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
        shape.data("name","Label");

        // Label
        shape = this.canvas.paper.text(0,0,'Vcc');
        shape.attr({"x":13.390625,"y":16,"text-anchor":"start","text":"Vcc","font-family":"\"Arial\"","font-size":8,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
        shape.data("name","Label");

        // Label
        shape = this.canvas.paper.text(0,0,'Co');
        shape.attr({"x":42.8359375,"y":16,"text-anchor":"start","text":"Co","font-family":"\"Arial\"","font-size":8,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
        shape.data("name","Label");

        // Label
        shape = this.canvas.paper.text(0,0,'Q0');
        shape.attr({"x":65.8984375,"y":16,"text-anchor":"start","text":"Q0","font-family":"\"Arial\"","font-size":8,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
        shape.data("name","Label");

        // Label
        shape = this.canvas.paper.text(0,0,'Q1');
        shape.attr({"x":88.9140625,"y":16,"text-anchor":"start","text":"Q1","font-family":"\"Arial\"","font-size":8,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
        shape.data("name","Label");

        // Label
        shape = this.canvas.paper.text(0,0,'Q2');
        shape.attr({"x":113,"y":16,"text-anchor":"start","text":"Q2","font-family":"\"Arial\"","font-size":8,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
        shape.data("name","Label");

        // Label
        shape = this.canvas.paper.text(0,0,'Q3');
        shape.attr({"x":137.328125,"y":16,"text-anchor":"start","text":"Q3","font-family":"\"Arial\"","font-size":8,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
        shape.data("name","Label");

        // Label
        shape = this.canvas.paper.text(0,0,'T');
        shape.attr({"x":166,"y":16,"text-anchor":"start","text":"T","font-family":"\"Arial\"","font-size":8,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
        shape.data("name","Label");

        // Label
        shape = this.canvas.paper.text(0,0,'~LD');
        shape.attr({"x":183.828125,"y":16,"text-anchor":"start","text":"~LD","font-family":"\"Arial\"","font-size":8,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
        shape.data("name","Label");


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
    },

    /**
     *  Called by the simulator for every calculation
     *  loop
     *  @required
     **/
    calculate:function()
    {
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

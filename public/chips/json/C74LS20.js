var C74LS20 = draw2d.SetFigure.extend({

   NAME: "C74LS20",   // 芯片名称

   init:function(attr, setter, getter)
   {
     this._super( $.extend({stroke:0, bgColor:null, width:219,height:116},attr), setter, getter);
     this.attr({resizeable:false}); // 固定芯片大小
     var port;
     // 以下为端口定义
     // Port
     port = this.createPort("hybrid", new draw2d.layout.locator.XYRelPortLocator(13.698630136986301, 18.103448275862068));
     port.setConnectionDirection(0);
     port.setBackgroundColor("#37B1DE");
     port.setName("14");
     port.setMaxFanOut(20);
     // Port
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(25.11415525114155, 18.103448275862068));
     port.setConnectionDirection(0);
     port.setBackgroundColor("#37B1DE");
     port.setName("13");
     port.setMaxFanOut(20);
     // Port
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(36.5296803652968, 18.103448275862068));
     port.setConnectionDirection(0);
     port.setBackgroundColor("#37B1DE");
     port.setName("12");
     port.setMaxFanOut(20);
     // Port
     port = this.createPort("hybrid", new draw2d.layout.locator.XYRelPortLocator(47.94520547945205, 18.103448275862068));
     port.setConnectionDirection(0);
     port.setBackgroundColor("#37B1DE");
     port.setName("11");
     port.setMaxFanOut(20);
     // Port
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(59.3607305936073, 18.103448275862068));
     port.setConnectionDirection(0);
     port.setBackgroundColor("#37B1DE");
     port.setName("10");
     port.setMaxFanOut(20);
     // Port
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(70.77625570776256, 18.103448275862068));
     port.setConnectionDirection(0);
     port.setBackgroundColor("#37B1DE");
     port.setName("9");
     port.setMaxFanOut(20);
     // Port
     port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(82.1917808219178, 18.103448275862068));
     port.setConnectionDirection(0);
     port.setBackgroundColor("#37B1DE");
     port.setName("8");
     port.setMaxFanOut(20);
     // Port
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(13.698630136986301, 81.89655172413792));
     port.setConnectionDirection(2);
     port.setBackgroundColor("#37B1DE");
     port.setName("1");
     port.setMaxFanOut(20);
     // Port
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(25.11415525114155, 81.89655172413792));
     port.setConnectionDirection(2);
     port.setBackgroundColor("#37B1DE");
     port.setName("2");
     port.setMaxFanOut(20);
     // Port
     port = this.createPort("hybrid", new draw2d.layout.locator.XYRelPortLocator(36.5296803652968, 81.89655172413792));
     port.setConnectionDirection(2);
     port.setBackgroundColor("#37B1DE");
     port.setName("3");
     port.setMaxFanOut(20);
     // Port
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(47.94520547945205, 81.89655172413792));
     port.setConnectionDirection(2);
     port.setBackgroundColor("#37B1DE");
     port.setName("4");
     port.setMaxFanOut(20);
     // Port
     port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(59.3607305936073, 81.89655172413792));
     port.setConnectionDirection(2);
     port.setBackgroundColor("#37B1DE");
     port.setName("5");
     port.setMaxFanOut(20);
     // Port
     //port = this.addPort(new DecoratedOutputPort(), new draw2d.layout.locator.XYRelPortLocator(70.77625570776256, 81.89655172413792));
     port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(70.77625570776256, 81.89655172413792));
     port.setConnectionDirection(2);
     port.setBackgroundColor("#37B1DE");
     port.setName("6");
     port.setMaxFanOut(20);
     // Port
     port = this.createPort("hybrid", new draw2d.layout.locator.XYRelPortLocator(82.1917808219178, 81.89655172413792));
     port.setConnectionDirection(2);
     port.setBackgroundColor("#37B1DE");
     port.setName("7");
     port.setMaxFanOut(20);
     this.persistPorts=false;
   },

   createShapeElement : function()
   {
      var shape = this._super();
      this.originalWidth = 219;
      this.originalHeight= 116;
      return shape;
   },

   createSet: function()
   {
       this.canvas.paper.setStart();

        // BoundingBox
        shape = this.canvas.paper.path("M0,0 L219,0 L219,116 L0,116");
        shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
        shape.data("name","BoundingBox");

        // Rectangle
        shape = this.canvas.paper.path('M9 73L9 93L193 93L193 23L9 23L9 43L11.604722665003948 43.227883704816875L14.13030214988504 43.90461068821138L16.499999999999986 45.00961894323342L18.641814145298085 46.509333353215325L20.49066664678466 48.3581858547019L21.99038105676658 50.5L23.095389311788622 52.86969785011496L23.772116295183125 55.39527733499605L24 58L23.772116295183125 60.60472266500395L23.095389311788622 63.13030214988504L21.99038105676658 65.5L20.490666646784675 67.6418141452981L18.641814145298085 69.49066664678466L16.5 70.99038105676658L14.13030214988504 72.09538931178864L11.604722665003962 72.77211629518311L9 73Z');
        shape.attr({"stroke":"#303030","stroke-width":1,"fill":"#FFFFFF","dasharray":null,"opacity":1});
        shape.data("name","Rectangle");

        // Label
        shape = this.canvas.paper.text(0,0,'74LS20');
        shape.attr({"x":76,"y":59.5,"text-anchor":"start","text":"74LS20","font-family":"\"Arial\"","font-size":15,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":0.75});
        shape.data("name","Label");

        // Label
        shape = this.canvas.paper.text(0,0,'1');
        shape.attr({"x":27,"y":83.5,"text-anchor":"start","text":"1","font-family":"\"Arial\"","font-size":10,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
        shape.data("name","Label");

        // Label
        shape = this.canvas.paper.text(0,0,'2');
        shape.attr({"x":52,"y":83.5,"text-anchor":"start","text":"2","font-family":"\"Arial\"","font-size":10,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
        shape.data("name","Label");

        // Label
        shape = this.canvas.paper.text(0,0,'3');
        shape.attr({"x":77,"y":83.5,"text-anchor":"start","text":"3","font-family":"\"Arial\"","font-size":10,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
        shape.data("name","Label");

        // Label
        shape = this.canvas.paper.text(0,0,'4');
        shape.attr({"x":102,"y":83.5,"text-anchor":"start","text":"4","font-family":"\"Arial\"","font-size":10,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
        shape.data("name","Label");

        // Label
        shape = this.canvas.paper.text(0,0,'5');
        shape.attr({"x":127,"y":83.5,"text-anchor":"start","text":"5","font-family":"\"Arial\"","font-size":10,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
        shape.data("name","Label");

        // Label
        shape = this.canvas.paper.text(0,0,'6');
        shape.attr({"x":152,"y":83.5,"text-anchor":"start","text":"6","font-family":"\"Arial\"","font-size":10,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
        shape.data("name","Label");

        // Label
        shape = this.canvas.paper.text(0,0,'7');
        shape.attr({"x":177,"y":83.5,"text-anchor":"start","text":"7","font-family":"\"Arial\"","font-size":10,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
        shape.data("name","Label");

        // Label
        shape = this.canvas.paper.text(0,0,'8');
        shape.attr({"x":177,"y":33.5,"text-anchor":"start","text":"8","font-family":"\"Arial\"","font-size":10,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
        shape.data("name","Label");

        // Label
        shape = this.canvas.paper.text(0,0,'9');
        shape.attr({"x":152,"y":33.5,"text-anchor":"start","text":"9","font-family":"\"Arial\"","font-size":10,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
        shape.data("name","Label");

        // Label
        shape = this.canvas.paper.text(0,0,'10');
        shape.attr({"x":124,"y":33.5,"text-anchor":"start","text":"10","font-family":"\"Arial\"","font-size":10,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
        shape.data("name","Label");

        // Label
        shape = this.canvas.paper.text(0,0,'11');
        shape.attr({"x":99,"y":33.5,"text-anchor":"start","text":"11","font-family":"\"Arial\"","font-size":10,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
        shape.data("name","Label");

        // Label
        shape = this.canvas.paper.text(0,0,'12');
        shape.attr({"x":74,"y":33.5,"text-anchor":"start","text":"12","font-family":"\"Arial\"","font-size":10,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
        shape.data("name","Label");

        // Label
        shape = this.canvas.paper.text(0,0,'13');
        shape.attr({"x":49,"y":33.5,"text-anchor":"start","text":"13","font-family":"\"Arial\"","font-size":10,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
        shape.data("name","Label");

        // Label
        shape = this.canvas.paper.text(0,0,'14');
        shape.attr({"x":24,"y":33.5,"text-anchor":"start","text":"14","font-family":"\"Arial\"","font-size":10,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
        shape.data("name","Label");

        // Label
        shape = this.canvas.paper.text(0,0,'Vcc');
        shape.attr({"x":5,"y":12,"text-anchor":"start","text":"Vcc","font-family":"\"Arial\"","font-size":12,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
        shape.data("name","Label");

        // Label
        shape = this.canvas.paper.text(0,0,'GND');
        shape.attr({"x":185,"y":104,"text-anchor":"start","text":"GND","font-family":"\"Arial\"","font-size":12,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
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

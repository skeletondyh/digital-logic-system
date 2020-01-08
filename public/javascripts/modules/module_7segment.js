// Generated Code for the Draw2D touch HTML5 lib
//                                                        
// http://www.draw2d.org                                  
//                                                        
// Go to the Designer http://www.draw2d.org               
// to design your own shape or download user generated    
//                                                        
var module_7segment = draw2d.SetFigure.extend({            

    NAME: "module_7segment",
 
    init:function(attr, setter, getter)
    {
      this._super( $.extend({stroke:0, bgColor:null, width:250,height:250},attr), setter, getter);
      var port;
      // Port_1a
      port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(11.375, 71.25));
      port.setConnectionDirection(3);
      port.setBackgroundColor("#37B1DE");
      port.setName("Port_1a");
      port.setMaxFanOut(20);
      // Port_1b
      port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(11.375, 79.75));
      port.setConnectionDirection(3);
      port.setBackgroundColor("#37B1DE");
      port.setName("Port_1b");
      port.setMaxFanOut(20);
      // Port_1c
      port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(11.375, 88.25));
      port.setConnectionDirection(3);
      port.setBackgroundColor("#37B1DE");
      port.setName("Port_1c");
      port.setMaxFanOut(20);
      // Port_1d
      port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(24.875, 67.5));
      port.setConnectionDirection(3);
      port.setBackgroundColor("#37B1DE");
      port.setName("Port_1d");
      port.setMaxFanOut(20);
      // Port_1e
      port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(24.875, 75.25));
      port.setConnectionDirection(3);
      port.setBackgroundColor("#37B1DE");
      port.setName("Port_1e");
      port.setMaxFanOut(20);
      // Port_1f
      port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(24.875, 83));
      port.setConnectionDirection(3);
      port.setBackgroundColor("#37B1DE");
      port.setName("Port_1f");
      port.setMaxFanOut(20);
      // Port_1g
      port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(24.875, 91));
      port.setConnectionDirection(3);
      port.setBackgroundColor("#37B1DE");
      port.setName("Port_1g");
      port.setMaxFanOut(20);
      // Port_2a
      port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(44.125, 71.25));
      port.setConnectionDirection(2);
      port.setBackgroundColor("#37B1DE");
      port.setName("Port_2a");
      port.setMaxFanOut(20);
      // Port_2b
      port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(44.125, 79.75));
      port.setConnectionDirection(2);
      port.setBackgroundColor("#37B1DE");
      port.setName("Port_2b");
      port.setMaxFanOut(20);
      // Port_2c
      port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(44.125, 88.25));
      port.setConnectionDirection(2);
      port.setBackgroundColor("#37B1DE");
      port.setName("Port_2c");
      port.setMaxFanOut(20);
      // Port_2d
      port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(56.875, 67.5));
      port.setConnectionDirection(2);
      port.setBackgroundColor("#37B1DE");
      port.setName("Port_2d");
      port.setMaxFanOut(20);
      // Port_2e
      port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(56.75, 75.25));
      port.setConnectionDirection(2);
      port.setBackgroundColor("#37B1DE");
      port.setName("Port_2e");
      port.setMaxFanOut(20);
      // Port_2f
      port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(56.875, 83));
      port.setConnectionDirection(2);
      port.setBackgroundColor("#37B1DE");
      port.setName("Port_2f");
      port.setMaxFanOut(20);
      // Port_2g
      port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(56.875, 91));
      port.setConnectionDirection(2);
      port.setBackgroundColor("#37B1DE");
      port.setName("Port_2g");
      port.setMaxFanOut(20);
      // Port_3a
      port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(74.125, 71.25));
      port.setConnectionDirection(1);
      port.setBackgroundColor("#37B1DE");
      port.setName("Port_3a");
      port.setMaxFanOut(20);
      // Port_3b
      port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(74.125, 79.75));
      port.setConnectionDirection(1);
      port.setBackgroundColor("#37B1DE");
      port.setName("Port_3b");
      port.setMaxFanOut(20);
      // Port_3c
      port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(74.125, 88.25));
      port.setConnectionDirection(1);
      port.setBackgroundColor("#37B1DE");
      port.setName("Port_3c");
      port.setMaxFanOut(20);
      // Port_3d
      port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(88.625, 67.5));
      port.setConnectionDirection(1);
      port.setBackgroundColor("#37B1DE");
      port.setName("Port_3d");
      port.setMaxFanOut(20);
      // Port_3e
      port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(88.625, 75.25));
      port.setConnectionDirection(1);
      port.setBackgroundColor("#37B1DE");
      port.setName("Port_3e");
      port.setMaxFanOut(20);
      // Port_3f
      port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(88.625, 83.125));
      port.setConnectionDirection(1);
      port.setBackgroundColor("#37B1DE");
      port.setName("Port_3f");
      port.setMaxFanOut(20);
      // Port_3g
      port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(88.625, 91));
      port.setConnectionDirection(1);
      port.setBackgroundColor("#37B1DE");
      port.setName("Port_3g");
      port.setMaxFanOut(20);
      this.persistPorts=false;
    },
 
    createShapeElement : function()
    {
       var shape = this._super();
       this.originalWidth = 400;
       this.originalHeight= 400;
       return shape;
    },
 
    createSet: function()
    {
        this.canvas.paper.setStart();
 
         // BoundingBox
         shape = this.canvas.paper.path("M0,0 L400,0 L400,400 L0,400");
         shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
         shape.data("name","BoundingBox");
         
         // BoundingBox
         shape = this.canvas.paper.path('M0 0L400 0L400 400L0 400Z');
         shape.attr({"stroke":"#303030","stroke-width":1,"fill":"#FFFFFF","dasharray":null,"opacity":1});
         shape.data("name","BoundingBox");
         
         // seg_1a
         shape = this.canvas.paper.path('M112.5 41L32.5 41L32.5 31L112.5 31Z');
         shape.attr({"stroke":"#D6D6D6","stroke-width":1,"fill":"#C21B7A","dasharray":null,"opacity":1});
         shape.data("name","seg_1a");
         
         // seg_1b
         shape = this.canvas.paper.path('M39.5 127L29.5 127L29.5 47L39.5 47Z');
         shape.attr({"stroke":"#D6D6D6","stroke-width":1,"fill":"#C21B7A","dasharray":null,"opacity":1});
         shape.data("name","seg_1b");
         
         // seg_1c
         shape = this.canvas.paper.path('M115.5 127L105.5 127L105.5 47L115.5 47Z');
         shape.attr({"stroke":"#D6D6D6","stroke-width":1,"fill":"#C21B7A","dasharray":null,"opacity":1});
         shape.data("name","seg_1c");
         
         // seg_1d
         shape = this.canvas.paper.path('M112.5 142L32.5 142L32.5 132L112.5 132Z');
         shape.attr({"stroke":"#D6D6D6","stroke-width":1,"fill":"#C21B7A","dasharray":null,"opacity":1});
         shape.data("name","seg_1d");
         
         // seg_1e
         shape = this.canvas.paper.path('M39.5 228L29.5 228L29.5 148L39.5 148Z');
         shape.attr({"stroke":"#D6D6D6","stroke-width":1,"fill":"#C21B7A","dasharray":null,"opacity":1});
         shape.data("name","seg_1e");
         
         // seg_1f
         shape = this.canvas.paper.path('M115.5 228L105.5 228L105.5 148L115.5 148Z');
         shape.attr({"stroke":"#D6D6D6","stroke-width":1,"fill":"#C21B7A","dasharray":null,"opacity":1});
         shape.data("name","seg_1f");
         
         // seg_1g
         shape = this.canvas.paper.path('M112.5 243L32.5 243L32.5 233L112.5 233Z');
         shape.attr({"stroke":"#D6D6D6","stroke-width":1,"fill":"#C21B7A","dasharray":null,"opacity":1});
         shape.data("name","seg_1g");
         
         // seg_2a
         shape = this.canvas.paper.path('M239.5 41L159.5 41L159.5 31L239.5 31Z');
         shape.attr({"stroke":"#D6D6D6","stroke-width":1,"fill":"#C21B7A","dasharray":null,"opacity":1});
         shape.data("name","seg_2a");
         
         // seg_2b
         shape = this.canvas.paper.path('M166.5 127L156.5 127L156.5 47L166.5 47Z');
         shape.attr({"stroke":"#D6D6D6","stroke-width":1,"fill":"#C21B7A","dasharray":null,"opacity":1});
         shape.data("name","seg_2b");
         
         // seg_2c
         shape = this.canvas.paper.path('M243.5 127L233.5 127L233.5 47L243.5 47Z');
         shape.attr({"stroke":"#D6D6D6","stroke-width":1,"fill":"#C21B7A","dasharray":null,"opacity":1});
         shape.data("name","seg_2c");
         
         // seg_2d
         shape = this.canvas.paper.path('M237.5 142L157.5 142L157.5 132L237.5 132Z');
         shape.attr({"stroke":"#D6D6D6","stroke-width":1,"fill":"#C21B7A","dasharray":null,"opacity":1});
         shape.data("name","seg_2d");
         
         // seg_2e
         shape = this.canvas.paper.path('M166.5 228L156.5 228L156.5 148L166.5 148Z');
         shape.attr({"stroke":"#D6D6D6","stroke-width":1,"fill":"#C21B7A","dasharray":null,"opacity":1});
         shape.data("name","seg_2e");
         
         // seg_2f
         shape = this.canvas.paper.path('M243.5 228L233.5 228L233.5 148L243.5 148Z');
         shape.attr({"stroke":"#D6D6D6","stroke-width":1,"fill":"#C21B7A","dasharray":null,"opacity":1});
         shape.data("name","seg_2f");
         
         // seg_2g
         shape = this.canvas.paper.path('M239.5 243L159.5 243L159.5 233L239.5 233Z');
         shape.attr({"stroke":"#D6D6D6","stroke-width":1,"fill":"#C21B7A","dasharray":null,"opacity":1});
         shape.data("name","seg_2g");
         
         // seg_3a
         shape = this.canvas.paper.path('M362.5 41L282.5 41L282.5 31L362.5 31Z');
         shape.attr({"stroke":"#D6D6D6","stroke-width":1,"fill":"#C21B7A","dasharray":null,"opacity":1});
         shape.data("name","seg_3a");
         
         // seg_3b
         shape = this.canvas.paper.path('M287.5 127L277.5 127L277.5 47L287.5 47Z');
         shape.attr({"stroke":"#D6D6D6","stroke-width":1,"fill":"#C21B7A","dasharray":null,"opacity":1});
         shape.data("name","seg_3b");
         
         // seg_3c
         shape = this.canvas.paper.path('M366.5 126.5L356.5 126.5L356.5 46.5L366.5 46.5Z');
         shape.attr({"stroke":"#D6D6D6","stroke-width":1,"fill":"#C21B7A","dasharray":null,"opacity":1});
         shape.data("name","seg_3c");
         
         // seg_3d
         shape = this.canvas.paper.path('M362.5 142L282.5 142L282.5 132L362.5 132Z');
         shape.attr({"stroke":"#D6D6D6","stroke-width":1,"fill":"#C21B7A","dasharray":null,"opacity":1});
         shape.data("name","seg_3d");
         
         // seg_3e
         shape = this.canvas.paper.path('M287.5 228L277.5 228L277.5 148L287.5 148Z');
         shape.attr({"stroke":"#D6D6D6","stroke-width":1,"fill":"#C21B7A","dasharray":null,"opacity":1});
         shape.data("name","seg_3e");
         
         // seg_3f
         shape = this.canvas.paper.path('M366.5 228L356.5 228L356.5 148L366.5 148Z');
         shape.attr({"stroke":"#D6D6D6","stroke-width":1,"fill":"#C21B7A","dasharray":null,"opacity":1});
         shape.data("name","seg_3f");
         
         // seg_3g
         shape = this.canvas.paper.path('M362.5 243L282.5 243L282.5 233L362.5 233Z');
         shape.attr({"stroke":"#D6D6D6","stroke-width":1,"fill":"#C21B7A","dasharray":null,"opacity":1});
         shape.data("name","seg_3g");
         
 
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
 module_7segment = module_7segment.extend({
 
     init: function(attr, setter, getter){
          this._super(attr, setter, getter);
 
          // your special code here


        this.portLockup = [];

        // seg1
        this.portLockup.push({ p:this.getPort("Port_1a"), s:"seg_1a"});
        this.portLockup.push({ p:this.getPort("Port_1b"), s:"seg_1b"});
        this.portLockup.push({ p:this.getPort("Port_1c"), s:"seg_1c"});
        this.portLockup.push({ p:this.getPort("Port_1d"), s:"seg_1d"});
        this.portLockup.push({ p:this.getPort("Port_1e"), s:"seg_1e"});
        this.portLockup.push({ p:this.getPort("Port_1f"), s:"seg_1f"});
        this.portLockup.push({ p:this.getPort("Port_1g"), s:"seg_1g"});

        // seg2
        this.portLockup.push({ p:this.getPort("Port_2a"), s:"seg_2a"});
        this.portLockup.push({ p:this.getPort("Port_2b"), s:"seg_2b"});
        this.portLockup.push({ p:this.getPort("Port_2c"), s:"seg_2c"});
        this.portLockup.push({ p:this.getPort("Port_2d"), s:"seg_2d"});
        this.portLockup.push({ p:this.getPort("Port_2e"), s:"seg_2e"});
        this.portLockup.push({ p:this.getPort("Port_2f"), s:"seg_2f"});
        this.portLockup.push({ p:this.getPort("Port_2g"), s:"seg_2g"});

        // seg3
        this.portLockup.push({ p:this.getPort("Port_3a"), s:"seg_3a"});
        this.portLockup.push({ p:this.getPort("Port_3b"), s:"seg_3b"});
        this.portLockup.push({ p:this.getPort("Port_3c"), s:"seg_3c"});
        this.portLockup.push({ p:this.getPort("Port_3d"), s:"seg_3d"});
        this.portLockup.push({ p:this.getPort("Port_3e"), s:"seg_3e"});
        this.portLockup.push({ p:this.getPort("Port_3f"), s:"seg_3f"});
        this.portLockup.push({ p:this.getPort("Port_3g"), s:"seg_3g"});
     },
 
     /**
      *  Called by the simulator for every calculation
      *  loop
      *  @required
      **/
     calculate:function()
     {
        var _this = this;
        this.portLockup.forEach(function(element, index){
            _this.layerAttr(element.s, { fill:element.p.getValue()?"#C21B7A":null});
        });
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
        // var _this = this;
        // this.portLockup.forEach(function(element, index){
            // _this.layerAttr(element.s, { fill:"#C21B7A"});
        // });
     }
 });
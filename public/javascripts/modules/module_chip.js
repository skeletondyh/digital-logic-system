// Generated Code for the Draw2D touch HTML5 lib
//                                                        
// http://www.draw2d.org                                  
//                                                        
// Go to the Designer http://www.draw2d.org               
// to design your own shape or download user generated    
//                                                        
var module_chip = draw2d.SetFigure.extend({            

    NAME: "module_chip",
 
    init:function(attr, setter, getter)
    {
      this._super( $.extend({stroke:0, bgColor:null, width:250,height:250},attr), setter, getter);
      var port;
      // Port_P1
      port = this.createPort("hybrid", new draw2d.layout.locator.XYRelPortLocator(25, 76.25));
      port.setConnectionDirection(2);
      port.setBackgroundColor("#37B1DE");
      port.setName("Port_P1");
      port.setMaxFanOut(20);
      // Port_P2
      port = this.createPort("hybrid", new draw2d.layout.locator.XYRelPortLocator(33.75, 88.75));
      port.setConnectionDirection(2);
      port.setBackgroundColor("#37B1DE");
      port.setName("Port_P2");
      port.setMaxFanOut(20);
      // Port_P3
      port = this.createPort("hybrid", new draw2d.layout.locator.XYRelPortLocator(42.5, 76.25));
      port.setConnectionDirection(2);
      port.setBackgroundColor("#37B1DE");
      port.setName("Port_P3");
      port.setMaxFanOut(20);
      // Port_P4
      port = this.createPort("hybrid", new draw2d.layout.locator.XYRelPortLocator(51.25, 88.75));
      port.setConnectionDirection(2);
      port.setBackgroundColor("#37B1DE");
      port.setName("Port_P4");
      port.setMaxFanOut(20);
      // Port_P5
      port = this.createPort("hybrid", new draw2d.layout.locator.XYRelPortLocator(60, 76.25));
      port.setConnectionDirection(2);
      port.setBackgroundColor("#37B1DE");
      port.setName("Port_P5");
      port.setMaxFanOut(20);
      // Port_P6
      port = this.createPort("hybrid", new draw2d.layout.locator.XYRelPortLocator(68.75, 88.75));
      port.setConnectionDirection(2);
      port.setBackgroundColor("#37B1DE");
      port.setName("Port_P6");
      port.setMaxFanOut(20);
      // Port_P7
      port = this.createPort("hybrid", new draw2d.layout.locator.XYRelPortLocator(77.5, 76.25));
      port.setConnectionDirection(2);
      port.setBackgroundColor("#37B1DE");
      port.setName("Port_P7");
      port.setMaxFanOut(20);
      // Port_P8
      port = this.createPort("hybrid", new draw2d.layout.locator.XYRelPortLocator(77.5, 26.25));
      port.setConnectionDirection(0);
      port.setBackgroundColor("#37B1DE");
      port.setName("Port_P8");
      port.setMaxFanOut(20);
      // Port_P9
      port = this.createPort("hybrid", new draw2d.layout.locator.XYRelPortLocator(68.75, 13.75));
      port.setConnectionDirection(0);
      port.setBackgroundColor("#37B1DE");
      port.setName("Port_P9");
      port.setMaxFanOut(20);
      // Port_P10
      port = this.createPort("hybrid", new draw2d.layout.locator.XYRelPortLocator(60, 26.25));
      port.setConnectionDirection(0);
      port.setBackgroundColor("#37B1DE");
      port.setName("Port_P10");
      port.setMaxFanOut(20);
      // Port_P11
      port = this.createPort("hybrid", new draw2d.layout.locator.XYRelPortLocator(51.25, 13.75));
      port.setConnectionDirection(0);
      port.setBackgroundColor("#37B1DE");
      port.setName("Port_P11");
      port.setMaxFanOut(20);
      // Port_P12
      port = this.createPort("hybrid", new draw2d.layout.locator.XYRelPortLocator(42.5, 26.25));
      port.setConnectionDirection(0);
      port.setBackgroundColor("#37B1DE");
      port.setName("Port_P12");
      port.setMaxFanOut(20);
      // Port_P13
      port = this.createPort("hybrid", new draw2d.layout.locator.XYRelPortLocator(33.75, 13.75));
      port.setConnectionDirection(0);
      port.setBackgroundColor("#37B1DE");
      port.setName("Port_P13");
      port.setMaxFanOut(20);
      // Port_P14
      port = this.createPort("hybrid", new draw2d.layout.locator.XYRelPortLocator(25, 26.25));
      port.setConnectionDirection(0);
      port.setBackgroundColor("#37B1DE");
      port.setName("Port_P14");
      port.setMaxFanOut(20);
      // Port_74LS00
      port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(1.25, 38.75));
      port.setConnectionDirection(3);
      port.setBackgroundColor("#37B1DE");
      port.setName("Port_74LS00");
      port.setMaxFanOut(20);
      // Port_74LS04
      port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(1.25, 43.75));
      port.setConnectionDirection(3);
      port.setBackgroundColor("#37B1DE");
      port.setName("Port_74LS04");
      port.setMaxFanOut(20);
      // Port_74LS11
      port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(1.25, 48.75));
      port.setConnectionDirection(3);
      port.setBackgroundColor("#37B1DE");
      port.setName("Port_74LS11");
      port.setMaxFanOut(20);
      // Port_74LS20
      port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(1.25, 53.75));
      port.setConnectionDirection(3);
      port.setBackgroundColor("#37B1DE");
      port.setName("Port_74LS20");
      port.setMaxFanOut(20);
      // Port_74LS27
      port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(1.25, 58.75));
      port.setConnectionDirection(3);
      port.setBackgroundColor("#37B1DE");
      port.setName("Port_74LS27");
      port.setMaxFanOut(20);
      // Port_74LS86
      port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(1.25, 63.75));
      port.setConnectionDirection(3);
      port.setBackgroundColor("#37B1DE");
      port.setName("Port_74LS86");
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
         shape.attr({"stroke":"none","stroke-width":0,"fill":"#1A686E"});
         shape.data("name","BoundingBox");
         
         // BoundingBox
         shape = this.canvas.paper.path('M0 0L400 0L400 400L0 400Z');
         shape.attr({"stroke":"#303030","stroke-width":1,"fill":"#1A686E","dasharray":null,"opacity":1});
         shape.data("name","BoundingBox");
         
         // Label
         shape = this.canvas.paper.text(0,0,'P1');
         shape.attr({"x":77.546875,"y":297.25,"text-anchor":"start","text":"P1","font-family":"\"Arial\"","font-size":14,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
         shape.data("name","Label");
         
         // Label
         shape = this.canvas.paper.text(0,0,'P3');
         shape.attr({"x":180.1171875,"y":293.75,"text-anchor":"start","text":"P3","font-family":"\"Arial\"","font-size":14,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
         shape.data("name","Label");
         
         // Label
         shape = this.canvas.paper.text(0,0,'P5');
         shape.attr({"x":250,"y":293.75,"text-anchor":"start","text":"P5","font-family":"\"Arial\"","font-size":14,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
         shape.data("name","Label");
         
         // Label
         shape = this.canvas.paper.text(0,0,'P7');
         shape.attr({"x":321,"y":297.25,"text-anchor":"start","text":"P7","font-family":"\"Arial\"","font-size":14,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
         shape.data("name","Label");
         
         // Label
         shape = this.canvas.paper.text(0,0,'P6');
         shape.attr({"x":251,"y":343.75,"text-anchor":"start","text":"P6","font-family":"\"Arial\"","font-size":14,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
         shape.data("name","Label");
         
         // Label
         shape = this.canvas.paper.text(0,0,'P4');
         shape.attr({"x":180.1171875,"y":343.75,"text-anchor":"start","text":"P4","font-family":"\"Arial\"","font-size":14,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
         shape.data("name","Label");
         
         // Label
         shape = this.canvas.paper.text(0,0,'P2');
         shape.attr({"x":113.1171875,"y":343.75,"text-anchor":"start","text":"P2","font-family":"\"Arial\"","font-size":14,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
         shape.data("name","Label");
         
         // Label
         shape = this.canvas.paper.text(0,0,'P8');
         shape.attr({"x":321,"y":93.25,"text-anchor":"start","text":"P8","font-family":"\"Arial\"","font-size":14,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
         shape.data("name","Label");
         
         // Label
         shape = this.canvas.paper.text(0,0,'P10');
         shape.attr({"x":250,"y":93.25,"text-anchor":"start","text":"P10","font-family":"\"Arial\"","font-size":14,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
         shape.data("name","Label");
         
         // Label
         shape = this.canvas.paper.text(0,0,'P12');
         shape.attr({"x":178.34375,"y":93.25,"text-anchor":"start","text":"P12","font-family":"\"Arial\"","font-size":14,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
         shape.data("name","Label");
         
         // Label
         shape = this.canvas.paper.text(0,0,'P14');
         shape.attr({"x":113.1171875,"y":93.25,"text-anchor":"start","text":"P14","font-family":"\"Arial\"","font-size":14,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
         shape.data("name","Label");
         
         // Label
         shape = this.canvas.paper.text(0,0,'P9');
         shape.attr({"x":279.109375,"y":41.75,"text-anchor":"start","text":"P9","font-family":"\"Arial\"","font-size":14,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
         shape.data("name","Label");
         
         // Label
         shape = this.canvas.paper.text(0,0,'P11');
         shape.attr({"x":214.25,"y":41.75,"text-anchor":"start","text":"P11","font-family":"\"Arial\"","font-size":14,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
         shape.data("name","Label");
         
         // Label
         shape = this.canvas.paper.text(0,0,'P13');
         shape.attr({"x":146,"y":41.75,"text-anchor":"start","text":"P13","font-family":"\"Arial\"","font-size":14,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
         shape.data("name","Label");
         
         // Rectangle
         shape = this.canvas.paper.path('M140 150L260 150L260 250L140 250Z');
         shape.attr({"stroke":"#303030","stroke-width":1,"fill":"#404040","dasharray":null,"opacity":1});
         shape.data("name","Rectangle");
         
         // Label
         shape = this.canvas.paper.text(0,0,'74LS00');
         shape.attr({"x":22,"y":155,"text-anchor":"start","text":"74LS00","font-family":"\"Arial\"","font-size":12,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
         shape.data("name","Label");
         
         // Label
         shape = this.canvas.paper.text(0,0,'74LS04');
         shape.attr({"x":22,"y":175,"text-anchor":"start","text":"74LS04","font-family":"\"Arial\"","font-size":12,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
         shape.data("name","Label");
         
         // Label
         shape = this.canvas.paper.text(0,0,'74LS11');
         shape.attr({"x":22.4453125,"y":194.5,"text-anchor":"start","text":"74LS11","font-family":"\"Arial\"","font-size":12,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
         shape.data("name","Label");
         
         // Label
         shape = this.canvas.paper.text(0,0,'74LS20');
         shape.attr({"x":22,"y":215,"text-anchor":"start","text":"74LS20","font-family":"\"Arial\"","font-size":12,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
         shape.data("name","Label");
         
         // Label
         shape = this.canvas.paper.text(0,0,'74LS27');
         shape.attr({"x":22,"y":235,"text-anchor":"start","text":"74LS27","font-family":"\"Arial\"","font-size":12,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
         shape.data("name","Label");
         
         // Label
         shape = this.canvas.paper.text(0,0,'74LS86');
         shape.attr({"x":22,"y":255,"text-anchor":"start","text":"74LS86","font-family":"\"Arial\"","font-size":12,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
         shape.data("name","Label");
         
         // Line_shadow
         shape = this.canvas.paper.path('M147.5 251.5L135.5,262.5L124.5,274.5L102.5,297.5');
         shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"none","stroke-width":4,"stroke-dasharray":null,"opacity":1});
         shape.data("name","Line_shadow");
         
         // Line
         shape = this.canvas.paper.path('M147.5 251.5L135.5,262.5L124.5,274.5L102.5,297.5');
         shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":4,"stroke-dasharray":null,"opacity":1});
         shape.data("name","Line");
         
         // Line_shadow
         shape = this.canvas.paper.path('M156.5 251.5L133.5,292.5L134.5,343.5');
         shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"none","stroke-width":4,"stroke-dasharray":null,"opacity":1});
         shape.data("name","Line_shadow");
         
         // Line
         shape = this.canvas.paper.path('M156.5 251.5L133.5,292.5L134.5,343.5');
         shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":4,"stroke-dasharray":null,"opacity":1});
         shape.data("name","Line");
         
         // Line_shadow
         shape = this.canvas.paper.path('M170.5 254.5L169.5,274.5L169.5,294.5');
         shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"none","stroke-width":4,"stroke-dasharray":null,"opacity":1});
         shape.data("name","Line_shadow");
         
         // Line
         shape = this.canvas.paper.path('M170.5 254.5L169.5,274.5L169.5,294.5');
         shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":4,"stroke-dasharray":null,"opacity":1});
         shape.data("name","Line");
         
         // Line_shadow
         shape = this.canvas.paper.path('M205.5 252.5L204.5,346.5');
         shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"none","stroke-width":4,"stroke-dasharray":null,"opacity":1});
         shape.data("name","Line_shadow");
         
         // Line
         shape = this.canvas.paper.path('M205.5 252.5L204.5,346.5');
         shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":4,"stroke-dasharray":null,"opacity":1});
         shape.data("name","Line");
         
         // Line_shadow
         shape = this.canvas.paper.path('M240.5 252.5L240.5,296.5');
         shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"none","stroke-width":4,"stroke-dasharray":null,"opacity":1});
         shape.data("name","Line_shadow");
         
         // Line
         shape = this.canvas.paper.path('M240.5 252.5L240.5,296.5');
         shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":4,"stroke-dasharray":null,"opacity":1});
         shape.data("name","Line");
         
         // Line_shadow
         shape = this.canvas.paper.path('M250.5 252.5L274.5,290.5L273.5,346.5');
         shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"none","stroke-width":4,"stroke-dasharray":null,"opacity":1});
         shape.data("name","Line_shadow");
         
         // Line
         shape = this.canvas.paper.path('M250.5 252.5L274.5,290.5L273.5,346.5');
         shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":4,"stroke-dasharray":null,"opacity":1});
         shape.data("name","Line");
         
         // Line_shadow
         shape = this.canvas.paper.path('M258.5 253.5L306.5,296.5');
         shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"none","stroke-width":4,"stroke-dasharray":null,"opacity":1});
         shape.data("name","Line_shadow");
         
         // Line
         shape = this.canvas.paper.path('M258.5 253.5L306.5,296.5');
         shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":4,"stroke-dasharray":null,"opacity":1});
         shape.data("name","Line");
         
         // Line_shadow
         shape = this.canvas.paper.path('M239.5 112.5L239.5,129.5L239.5,146.5');
         shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"none","stroke-width":4,"stroke-dasharray":null,"opacity":1});
         shape.data("name","Line_shadow");
         
         // Line
         shape = this.canvas.paper.path('M239.5 112.5L239.5,129.5L239.5,146.5');
         shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":4,"stroke-dasharray":null,"opacity":1});
         shape.data("name","Line");
         
         // Line_shadow
         shape = this.canvas.paper.path('M169.5 112.5L169.5,146.5');
         shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"none","stroke-width":4,"stroke-dasharray":null,"opacity":1});
         shape.data("name","Line_shadow");
         
         // Line
         shape = this.canvas.paper.path('M169.5 112.5L169.5,146.5');
         shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":4,"stroke-dasharray":null,"opacity":1});
         shape.data("name","Line");
         
         // Line_shadow
         shape = this.canvas.paper.path('M204.5 63.5L204.5,146.5');
         shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"none","stroke-width":4,"stroke-dasharray":null,"opacity":1});
         shape.data("name","Line_shadow");
         
         // Line
         shape = this.canvas.paper.path('M204.5 63.5L204.5,146.5');
         shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":4,"stroke-dasharray":null,"opacity":1});
         shape.data("name","Line");
         
         // Line_shadow
         shape = this.canvas.paper.path('M246.5 145.5L274.5,110.5L273.5,63.5');
         shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"none","stroke-width":4,"stroke-dasharray":null,"opacity":1});
         shape.data("name","Line_shadow");
         
         // Line
         shape = this.canvas.paper.path('M246.5 145.5L274.5,110.5L273.5,63.5');
         shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":4,"stroke-dasharray":null,"opacity":1});
         shape.data("name","Line");
         
         // Line_shadow
         shape = this.canvas.paper.path('M253.5 144.5L303.5,111.5');
         shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"none","stroke-width":4,"stroke-dasharray":null,"opacity":1});
         shape.data("name","Line_shadow");
         
         // Line
         shape = this.canvas.paper.path('M253.5 144.5L303.5,111.5');
         shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":4,"stroke-dasharray":null,"opacity":1});
         shape.data("name","Line");
         
         // Line_shadow
         shape = this.canvas.paper.path('M160.5 145.5L133.5,107.5L134.5,63.5');
         shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"none","stroke-width":4,"stroke-dasharray":null,"opacity":1});
         shape.data("name","Line_shadow");
         
         // Line
         shape = this.canvas.paper.path('M160.5 145.5L133.5,107.5L134.5,63.5');
         shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":4,"stroke-dasharray":null,"opacity":1});
         shape.data("name","Line");
         
         // Line_shadow
         shape = this.canvas.paper.path('M150.5 146.5L107.5,110.5');
         shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"none","stroke-width":4,"stroke-dasharray":null,"opacity":1});
         shape.data("name","Line_shadow");
         
         // Line
         shape = this.canvas.paper.path('M150.5 146.5L107.5,110.5');
         shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":4,"stroke-dasharray":null,"opacity":1});
         shape.data("name","Line");
         
 
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
 module_chip = module_chip.extend({
 
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
         var c74ls00 = this.getPort("Port_74LS00");
         var c74ls04 = this.getPort("Port_74LS04");
         var c74ls11 = this.getPort("Port_74LS11");
         var c74ls20 = this.getPort("Port_74LS20");
         var c74ls27 = this.getPort("Port_74LS27");
         var c74ls86 = this.getPort("Port_74LS86");

         if (c74ls00.getValue()) {
            var A1 = this.getHybridPort("Port_P1");
            var B1 = this.getHybridPort("Port_P2");
            var Y1 = this.getHybridPort("Port_P3");
            Y1.setValue(!(A1.getValue() && B1.getValue()));
    
            var A2 = this.getHybridPort("Port_P4");
            var B2 = this.getHybridPort("Port_P5");
            var Y2 = this.getHybridPort("Port_P6");
            Y2.setValue(!(A2.getValue() && B2.getValue()));
    
            var A3 = this.getHybridPort("Port_P10");
            var B3 = this.getHybridPort("Port_P9");
            var Y3 = this.getHybridPort("Port_P8");
            Y3.setValue(!(A3.getValue() && B3.getValue()));
    
            var A4 = this.getHybridPort("Port_P13");
            var B4 = this.getHybridPort("Port_P12");
            var Y4 = this.getHybridPort("Port_P11");
            Y4.setValue(!(A4.getValue() && B4.getValue()));
         }
         else if (c74ls04.getValue()) {
            var A1 = this.getHybridPort("Port_P1");
            var Y1 = this.getHybridPort("Port_P2");
            Y1.setValue(!(A1.getValue()));
    
            var A2 = this.getHybridPort("Port_P3");
            var Y2 = this.getHybridPort("Port_P4");
            Y2.setValue(!(A2.getValue()));
    
            var A3 = this.getHybridPort("Port_P5");
            var Y3 = this.getHybridPort("Port_P6");
            Y3.setValue(!(A3.getValue()));
    
            var A4 = this.getHybridPort("Port_P9");
            var Y4 = this.getHybridPort("Port_P8");
            Y4.setValue(!(A4.getValue()));
    
            var A5 = this.getHybridPort("Port_P11");
            var Y5 = this.getHybridPort("Port_P10");
            Y5.setValue(!(A5.getValue()));
    
            var A6 = this.getHybridPort("Port_P13");
            var Y6 = this.getHybridPort("Port_P12");
            Y6.setValue(!(A6.getValue()));
         }
         else if (c74ls11.getValue()) {
            var A1 = this.getHybridPort("Port_P1");
            var B1 = this.getHybridPort("Port_P2");
            var C1 = this.getHybridPort("Port_P13");
            var Y1 = this.getHybridPort("Port_P12");
            Y1.setValue((A1.getValue() && B1.getValue() && C1.getValue()));
    
            var A2 = this.getHybridPort("Port_P3");
            var B2 = this.getHybridPort("Port_P4");
            var C2 = this.getHybridPort("Port_P5");
            var Y2 = this.getHybridPort("Port_P6");
            Y2.setValue((A2.getValue() && B2.getValue() && C2.getValue()));
    
            var A3 = this.getHybridPort("Port_P9");
            var B3 = this.getHybridPort("Port_P10");
            var C3 = this.getHybridPort("Port_P11");
            var Y3 = this.getHybridPort("Port_P8");
            Y3.setValue((A3.getValue() && B3.getValue() && C3.getValue()));
         }
         else if (c74ls20.getValue()) {
            var A1 = this.getHybridPort("Port_P1");
            var B1 = this.getHybridPort("Port_P2");
            var C1 = this.getHybridPort("Port_P4");
            var D1 = this.getHybridPort("Port_P5");
            var Y1 = this.getHybridPort("Port_P6");
            Y1.setValue(!(A1.getValue() && B1.getValue() && C1.getValue() && D1.getValue()));
    
            var A2 = this.getHybridPort("Port_P13");
            var B2 = this.getHybridPort("Port_P12");
            var C2 = this.getHybridPort("Port_P10");
            var D2 = this.getHybridPort("Port_P9");
            var Y2 = this.getHybridPort("Port_P8");
            Y2.setValue(!(A2.getValue() && B2.getValue() && C2.getValue() && D2.getValue()));
         }
         else if (c74ls27.getValue()) {
            var A1 = this.getHybridPort("Port_P1");
            var B1 = this.getHybridPort("Port_P2");
            var C1 = this.getHybridPort("Port_P13");
            var Y1 = this.getHybridPort("Port_P12");
            Y1.setValue(!(A1.getValue() || B1.getValue() || C1.getValue()));
    
            var A2 = this.getHybridPort("Port_P3");
            var B2 = this.getHybridPort("Port_P4");
            var C2 = this.getHybridPort("Port_P5");
            var Y2 = this.getHybridPort("Port_P6");
            Y2.setValue(!(A2.getValue() || B2.getValue() || C2.getValue()));
    
            var A3 = this.getHybridPort("Port_P9");
            var B3 = this.getHybridPort("Port_P10");
            var C3 = this.getHybridPort("Port_P11");
            var Y3 = this.getHybridPort("Port_P8");
            Y3.setValue(!(A3.getValue() || B3.getValue() || C3.getValue()));    
         }
         else if (c74ls86.getValue()) {
            var A1 = this.getHybridPort("Port_P1");
            var B1 = this.getHybridPort("Port_P2");
            var Y1 = this.getHybridPort("Port_P3");
            Y1.setValue(!!(A1.getValue() ^ B1.getValue()));
    
            var A2 = this.getHybridPort("Port_P4");
            var B2 = this.getHybridPort("Port_P5");
            var Y2 = this.getHybridPort("Port_P6");
            Y2.setValue(!!(A2.getValue() ^ B2.getValue()));
    
            var A3 = this.getHybridPort("Port_P10");
            var B3 = this.getHybridPort("Port_P9");
            var Y3 = this.getHybridPort("Port_P8");
            Y3.setValue(!!(A3.getValue() ^ B3.getValue()));
    
            var A4 = this.getHybridPort("Port_P13");
            var B4 = this.getHybridPort("Port_P12");
            var Y4 = this.getHybridPort("Port_P11");
            Y4.setValue(!!(A4.getValue() ^ B4.getValue()));
         }
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
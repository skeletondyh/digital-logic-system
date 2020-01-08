// Generated Code for the Draw2D touch HTML5 lib
//                                                        
// http://www.draw2d.org                                  
//                                                        
// Go to the Designer http://www.draw2d.org               
// to design your own shape or download user generated    
//                                                        
var module_led = draw2d.SetFigure.extend({            

    NAME: "module_led",
 
    init:function(attr, setter, getter)
    {
      this._super( $.extend({stroke:0, bgColor:null, width:250,height:250},attr), setter, getter);
      var port;
      // Port_switch0
      port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(15.25, 60.5));
      port.setConnectionDirection(0);
      port.setBackgroundColor("#37B1DE");
      port.setName("Port_switch0");
      port.setMaxFanOut(20);
      // Port_Led0
      port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(15.25, 35));
      port.setConnectionDirection(2);
      port.setBackgroundColor("#37B1DE");
      port.setName("Port_Led0");
      port.setMaxFanOut(20);
      // Port_Led1
      port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(38.75, 35));
      port.setConnectionDirection(2);
      port.setBackgroundColor("#37B1DE");
      port.setName("Port_Led1");
      port.setMaxFanOut(20);
      // Port_Led2
      port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(62.5, 35));
      port.setConnectionDirection(2);
      port.setBackgroundColor("#37B1DE");
      port.setName("Port_Led2");
      port.setMaxFanOut(20);
      // Port_Led3
      port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(86, 35));
      port.setConnectionDirection(2);
      port.setBackgroundColor("#37B1DE");
      port.setName("Port_Led3");
      port.setMaxFanOut(20);
      // Port_switch1
      port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(38.75, 60.5));
      port.setConnectionDirection(0);
      port.setBackgroundColor("#37B1DE");
      port.setName("Port_switch1");
      port.setMaxFanOut(20);
      // Port_switch2
      port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(62.5, 60.5));
      port.setConnectionDirection(0);
      port.setBackgroundColor("#37B1DE");
      port.setName("Port_switch2");
      port.setMaxFanOut(20);
      // Port_switch3
      port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(86, 60.5));
      port.setConnectionDirection(0);
      port.setBackgroundColor("#37B1DE");
      port.setName("Port_switch3");
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
         
         // Rectangle
         shape = this.canvas.paper.path('M0 0L400 0L400 400L0 400Z');
         shape.attr({"stroke":"#303030","stroke-width":1,"fill":"#FFFFFF","dasharray":null,"opacity":1});
         shape.data("name","Rectangle");
         
         // Led0
         shape = this.canvas.paper.ellipse();
         shape.attr({"rx":20,"ry":20,"cx":61,"cy":118,"stroke":"#1B1B1B","stroke-width":1,"fill":"#FFFFFF","dasharray":null,"opacity":1});
         shape.data("name","Led0");
         
         // Led1
         shape = this.canvas.paper.ellipse();
         shape.attr({"rx":20,"ry":20,"cx":155,"cy":118,"stroke":"#1B1B1B","stroke-width":1,"fill":"#FFFFFF","dasharray":null,"opacity":1});
         shape.data("name","Led1");
         
         // Led2
         shape = this.canvas.paper.ellipse();
         shape.attr({"rx":20,"ry":20,"cx":249,"cy":118,"stroke":"#1B1B1B","stroke-width":1,"fill":"#FFFFFF","dasharray":null,"opacity":1});
         shape.data("name","Led2");
         
         // Led3
         shape = this.canvas.paper.ellipse();
         shape.attr({"rx":20,"ry":20,"cx":343,"cy":118,"stroke":"#1B1B1B","stroke-width":1,"fill":"#FFFFFF","dasharray":null,"opacity":1});
         shape.data("name","Led3");
         
         // Circle
         shape = this.canvas.paper.ellipse();
         shape.attr({"rx":4,"ry":4,"cx":61,"cy":244,"stroke":"none","stroke-width":0,"fill":"#000000","dasharray":null,"opacity":1});
         shape.data("name","Circle");
         
         // Circle
         shape = this.canvas.paper.ellipse();
         shape.attr({"rx":4,"ry":4,"cx":155,"cy":244,"stroke":"none","stroke-width":0,"fill":"#000000","dasharray":null,"opacity":1});
         shape.data("name","Circle");
         
         // Circle
         shape = this.canvas.paper.ellipse();
         shape.attr({"rx":4,"ry":4,"cx":249,"cy":244,"stroke":"none","stroke-width":0,"fill":"#000000","dasharray":null,"opacity":1});
         shape.data("name","Circle");
         
         // Circle
         shape = this.canvas.paper.ellipse();
         shape.attr({"rx":4,"ry":4,"cx":343,"cy":244,"stroke":"none","stroke-width":0,"fill":"#000000","dasharray":null,"opacity":1});
         shape.data("name","Circle");
         
         // Label
         shape = this.canvas.paper.text(0,0,'0');
         shape.attr({"x":22.109375,"y":307,"text-anchor":"start","text":"0","font-family":"\"Arial\"","font-size":16,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
         shape.data("name","Label");
         
         // Label
         shape = this.canvas.paper.text(0,0,'1');
         shape.attr({"x":84,"y":307,"text-anchor":"start","text":"1","font-family":"\"Arial\"","font-size":16,"stroke":"none","fill":"#C21B7A","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
         shape.data("name","Label");
         
         // Label
         shape = this.canvas.paper.text(0,0,'0');
         shape.attr({"x":117,"y":307,"text-anchor":"start","text":"0","font-family":"\"Arial\"","font-size":16,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
         shape.data("name","Label");
         
         // Label
         shape = this.canvas.paper.text(0,0,'1');
         shape.attr({"x":181,"y":307,"text-anchor":"start","text":"1","font-family":"\"Arial\"","font-size":16,"stroke":"none","fill":"#C21B7A","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
         shape.data("name","Label");
         
         // Label
         shape = this.canvas.paper.text(0,0,'0');
         shape.attr({"x":218,"y":307,"text-anchor":"start","text":"0","font-family":"\"Arial\"","font-size":16,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
         shape.data("name","Label");
         
         // Label
         shape = this.canvas.paper.text(0,0,'1');
         shape.attr({"x":275,"y":307,"text-anchor":"start","text":"1","font-family":"\"Arial\"","font-size":16,"stroke":"none","fill":"#C21B7A","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
         shape.data("name","Label");
         
         // Label
         shape = this.canvas.paper.text(0,0,'0');
         shape.attr({"x":312,"y":307,"text-anchor":"start","text":"0","font-family":"\"Arial\"","font-size":16,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
         shape.data("name","Label");
         
         // Label
         shape = this.canvas.paper.text(0,0,'1');
         shape.attr({"x":369,"y":307,"text-anchor":"start","text":"1","font-family":"\"Arial\"","font-size":16,"stroke":"none","fill":"#C21B7A","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
         shape.data("name","Label");
         
         // low0_shadow
         shape = this.canvas.paper.path('M59.5 247.5L27.5,288.5');
         shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"none","stroke-width":1,"stroke-dasharray":null,"opacity":1});
         shape.data("name","low0_shadow");
         
         // low0
         shape = this.canvas.paper.path('M59.5 247.5L27.5,288.5');
         shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":1,"stroke-dasharray":null,"opacity":1});
         shape.data("name","low0");
         
         // low1_shadow
         shape = this.canvas.paper.path('M153.5 247.5L121.5,289.5');
         shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"none","stroke-width":1,"stroke-dasharray":null,"opacity":1});
         shape.data("name","low1_shadow");
         
         // low1
         shape = this.canvas.paper.path('M153.5 247.5L121.5,289.5');
         shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":1,"stroke-dasharray":null,"opacity":1});
         shape.data("name","low1");
         
         // low2_shadow
         shape = this.canvas.paper.path('M248.5 247.5L218.5,288.5');
         shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"none","stroke-width":1,"stroke-dasharray":null,"opacity":1});
         shape.data("name","low2_shadow");
         
         // low2
         shape = this.canvas.paper.path('M248.5 247.5L218.5,288.5');
         shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":1,"stroke-dasharray":null,"opacity":1});
         shape.data("name","low2");
         
         // low3_shadow
         shape = this.canvas.paper.path('M342.5 243.5L310.5,287.5');
         shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"none","stroke-width":1,"stroke-dasharray":null,"opacity":1});
         shape.data("name","low3_shadow");
         
         // low3
         shape = this.canvas.paper.path('M342.5 243.5L310.5,287.5');
         shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":1,"stroke-dasharray":null,"opacity":1});
         shape.data("name","low3");
         
         // high0_shadow
         shape = this.canvas.paper.path('M63.5 247.5L91.5,288.5');
         shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"none","stroke-width":1,"stroke-dasharray":null,"opacity":1});
         shape.data("name","high0_shadow");
         
         // high0
         shape = this.canvas.paper.path('M63.5 247.5L91.5,288.5');
         shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":1,"stroke-dasharray":null,"opacity":1});
         shape.data("name","high0");
         
         // high1_shadow
         shape = this.canvas.paper.path('M157.5 247.5L186.5,285.5');
         shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"none","stroke-width":1,"stroke-dasharray":null,"opacity":1});
         shape.data("name","high1_shadow");
         
         // high1
         shape = this.canvas.paper.path('M157.5 247.5L186.5,285.5');
         shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":1,"stroke-dasharray":null,"opacity":1});
         shape.data("name","high1");
         
         // high2_shadow
         shape = this.canvas.paper.path('M250.5 246.5L284.5,287.5');
         shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"none","stroke-width":1,"stroke-dasharray":null,"opacity":1});
         shape.data("name","high2_shadow");
         
         // high2
         shape = this.canvas.paper.path('M250.5 246.5L284.5,287.5');
         shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":1,"stroke-dasharray":null,"opacity":1});
         shape.data("name","high2");
         
         // high3_shadow
         shape = this.canvas.paper.path('M343.5 244.5L378.5,285.5');
         shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"none","stroke-width":1,"stroke-dasharray":null,"opacity":1});
         shape.data("name","high3_shadow");
         
         // high3
         shape = this.canvas.paper.path('M343.5 244.5L378.5,285.5');
         shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":1,"stroke-dasharray":null,"opacity":1});
         shape.data("name","high3");
         
         // Line_shadow
         shape = this.canvas.paper.path('M72.5 104.5L51.5,131.5');
         shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"none","stroke-width":1,"stroke-dasharray":null,"opacity":1});
         shape.data("name","Line_shadow");
         
         // Line
         shape = this.canvas.paper.path('M72.5 104.5L51.5,131.5');
         shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":1,"stroke-dasharray":null,"opacity":1});
         shape.data("name","Line");
         
         // Line_shadow
         shape = this.canvas.paper.path('M165.5 105.5L144.5,130.5');
         shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"none","stroke-width":1,"stroke-dasharray":null,"opacity":1});
         shape.data("name","Line_shadow");
         
         // Line
         shape = this.canvas.paper.path('M165.5 105.5L144.5,130.5');
         shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":1,"stroke-dasharray":null,"opacity":1});
         shape.data("name","Line");
         
         // Line_shadow
         shape = this.canvas.paper.path('M259.5 104.5L240.5,131.5');
         shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"none","stroke-width":1,"stroke-dasharray":null,"opacity":1});
         shape.data("name","Line_shadow");
         
         // Line
         shape = this.canvas.paper.path('M259.5 104.5L240.5,131.5');
         shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":1,"stroke-dasharray":null,"opacity":1});
         shape.data("name","Line");
         
         // Line_shadow
         shape = this.canvas.paper.path('M353.5 106.5L333.5,131.5');
         shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"none","stroke-width":1,"stroke-dasharray":null,"opacity":1});
         shape.data("name","Line_shadow");
         
         // Line
         shape = this.canvas.paper.path('M353.5 106.5L333.5,131.5');
         shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":1,"stroke-dasharray":null,"opacity":1});
         shape.data("name","Line");
         
         // Line_shadow
         shape = this.canvas.paper.path('M50.5 106.5L74.5,130.5');
         shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"none","stroke-width":1,"stroke-dasharray":null,"opacity":1});
         shape.data("name","Line_shadow");
         
         // Line
         shape = this.canvas.paper.path('M50.5 106.5L74.5,130.5');
         shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":1,"stroke-dasharray":null,"opacity":1});
         shape.data("name","Line");
         
         // Line_shadow
         shape = this.canvas.paper.path('M142.5 105.5L166.5,130.5');
         shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"none","stroke-width":1,"stroke-dasharray":null,"opacity":1});
         shape.data("name","Line_shadow");
         
         // Line
         shape = this.canvas.paper.path('M142.5 105.5L166.5,130.5');
         shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":1,"stroke-dasharray":null,"opacity":1});
         shape.data("name","Line");
         
         // Line_shadow
         shape = this.canvas.paper.path('M330.5 106.5L353.5,129.5');
         shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"none","stroke-width":1,"stroke-dasharray":null,"opacity":1});
         shape.data("name","Line_shadow");
         
         // Line
         shape = this.canvas.paper.path('M330.5 106.5L353.5,129.5');
         shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":1,"stroke-dasharray":null,"opacity":1});
         shape.data("name","Line");
         
         // Line_shadow
         shape = this.canvas.paper.path('M235.5 105.5L262.5,129.5');
         shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"none","stroke-width":1,"stroke-dasharray":null,"opacity":1});
         shape.data("name","Line_shadow");
         
         // Line
         shape = this.canvas.paper.path('M235.5 105.5L262.5,129.5');
         shape.attr({"stroke-linecap":"round","stroke-linejoin":"round","stroke":"#000000","stroke-width":1,"stroke-dasharray":null,"opacity":1});
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
 module_led = module_led.extend({
 
     init: function(attr, setter, getter){
          this._super(attr, setter, getter);
 
          // your special code here
          var _this = this;

          // this.attr({resizeable:false});
          this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());

          this.value = false;

          this.on("added",function(){
            _this.layerShow("low0" , !_this.value);
            _this.layerShow("high0",  _this.value);
            _this.layerShow("low1" , !_this.value);
            _this.layerShow("high1",  _this.value);
            _this.layerShow("low2" , !_this.value);
            _this.layerShow("high2",  _this.value);
            _this.layerShow("low3" , !_this.value);
            _this.layerShow("high3",  _this.value);
            _this.getOutputPort("Port_switch0").setValue(_this.value);
            _this.getOutputPort("Port_switch1").setValue(_this.value);
            _this.getOutputPort("Port_switch2").setValue(_this.value);
            _this.getOutputPort("Port_switch3").setValue(_this.value);
        });

        this.on("click",function(emitter, event){
            _this.value = !_this.value;
            var h = emitter.getHeight();
            var w = emitter.getWidth();
            var modh = w / 4;
            var index = (event.relX/modh)|0;
            var port = emitter.getOutputPort("Port_switch" + index);
            port.setValue(_this.value);

            //emitter.layerAttr("rect0"+(index+1), {fill:port.getValue()?"#C21B7A":null});
            // console.log(index);
            // console.log(event);

            _this.layerShow("low" + index, !_this.value, 100);
            _this.layerShow("high" + index,  _this.value, 100);

        });

     },
 
     /**
      *  Called by the simulator for every calculation
      *  loop
      *  @required
      **/
     calculate:function()
     {
        if(this.getInputPort("Port_Led0").getValue()){
            this.layerAttr("Led0",{fill:"#C21B7A"});
        }
        else{
            this.layerAttr("Led0",{fill:"#f0f0f0"});
        }

        if(this.getInputPort("Port_Led1").getValue()){
            this.layerAttr("Led1",{fill:"#C21B7A"});
        }
        else{
            this.layerAttr("Led1",{fill:"#f0f0f0"});
        }

        if(this.getInputPort("Port_Led2").getValue()){
            this.layerAttr("Led2",{fill:"#C21B7A"});
        }
        else{
            this.layerAttr("Led2",{fill:"#f0f0f0"});
        }

        if(this.getInputPort("Port_Led3").getValue()){
            this.layerAttr("Led3",{fill:"#C21B7A"});
        }
        else{
            this.layerAttr("Led3",{fill:"#f0f0f0"});
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
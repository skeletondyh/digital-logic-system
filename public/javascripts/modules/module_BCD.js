// Generated Code for the Draw2D touch HTML5 lib
//                                                        
// http://www.draw2d.org                                  
//                                                        
// Go to the Designer http://www.draw2d.org               
// to design your own shape or download user generated    
//                                                        
var module_BCD = draw2d.SetFigure.extend({            

    NAME: "module_BCD",
 
    init:function(attr, setter, getter)
    {
      this._super( $.extend({stroke:0, bgColor:null, width:250,height:250},attr), setter, getter);
      var port;
      // Port_a1
      port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(15.25, 71));
      port.setConnectionDirection(3);
      port.setBackgroundColor("#37B1DE");
      port.setName("Port_a1");
      port.setMaxFanOut(20);
      // Port_a2
      port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(25.25, 78.5));
      port.setConnectionDirection(3);
      port.setBackgroundColor("#37B1DE");
      port.setName("Port_a2");
      port.setMaxFanOut(20);
      // Port_a4
      port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(15.25, 86));
      port.setConnectionDirection(3);
      port.setBackgroundColor("#37B1DE");
      port.setName("Port_a4");
      port.setMaxFanOut(20);
      // Port_a8
      port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(25.25, 93.5));
      port.setConnectionDirection(2);
      port.setBackgroundColor("#37B1DE");
      port.setName("Port_a8");
      port.setMaxFanOut(20);
      // Port_b1
      port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(44, 71));
      port.setConnectionDirection(3);
      port.setBackgroundColor("#37B1DE");
      port.setName("Port_b1");
      port.setMaxFanOut(20);
      // Port_b2
      port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(55.25, 78.5));
      port.setConnectionDirection(1);
      port.setBackgroundColor("#37B1DE");
      port.setName("Port_b2");
      port.setMaxFanOut(20);
      // Port_b4
      port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(44, 86));
      port.setConnectionDirection(2);
      port.setBackgroundColor("#37B1DE");
      port.setName("Port_b4");
      port.setMaxFanOut(20);
      // Port_b8
      port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(55.25, 93.5));
      port.setConnectionDirection(2);
      port.setBackgroundColor("#37B1DE");
      port.setName("Port_b8");
      port.setMaxFanOut(20);
      // Port_c1
      port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(75.25, 71));
      port.setConnectionDirection(1);
      port.setBackgroundColor("#37B1DE");
      port.setName("Port_c1");
      port.setMaxFanOut(20);
      // Port_c2
      port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(85.25, 78.5));
      port.setConnectionDirection(1);
      port.setBackgroundColor("#37B1DE");
      port.setName("Port_c2");
      port.setMaxFanOut(20);
      // Port_c4
      port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(75.25, 86));
      port.setConnectionDirection(2);
      port.setBackgroundColor("#37B1DE");
      port.setName("Port_c4");
      port.setMaxFanOut(20);
      // Port_c8
      port = this.addPort(new DecoratedInputPort(), new draw2d.layout.locator.XYRelPortLocator(85.25, 93.5));
      port.setConnectionDirection(2);
      port.setBackgroundColor("#37B1DE");
      port.setName("Port_c8");
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
         
         // seg_a0
         shape = this.canvas.paper.path('M41 39L121 39L121 49L41 49Z');
         shape.attr({"stroke":"#D6D6D6","stroke-width":1,"fill":"#C21B7A","dasharray":null,"opacity":1});
         shape.data("name","seg_a0");
         
         // seg_b0
         shape = this.canvas.paper.path('M161 39L241 39L241 49L161 49Z');
         shape.attr({"stroke":"#D6D6D6","stroke-width":1,"fill":"#C21B7A","dasharray":null,"opacity":1});
         shape.data("name","seg_b0");
         
         // seg_c0
         shape = this.canvas.paper.path('M281 39L361 39L361 49L281 49Z');
         shape.attr({"stroke":"#D6D6D6","stroke-width":1,"fill":"#C21B7A","dasharray":null,"opacity":1});
         shape.data("name","seg_c0");
         
         // seg_a5
         shape = this.canvas.paper.path('M36 54L46 54L46 134L36 134Z');
         shape.attr({"stroke":"#D6D6D6","stroke-width":1,"fill":"#C21B7A","dasharray":null,"opacity":1});
         shape.data("name","seg_a5");
         
         // seg_a1
         shape = this.canvas.paper.path('M115 54L125 54L125 134L115 134Z');
         shape.attr({"stroke":"#D6D6D6","stroke-width":1,"fill":"#C21B7A","dasharray":null,"opacity":1});
         shape.data("name","seg_a1");
         
         // seg_b5
         shape = this.canvas.paper.path('M156 54L166 54L166 134L156 134Z');
         shape.attr({"stroke":"#D6D6D6","stroke-width":1,"fill":"#C21B7A","dasharray":null,"opacity":1});
         shape.data("name","seg_b5");
         
         // seg_b1
         shape = this.canvas.paper.path('M234 54L244 54L244 134L234 134Z');
         shape.attr({"stroke":"#D6D6D6","stroke-width":1,"fill":"#C21B7A","dasharray":null,"opacity":1});
         shape.data("name","seg_b1");
         
         // seg_c5
         shape = this.canvas.paper.path('M275 54L285 54L285 134L275 134Z');
         shape.attr({"stroke":"#D6D6D6","stroke-width":1,"fill":"#C21B7A","dasharray":null,"opacity":1});
         shape.data("name","seg_c5");
         
         // seg_c1
         shape = this.canvas.paper.path('M356 54L366 54L366 134L356 134Z');
         shape.attr({"stroke":"#D6D6D6","stroke-width":1,"fill":"#C21B7A","dasharray":null,"opacity":1});
         shape.data("name","seg_c1");
         
         // seg_a6
         shape = this.canvas.paper.path('M41 139L121 139L121 149L41 149Z');
         shape.attr({"stroke":"#D6D6D6","stroke-width":1,"fill":"#C21B7A","dasharray":null,"opacity":1});
         shape.data("name","seg_a6");
         
         // seg_b6
         shape = this.canvas.paper.path('M161 139L241 139L241 149L161 149Z');
         shape.attr({"stroke":"#D6D6D6","stroke-width":1,"fill":"#C21B7A","dasharray":null,"opacity":1});
         shape.data("name","seg_b6");
         
         // seg_c6
         shape = this.canvas.paper.path('M281 139L361 139L361 149L281 149Z');
         shape.attr({"stroke":"#D6D6D6","stroke-width":1,"fill":"#C21B7A","dasharray":null,"opacity":1});
         shape.data("name","seg_c6");
         
         // seg_a4
         shape = this.canvas.paper.path('M36 154L46 154L46 234L36 234Z');
         shape.attr({"stroke":"#D6D6D6","stroke-width":1,"fill":"#C21B7A","dasharray":null,"opacity":1});
         shape.data("name","seg_a4");
         
         // seg_a2
         shape = this.canvas.paper.path('M115 154L125 154L125 234L115 234Z');
         shape.attr({"stroke":"#D6D6D6","stroke-width":1,"fill":"#C21B7A","dasharray":null,"opacity":1});
         shape.data("name","seg_a2");
         
         // seg_b4
         shape = this.canvas.paper.path('M156 154L166 154L166 234L156 234Z');
         shape.attr({"stroke":"#D6D6D6","stroke-width":1,"fill":"#C21B7A","dasharray":null,"opacity":1});
         shape.data("name","seg_b4");
         
         // seg_b2
         shape = this.canvas.paper.path('M234 154L244 154L244 234L234 234Z');
         shape.attr({"stroke":"#D6D6D6","stroke-width":1,"fill":"#C21B7A","dasharray":null,"opacity":1});
         shape.data("name","seg_b2");
         
         // seg_c4
         shape = this.canvas.paper.path('M275 154L285 154L285 234L275 234Z');
         shape.attr({"stroke":"#D6D6D6","stroke-width":1,"fill":"#C21B7A","dasharray":null,"opacity":1});
         shape.data("name","seg_c4");
         
         // seg_c2
         shape = this.canvas.paper.path('M356 154L366 154L366 234L356 234Z');
         shape.attr({"stroke":"#D6D6D6","stroke-width":1,"fill":"#C21B7A","dasharray":null,"opacity":1});
         shape.data("name","seg_c2");
         
         // seg_a3
         shape = this.canvas.paper.path('M41 239L121 239L121 249L41 249Z');
         shape.attr({"stroke":"#D6D6D6","stroke-width":1,"fill":"#C21B7A","dasharray":null,"opacity":1});
         shape.data("name","seg_a3");
         
         // seg_b3
         shape = this.canvas.paper.path('M160 239L240 239L240 249L160 249Z');
         shape.attr({"stroke":"#D6D6D6","stroke-width":1,"fill":"#C21B7A","dasharray":null,"opacity":1});
         shape.data("name","seg_b3");
         
         // seg_c3
         shape = this.canvas.paper.path('M281 239L361 239L361 249L281 249Z');
         shape.attr({"stroke":"#D6D6D6","stroke-width":1,"fill":"#C21B7A","dasharray":null,"opacity":1});
         shape.data("name","seg_c3");
         
         // Label
         shape = this.canvas.paper.text(0,0,'1');
         shape.attr({"x":67,"y":275,"text-anchor":"start","text":"1","font-family":"\"Arial\"","font-size":16,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
         shape.data("name","Label");
         
         // Label
         shape = this.canvas.paper.text(0,0,'2');
         shape.attr({"x":107.109375,"y":300,"text-anchor":"start","text":"2","font-family":"\"Arial\"","font-size":16,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
         shape.data("name","Label");
         
         // Label
         shape = this.canvas.paper.text(0,0,'4');
         shape.attr({"x":67,"y":334,"text-anchor":"start","text":"4","font-family":"\"Arial\"","font-size":16,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
         shape.data("name","Label");
         
         // Label
         shape = this.canvas.paper.text(0,0,'8');
         shape.attr({"x":107.109375,"y":364,"text-anchor":"start","text":"8","font-family":"\"Arial\"","font-size":16,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
         shape.data("name","Label");
         
         // Label
         shape = this.canvas.paper.text(0,0,'1');
         shape.attr({"x":189,"y":275,"text-anchor":"start","text":"1","font-family":"\"Arial\"","font-size":16,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
         shape.data("name","Label");
         
         // Label
         shape = this.canvas.paper.text(0,0,'1');
         shape.attr({"x":282.109375,"y":275,"text-anchor":"start","text":"1","font-family":"\"Arial\"","font-size":16,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
         shape.data("name","Label");
         
         // Label
         shape = this.canvas.paper.text(0,0,'2');
         shape.attr({"x":206.890625,"y":302,"text-anchor":"start","text":"2","font-family":"\"Arial\"","font-size":16,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
         shape.data("name","Label");
         
         // Label
         shape = this.canvas.paper.text(0,0,'2');
         shape.attr({"x":322.109375,"y":303,"text-anchor":"start","text":"2","font-family":"\"Arial\"","font-size":16,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
         shape.data("name","Label");
         
         // Label
         shape = this.canvas.paper.text(0,0,'4');
         shape.attr({"x":189,"y":336,"text-anchor":"start","text":"4","font-family":"\"Arial\"","font-size":16,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
         shape.data("name","Label");
         
         // Label
         shape = this.canvas.paper.text(0,0,'4');
         shape.attr({"x":311,"y":336,"text-anchor":"start","text":"4","font-family":"\"Arial\"","font-size":16,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
         shape.data("name","Label");
         
         // Label
         shape = this.canvas.paper.text(0,0,'8');
         shape.attr({"x":206.890625,"y":359,"text-anchor":"start","text":"8","font-family":"\"Arial\"","font-size":16,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
         shape.data("name","Label");
         
         // Label
         shape = this.canvas.paper.text(0,0,'8');
         shape.attr({"x":322.109375,"y":359,"text-anchor":"start","text":"8","font-family":"\"Arial\"","font-size":16,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
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
 module_BCD = module_BCD.extend({
 
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
         //- For Segment a

         if (this.getPort("Port_a1").getValue() && this.getPort("Port_a2").getValue() && this.getPort("Port_a4").getValue() && this.getPort("Port_a8").getValue()) {
            this.layerAttr("seg_a0", { fill: "#C21B7A"});
            this.layerAttr("seg_a1", { fill: null});
            this.layerAttr("seg_a2", { fill: null});
            this.layerAttr("seg_a3", { fill: null});
            this.layerAttr("seg_a4", { fill: "#C21B7A"});
            this.layerAttr("seg_a5", { fill: "#C21B7A"});
            this.layerAttr("seg_a6", { fill: "#C21B7A"});
         }
         else if (!this.getPort("Port_a1").getValue() && this.getPort("Port_a2").getValue() && this.getPort("Port_a4").getValue() && this.getPort("Port_a8").getValue()) {
            this.layerAttr("seg_a0", { fill: "#C21B7A"});
            this.layerAttr("seg_a1", { fill: null});
            this.layerAttr("seg_a2", { fill: null});
            this.layerAttr("seg_a4", { fill: "#C21B7A"});
            this.layerAttr("seg_a5", { fill: "#C21B7A"});
            this.layerAttr("seg_a6", { fill: "#C21B7A"});
            this.layerAttr("seg_a3", { fill: "#C21B7A"});
         }
         else if (this.getPort("Port_a1").getValue() && !this.getPort("Port_a2").getValue() && this.getPort("Port_a4").getValue() && this.getPort("Port_a8").getValue()) {
            this.layerAttr("seg_a1", { fill: "#C21B7A"});
            this.layerAttr("seg_a2", { fill: "#C21B7A"});
            this.layerAttr("seg_a4", { fill: "#C21B7A"});
            this.layerAttr("seg_a6", { fill: "#C21B7A"});
            this.layerAttr("seg_a3", { fill: "#C21B7A"});
            this.layerAttr("seg_a0", { fill: null});
            this.layerAttr("seg_a5", { fill: null});
         }
         else if (!this.getPort("Port_a1").getValue() && !this.getPort("Port_a2").getValue() && this.getPort("Port_a4").getValue() && this.getPort("Port_a8").getValue()) {
            this.layerAttr("seg_a0", { fill: "#C21B7A"});
            this.layerAttr("seg_a3", { fill: "#C21B7A"});
            this.layerAttr("seg_a4", { fill: "#C21B7A"});
            this.layerAttr("seg_a5", { fill: "#C21B7A"});
            this.layerAttr("seg_a1", { fill: null});
            this.layerAttr("seg_a2", { fill: null});
            this.layerAttr("seg_a6", { fill: null});
         }
         else if (this.getPort("Port_a1").getValue() && this.getPort("Port_a2").getValue() && !this.getPort("Port_a4").getValue() && this.getPort("Port_a8").getValue()) {
            this.layerAttr("seg_a2", { fill: "#C21B7A"});
            this.layerAttr("seg_a3", { fill: "#C21B7A"});
            this.layerAttr("seg_a4", { fill: "#C21B7A"});
            this.layerAttr("seg_a5", { fill: "#C21B7A"});
            this.layerAttr("seg_a6", { fill: "#C21B7A"});
            this.layerAttr("seg_a1", { fill: null});
            this.layerAttr("seg_a0", { fill: null});
         }
         else if (!this.getPort("Port_a1").getValue() && this.getPort("Port_a2").getValue() && !this.getPort("Port_a4").getValue() && this.getPort("Port_a8").getValue()) {
            this.layerAttr("seg_a0", { fill: "#C21B7A"});
            this.layerAttr("seg_a1", { fill: "#C21B7A"});
            this.layerAttr("seg_a2", { fill: "#C21B7A"});
            this.layerAttr("seg_a4", { fill: "#C21B7A"});
            this.layerAttr("seg_a5", { fill: "#C21B7A"});
            this.layerAttr("seg_a6", { fill: "#C21B7A"});
            this.layerAttr("seg_a3", { fill: null});
         }
         else if (this.getPort("Port_a1").getValue() && !this.getPort("Port_a2").getValue() && !this.getPort("Port_a4").getValue() && this.getPort("Port_a8").getValue()) {
            this.layerAttr("seg_a0", { fill: "#C21B7A"});
            this.layerAttr("seg_a1", { fill: "#C21B7A"});
            this.layerAttr("seg_a2", { fill: "#C21B7A"});
            this.layerAttr("seg_a5", { fill: "#C21B7A"});
            this.layerAttr("seg_a6", { fill: "#C21B7A"});
            this.layerAttr("seg_a3", { fill: null});
            this.layerAttr("seg_a4", { fill: null});
         }
         else if (!this.getPort("Port_a1").getValue() && !this.getPort("Port_a2").getValue() && !this.getPort("Port_a4").getValue() && this.getPort("Port_a8").getValue()) {
            this.layerAttr("seg_a0", { fill: "#C21B7A"});
            this.layerAttr("seg_a1", { fill: "#C21B7A"});
            this.layerAttr("seg_a3", { fill: "#C21B7A"});
            this.layerAttr("seg_a4", { fill: "#C21B7A"});
            this.layerAttr("seg_a2", { fill: "#C21B7A"});
            this.layerAttr("seg_a5", { fill: "#C21B7A"});
            this.layerAttr("seg_a6", { fill: "#C21B7A"});
         }
         else if (this.getPort("Port_a1").getValue() && this.getPort("Port_a2").getValue() && this.getPort("Port_a4").getValue() && !this.getPort("Port_a8").getValue()) {
            this.layerAttr("seg_a0", { fill: "#C21B7A"});
            this.layerAttr("seg_a1", { fill: "#C21B7A"});
            this.layerAttr("seg_a3", { fill: null});
            this.layerAttr("seg_a4", { fill: null});
            this.layerAttr("seg_a2", { fill: "#C21B7A"});
            this.layerAttr("seg_a5", { fill: null});
            this.layerAttr("seg_a6", { fill: null});
         }
         else if (!this.getPort("Port_a1").getValue() && this.getPort("Port_a2").getValue() && this.getPort("Port_a4").getValue() && !this.getPort("Port_a8").getValue()) {
            this.layerAttr("seg_a0", { fill: "#C21B7A"});
            this.layerAttr("seg_a1", { fill: null});
            this.layerAttr("seg_a3", { fill: "#C21B7A"});
            this.layerAttr("seg_a4", { fill: "#C21B7A"});
            this.layerAttr("seg_a2", { fill: "#C21B7A"});
            this.layerAttr("seg_a5", { fill: "#C21B7A"});
            this.layerAttr("seg_a6", { fill: "#C21B7A"});
         }
         else if (this.getPort("Port_a1").getValue() && !this.getPort("Port_a2").getValue() && this.getPort("Port_a4").getValue() && !this.getPort("Port_a8").getValue()) {
            this.layerAttr("seg_a0", { fill: "#C21B7A"});
            this.layerAttr("seg_a1", { fill: null});
            this.layerAttr("seg_a3", { fill: "#C21B7A"});
            this.layerAttr("seg_a4", { fill: null});
            this.layerAttr("seg_a2", { fill: "#C21B7A"});
            this.layerAttr("seg_a5", { fill: "#C21B7A"});
            this.layerAttr("seg_a6", { fill: "#C21B7A"});
         }
         else if (!this.getPort("Port_a1").getValue() && !this.getPort("Port_a2").getValue() && this.getPort("Port_a4").getValue() && !this.getPort("Port_a8").getValue()) {
            this.layerAttr("seg_a0", { fill: null});
            this.layerAttr("seg_a1", { fill: "#C21B7A"});
            this.layerAttr("seg_a3", { fill: null});
            this.layerAttr("seg_a4", { fill: null});
            this.layerAttr("seg_a2", { fill: "#C21B7A"});
            this.layerAttr("seg_a5", { fill: "#C21B7A"});
            this.layerAttr("seg_a6", { fill: "#C21B7A"});
         }
         else if (this.getPort("Port_a1").getValue() && this.getPort("Port_a2").getValue() && !this.getPort("Port_a4").getValue() && !this.getPort("Port_a8").getValue()) {
            this.layerAttr("seg_a0", { fill: "#C21B7A"});
            this.layerAttr("seg_a1", { fill: "#C21B7A"});
            this.layerAttr("seg_a3", { fill: "#C21B7A"});
            this.layerAttr("seg_a4", { fill: null});
            this.layerAttr("seg_a2", { fill: "#C21B7A"});
            this.layerAttr("seg_a5", { fill: null});
            this.layerAttr("seg_a6", { fill: "#C21B7A"});
         }
         else if (!this.getPort("Port_a1").getValue() && this.getPort("Port_a2").getValue() && !this.getPort("Port_a4").getValue() && !this.getPort("Port_a8").getValue()) {
            this.layerAttr("seg_a0", { fill: "#C21B7A"});
            this.layerAttr("seg_a1", { fill: "#C21B7A"});
            this.layerAttr("seg_a3", { fill: "#C21B7A"});
            this.layerAttr("seg_a4", { fill: "#C21B7A"});
            this.layerAttr("seg_a2", { fill: null});
            this.layerAttr("seg_a5", { fill: null});
            this.layerAttr("seg_a6", { fill: "#C21B7A"});
         }
         else if (this.getPort("Port_a1").getValue() && !this.getPort("Port_a2").getValue() && !this.getPort("Port_a4").getValue() && !this.getPort("Port_a8").getValue()) {
            this.layerAttr("seg_a0", { fill: null});
            this.layerAttr("seg_a1", { fill: "#C21B7A"});
            this.layerAttr("seg_a3", { fill: null});
            this.layerAttr("seg_a4", { fill: null});
            this.layerAttr("seg_a2", { fill: "#C21B7A"});
            this.layerAttr("seg_a5", { fill: null});
            this.layerAttr("seg_a6", { fill: null});
         }
         else if (!this.getPort("Port_a1").getValue() && !this.getPort("Port_a2").getValue() && !this.getPort("Port_a4").getValue() && !this.getPort("Port_a8").getValue()) {
            this.layerAttr("seg_a0", { fill: "#C21B7A"});
            this.layerAttr("seg_a1", { fill: "#C21B7A"});
            this.layerAttr("seg_a3", { fill: "#C21B7A"});
            this.layerAttr("seg_a4", { fill: "#C21B7A"});
            this.layerAttr("seg_a2", { fill: "#C21B7A"});
            this.layerAttr("seg_a5", { fill: "#C21B7A"});
            this.layerAttr("seg_a6", { fill: null});
         }


         // For b
         if (this.getPort("Port_b1").getValue() && this.getPort("Port_b2").getValue() && this.getPort("Port_b4").getValue() && this.getPort("Port_b8").getValue()) {
            this.layerAttr("seg_b0", { fill: "#C21B7A"});
            this.layerAttr("seg_b1", { fill: null});
            this.layerAttr("seg_b2", { fill: null});
            this.layerAttr("seg_b3", { fill: null});
            this.layerAttr("seg_b4", { fill: "#C21B7A"});
            this.layerAttr("seg_b5", { fill: "#C21B7A"});
            this.layerAttr("seg_b6", { fill: "#C21B7A"});
         }
         else if (!this.getPort("Port_b1").getValue() && this.getPort("Port_b2").getValue() && this.getPort("Port_b4").getValue() && this.getPort("Port_b8").getValue()) {
            this.layerAttr("seg_b0", { fill: "#C21B7A"});
            this.layerAttr("seg_b1", { fill: null});
            this.layerAttr("seg_b2", { fill: null});
            this.layerAttr("seg_b4", { fill: "#C21B7A"});
            this.layerAttr("seg_b5", { fill: "#C21B7A"});
            this.layerAttr("seg_b6", { fill: "#C21B7A"});
            this.layerAttr("seg_b3", { fill: "#C21B7A"});
         }
         else if (this.getPort("Port_b1").getValue() && !this.getPort("Port_b2").getValue() && this.getPort("Port_b4").getValue() && this.getPort("Port_b8").getValue()) {
            this.layerAttr("seg_b1", { fill: "#C21B7A"});
            this.layerAttr("seg_b2", { fill: "#C21B7A"});
            this.layerAttr("seg_b4", { fill: "#C21B7A"});
            this.layerAttr("seg_b6", { fill: "#C21B7A"});
            this.layerAttr("seg_b3", { fill: "#C21B7A"});
            this.layerAttr("seg_b0", { fill: null});
            this.layerAttr("seg_b5", { fill: null});
         }
         else if (!this.getPort("Port_b1").getValue() && !this.getPort("Port_b2").getValue() && this.getPort("Port_b4").getValue() && this.getPort("Port_b8").getValue()) {
            this.layerAttr("seg_b0", { fill: "#C21B7A"});
            this.layerAttr("seg_b3", { fill: "#C21B7A"});
            this.layerAttr("seg_b4", { fill: "#C21B7A"});
            this.layerAttr("seg_b5", { fill: "#C21B7A"});
            this.layerAttr("seg_b1", { fill: null});
            this.layerAttr("seg_b2", { fill: null});
            this.layerAttr("seg_b6", { fill: null});
         }
         else if (this.getPort("Port_b1").getValue() && this.getPort("Port_b2").getValue() && !this.getPort("Port_b4").getValue() && this.getPort("Port_b8").getValue()) {
            this.layerAttr("seg_b2", { fill: "#C21B7A"});
            this.layerAttr("seg_b3", { fill: "#C21B7A"});
            this.layerAttr("seg_b4", { fill: "#C21B7A"});
            this.layerAttr("seg_b5", { fill: "#C21B7A"});
            this.layerAttr("seg_b6", { fill: "#C21B7A"});
            this.layerAttr("seg_b1", { fill: null});
            this.layerAttr("seg_b0", { fill: null});
         }
         else if (!this.getPort("Port_b1").getValue() && this.getPort("Port_b2").getValue() && !this.getPort("Port_b4").getValue() && this.getPort("Port_b8").getValue()) {
            this.layerAttr("seg_b0", { fill: "#C21B7A"});
            this.layerAttr("seg_b1", { fill: "#C21B7A"});
            this.layerAttr("seg_b2", { fill: "#C21B7A"});
            this.layerAttr("seg_b4", { fill: "#C21B7A"});
            this.layerAttr("seg_b5", { fill: "#C21B7A"});
            this.layerAttr("seg_b6", { fill: "#C21B7A"});
            this.layerAttr("seg_b3", { fill: null});
         }
         else if (this.getPort("Port_b1").getValue() && !this.getPort("Port_b2").getValue() && !this.getPort("Port_b4").getValue() && this.getPort("Port_b8").getValue()) {
            this.layerAttr("seg_b0", { fill: "#C21B7A"});
            this.layerAttr("seg_b1", { fill: "#C21B7A"});
            this.layerAttr("seg_b2", { fill: "#C21B7A"});
            this.layerAttr("seg_b5", { fill: "#C21B7A"});
            this.layerAttr("seg_b6", { fill: "#C21B7A"});
            this.layerAttr("seg_b3", { fill: null});
            this.layerAttr("seg_b4", { fill: null});
         }
         else if (!this.getPort("Port_b1").getValue() && !this.getPort("Port_b2").getValue() && !this.getPort("Port_b4").getValue() && this.getPort("Port_b8").getValue()) {
            this.layerAttr("seg_b0", { fill: "#C21B7A"});
            this.layerAttr("seg_b1", { fill: "#C21B7A"});
            this.layerAttr("seg_b3", { fill: "#C21B7A"});
            this.layerAttr("seg_b4", { fill: "#C21B7A"});
            this.layerAttr("seg_b2", { fill: "#C21B7A"});
            this.layerAttr("seg_b5", { fill: "#C21B7A"});
            this.layerAttr("seg_b6", { fill: "#C21B7A"});
         }
         else if (this.getPort("Port_b1").getValue() && this.getPort("Port_b2").getValue() && this.getPort("Port_b4").getValue() && !this.getPort("Port_b8").getValue()) {
            this.layerAttr("seg_b0", { fill: "#C21B7A"});
            this.layerAttr("seg_b1", { fill: "#C21B7A"});
            this.layerAttr("seg_b3", { fill: null});
            this.layerAttr("seg_b4", { fill: null});
            this.layerAttr("seg_b2", { fill: "#C21B7A"});
            this.layerAttr("seg_b5", { fill: null});
            this.layerAttr("seg_b6", { fill: null});
         }
         else if (!this.getPort("Port_b1").getValue() && this.getPort("Port_b2").getValue() && this.getPort("Port_b4").getValue() && !this.getPort("Port_b8").getValue()) {
            this.layerAttr("seg_b0", { fill: "#C21B7A"});
            this.layerAttr("seg_b1", { fill: null});
            this.layerAttr("seg_b3", { fill: "#C21B7A"});
            this.layerAttr("seg_b4", { fill: "#C21B7A"});
            this.layerAttr("seg_b2", { fill: "#C21B7A"});
            this.layerAttr("seg_b5", { fill: "#C21B7A"});
            this.layerAttr("seg_b6", { fill: "#C21B7A"});
         }
         else if (this.getPort("Port_b1").getValue() && !this.getPort("Port_b2").getValue() && this.getPort("Port_b4").getValue() && !this.getPort("Port_b8").getValue()) {
            this.layerAttr("seg_b0", { fill: "#C21B7A"});
            this.layerAttr("seg_b1", { fill: null});
            this.layerAttr("seg_b3", { fill: "#C21B7A"});
            this.layerAttr("seg_b4", { fill: null});
            this.layerAttr("seg_b2", { fill: "#C21B7A"});
            this.layerAttr("seg_b5", { fill: "#C21B7A"});
            this.layerAttr("seg_b6", { fill: "#C21B7A"});
         }
         else if (!this.getPort("Port_b1").getValue() && !this.getPort("Port_b2").getValue() && this.getPort("Port_b4").getValue() && !this.getPort("Port_b8").getValue()) {
            this.layerAttr("seg_b0", { fill: null});
            this.layerAttr("seg_b1", { fill: "#C21B7A"});
            this.layerAttr("seg_b3", { fill: null});
            this.layerAttr("seg_b4", { fill: null});
            this.layerAttr("seg_b2", { fill: "#C21B7A"});
            this.layerAttr("seg_b5", { fill: "#C21B7A"});
            this.layerAttr("seg_b6", { fill: "#C21B7A"});
         }
         else if (this.getPort("Port_b1").getValue() && this.getPort("Port_b2").getValue() && !this.getPort("Port_b4").getValue() && !this.getPort("Port_b8").getValue()) {
            this.layerAttr("seg_b0", { fill: "#C21B7A"});
            this.layerAttr("seg_b1", { fill: "#C21B7A"});
            this.layerAttr("seg_b3", { fill: "#C21B7A"});
            this.layerAttr("seg_b4", { fill: null});
            this.layerAttr("seg_b2", { fill: "#C21B7A"});
            this.layerAttr("seg_b5", { fill: null});
            this.layerAttr("seg_b6", { fill: "#C21B7A"});
         }
         else if (!this.getPort("Port_b1").getValue() && this.getPort("Port_b2").getValue() && !this.getPort("Port_b4").getValue() && !this.getPort("Port_b8").getValue()) {
            this.layerAttr("seg_b0", { fill: "#C21B7A"});
            this.layerAttr("seg_b1", { fill: "#C21B7A"});
            this.layerAttr("seg_b3", { fill: "#C21B7A"});
            this.layerAttr("seg_b4", { fill: "#C21B7A"});
            this.layerAttr("seg_b2", { fill: null});
            this.layerAttr("seg_b5", { fill: null});
            this.layerAttr("seg_b6", { fill: "#C21B7A"});
         }
         else if (this.getPort("Port_b1").getValue() && !this.getPort("Port_b2").getValue() && !this.getPort("Port_b4").getValue() && !this.getPort("Port_b8").getValue()) {
            this.layerAttr("seg_b0", { fill: null});
            this.layerAttr("seg_b1", { fill: "#C21B7A"});
            this.layerAttr("seg_b3", { fill: null});
            this.layerAttr("seg_b4", { fill: null});
            this.layerAttr("seg_b2", { fill: "#C21B7A"});
            this.layerAttr("seg_b5", { fill: null});
            this.layerAttr("seg_b6", { fill: null});
         }
         else if (!this.getPort("Port_b1").getValue() && !this.getPort("Port_b2").getValue() && !this.getPort("Port_b4").getValue() && !this.getPort("Port_b8").getValue()) {
            this.layerAttr("seg_b0", { fill: "#C21B7A"});
            this.layerAttr("seg_b1", { fill: "#C21B7A"});
            this.layerAttr("seg_b3", { fill: "#C21B7A"});
            this.layerAttr("seg_b4", { fill: "#C21B7A"});
            this.layerAttr("seg_b2", { fill: "#C21B7A"});
            this.layerAttr("seg_b5", { fill: "#C21B7A"});
            this.layerAttr("seg_b6", { fill: null});
         }

         // For c

         if (this.getPort("Port_c1").getValue() && this.getPort("Port_c2").getValue() && this.getPort("Port_c4").getValue() && this.getPort("Port_c8").getValue()) {
            this.layerAttr("seg_c0", { fill: "#C21B7A"});
            this.layerAttr("seg_c1", { fill: null});
            this.layerAttr("seg_c2", { fill: null});
            this.layerAttr("seg_c3", { fill: null});
            this.layerAttr("seg_c4", { fill: "#C21B7A"});
            this.layerAttr("seg_c5", { fill: "#C21B7A"});
            this.layerAttr("seg_c6", { fill: "#C21B7A"});
         }
         else if (!this.getPort("Port_c1").getValue() && this.getPort("Port_c2").getValue() && this.getPort("Port_c4").getValue() && this.getPort("Port_c8").getValue()) {
            this.layerAttr("seg_c0", { fill: "#C21B7A"});
            this.layerAttr("seg_c1", { fill: null});
            this.layerAttr("seg_c2", { fill: null});
            this.layerAttr("seg_c4", { fill: "#C21B7A"});
            this.layerAttr("seg_c5", { fill: "#C21B7A"});
            this.layerAttr("seg_c6", { fill: "#C21B7A"});
            this.layerAttr("seg_c3", { fill: "#C21B7A"});
         }
         else if (this.getPort("Port_c1").getValue() && !this.getPort("Port_c2").getValue() && this.getPort("Port_c4").getValue() && this.getPort("Port_c8").getValue()) {
            this.layerAttr("seg_c1", { fill: "#C21B7A"});
            this.layerAttr("seg_c2", { fill: "#C21B7A"});
            this.layerAttr("seg_c4", { fill: "#C21B7A"});
            this.layerAttr("seg_c6", { fill: "#C21B7A"});
            this.layerAttr("seg_c3", { fill: "#C21B7A"});
            this.layerAttr("seg_c0", { fill: null});
            this.layerAttr("seg_c5", { fill: null});
         }
         else if (!this.getPort("Port_c1").getValue() && !this.getPort("Port_c2").getValue() && this.getPort("Port_c4").getValue() && this.getPort("Port_c8").getValue()) {
            this.layerAttr("seg_c0", { fill: "#C21B7A"});
            this.layerAttr("seg_c3", { fill: "#C21B7A"});
            this.layerAttr("seg_c4", { fill: "#C21B7A"});
            this.layerAttr("seg_c5", { fill: "#C21B7A"});
            this.layerAttr("seg_c1", { fill: null});
            this.layerAttr("seg_c2", { fill: null});
            this.layerAttr("seg_c6", { fill: null});
         }
         else if (this.getPort("Port_c1").getValue() && this.getPort("Port_c2").getValue() && !this.getPort("Port_c4").getValue() && this.getPort("Port_c8").getValue()) {
            this.layerAttr("seg_c2", { fill: "#C21B7A"});
            this.layerAttr("seg_c3", { fill: "#C21B7A"});
            this.layerAttr("seg_c4", { fill: "#C21B7A"});
            this.layerAttr("seg_c5", { fill: "#C21B7A"});
            this.layerAttr("seg_c6", { fill: "#C21B7A"});
            this.layerAttr("seg_c1", { fill: null});
            this.layerAttr("seg_c0", { fill: null});
         }
         else if (!this.getPort("Port_c1").getValue() && this.getPort("Port_c2").getValue() && !this.getPort("Port_c4").getValue() && this.getPort("Port_c8").getValue()) {
            this.layerAttr("seg_c0", { fill: "#C21B7A"});
            this.layerAttr("seg_c1", { fill: "#C21B7A"});
            this.layerAttr("seg_c2", { fill: "#C21B7A"});
            this.layerAttr("seg_c4", { fill: "#C21B7A"});
            this.layerAttr("seg_c5", { fill: "#C21B7A"});
            this.layerAttr("seg_c6", { fill: "#C21B7A"});
            this.layerAttr("seg_c3", { fill: null});
         }
         else if (this.getPort("Port_c1").getValue() && !this.getPort("Port_c2").getValue() && !this.getPort("Port_c4").getValue() && this.getPort("Port_c8").getValue()) {
            this.layerAttr("seg_c0", { fill: "#C21B7A"});
            this.layerAttr("seg_c1", { fill: "#C21B7A"});
            this.layerAttr("seg_c2", { fill: "#C21B7A"});
            this.layerAttr("seg_c5", { fill: "#C21B7A"});
            this.layerAttr("seg_c6", { fill: "#C21B7A"});
            this.layerAttr("seg_c3", { fill: null});
            this.layerAttr("seg_c4", { fill: null});
         }
         else if (!this.getPort("Port_c1").getValue() && !this.getPort("Port_c2").getValue() && !this.getPort("Port_c4").getValue() && this.getPort("Port_c8").getValue()) {
            this.layerAttr("seg_c0", { fill: "#C21B7A"});
            this.layerAttr("seg_c1", { fill: "#C21B7A"});
            this.layerAttr("seg_c3", { fill: "#C21B7A"});
            this.layerAttr("seg_c4", { fill: "#C21B7A"});
            this.layerAttr("seg_c2", { fill: "#C21B7A"});
            this.layerAttr("seg_c5", { fill: "#C21B7A"});
            this.layerAttr("seg_c6", { fill: "#C21B7A"});
         }
         else if (this.getPort("Port_c1").getValue() && this.getPort("Port_c2").getValue() && this.getPort("Port_c4").getValue() && !this.getPort("Port_c8").getValue()) {
            this.layerAttr("seg_c0", { fill: "#C21B7A"});
            this.layerAttr("seg_c1", { fill: "#C21B7A"});
            this.layerAttr("seg_c3", { fill: null});
            this.layerAttr("seg_c4", { fill: null});
            this.layerAttr("seg_c2", { fill: "#C21B7A"});
            this.layerAttr("seg_c5", { fill: null});
            this.layerAttr("seg_c6", { fill: null});
         }
         else if (!this.getPort("Port_c1").getValue() && this.getPort("Port_c2").getValue() && this.getPort("Port_c4").getValue() && !this.getPort("Port_c8").getValue()) {
            this.layerAttr("seg_c0", { fill: "#C21B7A"});
            this.layerAttr("seg_c1", { fill: null});
            this.layerAttr("seg_c3", { fill: "#C21B7A"});
            this.layerAttr("seg_c4", { fill: "#C21B7A"});
            this.layerAttr("seg_c2", { fill: "#C21B7A"});
            this.layerAttr("seg_c5", { fill: "#C21B7A"});
            this.layerAttr("seg_c6", { fill: "#C21B7A"});
         }
         else if (this.getPort("Port_c1").getValue() && !this.getPort("Port_c2").getValue() && this.getPort("Port_c4").getValue() && !this.getPort("Port_c8").getValue()) {
            this.layerAttr("seg_c0", { fill: "#C21B7A"});
            this.layerAttr("seg_c1", { fill: null});
            this.layerAttr("seg_c3", { fill: "#C21B7A"});
            this.layerAttr("seg_c4", { fill: null});
            this.layerAttr("seg_c2", { fill: "#C21B7A"});
            this.layerAttr("seg_c5", { fill: "#C21B7A"});
            this.layerAttr("seg_c6", { fill: "#C21B7A"});
         }
         else if (!this.getPort("Port_c1").getValue() && !this.getPort("Port_c2").getValue() && this.getPort("Port_c4").getValue() && !this.getPort("Port_c8").getValue()) {
            this.layerAttr("seg_c0", { fill: null});
            this.layerAttr("seg_c1", { fill: "#C21B7A"});
            this.layerAttr("seg_c3", { fill: null});
            this.layerAttr("seg_c4", { fill: null});
            this.layerAttr("seg_c2", { fill: "#C21B7A"});
            this.layerAttr("seg_c5", { fill: "#C21B7A"});
            this.layerAttr("seg_c6", { fill: "#C21B7A"});
         }
         else if (this.getPort("Port_c1").getValue() && this.getPort("Port_c2").getValue() && !this.getPort("Port_c4").getValue() && !this.getPort("Port_c8").getValue()) {
            this.layerAttr("seg_c0", { fill: "#C21B7A"});
            this.layerAttr("seg_c1", { fill: "#C21B7A"});
            this.layerAttr("seg_c3", { fill: "#C21B7A"});
            this.layerAttr("seg_c4", { fill: null});
            this.layerAttr("seg_c2", { fill: "#C21B7A"});
            this.layerAttr("seg_c5", { fill: null});
            this.layerAttr("seg_c6", { fill: "#C21B7A"});
         }
         else if (!this.getPort("Port_c1").getValue() && this.getPort("Port_c2").getValue() && !this.getPort("Port_c4").getValue() && !this.getPort("Port_c8").getValue()) {
            this.layerAttr("seg_c0", { fill: "#C21B7A"});
            this.layerAttr("seg_c1", { fill: "#C21B7A"});
            this.layerAttr("seg_c3", { fill: "#C21B7A"});
            this.layerAttr("seg_c4", { fill: "#C21B7A"});
            this.layerAttr("seg_c2", { fill: null});
            this.layerAttr("seg_c5", { fill: null});
            this.layerAttr("seg_c6", { fill: "#C21B7A"});
         }
         else if (this.getPort("Port_c1").getValue() && !this.getPort("Port_c2").getValue() && !this.getPort("Port_c4").getValue() && !this.getPort("Port_c8").getValue()) {
            this.layerAttr("seg_c0", { fill: null});
            this.layerAttr("seg_c1", { fill: "#C21B7A"});
            this.layerAttr("seg_c3", { fill: null});
            this.layerAttr("seg_c4", { fill: null});
            this.layerAttr("seg_c2", { fill: "#C21B7A"});
            this.layerAttr("seg_c5", { fill: null});
            this.layerAttr("seg_c6", { fill: null});
         }
         else if (!this.getPort("Port_c1").getValue() && !this.getPort("Port_c2").getValue() && !this.getPort("Port_c4").getValue() && !this.getPort("Port_c8").getValue()) {
            this.layerAttr("seg_c0", { fill: "#C21B7A"});
            this.layerAttr("seg_c1", { fill: "#C21B7A"});
            this.layerAttr("seg_c3", { fill: "#C21B7A"});
            this.layerAttr("seg_c4", { fill: "#C21B7A"});
            this.layerAttr("seg_c2", { fill: "#C21B7A"});
            this.layerAttr("seg_c5", { fill: "#C21B7A"});
            this.layerAttr("seg_c6", { fill: null});
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
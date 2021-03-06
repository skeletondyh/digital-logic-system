// Generated Code for the Draw2D touch HTML5 lib
//                                                        
// http://www.draw2d.org                                  
//                                                        
// Go to the Designer http://www.draw2d.org               
// to design your own shape or download user generated    
//                                                        
var GND = draw2d.SetFigure.extend({            
    
       NAME: "GND",
    
       init:function(attr, setter, getter)
       {
         this._super( $.extend({stroke:0, bgColor:null, width:60,height:30},attr), setter, getter);
         var port;
         //Port_out
         port = this.createPort("output", new draw2d.layout.locator.XYRelPortLocator(100, 50));
         port.setConnectionDirection(1);
         port.setBackgroundColor("#37B1DE");
         port.setName("Port_out");
         port.setMaxFanOut(20);
        
         this.persistPorts=false;
       },
    
       createShapeElement : function()
       {
          var shape = this._super();
          this.originalWidth = 60;
          this.originalHeight= 30;
          return shape;
       },
    
       createSet: function()
       {
           this.canvas.paper.setStart();
    
            // BoundingBox
            shape = this.canvas.paper.path("M0,0 L60,0 L60,30 L0,30");
            shape.attr({"stroke":"none","stroke-width":0,"fill":"none"});
            shape.data("name","BoundingBox");
            
            // Rectangle
            shape = this.canvas.paper.path("M1,1 L59,1 L59,29 L1,29 L1,1");
            shape.attr({"stroke":"#303030","stroke-width":1,"fill":"#FFFFFF","dasharray":null,"opacity":1});
            shape.data("name","Rectangle");
            
            // Label_Name
            shape = this.canvas.paper.text(0,0,'GND');
            shape.attr({"x":15,"y":15,"text-anchor":"start","text":"GND","font-family":"\"Arial\"","font-size":16,"stroke":"none","fill":"#080808","stroke-scale":true,"font-weight":"normal","stroke-width":0,"opacity":1});
            shape.data("name","Label_Name");
            
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
    GND = GND.extend({
    
        init: function(attr, setter, getter){
             this._super(attr, setter, getter);
    
             // your special code here
             this.attr({resizeable:false});
             this.installEditPolicy(new draw2d.policy.figure.AntSelectionFeedbackPolicy());
        },
    
        /**
         *  Called by the simulator for every calculation
         *  loop
         *  @required
         **/
        calculate:function()
        {       
            var out = this.getOutputPort("Port_out");
            out.setValue(false);
    
            //console.log(A1.getValue() + "$$$$" + B1.getValue() + "$$$$" + Y1.getValue() + "$$$$");
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
        },
    
        note: "Y = 0"
    });
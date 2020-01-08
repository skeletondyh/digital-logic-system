/**
 * Created by Chen Yazheng on 16/10/20
 */

// ToDo: overwite CommandStack's command DELETE ADD etc., to support updateRemain
// e.g.: draw2d.command.CommandDelete
// ToDO: check limit condition in server side

var scrollAreaId = "#draw2dCanvasWrapper";
var defaultRouter = new ConnectionRouter();//new draw2d.layout.connection.InteractiveManhattanConnectionRouter(); 

tot.View = draw2d.Canvas.extend({

	/**
	 * @constructor
	 */
	init: function(app, id, limits) {
	    var _this = this;
		this._super(id);
        this.app = app;
        
        this.changed = false;

        this.probeWindow = new ProbeWindow(this);

        this.simulate = false;
        this.animationFrameFunc = $.proxy(this._calculate,this);


        this.timerBase = 10; // ms calculate every 10ms all elements

        this.enableShortcut = false;

        this.limits = limits;
        this.initRemain();

        this.setScrollArea(scrollAreaId);

        // add commandStack support
        this.getCommandStack().addEventListener(this);

        this.fileStorage = new draw2d.storage.LocalFileStorage();
        this.fileHandle = null;

        var router = new ConnectionRouter();
        router.abortRoutingOnFirstVertexNode=false;
        var createConnection=function(sourcePort, targetPort){
            var c = new Connection({
                color:"#000000",
                router: router,
                stroke:1.5,
                radius:2
            });
            if(sourcePort) {
                c.setSource(sourcePort);
                c.setTarget(targetPort);
            }
            return c;
        };

        this.installEditPolicy( new DropInterceptorPolicy());

        // install a Connection create policy which matches to a "circuit like"
        // connections
        //
        this.connectionPolicy = new draw2d.policy.connection.ComposedConnectionCreatePolicy(
                [
                    // create a connection via Drag&Drop of ports
                    //
                    new draw2d.policy.connection.DragConnectionCreatePolicy({
                        createConnection:createConnection
                    }),
                    // or via click and point
                    //
                    new draw2d.policy.connection.OrthogonalConnectionCreatePolicy({
                        createConnection:createConnection
                    })
                ]);
        this.installEditPolicy(this.connectionPolicy);

        // show the ports of the elements only if the mouse cursor is close to the shape.
        //
        this.coronaFeedback = new draw2d.policy.canvas.CoronaDecorationPolicy({diameterToBeVisible:50});
        this.installEditPolicy(this.coronaFeedback);

        // nice grid decoration for the canvas paint area
        //
        this.grid =  new draw2d.policy.canvas.ShowGridEditPolicy(20);
        this.installEditPolicy( this.grid);

        // add some SnapTo policy for better shape/figure alignment
        //
        this.installEditPolicy( new draw2d.policy.canvas.SnapToGeometryEditPolicy());
        this.installEditPolicy( new draw2d.policy.canvas.SnapToCenterEditPolicy());
        this.installEditPolicy( new draw2d.policy.canvas.SnapToInBetweenEditPolicy());

        // disable shortcut because there is a bug because of #filter after load 
        if (this.enableShortcut) {
            // Enable Copy&Past for figures
            //
            Mousetrap.bind(['ctrl+c', 'command+c'], $.proxy(function (event) {
                var primarySelection = this.getSelection().getPrimary();
                if(primarySelection!==null){
                    this.clippboardFigure = primarySelection.clone({excludePorts:true});
                    this.clippboardFigure.translate(5,5);
                }
                return false;
            },this));
            Mousetrap.bind(['ctrl+v', 'command+v'], $.proxy(function (event) {
                if(this.clippboardFigure!==null){
                    var cloneToAdd = this.clippboardFigure.clone({excludePorts:true});
                    var command = new draw2d.command.CommandAdd(this, cloneToAdd, cloneToAdd.getPosition());
                    this.getCommandStack().execute(command);
                    this.setCurrentSelection(cloneToAdd);
                }
                return false;
            },this));
            Mousetrap.bind(['ctrl+s', 'command+s'], $.proxy(function (event) {
                var canvas = _this;
                console.log("Save canvas by shortcut");
                _this.canvasSave(canvas);
                return false;
            }, this));
        }

        Mousetrap.bind(['left'],function (event) {
            var diff = _this.getZoom()<0.5?0.5:1;
            _this.getSelection().each(function(i,f){f.translate(-diff,0);});
            return false;
        });
        Mousetrap.bind(['up'],function (event) {
            var diff = _this.getZoom()<0.5?0.5:1;
            _this.getSelection().each(function(i,f){f.translate(0,-diff);});
            return false;
        });
        Mousetrap.bind(['right'],function (event) {
            var diff = _this.getZoom()<0.5?0.5:1;
            _this.getSelection().each(function(i,f){f.translate(diff,0);});
            return false;
        });
        Mousetrap.bind(['down'],function (event) {
            var diff = _this.getZoom()<0.5?0.5:1;
            _this.getSelection().each(function(i,f){f.translate(0,diff);});
            return false;
        });

        // button_zoom functions
        var setZoom = function(newZoom){
            var bb = _this.getBoundingBox().getCenter();
            var c = $(scrollAreaId);
            _this.setZoom(newZoom);
            _this.scrollTo((bb.y/newZoom- c.height()/2), (bb.x/newZoom- c.width()/2));
        };

        //  ZoomIn Button and the callbacks
        //
        $("#canvas_zoom_in").on("click",function(){
            setZoom(_this.getZoom()*1.2);
        });

        // OneToOne Button
        //
        $("#canvas_zoom_normal").on("click",function(){
            setZoom(1.0);
        });

        //ZoomOut Button and the callback
        //
        $("#canvas_zoom_out").on("click",function(){
            setZoom(_this.getZoom()*0.8);
        });

        // Have to use addEventListener("change") here because input element is special
        // document.querySelector(".toolbar").addEventListener("change", function(){
        //     _this.fileUpload();
        // });


        $('.toolbar').delegate("#fileUpload:not(.disabled)", "click", function() {
            _this.fileStorage.pickFileAndLoad(".circuit", 
                successCallback = function(file, fileData){
                    // save the fileHandle for further save operations
                    _this.fileHandle = file;
                    var jsonDocument = JSON.parse(fileData);
                    _this.load(jsonDocument);
                },
                errorCallBack = function() {
                    alert("Failed: File error.");
                }
            );
        });

        $('.toolbar').delegate("#fileSaveAs:not(.disabled)", "click", function(){
            console.log("canvasSaveAs");
            _this.canvasSaveAs(_this);
        });

        $('.toolbar').delegate("#fileSave:not(.disabled)", "click", function() {
            console.log("canvasSave");
            _this.canvasSave(_this);
        });

        $(".toolbar").delegate("#editDelete:not(.disabled)","click", function(){
            var selection = _this.getSelection();
            _this.getCommandStack().startTransaction(draw2d.Configuration.i18n.command.deleteShape);
            selection.each(function(index, figure){

                // Don't delete the conection if the source or target node part of the
                // selection. In this case the nodes deletes all connections by itself.
                //
                if(figure instanceof draw2d.Connection){
                    if(selection.contains(figure.getSource().getRoot()) || selection.contains(figure.getTarget().getRoot())){
                       return;
                    }
                }

                var cmd = figure.createCommand(new draw2d.command.CommandType(draw2d.command.CommandType.DELETE));
                if(cmd!==null){
                    _this.getCommandStack().execute(cmd);
                    type = figure.cssClass;
                    _this.updateRemain(type, +1);
                    $("#"+figure.cssClass).html();
                }
            });
            // execute all single commands at once.
            _this.getCommandStack().commitTransaction();
        });

        // Register a Selection listener for the state hnadling
        // of the Delete Button
        //
        this.on("select", function(emitter, event){
            if(event.figure===null ) {
                $("#editDelete").addClass("disabled");
            }
            else{
                $("#editDelete").removeClass("disabled");
            }
        });

        $(".toolbar").delegate("#editUndo:not(.disabled)","click", function(){
            _this.getCommandStack().undo();
        });

        $(".toolbar").delegate("#editRedo:not(.disabled)","click", function(){
            _this.getCommandStack().redo();
        });

        $("#simulationStartStop").on("click", function(){
            _this.simulationToggle();
        });

        this.on("contextmenu", function(emitter, event){
            var figure = _this.getBestFigure(event.x, event.y);

            // a connectionprovides its own context menu
            //
            if(figure instanceof draw2d.Connection){
                return;
            }
            if(figure instanceof ProbeFigure){
                return;
            }

            if(figure!==null){
                var x = event.x;
                var y = event.y;

                var items = {
                    "label":   {name: "Add Label"        , icon :"x ion-ios-pricetag-outline"     },
                    "delete":  {name: "Delete"           , icon :"x ion-ios-close-outline"        },
                };

                // if the designer is running on the Raspi
                //
                if(conf.designer.url===null){
                     items = {
                        "label":   {name: "Add Label"        , icon :"x ion-ios-pricetag-outline"     },
                        "delete":  {name: "Delete"           , icon :"x ion-ios-close-outline"        },
                     };
                }

                $.contextMenu({
                    selector: 'body',
                    events:
                    {
                        hide:function(){ $.contextMenu( 'destroy' ); }
                    },
                    callback: $.proxy(function(key, options)
                    {
                        switch(key){
                            case "label":
                                var text = prompt("Label");
                                if(text) {
                                    var label = new draw2d.shape.basic.Label({text:text, stroke:0, x:-20, y:-40});
                                    var locator = new draw2d.layout.locator.SmartDraggableLocator();
                                    label.installEditor(new draw2d.ui.LabelInplaceEditor());
                                    figure.add(label,locator);
                                }
                                break;
                            case "delete":
                                var cmd = new draw2d.command.CommandDelete(figure);
                                _this.getCommandStack().execute(cmd);
                                break;
                            default:
                                break;
                        }

                    },this),
                    x:x,
                    y:y,
                    items:items

                });
            }
        });

        this.slider= $('#simulationBaseTimer')
            .slider({
                id:"simulationBaseTimerSlider"
            })
            .on("slide",function(event){
                // min = 50     => 100ms
                // norm= 100    => 10ms ticks
                // max = 500    =>  2ms ticks
                //
                // To map between the different intervals
                // [A, B] --> [a, b]
                // use this formula
                // (val - A)*(b-a)/(B-A) + a

                if(event.value<100){
                    _this.timerBase = parseInt(100-((event.value-50)*(100-10)/(100-50)+10));
                }
                else{
                    _this.timerBase = parseInt(11-((event.value-100)*(10-2)/(500-100)+2));
                }
            });
	}, // end init

    getBoundingBox: function()
    {
        var xCoords = [];
        var yCoords = [];
        this.getFigures().each(function(i,f){
           var b = f.getBoundingBox();
            xCoords.push(b.x, b.x+b.w);
            yCoords.push(b.y, b.y+b.h);
        });
        var minX   = Math.min.apply(Math, xCoords);
        var minY   = Math.min.apply(Math, yCoords);
        var width  = Math.max(100,Math.max.apply(Math, xCoords)-minX);
        var height = Math.max(100,Math.max.apply(Math, yCoords)-minY);

        return new draw2d.geo.Rectangle(minX,minY,width,height);
    },

	/**
     * @method
     * Called if the DragDrop object is moving around.<br>
     * <br>
     * Graphiti use the jQuery draggable/droppable lib. Please inspect
     * http://jqueryui.com/demos/droppable/ for further information.
     *
     * @param {HTMLElement} droppedDomNode The dragged DOM element.
     * @param {Number} x the x coordinate of the drag
     * @param {Number} y the y coordinate of the drag
     *
     * @template
     **/
    onDrag:function(droppedDomNode, x, y )
    {
    },

    /**
     * @method
     * Called if the user drop the droppedDomNode onto the canvas.<br>
     * <br>
     * Draw2D use the jQuery draggable/droppable lib. Please inspect
     * http://jqueryui.com/demos/droppable/ for further information.
     *
     * @param {HTMLElement} droppedDomNode The dropped DOM element.
     * @param {Number} x the x coordinate of the drop
     * @param {Number} y the y coordinate of the drop
     * @param {Boolean} shiftKey true if the shift key has been pressed during this event
     * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
     * @private
     **/
    onDrop : function(droppedDomNode, x, y, shiftKey, ctrlKey)
    {
        var type = $(droppedDomNode).data("shape");
        var isAllowed = this.checkLimit(type); 
        if (isAllowed) {
            var figure = eval("new "+type+"();");
            this.updateRemain(type, -1);
            // create a command for the undo/redo support
            var command = new draw2d.command.CommandAdd(this, figure, x, y);
            this.getCommandStack().execute(command);
        } else {
            alert("Usage is limited.");
        }
    },

    checkLimit:function(type) {
        if (type == null) return false;
        var remain = this.getRemain(type);
        if (remain > 0)
            return true;
        else 
            return false;
    },

    initRemain:function() {
        for (element in this.limits) {
            this.limits[element].remain = this.limits[element].limit;
        }
    },

    updateRemain:function(type, delta) {
        if (this.limits[type] == null) 
            return;
        if (delta < 0) {
            this.limits[type].remain = Math.max(
                this.limits[type].remain + delta, 
                0
            );
        } else {
            this.limits[type].remain = Math.min(
                this.limits[type].remain + delta, 
                this.limits[type].limit
            );
        }
        $("#"+type).html(this.limits[type].remain);
    },

    getRemain:function(type) {
        if(this.limits[type] != null)
            return this.limits[type].remain;
        return 99;
    },

    /**
     * Disable snapTo GRID if we have select more than one element
     * @param figure
     * @param pos
     */
    snapToHelper : function(figure, pos)
    {
        if(this.getSelection().getSize()>1){
            return pos;
        }
        return this._super(figure, pos);
    },

    /**
     * @method
     * Transforms a document coordinate to canvas coordinate.
     *
     * @param {Number} x the x coordinate relative to the window
     * @param {Number} y the y coordinate relative to the window
     *
     * @returns {draw2d.geo.Point} The coordinate in relation to the canvas [0,0] position
     * 
     * !! 修改，部件有滑动，x加上垂直滑动
     */
    fromDocumentToCanvasCoordinate: function(x, y)
    {
        return new draw2d.geo.Point(
            (x - this.getAbsoluteX())*this.zoomFactor,
            (y - this.getAbsoluteY() + $('body').scrollTop())*this.zoomFactor);
    },

    /**
     * @method
     * Transforms a canvas coordinate to document coordinate.
     *
     * @param {Number} x the x coordinate in the canvas
     * @param {Number} y the y coordinate in the canvas
     *
     * @returns {draw2d.geo.Point} the coordinate in relation to the document [0,0] position
     * 
     * !! 修改，部件有滑动
     */
    fromCanvasToDocumentCoordinate: function(x,y)
    {
        return new draw2d.geo.Point(
            ((x*(1/this.zoomFactor)) + this.getAbsoluteX()),
            ((y*(1/this.zoomFactor)) + this.getAbsoluteY() - $('body').scrollTop()));
    },

    simulationToggle:function()
    {
        if(this.simulate===true){
            this.simulationStop();
        } else {
            this.simulationStart();
        }
    },

    simulationStart:function()
    {
        if(this.simulate===true){
            return; // silently
        }

        this.simulate=true;

        this.installEditPolicy(new SimulationEditPolicy());
        this.uninstallEditPolicy(this.connectionPolicy);
        this.uninstallEditPolicy(this.coronaFeedback);
        this.commonPorts.each(function(i,p){
            p.setVisible(false);
        });

        this._calculate();

        $("#simulationStartStop").addClass("pause");
        $("#simulationStartStop").removeClass("play");
        $(".simulationBase" ).fadeIn( "slow" );
        $("#paletteElementsOverlay" ).fadeIn( "fast" );
        $("#paletteElementsOverlay").height($("#paletteElements").height());
        this.slider.slider("setValue",100);

        this.probeWindow.show();
    },

    simulationStop:function()
    {
        this.simulate = false;
        this.commonPorts.each(function(i,p){
            p.setVisible(true);
        });
        this.installEditPolicy(new EditEditPolicy());
        this.installEditPolicy(this.connectionPolicy);
        this.installEditPolicy(this.coronaFeedback);

        $("#simulationStartStop").addClass("play");
        $("#simulationStartStop").removeClass("pause");
        $(".simulationBase" ).fadeOut( "slow" );
        $("#paletteElementsOverlay" ).fadeOut( "fast" );
        this.probeWindow.hide();
    },

    _calculate:function()
    {
        // call the "calculate" method if given to calculate the output-port values
        //
        this.getFigures().each(function(i,figure){
            figure.calculate();
        });

        // transport the value from oututPort to inputPort
        //
        this.getLines().each(function(i,line){
            var outPort = line.getSource();
            var inPort  = line.getTarget();
            inPort.setValue(outPort.getValue());
            line.setColor(outPort.getValue()?conf.color.high:conf.color.low);
        });

        if(this.simulate===true){
       //     setImmediate(this.animationFrameFunc);
            setTimeout(this.animationFrameFunc,this.timerBase);
        }

        this.probeWindow.tick(this.timerBase);
    },

    /**
     * @method
     * Sent when an event occurs on the command stack. draw2d.command.CommandStackEvent.getDetail()
     * can be used to identify the type of event which has occurred.
     *
     * @template
     *
     * @param {draw2d.command.CommandStackEvent} event
     **/
    stackChanged:function(event)
    {
        $("#editUndo").addClass("disabled");
        $("#editRedo").addClass("disabled");

        if(event.getStack().canUndo()) {
            $("#editUndo").removeClass("disabled");
        }

        if(event.getStack().canRedo()) {
            $("#editRedo").removeClass("disabled");
        }

        this.changed = true;
    },

    load:function (jsonDocument) {  
        // cleanup the canvas 
        this.clear();
        this.initRemain();
        var _this = this;

        $(jsonDocument).each(function(index, item) {
            // checkLimit
            if (_this.checkLimit(item.type)) {
                _this.updateRemain(item.type, -1);        
            } else {
                alert("Error: " + item.type + " usage is limited.");
            }
        });

        // load the JSON into the canvas
        var reader = new draw2d.io.json.Reader();
        reader.unmarshal(this, jsonDocument);
        this.centerDocument();
    },

    centerDocument:function()
    {
        var bb=null;
        var c = $(scrollAreaId);
        if(this.getFigures().getSize()>0){
            // get the bounding box of the document and translate the complete document
            // into the center of the canvas. Scroll to the top left corner after them
            //
            bb = this.getBoundingBox();
            this.scrollTo(bb.y- c.height()/2,bb.x- c.width()/2);
        }
        else{
            bb={
                x:this.getWidth()/2,
                y:this.getHeight()/2
            };
            this.scrollTo(bb.y- c.height()/2,bb.x- c.width()/2);

        }
    },

    // deprecated, use draw2d.storage.LocalFileStorage instead
    fileUpload:function() {
        var file_uri = window.URL.createObjectURL($("#file_input").get(0).files[0]);
        if (typeof file_uri === 'undefined') { file_uri = default_file_uri; }
        var jsonDocument;
        var canvas = this;
        get_file(file_uri,function (response) {
            canvas.clear();
            jsonDocument = response.target.responseText;
            var reader = new draw2d.io.json.Reader();
            reader.unmarshal(canvas, jsonDocument);
            canvas.centerDocument();
        });
        $("#fileInput").addClass("disabled"); 
    },

    canvasSaveAs:function(canvas) {
        var writer = new draw2d.io.json.Writer();
        var _this = this;
        writer.marshal(canvas, function(json){
            var content = JSON.stringify(json,null,2);
            console.log(content);
            //  var blob = new Blob([content], {type:"text/plain;charset=utf-8"});
            //  saveAs(blob, "design.circuit");
            _this.fileStorage.saveFile(_this.app.currentFileHandle.title, content, "false", function(title) {
                // alert(title.fileName + " saved succesfully.");
            });
            
            _this.canvasSave(_this);
        });
    },

    canvasSave:function (canvas) { 
        var writer = new draw2d.io.json.Writer();
        var _this = this;
        writer.marshal(canvas, function (json) {  
            var content = JSON.stringify(json, null, 2);
            console.log(content);
            _this.app.sessionStorage.setItem(_this.app.pid+"canvas", content);
            _this.changed = false;
            _this.getCommandStack().markSaveLocation(); 
        });
    },

    isSimulationRunning:function() {
        return this.simulate;
    },

    isChanged: function() {
        return this.changed;
    }

});

function get_file(uri,callback) {
	var request = new XMLHttpRequest();
	request.onload = callback;
	request.open("get",uri,true);
	request.send();
}
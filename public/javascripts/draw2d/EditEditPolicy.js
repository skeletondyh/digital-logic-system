var EditEditPolicy = draw2d.policy.canvas.BoundingboxSelectionPolicy.extend({


    init:function()
    {
      this._super();
      this.mouseMoveProxy = $.proxy(this._onMouseMoveCallback, this);
      this.configIcon=null;
    },

    /**
     * @method
     * Called by the canvas if the user click on a figure.
     *
     * @param {draw2d.Figure} the figure under the click event. Can be null
     * @param {Number} mouseX the x coordinate of the mouse during the click event
     * @param {Number} mouseY the y coordinate of the mouse during the click event
     * @param {Boolean} shiftKey true if the shift key has been pressed during this event
     * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
     *
     * @since 3.0.0
     */
    onClick: function(figure, mouseX, mouseY, shiftKey, ctrlKey)
    {
        // we only foreward the click-event to the MarkerFigure hich the user can show hide per
        // default
        // lt in the edit mode as well.
        if(figure instanceof MarkerFigure){
            this._super(figure, mouseX, mouseY, shiftKey, ctrlKey);
        }
    },

    onInstall:function(canvas)
    {
        this._super(canvas);
        var _this = this;

        // provide configuration menu if the mouse is close to a shape
        //
        canvas.on("mousemove", this.mouseMoveProxy);
    },


    onUninstall:function(canvas)
    {
        this._super(canvas);

        canvas.off(this.mouseMoveProxy);
    },

    onMouseDrag: function(canvas, dx, dy, dx2, dy2, shiftKey, ctrlKey)
    {
        // don't drag a selection box if we drag&drop a port
        //
        if( this.canDrawBoundingBox===false){
            return;
        }

        if (shiftKey === true){
            var area = canvas.getScrollArea();
            area.scrollTop(area.scrollTop()-dy2);
            area.scrollLeft(area.scrollLeft()-dx2);
            return;
        }

        try{
            this._super(canvas, dx,dy,dx2,dy2, shiftKey, ctrlKey);
            
            if (this.mouseDraggingElement === null && this.mouseDownElement===null && this.boundingBoxFigure1===null) {
                this.boundingBoxFigure1 = new draw2d.shape.basic.Rectangle({
                    width  :1,
                    height :1,
                    x      : this.x,
                    y      : this.y,
                    bgColor: "#d4d1d4",
                    alpha  : 0.1
                });
                this.boundingBoxFigure1.setCanvas(canvas);
                
                this.boundingBoxFigure2 = new draw2d.shape.basic.Rectangle({
                    width:1,
                    height:1,
                    x: this.x,
                    y:this.y,
                    dash:"--..",
                    stroke:0.5,
                    color:"#37a8ff",
                    bgColor:null
                });
                this.boundingBoxFigure2.setCanvas(canvas);
            }

            if (this.boundingBoxFigure1!==null) {
                this.boundingBoxFigure1.setDimension(Math.abs(dx),Math.abs(dy));
                this.boundingBoxFigure1.setPosition(this.x + Math.min(0,dx), this.y + Math.min(0,dy));
                this.boundingBoxFigure2.setDimension(Math.abs(dx),Math.abs(dy));
                this.boundingBoxFigure2.setPosition(this.x + Math.min(0,dx), this.y + Math.min(0,dy));
            }
        }
        catch(exc){
            console.log(exc);
        }
    },
    
    onMouseUp: function(canvas, x,y, shiftKey, ctrlKey)
    {
        if(shiftKey ===true && this.mouseDownElement===null){
            var rx = Math.min(x, this.x);
            var ry = Math.min(y, this.y);
            var rh = Math.abs(y-this.y);
            var rw = Math.abs(x-this.x);
            var raftFigure = new Raft();
            raftFigure.attr({
                x:rx,
                y:ry,
                width:rw,
                height:rh,
                color:"#1c9bab"
            });
            canvas.add(raftFigure);
            this.boundingBoxFigure1.setCanvas(null);
            this.boundingBoxFigure1 = null;
            this.boundingBoxFigure2.setCanvas(null);
            this.boundingBoxFigure2 = null;
        }
        else{
            this._super(canvas, x, y, shiftKey, ctrlKey);
        }
    },

    _onMouseMoveCallback:function(emitter, event)
    {
        // there is no benefit to show decorations during Drag&Drop of an shape
        //
        if(this.mouseMovedDuringMouseDown===true){
            if(this.configIcon!==null) {
                this.configIcon.remove();
                this.configIcon = null;
            }
            return;
        }

        var hit = null;
        var _this = this;

        emitter.getFigures().each(function(index, figure){
            if(figure.hitTest(event.x,event.y, 30)){
                hit = figure;
                return false;
            }
        });

        if(hit!==null && hit.getParameterSettings().length>0){
            var pos = hit.getBoundingBox().getTopLeft();
            pos = emitter.fromCanvasToDocumentCoordinate(pos.x, pos.y);
            pos.y -=30;

            if(_this.configIcon===null) {
                _this.configIcon = $("<div class='ion-gear-a' id='configMenuIcon'></div>");
                $("body").append(_this.configIcon);
              //  FigureConfigDialog.hide();
                _this.configIcon.on("click",function(){
                    FigureConfigDialog.show(hit, pos);
                    _this.configFigure = hit;
                    if(_this.configIcon!==null) {
                        _this.configIcon.remove();
                        _this.configIcon = null;
                    }
                });
            }
            _this.configIcon.css({top: pos.y, left: pos.x, position:'absolute'});
        }
        else{
            if(_this.configIcon!==null) {
                var x=_this.configIcon;
                _this.configIcon = null;
                x.fadeOut(500, function(){ x.remove(); });
            }
        }
    }
});
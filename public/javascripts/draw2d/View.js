/**
 * Created by Chen Yazheng on 16/10/20
 */

// ToDo: overwite CommandStack's command DELETE ADD etc., to support updateRemain
// e.g.: draw2d.command.CommandDelete
// ToDO: check limit condition in server side

var scrollAreaId = "#draw2dCanvasWrapper";
var defaultRouter = new ConnectionRouter();//new draw2d.layout.connection.InteractiveManhattanConnectionRouter(); 

// document.scripts[0].src = "portMap.js";

AnotherLabelInPlaceEditor = draw2d.ui.LabelInplaceEditor.extend({

    init: function(listener,view)
    {
        this._super();
        
        // register some default listener and override this with the handover one 
        this.listener = $.extend({onCommit: function(){}, onCancel: function(){}},listener);
        this.viewRef = view;
    },

    commit: function()
    {
        this.html.unbind("blur",this.commitCallback);
        $("body").unbind("click",this.commitCallback);

        var pattern = this.viewRef.patternForLabels;
        var reservedPattern = this.viewRef.patternForReservedWords;
        var wrongPattern = this.viewRef.patternForWrongLabels;

        var label = this.html.val();
        var flag1 = pattern.test(label);
        var flag2 = !(reservedPattern.test(label));
        var flag3 = !(wrongPattern.test(label));
        if ((flag1 && flag2 && flag3) && 
            (this.viewRef.usedInOutNameSet[label] !== true) && 
            (label !== undefined)){
            var cmd =new draw2d.command.CommandAttr(this.label, {text:label});
            this.label.getCanvas().getCommandStack().execute(cmd);
        }

        if ((!flag1) || (!flag3) || (label == undefined)) {
            alert("命名不符合规范(不能为空,必须以字母开头，只包括字母数字与下划线,不能以下划线结尾,不能有连续两个下划线)");
        } else if (!flag2) {
            alert("不能使用VHDL关键字作为名称");
        } else if (this.viewRef.usedInOutNameSet[label] == true){
            var fig = this.listener.father;
            if ((fig.userData == null) || (fig.userData.tagForWave !== label)){
                alert("该名称已被其他输入或输出端口使用");
            }
        }

        this.html.fadeOut($.proxy(function(){
            this.html.remove();
            this.html = null;
            this.listener.onCommit(this.label.getText());
        },this));
    }
});

OrthogonalConnectionCreatePolicy = draw2d.policy.connection.OrthogonalConnectionCreatePolicy.extend({
    onClick: function(figure, x, y, shiftKey, ctrlKey){

        if (ctrlKey && this.beeline!==null){
            this.beeline.hide();
            this.tempConnection.hide();
            this.beeline = null;
            this.port1=null;
            this.vertices.clear();
            if(this.pulse!=null) {
                this.pulse.remove();
                this.pulse=null;
            }
        }

        var UP   = draw2d.geo.Rectangle.DIRECTION_UP;
        var RIGHT= draw2d.geo.Rectangle.DIRECTION_RIGHT;
        var DOWN = draw2d.geo.Rectangle.DIRECTION_DOWN;
        var LEFT = draw2d.geo.Rectangle.DIRECTION_LEFT;

        var _this = this;
        var port = figure;// .getCanvas().getBestFigure(x, y);

        // nothing to do
        if(port === null && this.port1 === null){
            return;
        }

        // nothing found at all
        //
        if(port===null){
            var canvas = this.port1.getCanvas();
            var newPos = this.beeline.getEndPosition();
            this.vertices.add(newPos);
            this.beeline.setStartPosition(this.beeline.getEndPosition());
            this.tempConnection.setVertices(this.vertices);
            if(this.pulse!==null) {
                this.pulse.remove();
                this.pulse = null;
            }
            this.ripple(newPos.x, newPos.y, 0);
            return;
        }

        // we just considering ports
        //
        if(!(port instanceof draw2d.Port)){
            return;
        }

        // start connection create by selection the start port
        //
        if(this.port1===null){
            var canvas = port.getCanvas();
            this.port1 = port;
            this.vertices.add(port.getAbsolutePosition());
            this.beeline = new draw2d.shape.basic.Line({
                start: this.port1.getAbsolutePosition(),
                end: this.port1.getAbsolutePosition(),
                dasharray:"- ",
                color:"#2C70FF"
            });

            this.beeline.hide= function(){
                _this.beeline.setCanvas(null);
            };

            this.beeline.show= function(canvas){
                _this.beeline.setCanvas(canvas);
                _this.beeline.shape.toFront();
            };
            this.beeline.show(canvas);

            this.tempConnection = new draw2d.shape.basic.PolyLine({
                start: this.port1.getAbsolutePosition(),
                end: this.port1.getAbsolutePosition(),
                stroke:2,
                color:"#2C70FF"
            });

            this.tempConnection.hide= function(){
                _this.tempConnection.setCanvas(null);
            };

            this.tempConnection.show= function(canvas){
                _this.tempConnection.setCanvas(canvas);
                _this.tempConnection.shape.toFront();
            };
            this.tempConnection.show(canvas);
            this.tempConnection.setVertices([this.port1.getAbsolutePosition(),this.port1.getAbsolutePosition()]);

            var a= function() {
                _this.tempConnection.shape.animate({"stroke-width" : 2}, 800, b);
            };
            var b=function() {
                _this.tempConnection.shape.animate({"stroke-width":1}, 800, a);
            };
            a();

            canvas.paper.setStart();

            // delete the previews puls if the user press twice on the starting port
            //
            if(this.pulse!==null) {
                this.pulse.remove();
                this.pulse = null;
            }

            var pos = port.getAbsolutePosition();
            this.ripple(pos.x, pos.y, 1);
            this.pulse = canvas.paper.setFinish();
        }
        else {
            var possibleTarget = port.delegateTarget(this.port1);

            if (!(possibleTarget instanceof draw2d.Port)) {
                return; // silently
            }

            // check whenever the target port allows a connection
            //
            var request = new draw2d.command.CommandType(draw2d.command.CommandType.CONNECT);
            request.source = this.port1;
            request.target = port;
            var command = null;
            if (this.port1 instanceof draw2d.InputPort) {
                command = this.port1.createCommand(request);
            }
            else {
                command = port.createCommand(request);
            }

            if (command !== null) {
                var connection = this.createConnection();
                command.setConnection(connection);
                port.getCanvas().getCommandStack().execute(command);


                this.beeline.hide();
                this.tempConnection.hide();
                if (this.pulse !== null) {
                    this.pulse.remove();
                    this.pulse = null;
                }
                this.beeline = null;
                this.port1 = null;

                // use the default routing if the user didn't add some
                // vertices
                if(this.vertices.getSize()<=2){
                    return;
                }

                var MINDIST = command.getConnection().getRouter().MINDIST;
                var beforeVertex = this.vertices.get(this.vertices.getSize()-2);
                var lastVertex   = this.vertices.last();
                var portPos      = port.getAbsolutePosition();
                var lastSegmentDir = UP;
                if(lastVertex.x === beforeVertex.x){
                    lastSegmentDir = lastVertex.y< beforeVertex.y ? UP : DOWN;
                }
                else{
                    lastSegmentDir = lastVertex.x< beforeVertex.x ? LEFT : RIGHT;
                }

                // CALCULATE THE LAST MILE OF THE CONNECTION
                //
                // ensure that we have a valid "manhattan style" connection.
                // We must add or adjust some points or segments.
                //
                // The code below creates and adjust the points in that way that the
                // DOTTED line is the calculated part to the user defined vertices.
                // ==================================
                //
                switch(port.getConnectionDirection(this.port1)){
                    case UP:
                        switch(lastSegmentDir){
                            case UP:
                                //       o..................o lastVertex
                                //       |         .        |
                                //       |         .        |
                                //       |    +----O----+   |
                                // ------o    | portPos |   o------------
                                //            |         |      beforeVertex
                                //            +---------+
                                //
                                if(lastVertex.y<(portPos.y-MINDIST)) {
                                    this.vertices.add(new draw2d.geo.Point(portPos.x, lastVertex.y));
                                    this.vertices.add(portPos);
                                }
                                //        ...................
                                //        .        .        .
                                //        .   +----O----+   .
                                //        o   | portPos |   o lastVertex
                                //        |   |         |   |
                                //        |   +---------+   |
                                // -------o                 o------------
                                //                            beforeVertex
                                //
                                else{
                                    lastVertex.y = portPos.y-MINDIST;
                                    this.vertices.add(new draw2d.geo.Point(portPos.x, lastVertex.y));
                                    this.vertices.add(portPos);
                                }
                                break;
                            case RIGHT:
                                //  ..............................
                                //  .                   .        .
                                //  .                   .        .
                                //  o------->o     +----O----+   o---------------->O
                                //  |              | portPos |   | beforeVertex    lastVertex
                                //  |              |         |   |
                                //  |              +---------+
                                if(lastVertex.y>(portPos.y-MINDIST)){
                                    beforeVertex.y = portPos.y-MINDIST;
                                    lastVertex.x = portPos.x;
                                    lastVertex.y = beforeVertex.y;
                                    this.vertices.add(portPos);
                                }
                                //
                                //                                beforeVertex   lastVertex
                                // o---------->o..................o------------->O
                                // |                     .        |
                                // |                +----O----+   |
                                // |                | portPos |   |
                                // |                |         |   |
                                //                  +---------+
                                else{
                                    lastVertex.x = portPos.x;
                                    this.vertices.add(portPos);
                                }
                                break;
                            case DOWN:
                                //                           beforeVertex
                                // ------o..................o------------
                                //       |         .        |
                                //       |         .        |
                                //       V    +----O----+   V
                                //       o    | portPos |   o lastVertex
                                //            |         |
                                //            +---------+
                                //
                                if(lastVertex.y<(portPos.y-MINDIST)) {
                                    beforeVertex.x = portPos.x;
                                    lastVertex.setPosition(portPos);
                                }
                                //        ...................
                                //        .        .        .
                                //        .   +----O----+   . beforeVertex
                                // -------o   | portPos |   o------------
                                //        |   |         |   |
                                //        V   +---------+   V
                                //        o                 o
                                //                            lastVertex
                                //
                                else{
                                    lastVertex.y = portPos.y-MINDIST;
                                    this.vertices.add(new draw2d.geo.Point(portPos.x,lastVertex.y ));
                                    this.vertices.add(portPos);
                                }
                                break;
                            case LEFT:
                                //           ..................................
                                //           .         .                       .
                                //           .         .                       .
                                // o<--------o    +----O----+   o<-------------O beforeVertex
                                //           |    | portPos |    lastVertex    |
                                //           |    |         |                  |
                                //                +---------+
                                if(lastVertex.y>(portPos.y-MINDIST)){
                                    beforeVertex.y = portPos.y-MINDIST;
                                    lastVertex.x = portPos.x;
                                    lastVertex.y = beforeVertex.y;
                                    this.vertices.add(portPos);
                                }
                                //             |                               |
                                //             |                               |
                                //   o<--------o................o<-------------O
                                //                      .        lastVertex     beforeVertex
                                //                 +----O----+
                                //                 | portPos |
                                //                 |         |
                                //                 +---------+
                                else{
                                    lastVertex.x = portPos.x;
                                    this.vertices.add(portPos);
                                }
                                break;
                        }
                        break;
                    case RIGHT:
                        switch(lastSegmentDir){
                            case UP:
                                //                    o lastVertex
                                //                    |
                                //                    |
                                //  ------------------o beforeVertex
                                //                    .
                                //  +----------+      .
                                //  |          |      .
                                //  |  portPos O.......
                                //  |          |      .
                                //  +----------+      .
                                //                    o lastVertex
                                //                    |
                                //                    |
                                //   -----------------o beforeVertex
                                //
                                if(lastVertex.x > (portPos.x+MINDIST)){
                                    lastVertex.y = portPos.y;
                                    this.vertices.add(portPos);
                                }
                                //        lastVertex
                                //      o...............
                                //      |              .
                                //      |              .
                                //  ----o beforeVertex .
                                //                     .
                                //  +----------+       .
                                //  |          |       .
                                //  |  portPos O........
                                //  |          |       .
                                //  +----------+       .
                                //      o...............
                                //      | lastVertex
                                //      |
                                //------o
                                //        beforeVertex
                                //
                                //
                                else{
                                    this.vertices.add(new draw2d.geo.Point(portPos.x+MINDIST, lastVertex.y));
                                    this.vertices.add(new draw2d.geo.Point(portPos.x+MINDIST, portPos.y));
                                    this.vertices.add(portPos);
                                }
                                break;
                            case RIGHT:
                                //    beforeVertex     lastVertex
                                //    o-------------->o
                                //                    .
                                //  +----------+      .
                                //  |          |      .
                                //  |  portPos O.......
                                //  |          |      .
                                //  +----------+      .
                                //                    .
                                //    o-------------->o
                                //    beforeVertex     lastVertex
                                //
                                if(lastVertex.x > (portPos.x+MINDIST)){
                                    this.vertices.add(new draw2d.geo.Point(lastVertex.x, portPos.y));
                                    this.vertices.add(portPos);
                                }
                                // beforeVertex  lastVertex
                                // o------------>o.........
                                //                         .
                                //       +----------+      .
                                //       |          |      .
                                //       |  portPos O.......
                                //       |          |      .
                                //       +----------+      .
                                //                         .
                                //  o----------->o..........
                                // beforeVertex  lastVertex
                                //
                                else{
                                    lastVertex.x =  portPos.x+MINDIST;
                                    this.vertices.add(new draw2d.geo.Point(lastVertex.x, portPos.y));
                                    this.vertices.add(portPos);
                                }
                                break;
                            case DOWN:
                                //    ----------------o beforeVertex
                                //                    |
                                //                    |
                                //                    o lastVertex
                                //                    .
                                //  +----------+      .
                                //  |          |      .
                                //  |  portPos O.......
                                //  |          |      .
                                //  +----------+      .
                                //                    .
                                //      --------------o beforeVertex
                                //                    |
                                //                    |
                                //                    o lastVertex
                                //
                                if(lastVertex.x > (portPos.x+MINDIST)){
                                    lastVertex.y = portPos.y;
                                    this.vertices.add(portPos);
                                }
                                //    -----o beforeVertex
                                //         |
                                //         | lastVertex
                                //         o...........
                                //                    .
                                //  +----------+      .
                                //  |          |      .
                                //  |  portPos O.......
                                //  |          |      .
                                //  +----------+      .
                                //                    .
                                // ----o beforeVertex .
                                //     |              .
                                //     | lastVertex   .
                                //     o...............
                                //
                                else{
                                    this.vertices.add(new draw2d.geo.Point(portPos.x+MINDIST, lastVertex.y));
                                    this.vertices.add(new draw2d.geo.Point(portPos.x+MINDIST, portPos.y));
                                    this.vertices.add(portPos);
                                }
                                break;
                            case LEFT:
                                //                lastVertex      beforeVertex
                                //               o<--------------o
                                //               .
                                //  +----------+ .
                                //  |          | .
                                //  |  portPos O..
                                //  |          | .
                                //  +----------+ .
                                //               .
                                //               o<--------------o
                                //                lastVertex      beforeVertex
                                //
                                if(lastVertex.x > (portPos.x+MINDIST)){
                                    this.vertices.add(new draw2d.geo.Point(lastVertex.x, portPos.y));
                                    this.vertices.add(portPos);
                                }
                                // lastVertex                beforeVertex
                                // o<-----------------------o
                                //                      .
                                //       +----------+   .
                                //       |          |   .
                                //       |  portPos O....
                                //       |          |   .
                                //       +----------+   .
                                //                      .
                                //  o<----------------------o
                                //  lastVertex               beforeVertex
                                //
                                else{
                                    lastVertex.x =  portPos.x+MINDIST;
                                    this.vertices.add(new draw2d.geo.Point(lastVertex.x, portPos.y));
                                    this.vertices.add(portPos);
                                }
                                break;
                        }
                        break;
                    case DOWN:
                        switch(lastSegmentDir){
                            case UP:
                                //       o                  o lastVertex
                                //       |                  |
                                //       |                  |
                                //       |    +---------+   |
                                // ------o    |         |   o------------
                                //       .    | portPos |   . beforeVertex
                                //       .    +----O----+   .
                                //       .         .        .
                                //       ....................
                                //
                                if(lastVertex.y<(portPos.y+MINDIST)) {
                                    lastVertex.y = portPos.y+MINDIST;
                                    this.vertices.add(new draw2d.geo.Point(portPos.x, lastVertex.y));
                                    this.vertices.add(portPos);
                                }
                                //            +---------+
                                //            |         |
                                //            | portPos |
                                //            +----O----+
                                //                 .
                                //        o.................o lastVertex
                                //        |                 |
                                //        |                 |
                                // -------o                 o------------
                                //                            beforeVertex
                                //
                                else{
                                    lastVertex.x   = portPos.x;
                                    lastVertex.y   = portPos.y;
                                    beforeVertex.x = portPos.x;
                                }
                                break;
                            case RIGHT:
                                //                 +---------+
                                //                 |         |
                                //                 | portPos |
                                //  o------->o     +----O----+    o--------------->O
                                //  |        .          .         | beforeVertex   . lastVertex
                                //  |        .....................|.................
                                //  |
                                //
                                //
                                if(lastVertex.y<(portPos.y+MINDIST)){
                                    this.vertices.add(new draw2d.geo.Point(lastVertex.x, portPos.y+MINDIST));
                                    this.vertices.add(new draw2d.geo.Point(portPos.x, portPos.y+MINDIST));
                                    this.vertices.add(portPos);
                                }
                                //                  +---------+
                                //                  |         |
                                //                  | portPos |
                                //                  +----O----+
                                //                       .
                                //             ...................................
                                //             .                    beforeVertex . lastVertex
                                // o---------->o                  o------------->O
                                // |                              |
                                // |                              |
                                //
                                else{
                                    lastVertex.x = portPos.x;
                                    this.vertices.add(portPos);
                                }
                                break;
                            case DOWN:
                                //                           beforeVertex
                                // ------o                  o------------
                                //       |                  |
                                //       |                  |
                                //       V    +---------+   V
                                //       o    |         |   o lastVertex
                                //       .    | portPos |   .
                                //       .    +----O----+   .
                                //       .         .        .
                                //       ....................
                                //
                                if(lastVertex.y<(portPos.y+MINDIST)) {
                                    lastVertex.y = portPos.y+MINDIST;
                                    this.vertices.add(new draw2d.geo.Point(portPos.x,lastVertex.y ));
                                    this.vertices.add(portPos);
                                }
                                //
                                //            +---------+     beforeVertex
                                // -------o   | portPos |   o------------
                                //        |   |         |   |
                                //        V   +----O----+   V
                                //        o        .        o
                                //        ..................  lastVertex
                                //
                                else{
                                    this.vertices.add(new draw2d.geo.Point(portPos.x,lastVertex.y ));
                                    this.vertices.add(portPos);
                                }
                                break;
                            case LEFT:
                                //
                                // o<--------o    +---------+   o<-------------O beforeVertex
                                // .         |    |         |   . lastVertex   |
                                // .         |    | portPos |   .              |
                                // .              +----O----+   .
                                // .                   .        .
                                // ..............................
                                //
                                if(lastVertex.y<(portPos.y-MINDIST)){
                                    beforeVertex.y = portPos.y-MINDIST;
                                    lastVertex.x = portPos.x;
                                    lastVertex.y = beforeVertex.y;
                                    this.vertices.add(portPos);
                                }
                                //
                                //                +---------+
                                //           |    |         |               |
                                //           |    | portPos |               |
                                //           |    +----O----+               |
                                //           |         .                    |
                                // o<--------o...................o<---------o
                                //
                                else{
                                    lastVertex.x = portPos.x;
                                    this.vertices.add(portPos);
                                }
                                break;
                        }
                        break;
                    case LEFT:
                        switch(lastSegmentDir){
                            case UP:
                                //    ................o lastVertex
                                //    .               |
                                //    .               |
                                //  --.---------------o beforeVertex
                                //    .
                                //    .   +----------+
                                //    .   |          |
                                //    ....o  portPos |
                                //    .   |          |
                                //    .   +----------+
                                //    .
                                //    ................o lastVertex
                                //                    |
                                //                    |
                                //   -----------------o beforeVertex
                                //
                                if(lastVertex.x >= (portPos.x-MINDIST)){
                                    this.vertices.add(new draw2d.geo.Point(portPos.x-MINDIST, lastVertex.y));
                                    this.vertices.add(new draw2d.geo.Point(portPos.x-MINDIST, portPos.y));
                                    this.vertices.add(portPos);
                                }
                               //
                                //            +----------+
                                //            |          |
                                //      ......o  portPos |
                                //      .     |          |
                                //      .     +----------+
                                //      o
                                //      | lastVertex
                                //      |
                                //------o
                                //        beforeVertex
                                //
                                //
                                else if(lastVertex.y > portPos.y && lastVertex.x < (portPos.x-MINDIST)){
                                    lastVertex.y = portPos.y;
                                    this.vertices.add(portPos);
                                }
                                //          lastVertex
                                //      o..
                                //      | .
                                //      | .
                                //  ----o .   beforeVertex
                                //        .
                                //        .   +----------+
                                //        .   |          |
                                //        ....o  portPos |
                                //            |          |
                                //            +----------+
                                //
                                else{
                                    this.vertices.add(new draw2d.geo.Point(portPos.x-MINDIST, lastVertex.y));
                                    this.vertices.add(new draw2d.geo.Point(portPos.x-MINDIST, portPos.y));
                                    this.vertices.add(portPos);
                                }
                                break;
                            case RIGHT:
                                //    beforeVertex     lastVertex
                                //    o-------------->o
                                //                    .
                                // ....................
                                // .
                                // .      +----------+
                                // .      |          |
                                // .......o  portPos |
                                //        |          |
                                //        +----------+
                                //
                                if(lastVertex.y<portPos.y && lastVertex.x > (portPos.x-MINDIST)){
                                    var center = portPos.y-(portPos.y-lastVertex.y)/2;
                                    this.vertices.add(new draw2d.geo.Point(lastVertex.x, center));
                                    this.vertices.add(new draw2d.geo.Point(portPos.x-MINDIST, center));
                                    this.vertices.add(new draw2d.geo.Point(portPos.x-MINDIST, portPos.y));
                                    this.vertices.add(portPos);
                                }
                                //        +----------+
                                //        |          |
                                // .......o  portPos |
                                // .      |          |
                                // .      +----------+
                                // .
                                // ....................
                                //                    .
                                //    o-------------->o
                                //    beforeVertex     lastVertex
                                //
                                else if(lastVertex.y>portPos.y && lastVertex.x > (portPos.x-MINDIST)){
                                    var center = portPos.y+(lastVertex.y-portPos.y)/2;
                                    this.vertices.add(new draw2d.geo.Point(lastVertex.x, center));
                                    this.vertices.add(new draw2d.geo.Point(portPos.x-MINDIST, center));
                                    this.vertices.add(new draw2d.geo.Point(portPos.x-MINDIST, portPos.y));
                                    this.vertices.add(portPos);
                                }
                                // beforeVertex  lastVertex
                                // o------------>o
                                //               .
                                //               .   +----------+
                                //               .   |          |
                                //               ....o  portPos |
                                //               .   |          |
                                //               .   +----------+
                                //               .
                                //  o----------->o
                                // beforeVertex  lastVertex
                                //
                                else{
                                    this.vertices.add(new draw2d.geo.Point(lastVertex.x, portPos.y));
                                    this.vertices.add(portPos);
                                }
                                break;
                            case DOWN:
                                //         -----------o beforeVertex
                                //                    |
                                //                    |
                                //                    V
                                //    ................o lastVertex
                                //    .
                                //    .       +----------+
                                //    .       |          |
                                //    ........o portPos  |
                                //    .       |          |
                                //    .       +----------+
                                //    .
                                //    .        --------o beforeVertex
                                //    .                |
                                //    .                |
                                //    .                V
                                //    .................o lastVertex
                                //
                                if(lastVertex.x >= (portPos.x-MINDIST)){
                                    this.vertices.add(new draw2d.geo.Point(portPos.x-MINDIST, lastVertex.y));
                                    this.vertices.add(new draw2d.geo.Point(portPos.x-MINDIST, portPos.y));
                                    this.vertices.add(portPos);
                                }
                                //    -----o beforeVertex
                                //         |
                                //         |
                                //         o lastVertex
                                //         .
                                //         .       +----------+
                                //         .       |          |
                                //         ........o portPos  |
                                //             .   |          |
                                //             .   +----------+
                                // beforeVertex.
                                // ------------o
                                //             |
                                //             |
                                // lastVertex  o
                                //
                                else{
                                    lastVertex.y=portPos.y;
                                    this.vertices.add(portPos);
                                }
                                break;
                            case LEFT:
                                //   lastVertex      beforeVertex
                                //    o<--------------o
                                //    .
                                //    .       +----------+
                                //    .       |          |
                                //    ....... o portPos  |
                                //    .       |          |
                                //    .       +----------+
                                //    .
                                //    o<--------------o
                                //    lastVertex      beforeVertex
                                //
                                if(lastVertex.x < (portPos.x-MINDIST)){
                                    this.vertices.add(new draw2d.geo.Point(lastVertex.x, portPos.y));
                                    this.vertices.add(portPos);
                                }
                                //         lastVertex                beforeVertex
                                //  .......o<-----------------------o
                                //  .
                                //  .    +----------+
                                //  .    |          |
                                //  .....o portPos  |
                                //  .    |          |
                                //  .    +----------+
                                //  .
                                //  ........o<----------------------o
                                //         lastVertex               beforeVertex
                                //
                                else{
                                    lastVertex.x =  portPos.x-MINDIST;
                                    this.vertices.add(new draw2d.geo.Point(lastVertex.x, portPos.y));
                                    this.vertices.add(portPos);
                                }
                            break;
                        }
                    break;
                }

                if(this.vertices.getSize()>3) {
                    connection._routingMetaData.routedByUserInteraction = true;
                    connection.setVertices(this.vertices);
                }
                this.vertices.clear();
            }
        }

    }
});

tot.View = draw2d.Canvas.extend({

	/**
	 * @constructor
	 */
	init: function(app, id, limits) {
        console.log("init Here!")
	    var _this = this;        
		this._super(id);
        this.app = app;

        //by zfw: disabling dropping things under palette
        if(typeof this.html.droppable !=="undefined"){
            this.html.droppable({
                accept: '.draw2d_droppable',
                over: function(event, ui) {
                    _this.onDragEnter(ui.draggable);
                },
                out: function(event, ui) {
                    _this.onDragLeave(ui.draggable);
                },
                drop: function(event, ui){
                    event = _this._getEvent(event);
                    if (event.clientX < 300){
                        return;
                    }
                    var pos = _this.fromDocumentToCanvasCoordinate(event.clientX, event.clientY);
                    _this.onDrop(ui.draggable, pos.getX(), pos.getY(), event.shiftKey, event.ctrlKey);
                }
            });
        }

        /*
        console.log(_this.app.sessionStorage.length);
        //_this.app.sessionStorage.getItem(_this.app.pid+"canvas");
        
        if(_this.app.sessionStorage.length > 0)
        {
            this.clear();
            var reader = new draw2d.io.json.Reader();
            var jsonDocument = _this.app.sessionStorage.getItem(_this.app.pid+"canvas");           
            reader.unmarshal(this, jsonDocument);
            this.centerDocument();
        }
        */

        //edited by zfw: to store names used by inputs and outputs 
        this.usedInOutNameSet = {};

        //edited by zfw: to store number of inputs and outputs in history
        this.historyNumOfInput = 0;
        this.historyNumOfOutput = 0;

        var stringForReg = "^[A-Za-z][A-Za-z0-9_]+$";
        var stringForWrongReg = "__|_$";
        var reservedWordReg = "("
                            +"^abs$"+"|^case$"+"|^generate$"+"|^map$"+"|^package$"+"|^select$"
                            +"|^unaffected$"+"|^access$"+"|^component$"+"|^generic$"
                            +"|^mod$"+"|^port$"+"|^severity$"+"|^units$"+"|^after$"
                            +"|^configuration$"+"|^group$"+"|^postponed$"+"|^signal$"
                            +"|^until$"+"|^alias$"+"|^constant$"+"|^guarded$"+"|^nand$"+"|^procedure$"
                            +"|^shared$"+"|^use$"+"|^all$"+"|^new$"+"|^process$"
                            +"|^sla$"+"|^and$"+"|^disconnect$"+"|^if$"+"|^next$"
                            +"|^pure$"+"|^sll$"+"|^variable$"+"|^architecture$"+"|^downto$"
                            +"|^impure$"+"|^nor$"+"|^sra$"+"|^array$"+"|^in$"+"|^not$"
                            +"|^range$"+"|^srl$"+"|^wait$"+"|^assert$"+"|^else$"+"|^inertial$"+"|^null$"
                            +"|^record$"+"|^subtype$"+"|^when$"+"|^attribute$"+"|^elsif$"+"|^inout$"
                            +"|^register$"+"|^while$"+"|^end$"+"|^is$"+"|^of$"
                            +"|^reject$"+"|^then$"+"|^with$"+"|^begin$"+"|^entity$"+"|^on$"
                            +"|^rem$"+"|^to$"+"|^block$"+"|^exit$"+"|^label$"+"|^open$"+"|^report$"
                            +"|^transport$"+"|^xnor$"+"|^body$"+"|^library$"+"|^or$"+"|^return$"
                            +"|^type$"+"|^xor$"+"|^buffer$"+"|^file$"+"|^linkage$"
                            +"|^others$"+"|^rol$"+"|^bus$"+"|^for$"+"|^literal$"+"|^out$"+"|^ror$"
                            +"|^function$"+"|^loop$"
                            +")";
        this.patternForLabels = new RegExp(stringForReg);
        this.patternForWrongLabels = new RegExp(stringForWrongReg);
        this.patternForReservedWords = new RegExp(reservedWordReg);

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

        var router = new draw2d.layout.connection.InteractiveManhattanConnectionRouter();
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
                    new OrthogonalConnectionCreatePolicy({
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

        //by zfw:start edit mode
        this.installEditPolicy(new EditEditPolicy());

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
            console.log("SaveAs");
            _this.canvasSaveAs(_this);
        });

        $('.toolbar').delegate("#fileSave:not(.disabled)", "click", function() {
            console.log("Save");
            _this.canvasSave(_this);
        });

        $('.toolbar').delegate("#submitGraph:not(.disabled)", "click", function() {
            console.log("Save");
            _this.canvasSubmit(_this);
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

                if ((figure.userData !== null) && (figure.userData.typeForLabel == "labelInOut")){
                    alert("无法删除输入与输出的标签");
                    return;
                }

                if ((figure.userData !== null) && (figure.userData.tagForWave !== undefined)){
                    delete(_this.usedInOutNameSet[figure.userData.tagForWave]);
                }
                
                var cmd = figure.createCommand(new draw2d.command.CommandType(draw2d.command.CommandType.DELETE));
                if(cmd!==null){
                    _this.getCommandStack().execute(cmd);
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
            console.log(figure);

            // a connectionprovides its own context menu
            //
            if(figure instanceof draw2d.Connection){
                return;
            }
            if(figure instanceof ProbeFigure){
                return;
            }

            if ((figure !== null) && (figure.userData !== null) && (figure.userData.typeForLabel == "labelInOut")){
                return;
            }

            if(figure!==null) {
                var x = event.x;
                var y = event.y;
                
                if (figure.userData == null){
                    var items = {
                        "label":   {name: "Add Label"        , icon :"x ion-ios-pricetag-outline"     },
                        "delete":  {name: "Delete"           , icon :"x ion-ios-close-outline"        },
                    };
                } else if ((figure.userData.typeForLabel == "out") || (figure.userData.typeForLabel == "in") || (figure.userData.typeForLabel == "label")){
                    var items = {
                        "delete":  {name: "Delete"           , icon :"x ion-ios-close-outline"        },
                    };
                } else {
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
                                    var label = new draw2d.shape.basic.Label({text:text, stroke:0, x:-10, y:-20});
                                    var locator = new draw2d.layout.locator.SmartDraggableLocator();
                                    label.installEditor(new draw2d.ui.LabelInplaceEditor());
                                    label.userData = {};
                                    label.userData.typeForLabel = "label";
                                    figure.add(label,locator);
                                }
                                break;
                            case "delete":
                                if ((figure.userData !== null) && (figure.userData.tagForWave !== undefined)){
                                    delete(_this.usedInOutNameSet[figure.userData.tagForWave]);
                                }
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
        var _this = this;
        var type = $(droppedDomNode).data("shape");
        var isAllowed = this.checkLimit(type); 
        if (isAllowed) {
            var figure = eval("new "+type+"();");
            figure.type = type;
            console.log(x + " ," + y);

            //edited by zfw: set properties of inputs
            if ((type == "draw2d_circuit_switch_HighLow") || (type == "draw2d_circuit_switch_PushButton") || (type == "draw2d_circuit_pulse_50hz"))
            {
                var text = "in" + this.historyNumOfInput;
                while (this.usedInOutNameSet[text] == true){
                    this.historyNumOfInput++;
                    text = "in" + this.historyNumOfInput;
                }
                this.historyNumOfInput = this.historyNumOfInput + 1;
                this.usedInOutNameSet[text] = true;
                figure.userData = {};
                figure.userData.typeForLabel = "in";
                figure.userData.tagForWave = text;
                if(text) {
                    var label = new draw2d.shape.basic.Label({text:text, stroke:0, x:-10, y:-20});
                    var locator = new draw2d.layout.locator.SmartDraggableLocator();
                    var listener = {};
                    listener.father = figure;
                    listener.label = label;
                    listener.nameSet = this.usedInOutNameSet;
                    listener.onCommit = function(labelText){
                        delete(this.nameSet[this.father.userData.tagForWave]);
                        this.father.userData.tagForWave = labelText;
                        this.nameSet[labelText] = true;
                        var writer = new draw2d.io.json.Writer();
                        var graph;
                        writer.marshal(_this, function(json){
                            if ((json === "") || (json === undefined) || (json === null)) {
                                graph = {};
                            } else {
                                graph = json;
                            }
                            drawCircuit_simplified(graph);
                        });
                    };
                    var editor = new AnotherLabelInPlaceEditor(listener,_this);
                    label.installEditor(editor);
                    label.userData = {};
                    label.userData.isInOrOutLabel = "in";
                    label.userData.typeForLabel = "labelInOut";
                    figure.add(label,locator);
                    figure.userData.labelId = label.id;
                }
            }

            //edited by zfw: set properties of outputs
            if ((type == "draw2d_circuit_display_Led") || (type == "draw2d_circuit_display_7Segment"))
            {
                var text = "out" + this.historyNumOfOutput;
                while (this.usedInOutNameSet[text] == true){
                    this.historyNumOfOutput++;
                    text = "out" + this.historyNumOfOutput;
                }
                this.historyNumOfOutput = this.historyNumOfOutput + 1;
                this.usedInOutNameSet[text] = true;
                figure.userData = {};
                figure.userData.typeForLabel = "out";
                figure.userData.tagForWave = text;
                if(text) {
                    var label = new draw2d.shape.basic.Label({text:text, stroke:0, x:-10, y:-20});
                    var locator = new draw2d.layout.locator.SmartDraggableLocator();
                    var listener = {};
                    listener.father = figure;
                    listener.label = label;
                    listener.nameSet = this.usedInOutNameSet;
                    listener.onCommit = function(labelText){
                        delete(this.nameSet[this.father.userData.tagForWave]);
                        this.father.userData.tagForWave = labelText;
                        this.nameSet[labelText] = true;
                        var writer = new draw2d.io.json.Writer();
                        var graph;
                        writer.marshal(_this, function(json){
                            if ((json === "") || (json === undefined) || (json === null)) {
                                graph = {};
                            } else {
                                graph = json;
                            }
                            drawCircuit_simplified(graph);
                        });
                    };
                    var editor = new AnotherLabelInPlaceEditor(listener,_this);

                    label.installEditor(editor);
                    label.userData = {};
                    label.userData.isInOrOutLabel = "out";
                    label.userData.typeForLabel = "labelInOut";
                    figure.add(label,locator);
                    figure.userData.labelId = label.id;
                }
            }

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
        var oldZoom = this.getZoom();
        console.log("oldZoom:"+oldZoom);

        if(this.simulate===true){
            return; // silently
        }
        
        //to solve connection error
        var reader = new draw2d.io.json.Reader();
        var writer = new draw2d.io.json.Writer();
        var _this = this;

        writer.marshal(_this, function(json){
            var jsonDocument = json; 
            _this.clear();   
            reader.unmarshal(_this, jsonDocument);
            console.log("document:");
            console.log(jsonDocument);
            for (let ind in jsonDocument){
                if (jsonDocument[ind].userData.tagForWave == undefined){
                    continue;
                }

                if (jsonDocument[ind].userData.tagForWave !== undefined){
                    _this.usedInOutNameSet[jsonDocument[ind].userData.tagForWave] = true;
                }
    
                if ((jsonDocument[ind].userData.typeForLabel == "in") || (jsonDocument[ind].userData.typeForLabel == "out")){
                    var figure = _this.getFigure(jsonDocument[ind].id);
                    var label = figure.children.data[0].figure;
                    //var label = _this.getFigure(figure.userData.labelId);
                    var listener = {};
                    listener.father = figure;
                    listener.label = label;
                    listener.nameSet = _this.usedInOutNameSet;
                    listener.onCommit = function(labelText){
                            delete(this.nameSet[this.father.userData.tagForWave]);
                            this.father.userData.tagForWave = labelText;
                            this.nameSet[labelText] = true;
                            var writer = new draw2d.io.json.Writer();
                            var graph;
                            writer.marshal(_this, function(json){
                                if ((json === "") || (json === undefined) || (json === null)) {
                                    graph = {};
                                } else {
                                    // graph = portMap(connection_Correct(json));
                                    graph = json;
                                }
                                drawCircuit_simplified(graph);
                            });
                    };
                    var editor = new AnotherLabelInPlaceEditor(listener,_this);
            
                    label.installEditor(editor);
                }
            }
            //_this.centerDocument();
        });

        this.setZoom(1);

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

        this.setZoom(oldZoom);
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
            //console.log(figure.cssClass);
            //console.log(figure.calculate);
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

        if (event.getDetails() == draw2d.command.CommandStack.POST_EXECUTE){
            var command = event.getCommand();
            if (command.commands !== undefined){
                event.getStack().undostack.pop();
                command.undo();
            }

            //by zfw: silently disable deleting labels of inout
            if ((command.figure !== undefined) && 
                (command.figure.userData !== null) &&
                (command.figure.userData.typeForLabel == "labelInOut") &&
                (command.label == "Delete Shape")){
                event.getStack().undostack.pop();
                command.undo();
            } else if (command.figure !== undefined){

                //by zfw: update remain numbers
                if (command.label == "Add Shape"){
                    this.updateRemain(command.figure.cssClass,-1);
                } else if (command.label == "Delete Shape"){
                    this.updateRemain(command.figure.cssClass,1);
                }

                //by zfw: change wave editor
                if ((command.figure.userData !== null) &&
                (command.figure.userData.typeForLabel == "in") &&
                (command.figure.userData.tagForWave !== undefined)){
                    var writer = new draw2d.io.json.Writer();
                    var graph;
                    writer.marshal(this, function(json){
                        if ((json === "") || (json === undefined) || (json === null)) {
                            graph = {};
                        } else {
                            // graph = portMap(connection_Correct(json));
                            graph = json;
                        }
                        drawCircuit_simplified(graph);
                    });
                }
            }
        }

        if (event.getDetails() == draw2d.command.CommandStack.POST_UNDO){
            var command = event.getCommand();
            
            if (command.figure !== undefined){
                if ((command.figure.cssClass !== "draw2d_shape_basic_Label") && (command.figure.cssClass !== "Connection")){
                    if (command.label == "Add Shape"){
                        this.updateRemain(command.figure.cssClass,1);
                        if ((command.figure.userData !== null) && (command.figure.userData.tagForWave !== undefined)){
                            delete(this.usedInOutNameSet[command.figure.userData.tagForWave]);
                        }
                    } else if (command.label == "Delete Shape"){
                        this.updateRemain(command.figure.cssClass,-1);
                        if ((command.figure.userData !== null) && (command.figure.userData.tagForWave !== undefined)){
                            this.usedInOutNameSet[command.figure.userData.tagForWave] = true;    
                        }
                    }
                } else if ((command.label == "Change Attributes") 
                            && (command.figure.userData !== null) 
                            && (command.figure.userData.typeForLabel == "labelInOut")){
                    var tmp = command.figure.editor.listener.father.userData;
                    if (tmp !== null){
                        delete(this.usedInOutNameSet[tmp.tagForWave]);
                        this.usedInOutNameSet[command.figure.text] = true;
                        tmp.tagForWave = command.figure.text;
                    }
                }
            }

            var writer = new draw2d.io.json.Writer();
            var graph;
            writer.marshal(this, function(json){
                if ((json === "") || (json === undefined) || (json === null)) {
                    graph = {};
                } else {
                    // graph = portMap(connection_Correct(json));
                    graph = json;
                }
                drawCircuit_simplified(graph);
            });
        }

        if (event.getDetails() == draw2d.command.CommandStack.POST_REDO){
            var command = event.getCommand();
            
            if (command.figure !== undefined){
                if ((command.figure.cssClass !== "draw2d_shape_basic_Label") && (command.figure.cssClass !== "Connection")){
                    if (command.label == "Add Shape"){
                        this.updateRemain(command.figure.cssClass,-1);
                        if ((command.figure.userData !== null) && (command.figure.userData.tagForWave !== undefined)){
                            this.usedInOutNameSet[command.figure.userData.tagForWave] = true;
                        }
                    } else if (command.label == "Delete Shape"){
                        this.updateRemain(command.figure.cssClass,1);
                        if ((command.figure.userData !== null) && (command.figure.userData.tagForWave !== undefined)){
                            delete(this.usedInOutNameSet[command.figure.userData.tagForWave]);
                        }
                    }
                } else if ((command.label == "Change Attributes") 
                        && (command.figure.userData !== null) 
                        && (command.figure.userData.typeForLabel == "labelInOut")){
                    var tmp = command.figure.editor.listener.father.userData;
                    if (tmp !== null){
                        delete(this.usedInOutNameSet[tmp.tagForWave]);
                        this.usedInOutNameSet[command.figure.text] = true;
                        tmp.tagForWave = command.figure.text;
                    }
                }
            }

            var writer = new draw2d.io.json.Writer();
            var graph;
            writer.marshal(this, function(json){
                if ((json === "") || (json === undefined) || (json === null)) {
                    graph = {};
                } else {
                    // graph = portMap(connection_Correct(json));
                    graph = json;
                }
                drawCircuit_simplified(graph);
            });
        }

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

        for (let ind in jsonDocument){
            if (jsonDocument[ind].userData.tagForWave == undefined){
                continue;
            }

            if (jsonDocument[ind].userData.tagForWave !== undefined){
                this.usedInOutNameSet[jsonDocument[ind].userData.tagForWave] = true;
            }

            if ((jsonDocument[ind].userData.typeForLabel == "in") || (jsonDocument[ind].userData.typeForLabel == "out")){
                var figure = _this.getFigure(jsonDocument[ind].id);
                var label = figure.children.data[0].figure;
                //var label = _this.getFigure(figure.userData.labelId);
                var listener = {};
                listener.father = figure;
                listener.label = label;
                listener.nameSet = _this.usedInOutNameSet;
                listener.onCommit = function(labelText){
                        delete(this.nameSet[this.father.userData.tagForWave]);
                        this.father.userData.tagForWave = labelText;
                        this.nameSet[labelText] = true;
                        var writer = new draw2d.io.json.Writer();
                        var graph;
                        writer.marshal(_this, function(json){
                            if ((json === "") || (json === undefined) || (json === null)) {
                                graph = {};
                            } else {
                                // graph = portMap(connection_Correct(json));
                                graph = json;
                            }
                            drawCircuit_simplified(graph);
                        });
                };
                var editor = new AnotherLabelInPlaceEditor(listener,_this);
        
                label.installEditor(editor);
            }
        }

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
            console.log(_this.app.currentFileHandle.title);
            //  var blob = new Blob([content], {type:"text/plain;charset=utf-8"});
            //  saveAs(blob, "design.circuit");
            _this.fileStorage.saveFile(_this.app.currentFileHandle.title, content, "false", function(title) {
                // alert(title.fileName + " saved succesfully.");
            });
            _this.canvasSave(_this);
        });
    },

    canvasSubmit:function(canvas){
        var writer = new draw2d.io.json.Writer();
        var _this = this;
        writer.marshal(canvas, function(json){
            var content = JSON.stringify(json,null,2);
            //json_correct = connection_Correct(json);
            // circuit = portMap(json_correct);
            circuit = json;
            
            $.ajax({
                type: "post",
                url: "/file/uploadGraph",
                data: {
                    OD_link: JSON.stringify(json),
                    link: JSON.stringify(circuit),
                    projectType:"Project"
                },
    
                dataType: 'json',
                success: function () {
                    alert("success");
                },
    
                error: function (json) {
                    if (json.responseText == undefined){
                        alert("error");
                    } else {
                        alert(json.responseText);
                    }
                }
            });
            //_this.fileStorage.saveFile("circuit", JSON.stringify(circuit,null,2), "false", function() {});
            
        });
    },

    canvasSave:function (canvas) { 
        var writer = new draw2d.io.json.Writer();
        var _this = this;
        writer.marshal(canvas, function (json) {  
            var content = JSON.stringify(json, null, 2);
            console.log(content);
            console.log(_this.app.pid);
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

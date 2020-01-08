/**
 * Created by Chen Yazheng on 16/10/20
 */
// ToDo: control #navigation with this Class
tot.Palette = Class.extend({
	/**
	 * @constructor 
	 * 
	 * @param {String} canvasId the id of the DOM element to use as paint container
	 */
	init: function(id, app, limits)
	{
		var _this = this;
        this.limits = limits;
        for (i in limits) {
            $("span.badge#" + i).html(limits[i].limit);
        }

        $('#filter').on('keyup change', function (event) {
            if(event.keyCode===27){
                $('#filter').val("");
            }
            var val = this.value.toLowerCase();
        });

        // Create the jQuery-Draggable for the palette -> canvas drag&drop interaction
        //
        $(".draw2d_droppable").draggable({
            appendTo:"body",
            helper:"clone",
            drag: function(event, ui){
                event = app.view._getEvent(event);
                var pos = app.view.fromDocumentToCanvasCoordinate(event.clientX, event.clientY);
                app.view.onDrag(ui.draggable, pos.getX(), pos.getY(), event.shiftKey, event.ctrlKey);
            },
            stop: function(e, ui){
                console.log("Drag from palette stopped.");
            },
            start: function(e, ui){
                console.log(ui);
                $(ui.helper).addClass("shadow");
            }
        });

        $('.draw2d_droppable')
            .on('mouseover', function(){
                $(this).parent().addClass('glowBorder');
            })
            .on('mouseout', function(){
            $(this).parent().removeClass('glowBorder');
        });
	}
});

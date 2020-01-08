/**
 * Created by Chen Yazheng on 16/10/20
 */

// declare the namespace for this prj7
var tot = {}; // Team of Taoli

/**
 * The GraphicalEditor is responsible for layout and dialog handling.
 * @extends draw2d.ui.parts.GraphicalEditor
 */

var defaultRouterClassName = "draw2d.layout.connection.ManhattanConnectionRouter";
var defaultRouter = new draw2d.layout.connection.ManhattanConnectionRouter();

tot.Application = Class.extend({
	NAME: "tot.Application",

	/**
	 * @constructor
	 *
	 * @param {String} canvasId the is of the DOM element to use as paint container
	 */
	init: function(pid, limits) {
        var _this = this;
        this.pid = pid;
        this.sessionStorage = [];
        this.loggedIn = true;

        this.currentFileHandle= {
            title: "Untitled"+conf.fileSuffix // conf is in draw2d/settings/backend.js
        };

        try {
            if( 'sessionStorage' in window && window.sessionStorage !== null){
                this.sessionStorage = sessionStorage;
            }
        } catch (e) {

        }

        this.view    = new tot.View(this, "draw2dCanvas", limits);
		this.toolbar = new tot.Toolbar("toolbar", this, this.view);
		this.palette = new tot.Palette("navigation", this, limits);
	},

    /**
	 * Load the JSON data into the view/canvas
	 */
	load: function(jsonDocument){
	    this.view.clear();

	    // unmarshal the JSON document into the canvas
	    // (load)
	    var reader = new draw2d.io.json.Reader();
	    reader.unmarshal(this.view, jsonDocument);
	},

	/**
	 * Output json data of the canvas
	 */
	dump:function()
    {
        var writer = new draw2d.io.json.Writer();
        writer.marshal(this.view, function (json) {
            console.log(JSON.stringify(json, undefined,2));
        });
    },

    /**
     * 
     * Set default router for the connections
     * @param {any} defaultRouterClassName
     */
    setDefaultRouterClassName: function(defaultRouterClassName){
	    defaultRouterClassName=  defaultRouterClassName;
        defaultRouter = eval("new "+defaultRouterClassName+"()");
	},

	/**
	 * create a new connection with a default router
	 * 
	 * @returns a new connection
	 */
	createConnection: function(){
	    var conn = new draw2d.Connection();
	    conn.setRouter(defaultRouter);
	    conn.setOutlineStroke(1);
	    conn.setOutlineColor("#303030");
	    conn.setStroke(3);
	    conn.setRadius(5);
	    conn.setColor('#00A8F0');
	    return conn;
	}

});

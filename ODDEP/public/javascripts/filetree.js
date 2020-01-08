var treedata = [
    {
        "text": 'Root',
        "icon": "glyphicon glyphicon-folder-close",
        "children": [
            {
                "text": "main.vhd",
                "state": {"selected": true},
                "icon": "glyphicon glyphicon-flash"
            },
            {
                "text": "components",
                "state": {"opened": true},
                "children": [
                    {
                        "text": "nand.vhd",
                        "icon": "glyphicon glyphicon-file"
                    }
                ]
            }
        ]
    }
];

$(function() {
    // data format demo
	$('#filetree').jstree({
		'core' : {
			'data' : [
				{
					"text" : "Root node",
					"state" : { "opened" : true },
					"children" : [
						{
							"text" : "Child node 1",
							"state" : { "selected" : true },
							"icon" : "jstree-file"
						},
						{ "text" : "Child node 2", "state" : { "disabled" : true } }
					]
				}
			]
		}
	});
    // $('#filetree').jstree({
    //     'core': {
    //         'data': treedata
    //     },
    //     "types" : {
    //         "#" : {
    //         "max_children" : 1,
    //         "max_depth" : 4,
    //         "valid_children" : ["root"]
    //         },
    //         "root" : {
    //         "icon" : "glyphicon glyphicon-folder-close",
    //         "valid_children" : ["default"]
    //         },
    //         "default" : {
    //         "valid_children" : ["default","file"]
    //         },
    //         "file" : {
    //         "icon" : "glyphicon glyphicon-file",
    //         "valid_children" : []
    //         }
    //     },
    //     "plugins" : [ "wholerow", "checkbox", "contextmenu" ]
    // });

    $('#filetree').on("changed.jstree", function(e, data) {
        console.log(data.selected);
    });
    // interact with the tree
    // $('button').on('click', function () {
    //   $('#jstree').jstree(true).select_node('child_node_1');
    //   $('#jstree').jstree('select_node', 'child_node_1');
    //   $.jstree.reference('#jstree').select_node('child_node_1');
    // });

    $.jstree.defaults.core.themes.variant = "large";
});
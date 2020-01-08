/**
 * Created by Chen Yazheng on 16/10/20.
 */

// ToDo: 发现采用 Interactive Manhattan Router 可以实现电线的修改。继承之后实现非交叉导线的Bridge功能应该可以满足电路连线要求。
tot.Toolbar = Class.extend({
    init: function (elementId, app, view) {
        this.view = view;
    }
});

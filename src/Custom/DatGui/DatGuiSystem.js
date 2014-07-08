var DatGuiSystem = cx.VoidSystem.extend({
    tag : 'cx.DatGuiSystem',
    gui : null,
    groups : [],

    init : function(){
        this._super();
        this.gui = new dat.GUI();
    },

    add : function(obj, prop) {
    	this.gui.add(obj, prop).listen();
    },

    addToGroup : function (groupName, obj, prop, min, max) {
        var group = null;
        if ( (group = this.groups[groupName]) == null ){
            group = this.gui.addFolder(groupName);
            this.groups[groupName] = group;

        }
        if ( min != null && max != null){
            group.add(obj, prop, min, max).listen();
        } else {
            group.add(obj, prop).listen();
        }
        return group;
    },

    update : function () {

    }
});

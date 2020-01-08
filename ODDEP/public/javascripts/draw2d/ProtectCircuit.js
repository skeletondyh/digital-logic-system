var defaultCircuit = null;

window.onbeforeunload = function() {
    defaultCircuit = null;
    return "Your unsaved work might lose. Confirm to leave?";
};


window.onload = function() {
    if (this.sessionStorage !== null) {
        var content = this.sessionStorage.getItem(pid + "canvas");
        if (content !== null) {
            defaultCircuit = content;
        }
    }
};
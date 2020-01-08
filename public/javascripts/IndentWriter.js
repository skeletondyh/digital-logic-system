var IndentWriter = {
    createNew: function(name, indentStr) {
        var writer = {
            "name": name || "iw",
            "buffer": "",
            "indentStr": indentStr || "    ",
            "indent": ""
        };
        writer.write = function(data) { writer.buffer += writer.indent + data; }
        writer.writeLine = function(line) { line = line || ""; writer.buffer += writer.indent + line + "\n"; }
        writer.getContent = function () { return writer.buffer; }
        writer.flush = function () { writer.buffer = ""; }
        writer.incIndent = function() {
            writer.indent += writer.indentStr;
        }
        writer.decIndent = function() {
            if (writer.indent.length - writer.indentStr.length < 0) {
                writer.indent = "";
            } else {
                writer.indent = writer.indent.substr(0, writer.indent.length - writer.indentStr.length);
            }
        }
        return writer;
    }
};
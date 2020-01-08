/**
 * Created by zfw on 10/25/17.
 */

function Chip74LS27(id, name) {
    this.id = id;
    this.pinType = {//input: 1, output: 0, gnd: -2, gcc: 2
        p1: 1,
        p2: 1,
        p3: 1,
        p4: 1,
        p5: 1,
        p6: 0,
        p7: -2,
        p8: 0,
        p9: 1,
        p10: 1,
        p11: 1,
        p12: 0,
        p13: 1,
        p14: 2
    };
    this.pinMap = new Map();
    this.name = name;
    this.getPortMapString = function () {
        var mapRes = "";
        mapRes += (this.pinMap.get("1") + ", ");
        mapRes += (this.pinMap.get("2") + ", ");
        mapRes += (this.pinMap.get("3") + ", ");
        mapRes += (this.pinMap.get("4") + ", ");
        mapRes += (this.pinMap.get("5") + ", ");
        mapRes += (this.pinMap.get("9") + ", ");
        mapRes += (this.pinMap.get("10") + ", ");
        mapRes += (this.pinMap.get("11") + ", ");
        mapRes += (this.pinMap.get("13") + ", ");
        mapRes += (this.pinMap.get("6") + ", ");
        mapRes += (this.pinMap.get("8") + ", ");
        mapRes += (this.pinMap.get("12"));
        return this.name + ":Chip74LS27 port map(" + mapRes + ");\n";
    }
}
Chip74LS27.prototype.code ="\nlibrary ieee;\n\
    use ieee.std_logic_1164.all;\n\
    use ieee.std_logic_arith.all;\n\
    use ieee.std_logic_unsigned.all;\n\
\n\
    entity Chip74LS27 is\n\
    port (\n\
        p1, p2, p3, p4, p5, p9, p10, p11, p13: in std_logic;\n\
        p6, p8, p12: out std_logic\n\
    ) ;\n\
    end entity ; -- Chip74LS27\n\
\n\
    architecture arch of Chip74LS27 is\n\
    begin\n\
        p12 <= not (p1 or p2 or p13);\n\
        p8 <= not (p9 or p10 or p11);\n\
        p6 <= not (p3 or p4 or p5);\n\
    end architecture ; -- arch\n";
Chip74LS27.prototype.getComponentString = function () {
    return"\ncomponent Chip74LS27\n\
        port(p1, p2, p3, p4, p5, p9, p10, p11, p13: in std_logic;\n\
            p6, p8, p12: out std_logic);\n\
            end component;\n";
};
module.exports = Chip74LS27;


/**
 * Created by zfw on 10/26/17.
 */

function ChipBCDto7Seg(id, name) {
    this.id = id;
    this.pinType = {//input: 1, output: 0, gnd: -2, gcc: 2
        p1: 1,
        p2: 1,
        p3: 1,
        p4: 1,
        p5: 0,
        p6: 0,
        p7: 0,
        p8: 0,
        p9: 0,
        p10: 0,
        p11: 0
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
        mapRes += (this.pinMap.get("6") + ", ");
        mapRes += (this.pinMap.get("7") + ", ");
        mapRes += (this.pinMap.get("8") + ", ");
        mapRes += (this.pinMap.get("9") + ", ");
        mapRes += (this.pinMap.get("10") + ", ");
        mapRes += (this.pinMap.get("11"));
        return this.name + ":ChipBCDto7Seg port map(" + mapRes + ");\n";
    }
}
ChipBCDto7Seg.prototype.code ="\nlibrary ieee;\n\
    use ieee.std_logic_1164.all;\n\
    use ieee.std_logic_arith.all;\n\
    use ieee.std_logic_unsigned.all;\n\
\n\
    entity ChipBCDto7Seg is\n\
    port (\n\
        p1, p2, p3, p4: in std_logic;\n\
        p5, p6, p7, p8, p9, p10, p11: out std_logic\n\
    ) ;\n\
    end entity ; -- ChipBCDto7Seg\n\
\n\
    architecture arch of ChipBCDto7Seg is\n\
    begin\n\
        process(p1,p2,p3,p4)\n\
            variable sum : integer;\n\
            variable flag : boolean;\n\
        begin\n\
        sum := 0;\n\
            if (p1 = '1') then\n\
                sum := sum + 1;\n\
            end if;\n\
            if (p2 = '1') then\n\
                sum := sum + 2;\n\
            end if;\n\
            if (p3 = '1') then\n\
                sum := sum + 4;\n\
            end if;\n\
            if (p4 = '1') then\n\
                sum := sum + 8;\n\
            end if;\n\
            flag := (sum = 0) or (sum = 2) or (sum = 3) or (sum = 5) or (sum = 6) or (sum = 7) or (sum = 8) or (sum = 9);\n\
            if (flag) then \n\
                p5 <= '1';\n\
            else \n\
                p5 <= '0';\n\
            end if;\n\
            flag := (sum = 0) or (sum = 1) or (sum = 2) or (sum = 3) or (sum = 4) or (sum = 7) or (sum = 8) or (sum = 9);\n\
            if (flag) then \n\
                p6 <= '1';\n\
            else \n\
                p6 <= '0';\n\
            end if;\n\
            flag := (sum = 0) or (sum = 1) or (sum = 3) or (sum = 4) or (sum = 5) or (sum = 6) or (sum = 7) or (sum = 8) or (sum = 9);\n\
            if (flag) then \n\
                p7 <= '1';\n\
            else \n\
                p7 <= '0';\n\
            end if;\n\
            flag := (sum = 0) or (sum = 2) or (sum = 3) or (sum = 5) or (sum = 6) or (sum = 7) or (sum = 9);\n\
            if (flag) then \n\
                p8 <= '1';\n\
            else \n\
                p8 <= '0';\n\
            end if;\n\
            flag := (sum = 0) or (sum = 2) or (sum = 6) or (sum = 8);\n\
            if (flag) then \n\
                p9 <= '1';\n\
            else \n\
                p9 <= '0';\n\
            end if;\n\
            flag := (sum = 0) or (sum = 4) or (sum = 5) or (sum = 6) or (sum = 8) or (sum = 9);\n\
            if (flag) then \n\
                p10 <= '1';\n\
            else \n\
                p10 <= '0';\n\
            end if;\n\
            flag := (sum = 2) or (sum = 3) or (sum = 4) or (sum = 5) or (sum = 6) or (sum = 8) or (sum = 9);\n\
            if (flag) then \n\
                p11 <= '1';\n\
            else \n\
                p11 <= '0';\n\
            end if;\n\
        end process;\n\
    end arch ; -- arch\n";

ChipBCDto7Seg.prototype.getComponentString = function () {
    return"\ncomponent ChipBCDto7Seg\n\
        port(p1, p2, p3, p4: in std_logic;\n\
            p5, p6, p7, p8, p9, p10, p11: out std_logic);\n\
            end component;\n";
};
module.exports = ChipBCDto7Seg;


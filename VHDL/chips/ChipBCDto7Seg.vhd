library ieee;
use ieee.std_logic_1164.all;
use ieee.std_logic_arith.all;
use ieee.std_logic_unsigned.all;

entity ChipBCDto7Seg is
  port (
	p1, p2, p3, p4: in std_logic;
	p5, p6, p7, p8, p9, p10, p11: out std_logic
  ) ;
end entity ; -- ChipBCDto7Seg

architecture arch of ChipBCDto7Seg is
begin
    process(p1,p2,p3,p4)
        variable sum : integer;
        variable flag : boolean;
    begin
        sum := 0;
        if (p1 = '1') then
            sum := sum + 1;
        end if;
        if (p2 = '1') then
            sum := sum + 2;
        end if;
        if (p3 = '1') then
            sum := sum + 4;
        end if;
        if (p4 = '1') then
            sum := sum + 8;
        end if;
        flag := (sum = 0) or (sum = 2) or (sum = 3) or (sum = 5) or (sum = 6) or (sum = 7) or (sum = 8) or (sum = 9);
        if (flag) then 
            p5 <= '1';
        else 
            p5 <= '0';
        end if;
        flag := (sum = 0) or (sum = 1) or (sum = 2) or (sum = 3) or (sum = 4) or (sum = 7) or (sum = 8) or (sum = 9);
        if (flag) then 
            p6 <= '1';
        else 
            p6 <= '0';
        end if;
        flag := (sum = 0) or (sum = 1) or (sum = 3) or (sum = 4) or (sum = 5) or (sum = 6) or (sum = 7) or (sum = 8) or (sum = 9);
        if (flag) then 
            p7 <= '1';
        else 
            p7 <= '0';
        end if;
        flag := (sum = 0) or (sum = 2) or (sum = 3) or (sum = 5) or (sum = 6) or (sum = 7) or (sum = 9);
        if (flag) then 
            p8 <= '1';
        else 
            p8 <= '0';
        end if;
        flag := (sum = 0) or (sum = 2) or (sum = 6) or (sum = 8);
        if (flag) then 
            p9 <= '1';
        else 
            p9 <= '0';
        end if;
        flag := (sum = 0) or (sum = 4) or (sum = 5) or (sum = 6) or (sum = 8) or (sum = 9);
        if (flag) then 
            p10 <= '1';
        else 
            p10 <= '0';
        end if;
        flag := (sum = 2) or (sum = 3) or (sum = 4) or (sum = 5) or (sum = 6) or (sum = 8) or (sum = 9);
        if (flag) then 
            p11 <= '1';
        else 
            p11 <= '0';
        end if;
    end process;
end arch ; -- arch
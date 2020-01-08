LIBRARY IEEE;
USE IEEE.STD_LOGIC_1164.ALL;
USE IEEE.STD_LOGIC_ARITH.ALL;
USE IEEE.STD_LOGIC_UNSIGNED.ALL;

ENTITY C74LS90 is
	port(
	port1:in std_logic;   --notCPb
	port2:in std_logic;   --R1
	port3:in std_logic;   --R2
	port4:in std_logic;   --NC
	port5:in std_logic;   --VCC 5v
	port6:in std_logic;   --S1
	port7:in std_logic;   --S2
	port8:out std_logic;  --Q2
	port9:out std_logic;  --Q1
	port11:out std_logic; --Q3
	port12:out std_logic; --Q0
	port10:in std_logic;  --GND
	port14:in std_logic;  --notCPa
	port13:in std_logic   --NC
);
END C74LS90;
architecture two OF C74LS90 IS
	signal q1: std_logic := '0';   --QA
	signal q2: std_logic_vector(2 downto 0) := "000";  --qD,QC,QB
BEGIN
	port12 <= q1;
	port11 <= q2(2);
	port8 <= q2(1);
	port9 <= q2(0);
	
	counter2: PROCESS(port14, port2, port3, port6, port7)
	begin
		if(port6='1' and port7='1')then -- S1 = '1' and S2 = '1'
			q1 <= '1';
			-- q2 <= "100";
		elsif (port2 = '1' and port3 = '1') then-- R1 = '1' and R2 = '1'
			q1 <= '0';
		elsif (port14'event and port14='0')then
			q1 <= not q1;
		end if;	
		
	end process;
	
	counter5: PROCESS(port1,port2,port3,port6,port7)
	begin
		if(port6='1' and port7='1')then
			q2<="100";		
		elsif(port2='1' and port3='1')then
			q2<="000";
		elsif(port1'event and port1='0')then
			case q2 is
				when "000" => q2 <= "001";
				when "001" => q2 <= "010";
				when "010" => q2 <= "011";
 				when "011" => q2 <= "100";
				when "100" => q2 <= "000";
				when others => q2 <= "000";
			end case;
			-- q2 <= q2 + 1;
			-- if q2 = "101" then
				-- q2 <= "000";
			-- end if;
		end if;
	end process;
end;
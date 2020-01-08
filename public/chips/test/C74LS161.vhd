LIBRARY IEEE;
USE IEEE.STD_LOGIC_1164.ALL;
USE IEEE.STD_LOGIC_ARITH.ALL;
USE IEEE.STD_LOGIC_UNSIGNED.ALL;

ENTITY C74LS161 is
	port(
	port1  : in  std_logic;   -- notR
	port2  : in  std_logic;   -- CP
	port3  : in  std_logic;   -- A
	port4  : in  std_logic;   -- B
	port5  : in  std_logic;   -- C
	port6  : in  std_logic;   -- D
	port7  : in  std_logic;   -- P, control signal
	port8  : in  std_logic;   -- GND
	port9  : in  std_logic;   -- notLD
	port10 : in  std_logic;   -- T, control signal
	port11 : out std_logic;   -- Q3
	port12 : out std_logic;   -- Q2
	port13 : out std_logic;   -- Q1
	port14 : out std_logic;   -- Q0
	port15 : out std_logic;   -- Co
	port16 : in  std_logic    -- Vcc 5V
);
END C74LS161;

ARCHITECTURE Behaviour OF C74LS161 IS
	
	constant EMPTY4 : std_logic_vector(3 downto 0) := "0000";
	signal Q:         std_logic_vector(3 downto 0) := "0000";
	signal tempCo :   std_logic := '0';
	
BEGIN
	port15 <= tempCo;
	port11 <= Q(3);
	port12 <= Q(2);
	port13 <= Q(1);
	port14 <= Q(0);

	count: PROCESS(port1, port2, port9, port7, port10, port3, port4, port5, port6)
	begin
		if(port1 = '1') then -- R = '0'
			tempCo <= '0';
			Q <= EMPTY4;
		elsif (port9 = '1' and (port10 = '0' or port7 = '0')) then 
		 	-- do nothing, keep Q
		elsif (port2'event and port2='1') then
			if (port9 = '1') then -- LD = '0'
				Q(0) <= port3; -- A
				Q(1) <= port4; -- B
				Q(2) <= port5; -- C
				Q(3) <= port6; -- D
			elsif (port7 = '1' and port10 = '1') then -- T = '1' and P = '1' (and LD = '1' and R = '1')
				case Q is
					when "1111" =>
						tempCo <= '1';
					when others =>
						tempCo <= '0';		
				end case;
				Q <= Q + 1;
			end if;
		end if;
	end process;

end Behaviour;
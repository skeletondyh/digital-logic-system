LIBRARY IEEE;
USE IEEE.STD_LOGIC_1164.ALL;
USE IEEE.STD_LOGIC_ARITH.ALL;
USE IEEE.STD_LOGIC_UNSIGNED.ALL;

Entity C74LS14 IS 
    PORT (
        port1: IN STD_LOGIC;
        port2: IN STD_LOGIC;
        port3: IN STD_LOGIC;
        port4: IN STD_LOGIC;
        port5: IN STD_LOGIC;
        port6: OUT STD_LOGIC;
        port7: IN STD_LOGIC; -- GND
        port8: OUT STD_LOGIC;
        port9: IN STD_LOGIC;
        port10: IN STD_LOGIC;
        port11: IN STD_LOGIC;
        port12: IN STD_LOGIC;
        port13: IN STD_LOGIC;
        port14: IN STD_LOGIC -- VCC 5V
    );
END C74LS14;

ARCHITECTURE rt6 OF C74LS14 IS


BEGIN
    port6 <= not ((port1 and port2)and(port4 and port5));
	port8 <= not ((port9 and port10)and (port12 and port13));
	
END;
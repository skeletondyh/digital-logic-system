LIBRARY IEEE;
USE IEEE.STD_LOGIC_1164.ALL;
USE IEEE.STD_LOGIC_ARITH.ALL;
USE IEEE.STD_LOGIC_UNSIGNED.ALL;

Entity C74LS04 IS 
    PORT (
        port1: IN STD_LOGIC;
        port2: OUT STD_LOGIC;
        port3: IN STD_LOGIC;
        port4: OUT STD_LOGIC;
        port5: IN STD_LOGIC;
        port6: OUT STD_LOGIC;
        port7: IN STD_LOGIC; -- GND
        port8: OUT STD_LOGIC;
        port9: IN STD_LOGIC;
        port10: OUT STD_LOGIC;
        port11: IN STD_LOGIC;
        port12: OUT STD_LOGIC;
        port13: IN STD_LOGIC;
        port14: IN STD_LOGIC -- VCC 5V
    );
END C74LS04;

ARCHITECTURE NOT_VHDL OF C74LS04 IS


BEGIN
    port2 <= not port1;
    port4 <= not port3;
    port6 <= not port5;
    port8 <= not port9;
	port10<= not port11;
	port12<= not port13;
END;
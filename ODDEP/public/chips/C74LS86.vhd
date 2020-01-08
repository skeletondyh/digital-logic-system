LIBRARY IEEE;
USE IEEE.STD_LOGIC_1164.ALL;
USE IEEE.STD_LOGIC_ARITH.ALL;
USE IEEE.STD_LOGIC_UNSIGNED.ALL;

Entity C74LS86 IS 
    PORT (
        port1: IN STD_LOGIC;
        port2: IN STD_LOGIC;
        port3: OUT STD_LOGIC;
        port4: IN STD_LOGIC;
        port5: IN STD_LOGIC;
        port6: OUT STD_LOGIC;
        port7: IN STD_LOGIC; -- GND
        port8: OUT STD_LOGIC;
        port9: IN STD_LOGIC;
        port10: IN STD_LOGIC;
        port11: OUT STD_LOGIC;
        port12: IN STD_LOGIC;
        port13: IN STD_LOGIC;
        port14: IN STD_LOGIC -- VCC 5V
    );
END C74LS86;

ARCHITECTURE rt8 OF C74LS86 IS


BEGIN
    port3 <=port1 xor port2;
    port6 <=port4 xor port5;
    port8 <=port9 xor port10;
	port11 <=port12 xor port13;

END;
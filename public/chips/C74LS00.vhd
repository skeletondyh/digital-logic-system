LIBRARY IEEE;
USE IEEE.STD_LOGIC_1164.ALL;
USE IEEE.STD_LOGIC_ARITH.ALL;
USE IEEE.STD_LOGIC_UNSIGNED.ALL;

Entity C74LS00 IS PORT (
    port1:  IN  STD_LOGIC;
    port2:  IN  STD_LOGIC;
    port3:  OUT STD_LOGIC;
    port4:  IN  STD_LOGIC;
    port5:  IN  STD_LOGIC;  
    port6:  OUT STD_LOGIC;
    port7:  IN  STD_LOGIC; --GND
    port8:  OUT STD_LOGIC;
    port9:  IN  STD_LOGIC;
    port10: IN  STD_LOGIC;  
    port11: OUT STD_LOGIC;
    port12: IN  STD_LOGIC;
    port13: IN  STD_LOGIC;
    port14: IN  STD_LOGIC --5V
);
END C74LS00;

ARCHITECTURE AND_NOT OF C74LS00 IS


BEGIN
    port3 <= not (port1 and port2);
    port6 <= not (port5 and port4);
    port8 <= not (port10 and port9);
    port11 <= not (port12 and port13);
END;
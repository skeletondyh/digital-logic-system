LIBRARY IEEE;
USE IEEE.STD_LOGIC_1164.ALL;
USE IEEE.STD_LOGIC_ARITH.ALL;
USE IEEE.STD_LOGIC_UNSIGNED.ALL;

Entity CD4011 IS 
    PORT (
        port1: IN STD_LOGIC;
        port2: IN STD_LOGIC;
        port3: OUT STD_LOGIC;
        port4: OUT STD_LOGIC;
        port5: IN STD_LOGIC;
        port6: IN STD_LOGIC;
        port7: IN STD_LOGIC; -- GND
        port8: IN STD_LOGIC;
        port9: IN STD_LOGIC;
        port10: OUT STD_LOGIC;
        port11: OUT STD_LOGIC;
        port12: IN STD_LOGIC;
        port13: IN STD_LOGIC;
        port14: IN STD_LOGIC -- VCC 5V
    );
END CD4011;

ARCHITECTURE rt2 OF CD4011 IS
   

BEGIN
    port3 <= not (port1 and port2);
    port4 <= not (port5 and port6);
    port10 <= not (port8 and port9);
    port11 <= not (port12 and port13);
END;
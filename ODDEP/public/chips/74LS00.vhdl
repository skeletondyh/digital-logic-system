LIBRARY IEEE;
USE IEEE.STD_LOGIC_1164.ALL;
USE IEEE.STD_LOGIC_ARITH.ALL;
USE IEEE.STD_LOGIC_UNSIGNED.ALL;

Entity C74LS00 IS 
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
END C74LS00;

ARCHITECTURE rtl OF C74LS00 IS
	COMPONENT nand IS 
		PORT (
			pin1: IN STD_LOGIC;
			pin2: IN STD_LOGIC;
			pout: OUT STD_LOGIC
		);
	END COMPONENT;

BEGIN
	u1: nand PORT MAP (
		pin1: port1,
		pin2: port2,
		pout: port3
		); 
	u2: nand PORT MAP (
		pin1: port5,
		pin2: port6,
		pout: port4
		);
	u3: nand PORT MAP (
		pin1: port8,
		pin2: port9,
		pout: port10
	);
	u4: nand PORT MAP (
		pin1: port12,
		pin2: port13,
		port1: port11
	);
END;
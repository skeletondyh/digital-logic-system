library ieee;
use ieee.std_logic_1164.all; 

ENTITY adder1bit  IS 
	PORT (
		A: IN STD_LOGIC;
		B: IN STD_LOGIC;
		S: OUT STD_LOGIC;
		C: OUT STD_LOGIC
	);
END adder1bit;

ARCHITECTURE bhv OF adder1bit IS
	COMPONENT C74LS00 PORT (
		port1 : IN  STD_LOGIC;
		port2 : IN  STD_LOGIC;
		port3 : OUT STD_LOGIC;
		port4 : OUT STD_LOGIC;
		port5 : IN  STD_LOGIC;
		port6 : IN  STD_LOGIC;
		port7 : IN  STD_LOGIC; -- GND
		port8 : IN  STD_LOGIC;
		port9 : IN  STD_LOGIC;
		port10: OUT STD_LOGIC;
		port11: OUT STD_LOGIC;
		port12: IN  STD_LOGIC;
		port13: IN  STD_LOGIC;
		port14: IN  STD_LOGIC -- VCC 5V
	);
	END COMPONENT;

	COMPONENT C74LS04 IS PORT (
        port1 : IN  STD_LOGIC;
        port2 : OUT STD_LOGIC;
        port3 : IN  STD_LOGIC;
        port4 : OUT STD_LOGIC;
        port5 : IN  STD_LOGIC;
        port6 : OUT STD_LOGIC;
        port7 : IN  STD_LOGIC; -- GND
        port8 : OUT STD_LOGIC;
        port9 : IN  STD_LOGIC;
        port10: OUT STD_LOGIC;
        port11: IN  STD_LOGIC;
        port12: OUT STD_LOGIC;
        port13: IN  STD_LOGIC;
        port14: IN  STD_LOGIC -- VCC 5V
    );
	END COMPONENT;

	COMPONENT C74LS86 IS PORT (
        port1 : IN  STD_LOGIC;
        port2 : IN  STD_LOGIC;
        port3 : OUT STD_LOGIC;
        port4 : IN  STD_LOGIC;
        port5 : IN  STD_LOGIC;
        port6 : OUT STD_LOGIC;
        port7 : IN  STD_LOGIC; -- GND
        port8 : OUT STD_LOGIC;
        port9 : IN  STD_LOGIC;
        port10: IN  STD_LOGIC;
        port11: OUT STD_LOGIC;
        port12: IN  STD_LOGIC;
        port13: IN  STD_LOGIC;
        port14: IN  STD_LOGIC -- VCC 5V
    );
	END COMPONENT;

	SIGNAL switcha0, switchb0, dinput1, dinput2 : STD_LOGIC;
	SIGNAL outputd0, outputc0, a0_nand_b0: STD_LOGIC; 
BEGIN
	-- input 
	switcha0 <= A;
	switchb0 <= B;

	dinput1 <= A;
	dinput2 <= B;

	-- output
	S <= outputd0;
	C <= outputc0;

	u_C74LS86: C74LS86 PORT MAP (
		port1 => switchb0,
		port2 => switcha0,
		port3 => outputd0,
		port4 => '0',
		port5 => '0',
		port6 => ,    -- out port
		port7 => '0', -- GND
		port8 => ,    -- out port
		port9 => '0',
		port10=> '0',
		port11=> ,    -- out port
		port12=> '0',
		port13=> '0',
		port14=> '1'-- VCC 5V
	);

	u_C74LS00: C74LS00 PORT MAP (
		port1 => switcha0,
		port2 => switchb0,
		port3 => a0_nand_b0,
		port4 => , -- out port
		port5 => 0,
		port6 => 0,
		port7 => '0'; -- GND
		port8 => '0',
		port9 => '0',
		port10=> , -- out port
		port11=> , -- out port
		port12=> '0',
		port13=> '0',
		port14=> '1'  -- VCC 5V
	);

	u_C74LS04: C74LS04 PORT MAP (
		port1 => a0_nand_b0,
		port2 => outputc0,
		port3 => '0',
		port4 => ,    -- out port
		port5 => '0',
		port6 => ,    -- out port
		port7 => '0'; -- GND
		port8 => ,    -- out port
		port9 => '0',
		port10=> ,    -- out port
		port11=> '0',
		port12=> ,    -- out port
		port13=> '0',
		port14=> '1'  -- VCC 5V
	);

END bhv;
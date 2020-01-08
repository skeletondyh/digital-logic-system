LIBRARY IEEE;
USE IEEE.STD_LOGIC_1164.ALL;
USE IEEE.STD_LOGIC_ARITH.ALL;
USE IEEE.STD_LOGIC_UNSIGNED.ALL;

Entity C74LS75 IS 
    PORT (
        port1: OUT STD_LOGIC;
        port2: IN STD_LOGIC;
        port3: IN STD_LOGIC;
        port4: IN STD_LOGIC;
        port5: IN STD_LOGIC; --5V
        port6: IN STD_LOGIC;
        port7: IN STD_LOGIC; 
        port8: OUT STD_LOGIC; 
        port9: OUT STD_LOGIC;
        port10: OUT STD_LOGIC;
        port11: OUT STD_LOGIC;
        port12: IN STD_LOGIC;  --GND
        port13: IN STD_LOGIC;
        port14: OUT STD_LOGIC;
		port15: OUT STD_LOGIC;
		port16: OUT STD_LOGIC
    );
END C74LS75;

ARCHITECTURE rt10 OF C74LS75 IS

BEGIN
	PROCESS(port2,port3,port13,port6,port7,port4)
	BEGIN

    IF(port2='0' and port13='1')THEN
		port16<='0';
		port1 <='1';
	ELSIF(port2='1' and port13='1')THEN
		port16<='1';
		port1 <='0';
	ELSIF(port13='0')THEN

	END IF;
	IF(port3='0' and port13='1')THEN
		port15<='0';
		port14 <='1';
	ELSIF(port3='1' and port13='1')THEN
		port15<='1';
		port14 <='0';
	ELSIF(port13='0')THEN

	END IF;
	IF(port6='0' and port4='1')THEN
		port10<='0';
		port11 <='1';
	ELSIF(port6='1' and port4='1')THEN
		port10<='1';
		port11 <='0';
	ELSIF(port4='0')THEN

	END IF;
	IF(port7='0' and port4='1')THEN
		port9<='0';
		port8 <='1';
	ELSIF(port7='1' and port4='1')THEN
		port9<='1';
		port8 <='0';
	ELSIF(port4='0')THEN

	END IF;
	END PROCESS;
<<<<<<< HEAD
END;
=======
END;
>>>>>>> c2dac47b9b76ed64acf76f8b559c25f6af709143

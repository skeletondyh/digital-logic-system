-- testbench of C74LS161.vhd

LIBRARY IEEE;
USE IEEE.STD_LOGIC_1164.ALL;
USE IEEE.STD_LOGIC_ARITH.ALL;
USE IEEE.STD_LOGIC_UNSIGNED.ALL;

entity testc74ls161 is
end testc74ls161;

architecture rtl of testc74ls161 is

component C74LS161 is
	port(
	port1  : in  std_logic;   -- notR
	port2  : in  std_logic;   -- CP
	port3  : in  std_logic;   -- A
	port4  : in  std_logic;   -- B
	port5  : in  std_logic;   -- C
	port6  : in  std_logic;   -- D
	port7  : in  std_logic;   -- P, control signal
	port8  : in  std_logic;   -- GND
	port9  : in  std_logic;   -- notLoad
	port10 : in  std_logic;   -- T, control signal
	port11 : out std_logic;   -- Q3
	port12 : out std_logic;   -- Q2
	port13 : out std_logic;   -- Q1
	port14 : out std_logic;   -- Q0
	port15 : out std_logic;   -- Co
	port16 : in  std_logic    -- Vcc 5V
);
end component;

    constant clk_period : time := 200 ps;
    constant EMPTY : std_logic := '0';

    signal notR, notLoad : std_logic := EMPTY;
    signal CP : std_logic := EMPTY;
    signal A, B, C, D : std_logic := EMPTY;
    signal P, T : std_logic := '1';
    signal Q : std_logic_vector(3 downto 0);
    signal Co : std_logic := EMPTY;

begin
    u0_74ls161 : C74LS161 port map (
        port1  => notR,
        port2  => CP,
        port3  => A,
        port4  => B,
        port5  => C,
        port6  => D,
        port7  => P,
        port8  => EMPTY,
        port9  => notLoad,
        port10 => T,
        port11 => Q(3),
        port12 => Q(2),
        port13 => Q(1),
        port14 => Q(0),
        port15 => Co,
        port16 => EMPTY
    );

    notR <= '0';
    notLoad <= '0';
    P <= '1';
    T <= '1';

    cp_gen: process
    begin
        CP <= '0';
        wait for clk_period / 2;
        CP <= '1';
        wait for clk_period / 2;
    end process;


end;
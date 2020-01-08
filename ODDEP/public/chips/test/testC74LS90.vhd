-- testbench of C74LS90
LIBRARY IEEE;
USE IEEE.STD_LOGIC_1164.ALL;
USE IEEE.STD_LOGIC_ARITH.ALL;
USE IEEE.STD_LOGIC_UNSIGNED.ALL;

entity test74ls90 is
end test74ls90;

architecture rtl of test74ls90 is
    component C74LS90 is
        port(
        port1:in std_logic;   --notCPb
        port2:in std_logic;   --R1
        port3:in std_logic;   --R2
        port4:in std_logic;   --NC
        port5:in std_logic;   --VCC 5v
        port6:in std_logic;   --S1
        port7:in std_logic;   --S2
        port8:out std_logic;  --Q2
        port9:out std_logic;  --Q1
        port11:out std_logic; --Q3
        port12:out std_logic; --Q0
        port10:in std_logic;  --GND
        port14:in std_logic;  --notCPa
        port13:in std_logic   --NC
        );
    end component;

    constant EMPTY : std_logic := '0';
    constant clk_period : time := 200 ps;
    signal clka, clkb : std_logic;
    signal R1, R2 : std_logic;
    signal S1, S2 : std_logic;
    signal Q : std_logic_vector(3 downto 0) := "0000";

begin
    u0_74ls90: C74LS90 port map (
        port1 => clkb,
        port2 => R1,
        port3 => R2,
        port4 => EMPTY,
        port5 => '1',
        port6 => S1,
        port7 => S2,
        port8 => Q(2),
        port9 => Q(1),
        port10 => '0',
        port11 => Q(3),
        port12 => Q(0),
        port13 => EMPTY,
        port14 => clka
    );

    R1 <= '0';
    R2 <= '0';
    S1 <= '0';
    S2 <= '0';

    clka_gen: process
    begin
        clka <= '0';
        wait for clk_period / 2;
        clka <= '1';
        wait for clk_period / 2;
    end process;

    clkb_gen: process
    begin
        clkb <= '0';
        wait for clk_period / 2;
        clkb <= '1';
        wait for clk_period / 2;
    end process;

end rtl;
library ieee;
use ieee.std_logic_1164.all;

entity testbench is
    end testbench;

architecture RTL of testbench is
    component main
        port(
            clk : in std_ulogic;
            rst : in std_ulogic;
            a_i : in std_ulogic_vector(3 downto 0);
            b_i : in std_ulogic_vector(3 downto 0);
            c_o : out std_ulogic_vector(4 downto 0)
        );
    end component;

    constant clk_period : time := 200 ps;
    signal clk, rst : std_ulogic;
    signal a_i, b_i : std_ulogic_vector(3 downto 0);
    signal c_o : std_ulogic_vector(4 downto 0);
begin
    u0 : main port map (
        clk => clk,
        rst => rst,
        a_i => a_i,
        b_i => b_i,
        c_o => c_o
    );
    clk_gen : process
    begin
        clk <= '0';
        wait for clk_period / 2;
        clk <= '1';
        wait for clk_period / 2;
    end process ;
    rst_gen : process
    begin
        rst <= '0';
        wait for 60 ps;
        rst <= '1';
        wait for 60 ps;
        rst <= '0';
        wait;
    end process ;
    a_i_gen : process 
    begin
        a_i <= "0101";
        wait for clk_period;
        a_i <= "0001";
        wait for clk_period;
        a_i <= "0011";
        wait for clk_period;
        a_i <= "0110";
        wait for clk_period;
        wait;
    end process;
    b_i_gen : process 
    begin
        b_i <= "0101";
        wait for clk_period;
        b_i <= "0100";
        wait for clk_period;
        b_i <= "0010";
        wait for clk_period;
        b_i <= "0100";
        wait for clk_period;
        b_i <= "1100";
        wait for clk_period;
        wait;
    end process;
end RTL;

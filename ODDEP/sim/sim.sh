#!/bin/bash
# args: <代码路径> <激励路径> <波形输出路径> [<标准输入文件路径> <标准输出文件路径>]

source ./sim/env.sh
cp $1 ./sim/main.vhd || exit
cp $2 ./sim/testbench.vhd || exit
if [[ -n $4 ]]; then
    cp $4 ./sim/test.in
    cp $5 ./sim/test.ans
fi

cd ./sim
test -d work || vlib work
vcom testbench.vhd main.vhd || exit
vsim -c -do sim.do testbench || exit
if [[ -n $4 ]]; then
    if diff test.out test.ans >/dev/null 2>&1; then
        echo AC 1>&2
    else 
        echo WA 1>&2
    fi
    rm test.out
fi

cd ..
cp ./sim/main.vcd $3 || exit
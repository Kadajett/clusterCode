#!/bin/bash

servers=( 192.168.2.61 192.168.2.84 192.168.2.54 )

addition='/opt/vc/bin/vcgencmd measure_temp'



if [[ "$2" -eq "0" ]]; then
        for server in ${!servers[@]}
        do

                newIndex=$(($server+1))
                echo "Node $newIndex:"
                sudo sshpass -p "pipass$newIndex" ssh pi@${servers[$server]} $1
        done
else
        newIndex=$(($2-1))
        echo "Node: $newIndex:"
        sudo sshpass  -p "pipass$2" ssh pi@${servers[$newIndex]} $1
fi

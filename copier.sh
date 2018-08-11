#!/bin/bash

servers=( 192.168.2.61 192.168.2.84 192.168.2.54 )

addition='/opt/vc/bin/vcgencmd measure_temp'



if [[ "$2" -eq "0" ]]; then
        for server in ${!servers[@]}
        do

                newIndex=$(($server+1))
                echo "Node $newIndex:"
                sudo sshpass -p "pipass$newIndex" scp pi@${servers[$server]}:$3 $1
        done
else
        newIndex=$(($2-1))
        echo "Node: $newIndex:"
        sudo sshpass  -p "pipass$2" scp pi@${servers[$newIndex]}:$3 $1
fi

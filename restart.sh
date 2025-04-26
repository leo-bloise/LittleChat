if [ ! -f ./pids.sh ]; then
    ./start.sh
    exit
else
    ./stop_all.sh
    ./start.sh
    exit
fi
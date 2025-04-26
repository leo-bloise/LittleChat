#!/bin/bash
check_and_kill_processes() {
    for port in 8080 3000; do
        # Get the PID of the process running on the port
        PID=$(sudo ss -lptn "sport = :$port" | grep -oP 'pid=\K[0-9]+')

        if [ -n "$PID" ]; then
            echo "Process running on port $port with PID $PID. Killing it..."
            sudo kill -9 "$PID"
        else
            echo "No process found on port $port."
        fi
    done
}
rm ./back_end.logs
rm ./front_end.logs
echo "Logs deleted"
check_and_kill_processes

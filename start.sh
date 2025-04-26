#!/bin/bash

# Load environment variables
source ./env.sh

# Clear previous pids.sh
echo "#!/bin/bash" > pids.sh

# Start Front-End
cd ./client
npm run dev > ../front_end.logs 2>&1 &
cd ..

# Start Back-End
cd ./server
export PORT=$BACK_END_PORT
npm run start:dev > ../back_end.logs 2>&1 &
cd ..

echo "Back end and Front-end started"

#!/bin/sh

npm i

npm run build

ssh "root@$1" << EOF
    sudo apt-get update
    sudo apt-get install ca-certificates curl
    sudo install -m 0755 -d /etc/apt/keyrings
    sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
    sudo chmod a+r /etc/apt/keyrings/docker.asc

    # Add the repository to Apt sources:
    echo \
        "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
        $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
        sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
    sudo apt-get update

    sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

    if [ -d "~/landing" ]; then
        cd ~/landing
        docker compose stop
        rm -rf ~/landing
        mkdir ~/landing
    fi
EOF

ssh "root@$1" "rm -rf ~/landing && mkdir ~/landing"

scp -r dist/ "root@$1:~/landing/dist"
scp -r ssl/ "root@$1:~/landing/ssl"
scp -r server.package.json "root@$1:~/landing/server.package.json"
scp -r server.js "root@$1:~/landing/server.js"
scp -r .env "root@$1:~/landing/.env"
scp -r Dockerfile "root@$1:~/landing/Dockerfile"
scp -r docker-compose.yml "root@$1:~/landing/docker-compose.yml"

ssh "root@$1" << EOF
    cd ~/landing
    docker compose build
    docker compose up -d
    docker compose logs
EOF

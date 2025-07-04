podman run -d \
 --name node1 \
 --network besu-nodes \
 -p 9999:8545 \
 -v $(pwd):/data \
 hyperledger/besu:latest \
 --config-file=/data/config.toml \
 --data-path=/data/node1/data \
 --node-private-key-file=/data/node1/key \
 --genesis-file=/data/genesis.json
podman run -d \
 --name node4 \
 --network besu-nodes \
 -p 9996:8545 \
 -v $(pwd):/data \
 hyperledger/besu:latest \
 --config-file=/data/config.toml \
 --data-path=/data/node4/data \
 --node-private-key-file=/data/node4/key \
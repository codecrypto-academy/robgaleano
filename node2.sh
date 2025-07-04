podman run -d \
 --name node2 \
 --network besu-nodes \
 -p 9998:8545 \
 -v $(pwd):/data \
 hyperledger/besu:latest \
 --config-file=/data/config.toml \
 --data-path=/data/node2/data \
 --node-private-key-file=/data/node2/key \
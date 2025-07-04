podman run -d \
 --name node3 \
 --network besu-nodes \
 -p 9997:8545 \
 -v $(pwd):/data \
 hyperledger/besu:latest \
 --config-file=/data/config.toml \
 --data-path=/data/node3/data \
 --node-private-key-file=/data/node3/key \
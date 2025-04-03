podman run --rm \
 -v ./genesis.json:/genesis.json \
 -v ./data:/data \
 -v ./pwd.txt:/pwd.txt \
 ethereum/client-go:v1.13.15 init \
 --datadir /data /genesis.json
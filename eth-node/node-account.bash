podman run --rm -v ./pwd.txt:/pwd.txt -v ./data:/data \
 ethereum/client-go:v1.13.15 \
 account new \
 --datadir /data \
 --password /pwd.txt
# Starting with Ethereum's "Paris" hard fork (the Merge) and in newer versions of Geth 
#(including v1.13.15 that WE're using), Proof of Work (PoW) mining is no longer supported. 
# Ethereum has fully transitioned to Proof of Stake (PoS).
# So we need to use development mode in current Geth version

podman run -d --rm \
 --name eth-node-basket \
 -v ./pwd.txt:/pwd.txt \
 -v ./data:/data \
 -p 8545:8545 \
 ethereum/client-go:v1.13.15 \
 --datadir /data \
 --unlock 6566c37eb851f8ec8edcfb117cd3dc863eb1fb33 \
 --allow-insecure-unlock \
 --mine \
 --miner.etherbase 6566c37eb851f8ec8edcfb117cd3dc863eb1fb33 \
 --password /pwd.txt \
 --nodiscover \
 --http \
 --networkid 445167093456 \
 --http.addr "0.0.0.0" \
 --http.api "admin,eth,debug,miner,net,txpool,personal,web3" \
 --http.corsdomain "*"
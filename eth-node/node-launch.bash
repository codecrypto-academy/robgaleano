
docker run --rm \
 -v ./pwd.txt:/pwd.txt \
 -v ./data:/data \
 -p 5556:8545 \
 ethereum/client-go:v1.13.15 \
 --datadir /data \
 --unlock 3e09a86240ffa3446b73e245edf2dea7c66bb62d \
 --allow-insecure-unlock \
 --mine \
 --miner.etherbase 3e09a86240ffa3446b73e245edf2dea7c66bb62d \
 --password /pwd.txt \
 --nodiscover \
 --http \
 --networkid 20115842 \
 --http.addr "0.0.0.0" \
 --http.api "admin,eth,debug,miner,net,txpool,personal,web3" \
 --http.corsdomain "*"
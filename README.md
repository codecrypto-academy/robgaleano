> **Tip:** To avoid setting `JAVA_OPTS` every time, add `export JAVA_OPTS="--enable-native-access=ALL-UNNAMED"` to your `~/.zshrc` or `~/.bash_profile`.

genesis.json http://besu.hyperledger.org/private-networks/tutorials/clique 

test connection to the node curl -X POST --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":4142465097}' -H Content-Type: applicati
on/json http://localhost:9999

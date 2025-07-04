#!/bin/bash
if [[ "$1" != --name* ]]; then
    echo "Error: You must provide --name <filename> as the first argument."
    echo "Usage: ./start-node.sh --name <filename>"
    exit 1
fi

NODE_NAME=$(echo $1 | cut -d'=' -f2)
if [ -z "$NODE_NAME" ]; then
    NODE_NAME=$2
fi

if [ -z "$NODE_NAME" ]; then
    echo "Error: No node name provided."
    echo "Usage: ./start-node.sh --name <filename>"
    exit 1
fi

NODE_SCRIPT="$NODE_NAME.sh"
if [ -f "$NODE_SCRIPT" ]; then
    chmod +x "$NODE_SCRIPT"
    ./"$NODE_SCRIPT"
else
    echo "Script $NODE_SCRIPT not found."
    exit 1
fi

#!/usr/bin/env bash

readonly DIR="$(dirname "$(readlink -f "$0")")"
cd "$DIR"

npm i

zip -r maze.zip \
	assets/ \
	js/ \
	css/ \
	index.html \
	node_modules/ace-builds/src-min-noconflict/

echo "Maze packaged to $DIR/maze.zip"

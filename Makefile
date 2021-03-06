
export PATH := node_modules/.bin:$(PATH)

build:
	node build.js

min:
	uglifyjs bundle/index.js -o bundle/index.js --mangle
	uglifyjs bundle/main-jquery.js -o bundle/main-jquery.js --mangle
	uglifyjs bundle/main-zepto.js -o bundle/main-zepto.js --mangle
	uglifyjs bundle/graph.js -o bundle/graph.js --mangle

serve:
	@echo http://localhost:3000/
	serve .

watch:
	./watch.sh make

clean:
	rm bundle/*

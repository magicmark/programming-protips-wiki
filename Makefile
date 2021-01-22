node_modules: package.json yarn.lock
	yarn

build: node_modules
	yarn build

.PHONY: clean
clean:
	# remove everything targeted by .gitignore
	git clean -fdX
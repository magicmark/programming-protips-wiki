node_modules: package.json yarn.lock
	yarn

src/css/dracula.css:
	curl https://raw.githubusercontent.com/dracula/highlightjs/master/dracula.css > src/css/dracula.css

build: node_modules src/css/dracula.css
	yarn build

.PHONY: clean
clean:
	# remove everything targeted by .gitignore
	git clean -fdX
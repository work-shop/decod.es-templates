TARGET_DIR=../decodes-core/output
STATIC_DIR=static


.PHONY: all

all: watch

install:
	npm install
	cd $(STATIC_DIR)/scss
	bourbon install
	neat install

watch:
	sass --watch $(STATIC_DIR)/scss/main.scss:$(TARGET_DIR)/static/bundle.css &
	watchify $(STATIC_DIR)/js/main.js -v -o $(TARGET_DIR)/static/bundle.js &

kill:
	kill -9 $$(ps aux | grep -v grep | grep "sass" | awk '{print $$2}')
	kill -9 $$(ps aux | grep -v grep | grep "watchify" | awk '{print $$2}')

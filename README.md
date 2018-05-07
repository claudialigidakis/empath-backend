# Empath---Back-End

A way to anlayze twitter usernames and hashtags using the Watson Personlaity API

## Requirements

For development, you will only need Node.js installed on your environement.
And please use the appropriate [Editorconfig](http://editorconfig.org/) plugin for your Editor (not mandatory).

### Node

[Node](http://nodejs.org/) is really easy to install & now include [NPM](https://npmjs.org/).
You should be able to run the following command after the installation procedure
below.

    $ node --version
    v0.10.24

    $ npm --version
    1.3.21

#### Node installation on OS X

You will need to use a Terminal. On OS X, you can find the default terminal in
`/Applications/Utilities/Terminal.app`.

Please install [Homebrew](http://brew.sh/) if it's not already done with the following command.

    $ ruby -e "$(curl -fsSL https://raw.github.com/Homebrew/homebrew/go/install)"

If everything when fine, you should run

    brew install node

#### Node installation on Linux

    sudo apt-get install python-software-properties
    sudo add-apt-repository ppa:chris-lea/node.js
    sudo apt-get update
    sudo apt-get install nodejs

#### Node installation on Windows

Just go on [official Node.js website](http://nodejs.org/) & grab the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it.

---

## Install

    $ git clone https://github.com/ORG/PROJECT.git
    $ cd PROJECT
    $ npm install

### Configure app

Copy `config.sample.json` to `config.json` then edit it with the url where you have setup:

- backend api
- refreshing tokens for the twitter API
- development

## Start & watch

    $ npm start

## Languages & tools

### HTML

- [Jade](http://jade-lang.com/) for some templating.

### JavaScript

- [JSHint](http://www.jshint.com/docs/) is used to prevent JavaScript error.
- [JSCS](https://npmjs.org/package/jscs) is used to check coding conventions.
- [Browserify](http://browserify.org/) to handle allow us to write our client-side scripts with [es6 syntax](http://es6.github.io/) thanks to [es6ify](https://github.com/thlorenz/es6ify).
- [React](http://facebook.github.io/react) is used for UI.

### CSS

- [cssnext](http://cssnext.putaindecode.io) is used to write futureproof CSS for CSS vendor prefix under the hood).

_Autoprefixer_ is included and use [caniuse.com](http://caniuse.com/) database to avoid outdated prefixes. _You can forget CSS prefixes NOW._

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Installing

A step by step series of examples that tell you have to get a development env running

```
NPM INSTALL
NPM RUN DEV
```

## Built With

* Javascript
* Watson Personality API
* Twitter API
* NODE

## Authors

* **Claudia Ligidakis** 

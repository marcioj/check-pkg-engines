# check-pkg-engines

> Command line utility to check if your package.json engines field matches with your current installed binaries

[![Build Status][travis_badge]][travis]

## Installation

```sh
npm install check-pkg-engines
```

## Usage

For instance given the following package.json

```json
{
  "engines": {
    "node": "^0.10.0",
    "npm": "^2.0.0"
  }
}
```

If you have installed node v0.12.9 and npm 3.5.3, running `check-pkg-engines` will exit with an error code and display the following:

```sh
~ check-pkg-engines
Incompatible engines versions, please update them to the requested version especified in package.json engines field
The current npm version is 3.5.3 but package.json engines.npm field needs ^2.0.0
The current node version is v0.12.9 but package.json engines.node field needs ^0.10.0
```

## Running Tests

`npm test`

## Contributing

1. Fork it
1. Create your feature branch (`git checkout -b my-new-feature`)
1. Commit your changes (`git commit -am 'Add some feature'`)
1. Push to the branch (`git push origin my-new-feature`)
1. Create new Pull Request

[travis]: https://travis-ci.org/marcioj/check-pkg-engines
[travis_badge]: https://api.travis-ci.org/marcioj/check-pkg-engines.svg?branch=master

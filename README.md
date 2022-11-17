# React State Sync

The main goal of this project is to explore a possibility
of a combined state management utility to eliminate the need
for server-side state storage and client side state storage. It
also aims on elimination of writing boiler plate code by the
developers to keep both state storage in sync. Our goal is
to provide the upsides of a server state cache i.e. preventing
repeated queries being sent to the server as long as the cached
data is within the state time limits [5]. In addition to that also
bring in the upsides of a client side state management frame-
work, revolving majorly around cleaner code and increased
rendering performance

# Getting Started

## Installation

`npm i @viral98/react-state-sync`

`yarn add @viral98/react-state-sync`

## Modify your next.config.js

```
const withPlugins = require('next-compose-plugins');
const withTM = require('next-transpile-modules')(['@viral98/react-state-sync']);

module.exports = withPlugins([withTM], {
  reactStrictMode: true,
  swcMinify: true,
});
```

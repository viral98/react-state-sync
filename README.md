React State Sync

## Modify your next.config.js

```
const withPlugins = require('next-compose-plugins');
const withTM = require('next-transpile-modules')(['@viral98/react-state-sync']);

module.exports = withPlugins([withTM], {
  reactStrictMode: true,
  swcMinify: true,
});
```

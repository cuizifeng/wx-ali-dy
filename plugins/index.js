const requirePlugin = require.context('/', false, /.+\.js$/);
requirePlugin.keys().forEach(fileName => requirePlugin(fileName));

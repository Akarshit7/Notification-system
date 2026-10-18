const path = require('path');

module.exports = (defaultOptions) => ({
  ...defaultOptions,
  externals: [
    ({ request }, callback) => {
      if (!request) {
        return callback();
      }

      const isWorkspaceCode =
        request.startsWith('@app/') ||
        request.startsWith('apps/') ||
        request.startsWith('libs/') ||
        request.startsWith('.') ||
        path.isAbsolute(request);

      if (isWorkspaceCode) {
        return callback();
      }

      return callback(null, 'commonjs ' + request);
    },
  ],
});

module.exports = {
  // See http://brunch.io/#documentation for docs.
  files: {
    javascripts: {
      joinTo: {
        'js/vendor.js': /^(?!src\/client)/,
        'js/app.js': /^(src\/client)/
      }
    },
    stylesheets: {
      joinTo: 'css/app.css',
      order: {
        // before: ['web/static/css/material.css'],
        after: ['src/client/styles/app.scss'] // concat app.css last
      }
    }
  },

  paths: {
    // Dependencies and current project directories to watch
    watched: [
      'src/client',
      'test/client'
    ],
  },

  plugins: {
    babel: {
      presets: ['es2015']
    }
  }
};

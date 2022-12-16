const path = require('path');
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    'postcss-extract-media-query': {
      output: {
          path: path.join(__dirname, 'assets/'),
          name: '[name]-desktop.css'
      },
      queries: {
          '(min-width:768px)': 'desktop',
          '(min-width: 768px)': 'desktop',
          '(min-width:992px)': 'desktop',
          '(min-width: 992px)': 'desktop',
          '(min-width:1200px)': 'desktop',
          '(min-width: 1200px)': 'desktop',
          '(min-width:1440px)': 'desktop',
          '(min-width: 1440px)': 'desktop',
          '(min-width:1500px)': 'desktop',
          '(min-width: 1500px)': 'desktop',
          '(min-width:1800px)': 'desktop',
          '(min-width: 1800px)': 'desktop',
          '(min-width:1801px)': 'desktop',
          '(min-width: 1801px)': 'desktop',
          '(min-width:2000px)': 'desktop',
          '(min-width: 2000px)': 'desktop',
          '(min-width: 768px) and (max-width: 991px)': 'desktop',
          '(min-width:768px) and (max-width:991px)': 'desktop',
          '(min-width: 1200px) and (max-width: 1439px)': 'desktop',
          '(min-width:1200px) and (max-width:1439px)': 'desktop',
          '(min-width: 992px) and (max-width: 1199px)': 'desktop',
          '(min-width:992px) and (max-width:1199px)': 'desktop',
          '(min-width: 992px) and (max-width: 1499px)': 'desktop',
          '(min-width:992px) and (max-width:1499px)': 'desktop',
          '(min-width: 1200px) and (max-width:1499px)': 'desktop',
          '(min-width:1200px) and (max-width:1499px)': 'desktop',
        },
        extractAll: false
    },
    'cssnano': {},
  }
}
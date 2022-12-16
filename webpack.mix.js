let mix = require('laravel-mix');
require('laravel-mix-purgecss');
const glob = require('glob-all');

mix.js('src/scripts/app.js', 'assets');
mix.sass('src/styles/app.scss', 'assets')
mix.sass('src/styles/print.scss', 'assets')
// .purgeCss({
//   enabled: true,
//   folders: ['src','snippets','sections']
// });

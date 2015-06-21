# Grunt Demo Theme

Because a theme in OctoberCMS is defined as files, it's super easy to use any task runner to manage your front end build tasks, such as compiling Less or Sass, linting, minifying images etc.

OctoberCMS ships with a feature called the combiner. First and foremost this is a feature which concatenates CSS or JS files, but it can also compile Less. This is a great feature, but if you need more power, utilizing a task runner is a great option.

This example focuses on Grunt, but if you prefer Gulp, you could just as easy use that. You could even use Laravel Elixir (right? @todo)

Bower is used to install front end packages.

## Installation

1. Clone this repo into your themes directory.
1. `npm install`
1. `bower install`
1. `grunt`

## Grunt Commands

| Task | Description |
|------|-------------|
| _(nothing)_ | Default task. Runs `css`, `js` & `images`. For production. |
| **dev** | Development mode. Runs `watch` |
| **css** | Compile LESS to CSS and run postcss for production. Runs `less:app`, `postcss:app` |
| **js** | Build all JS files for production. Runs `concat:plugins`, `uglify:plugins`, `jshint:app`, `jscs:app`, `uglify:app` |
| **images** | Run imagemin on images. |
| **less** | Compiles `assets/less/app/app.less` to `assets/css/app.css` |
| **postcss** | Runs `autoprefixer` and `csswring` (minifier) on `app.css` |

## OctoberCMS Framework

The OctoberCMS framework JS files are added to the `plugins.js` file with the concat plugin. Take a look at the `concat` section in the Gruntfile. The CSS files are imported in `assets/less/october/boot.less`.

With this approach, the `{{ framework }}` and `{{ framework.extras }}` variables should not be included in your layouts.

var Metalsmith = require('metalsmith'),
    Handlebars = require('handlebars'),
    metalsmithIf = require('metalsmith-if'),
	drafts = require('metalsmith-drafts'),
    less = require('metalsmith-less'),
	markdown = require('metalsmith-markdown'),
	excerpts = require('metalsmith-excerpts'),
	templates = require('metalsmith-templates'),
	collections = require('metalsmith-collections'),
	permalinks = require('metalsmith-permalinks'),
    ignore = require('metalsmith-ignore'),
	serve = require('metalsmith-serve'),
	watch = require('metalsmith-watch'),
	config = require('./config')(process.argv)

Handlebars.registerHelper('link', function (path) {
    return config.baseUrl + path
})

Metalsmith(__dirname)
	.source('./src')
	.destination('./build')
	.use(drafts())
    .use(less())
	.use(markdown())
	.use(excerpts())
	.use(permalinks({
		pattern: ':title'
	}))
	.use(collections({
		posts: {
			pattern: '*/*.html',
			sortBy: 'date',
			reverse: true
		},
		homePosts: {
			pattern: '*/*.html',
			sortBy: 'date',
			reverse: true,
			limit: 3
		}
	}))
	.use(templates({
		engine: 'handlebars',
		directory: 'templates',
		partials: {
			header: 'partials/header',
			footer: 'partials/footer'
		}
	}))
    .use(ignore([
        'styles/*',
        '!styles/main.css'
    ]))
    .use(metalsmithIf(config.isDev, serve({
        port: 8080,
        verbose: true
    })))
	.use(metalsmithIf(config.isDev, watch({
		pattern: '**/*'
	})))
	.build(function (err) {
		if (err) throw err
	})
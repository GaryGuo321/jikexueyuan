// md5并自动
// require文件合并

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browerSync = require('browser-sync').create();
var reload = browerSync.reload;

var jshint = require('gulp-jshint');
var htmlmin = require('gulp-htmlmin');
var cleancss = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var clean = require('gulp-clean');
var runSequence = require('run-sequence');
var amdOptimize = require("amd-optimize");
var concat = require('gulp-concat');
var rev = require('gulp-rev');
var through2 = require('through2');
var revCollector = require('gulp-rev-collector');


// 去掉后缀
function modify(modifier) {
	return through2.obj(function(file, encoding, done) {
		var content = modifier(String(file.contents));
		file.contents = new Buffer(content);
		this.push(file);
		done();
	});
}

function replaceJS(data) {
	return data.replace(/\.js/gmi, "");
}

function replaceCSS(data) {
	return data.replace(/\.css/gmi, "");
}



// 服务器
gulp.task('server', function() {
	browerSync.init({
		server: './src'
	});

	gulp.watch("./src/**/*.js", ['server:js']);
	gulp.watch("./src/**/*.css", ['server:css']);
	gulp.watch("./src/**/*.html", ['server:html']);
});

gulp.task('serverDist', function() {
	browerSync.init({
		port: '8080',
		server: './dist'
	});
});


// 服务器更新
gulp.task('server:js', function() {
	return gulp.src(['./src/**/*.js', '!./src/bower_components/**/*.js'])
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(reload({
			stream: true
		}));
});
gulp.task('server:css', function() {
	return gulp.src('src/**/*.css')
		.pipe(autoprefixer({
			browsers: ['last 2 version', 'Safari 5', 'ie 8', 'ie 9', 'Opera 12.1', 'iOS 6', 'Android 4']
		}))
		.pipe(reload({
			stream: true
		}));
});
gulp.task('server:html', function() {
	return gulp.src('src/**/*.html')
		.pipe(reload({
			stream: true
		}));
});


// build

// html
gulp.task('build:html', function() {
	return gulp.src('./src/*.html')
		.pipe(htmlmin({
			removeComments: true,
			collapseWhitespace: true,
			collapseBooleanAttributes: true,
			removeScriptTypeAttributes: true,
			removeStyleLinkTypeAttributes: true
		}))
		.pipe(gulp.dest('dist'))
});

// css
gulp.task('build:css', function() {
	return gulp.src(['./src/css/*.css'])
		.pipe(autoprefixer({
			browsers: ['last 2 version', 'Safari 5', 'ie 8', 'ie 9', 'Opera 12.1', 'iOS 6', 'Android 4']
		}))
		.pipe(cleancss({
			compatibility: 'ie8',
			keepSpecialComments: '*'
		}))
		.pipe(rev())
		.pipe(gulp.dest('dist/css'))
		.pipe(rev.manifest({
			merge: true
		}))
		.pipe(gulp.dest('src/css'))
});

gulp.task('build:componentCSS', function() {
	return gulp.src(['./src/component/**/*.css'])
		.pipe(autoprefixer({
			browsers: ['last 2 version', 'Safari 5', 'ie 8', 'ie 9', 'Opera 12.1', 'iOS 6', 'Android 4']
		}))
		.pipe(cleancss({
			compatibility: 'ie8',
			keepSpecialComments: '*'
		}))
		.pipe(rev())
		.pipe(gulp.dest('dist/component'))
		.pipe(rev.manifest({
			merge: true
		}))
		.pipe(modify(replaceCSS))
		.pipe(gulp.dest('src/component'))
});


// js
gulp.task('build:js', function() {
	return gulp.src('./src/**/*.js')
		.pipe(amdOptimize('src/js/index', {
			paths: {
				'jquery': 'src/bower_components/jquery/dist/jquery.min',
				'emitter': 'src/js/lib/emitter',
				'lifeCycle': 'src/js/lib/lifeCycle',
				'combatPath': 'src/component/combat-path/combat-path',
				'knowledgeSystem': 'src/component/knowledge-system/knowledge-system',
				'partnerBanner': 'src/component/partner-banner/partner-banner',
				'subjectTab': 'src/component/subject-tab/subject-tab',
				'subjectBanner': 'src/component/subject-banner/subject-banner',
				'navLists': 'src/component/nav-lists/nav-lists',
				'ejs': 'src/bower_components/ejs/ejs.min'
			}
		}))
		.pipe(concat('index.js'))
		.pipe(uglify({
			mangle: {
				except: ['require', 'exports', 'module', '$', 'define']
			}
		}))
		.pipe(rev())
		.pipe(gulp.dest('dist/js'))
		.pipe(rev.manifest({
			merge: true
		}))
		.pipe(modify(replaceJS))
		.pipe(gulp.dest('src/js'))
});

gulp.task('replaceHTML', function() {
	gulp.src(['src/**/rev-manifest.json', 'dist/index.html'])
		.pipe(revCollector())
		.pipe(gulp.dest('dist'))
});

gulp.task('replaceCSS', function() {
	gulp.src(['src/image/rev-manifest.json', 'dist/**/*.css'])
		.pipe(revCollector())
		.pipe(gulp.dest('dist'))
});

gulp.task('replaceJSON', function() {
	gulp.src(['src/**/rev-manifest.json', 'dist/data/*.json'])
		.pipe(revCollector())
		.pipe(gulp.dest('dist/data'))
});

gulp.task('replaceJS', function() {
	gulp.src(['src/component/rev-manifest.json', 'dist/js/*.js'])
		.pipe(revCollector())
		.pipe(gulp.dest('dist/js'))
});



// 图片
gulp.task('build:img', function() {
	return gulp.src('./src/**/*.{png,jpg,gif,ico}')
		.pipe(cache(imagemin({
			optimizationLevel: 3,
			progressive: true,
			interlaced: true
		})))
		.pipe(rev())
		.pipe(gulp.dest('dist'))
		.pipe(rev.manifest({
			merge: true
		}))
		.pipe(gulp.dest('src/image'));
});

// 依赖
gulp.task('build:bower', function() {
	return gulp.src('./src/bower_components/**')
		.pipe(gulp.dest('dist/bower_components'))
});

// 数据
gulp.task('build:data', function() {
	return gulp.src('./src/**/*.json')
		.pipe(gulp.dest('dist'))
});

// 清理
gulp.task('clean', function() {
	return gulp.src('dist/', {
			read: false
		})
		.pipe(clean());
});

gulp.task('default', ['clean'], function() {
	runSequence(['build:html', 'build:css', 'build:js', 'build:img', 'build:bower', 'build:data', 'build:componentCSS'], ['replaceCSS', 'replaceHTML', 'replaceJSON', 'replaceJS']);
});
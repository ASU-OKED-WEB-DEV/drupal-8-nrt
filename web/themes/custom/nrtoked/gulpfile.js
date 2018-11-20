var gulp        = require('gulp'),
    // plugin1     = require('gulp-plugin1'),
    // plugin2     = require('gulp-plugin2'),
    browserSync = require('browser-sync'),
    sass        = require('gulp-sass'),
    prefix      = require('gulp-autoprefixer'),
    concat      = require('gulp-concat'),
    babel       = require('gulp-babel'),
    cp          = require('child_process'),
    yaml        = require('gulp-yaml-validate'),
    minify      = require('gulp-minify'),
    cssmin      = require('gulp-cssmin'),
    rename      = require('gulp-rename'),
    sourcemaps  = require('gulp-sourcemaps'),
    shell       = require('gulp-shell'),
    gulpssh     = require('gulp-ssh');

gulp.src('./*.yml')
    .pipe(yaml());

gulp.src('./*.yml')
    .pipe(yaml({ safe: true }));

gulp.src('./*.yml')
    .pipe(yaml({ html: true }));

var config = {
    host: '127.0.0.1',
    port: 2222,
    username: 'vagrant',
    //privateKey: fs.readFileSync('/Users/zensh/.ssh/id_rsa')
}

var gulpSSH = new gulpssh({
    ignoreErrors: false,
    sshConfig: config
})

/**
 * Launch the Server
*/
gulp.task('browser-sync', ['sass', 'scripts'], function() {
    browserSync.init({
        // Change as required, also remember to set in theme settings
        proxy: "nrt.lndo.site"
    });
}); 

/**
 * @task sass
 * Compile files from scss
 */
gulp.task('sass', function () {
    return gulp.src('sass/styles.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        // .pipe(cssmin())
        // .pipe(rename({suffix: '-min'}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.reload({stream:true}))
});

/**
 * @task scripts
 * Compile files from js
 */
gulp.task('scripts', function() {
    return gulp.src(['_js/*.js', '_js/custom.js'])
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat('scripts.js'))
        .pipe(minify())
        .pipe(gulp.dest('js'))
        .pipe(browserSync.reload({stream:true}))
});

/**
 * @task clearcache
 * Clear all caches
 */
/*gulp.task('clearcache', function(done) {
    return cp.spawn('drush', ['cache-rebuild'], {stdio: 'inherit'})
        .on('close', done);
});*/

/**
 * @task clearcache
 * SSH and clears cache for Drupal
 */
gulp.task('shell', function (done) {
    return gulpSSH
        .shell(['cd /vagrant/public/dev.oria.asu.edu', 'drush cr'], {filePath: 'shell.log'})
        .pipe(gulp.dest('logs'))
})

/**
 * @task reload
 * Refresh the page after clearing cache
 */
gulp.task('reload', ['shell'], function () {
    browserSync.reload();
});


/**
 * @task watch
 * Watch scss files for changes & recompile
 * Clear cache when Drupal related files are changed
 */
gulp.task('watch', function () {
    gulp.watch(['sass/styles.scss', 'sass/**/*.scss'], ['sass']);
    gulp.watch(['_js/*.js'], ['scripts']);
   // gulp.watch(['templates/*.html.twig', '**/*.yml'], ['reload']);
});

/**
 * Default task, running just `gulp` will
 * compile Sass files, launch BrowserSync, watch files.
 */
gulp.task('default', ['browser-sync', 'watch']);
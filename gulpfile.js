/*
gulp-if ( build dev vs production )
gulp webpack ( js )
*/

'use strict';

const { src, dest, parallel, series, watch } = require('gulp');
const argv = require('yargs').argv
const autoprefixer = require('autoprefixer')
const browsersync = require('browser-sync');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const cssnano = require('cssnano')
const data = require('gulp-data');
const del = require('del');
const fs = require('fs');
const mode = argv.production ? 'production' : 'dev';
const path = require('path');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss')
const sass = require('gulp-dart-sass');
const sourcemaps = require('gulp-sourcemaps');
const tailwindcss = require('tailwindcss')
const twig = require('gulp-twig');

console.log( 'mode', mode );

/*
clean
Remove files form dist folder
*/
function clean() {
    return del(['dist/**', '!dist'], { force: true });
}

/*
Images
Copy images folder to dist
*/
function fonts() {
    return src('assets/images/**.*')
        .pipe(dest('dist/images'));
}

/*
Fonts
Copy fonts folder to dist
*/
function images() {
    return src('assets/fonts/**.*')
        .pipe(dest('dist/fonts'));
}

/*
Svg
Move source to dest
*/
function svg() {
    return src('assets/svg/**.*')
        .pipe(dest('dist/svg'));
}

/*
Scss
sourceMap
autoprefixer
*/
function styles() {
    return src(['assets/styles/main.scss'])
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(postcss([ 
            tailwindcss(),
            autoprefixer(), 
           // cssnano({preset: 'default',})
        ]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('dist/styles'))
        .pipe(browserSync.stream());
}

function tailwind() {
    return src(['assets/styles/tailwind.scss'])
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(postcss([ 
            tailwindcss(),
            autoprefixer(), 
            //cssnano({preset: 'default',})
        ]))
        .pipe(dest('dist/styles'))
        .pipe(browserSync.stream());
}

/*
browser-sync
watch
*/
function server() {
    browserSync.init({
        server: {
           baseDir: "./src",
           index: "/index.html"
        }
    });
    watch('assets/styles/**/*.scss', styles)
    watch('./*.html').on('change',browserSync.reload);
    // gulp.watch('./js/**/*.js').on('change', browserSync.reload);
}

// Tasks
exports.clean = clean;
exports.images = images;
exports.fonts = fonts;
exports.svg = svg;
exports.styles = styles;
exports.tailwind = tailwind;
exports.server = server;

// Default task
exports.default = series(clean, images, fonts, svg);

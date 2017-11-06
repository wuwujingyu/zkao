var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var uglify = require('gulp-uglify');
var minify = require('gulp-minify-css');
var webserver = require('gulp-webserver');
var url = require('url');
var fs = require('fs');

gulp.task('webserver',function(){
    gulp.src('.index.html')
        .pipe(webserver({
            port:9999,
            host:'localhost',
            middleware:function(req,res,next){
                var obj = url.parse(req.url);
                res.setHeader('Access-Control-Allow-Origin','*')
                if(req.method==='GET'){
                    if(obj.pathname === '/getdata'){
                        res.end(fs.readFileSync('data.json'))
                    }
                }
            }
        }))
})
gulp.task('htmlmin',function(){
    gulp.src('./*.html')
        .pipe(htmlmin({
            removeComments:true,
            collapseBooleanAttributes:true,
            removeScriptTypeAttributes:true,
            removeStyleLinkTypeAttributes:true,
            minifyCSS:true,
            minifyJS:true
        }))
        .pipe(gulp.dest('bulid'))
})
gulp.task('yscss',function(){
    gulp.src('./*.css')
        .pipe(minify()).pipe(gulp.dest('bulid'))
})
gulp.task('ysjs',function(){
    gulp.src('./*.js')
        .pipe(uglify()).pipe(gulp.dest('bulid'))
})
gulp.task('default',['webserver','htmlmin','yscss','ysjs'])
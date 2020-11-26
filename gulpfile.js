const { series,src, dest } = require('gulp');


function copyBuildFiles(cb){
    return src('build/**/*')
    .pipe(dest('../timdarcy.github.io/'))
}
exports.copyBuildFiles = copyBuildFiles;
exports.default = series(copyBuildFiles);
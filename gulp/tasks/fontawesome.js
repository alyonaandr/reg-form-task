"use strict";

module.exports = function() {
    $.gulp.task("fontawesome", function() {
        return $.gulp
            .src("./node_modules/@fortawesome/fontawesome-free/css/all.css")
            .pipe($.gulp.dest($.config.root + "/css"))
    });
};

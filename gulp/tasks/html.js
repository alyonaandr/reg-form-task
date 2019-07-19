"use strict";

module.exports = function() {
    $.gulp.task("html", function() {
        return $.gulp
            .src("./source/page/*.html")
            .pipe($.gulp.dest("./build"))
            .pipe($.browserSync.stream());
    });
};

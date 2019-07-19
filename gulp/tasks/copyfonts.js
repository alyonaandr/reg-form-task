"use strict";

module.exports = function() {
    $.gulp.task("copyfonts", function() {
        return $.gulp.src("./source/fonts/**").pipe($.gulp.dest($.config.root + "/fonts/"));
    });
};

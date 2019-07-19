"use strict";

module.exports = function() {
    $.gulp.task("copy:image:build", function() {
        return $.gulp
            .src([
                "./source/img/**",
                "!./source/img/**/*.jpg",
                "!./source/img/**/*.png",
                "!./source/img/**/*.svg"
            ])
            .pipe($.gulp.dest($.config.root + "/img"));
    });
};

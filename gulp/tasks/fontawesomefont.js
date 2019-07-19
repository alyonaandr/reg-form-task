"use strict";

module.exports = function() {
    $.gulp.task("fontawesomefont", function() {
        return $.gulp
            .src("./node_modules/@fortawesome/fontawesome-free/webfonts/*")
            .pipe($.gulp.dest($.config.root + "/webfonts"))
    });
};

"use strict";

module.exports = function() {
    $.gulp.task("watch", function() {
        $.gp.watch("./source/**/*.{pug,html,json}", $.gulp.series("pug"));
        $.gp.watch("./source/**/*.{js,json}", $.gulp.series("js:process"));
        $.gp.watch("./source/**/*.less", $.gulp.series("less"));
        $.gp.watch("./source/img/**", $.gulp.series(["copy:image"]));
        $.gp.watch("./source/page/*.html", $.gulp.series("html"));
    });
};

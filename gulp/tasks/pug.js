"use strict";

module.exports = function() {
    $.gulp.task("pug", function() {
        return $.gulp
            .src("./source/page/*.pug")
            .pipe(
                $.gp.pug({
                    data: {
                        content: JSON.parse(
                            $.fs.readFileSync(
                                "./source/data/content.json",
                                "utf8"
                            )
                        )
                    },
                    pretty: true
                })
            )
            .pipe($.gulp.dest("./build"))
            .pipe($.browserSync.stream());
    });
};

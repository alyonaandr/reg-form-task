"use strict";

module.exports = function() {
    $.gulp.task("js:process", function() {
        return $.gulp
            .src($.path.js)
            .pipe(
                $._json({
                    src: "./source/data/content.json",
                    namespace: "content"
                })
            )
            .pipe($.gp.rigger())
            .pipe($.gp.concat("script.js"))
            .pipe($.gp.if($.config.development, $.gp.sourcemaps.init()))
            .pipe($.gp.if(!$.config.development, $.gp.uglify()))
            .on("error", $.gp.notify.onError({ title: "Script" }))
            .pipe($.gp.if($.config.development, $.gp.sourcemaps.write()))
            .pipe($.gulp.dest($.config.root + "/js"))
            .on("end", $.browserSync.reload);
    });
};

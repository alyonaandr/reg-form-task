"use strict";

module.exports = function() {
    $.gulp.task("less", function() {
        return $.gulp
            .src("./source/css/*.less")
            .pipe($.gp.if($.config.development, $.gp.sourcemaps.init()))
            .pipe($.gp.less())
            .on("error", $.gp.notify.onError({ title: "Style" }))
            .pipe($.gp.autoprefixer({ overrideBrowserslist: $.config.autoprefixerConfig}))
            .pipe($.gp.if(!$.config.development, $.gp.cleanCss()))
            .pipe($.gp.if($.config.development, $.gp.sourcemaps.write()))
            .pipe($.gulp.dest($.config.root + "/css"))
            .pipe($.browserSync.stream());
    });
};
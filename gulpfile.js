"use strict";

global.$ = {
    config: require("./gulp/config"),
    path: {
        task: require("./gulp/paths/tasks.js"),
        js: [
            "source/page/**/*.js",
            "source/js/script.js"
        ]
    },
    fs: require("fs"),
    _json: require("gulp-json-wrapper"),
    gulp: require("gulp"),
    del: require("del"),
    browserSync: require("browser-sync").create(),
    gp: require("gulp-load-plugins")()
};

$.path.task.forEach(function(taskPath) {
    require(taskPath)();
});

$.gulp.task(
    "default",
    $.gulp.series(
        "clean",
        $.gulp.parallel(
            "less",
            "js:process",
            "copy:image",
            "html",
            "pug",
            "copyfonts",
            "fontawesome",
            "fontawesomefont",
            "serve",
            "watch"
        ),
        $.gulp.parallel("serve", "watch")
    )
);

"use strict";

module.exports = function() {
    $.gulp.task("serve", function() {
        $.browserSync.init({
            server: {
                baseDir: "./build"
            },
            tunnel: false,
            host: "localhost",
            port: 9000,
        });

        $.browserSync.watch([$.config.root + "/**/*.*", "!**/*.css"], $.browserSync.reload);
    });
};

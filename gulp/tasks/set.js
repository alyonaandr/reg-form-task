"use strict";

module.exports = function() {
    $.gulp.task("set:prod", function(callback) {
        $.config.development = false;
        callback();
    });
};

$(document).ready(function () {

    let year = $("#year"),
        email = $("#email"),
        password = $("#password"),
        postalCode = $("#postalCode");

    addAndRemoveClasses = (i, add, remove) => {
        i.addClass(add);
        i.removeClass(remove);
    };

    validationPerOneAction = (i, value) => {
        if (value) {
            addAndRemoveClasses(i, "error", "valid");
            i.parent().find(".error-msg").addClass("active__error-msg");
        } else {
            addAndRemoveClasses(i, "valid", "error");
        }
    };

    //check inputs are empty or valid
    email.on("blur", function () {
        let $this = $(this);
        if ($this.val().length === 0) {
            addAndRemoveClasses($this, "error", "valid");
            $this.parent().find(".error-msg--empty").addClass("active__error-msg");
        } else if (!($this.val().indexOf("@") > -1)) {
            addAndRemoveClasses($this, "error", "valid");
            $this.parent().find(".error-msg--wrong").addClass("active__error-msg");
        } else {
            addAndRemoveClasses($this, "valid", "error");
        }
    });

    password.on("blur", function () {
        let $this = $(this);
        validationPerOneAction($this, ($this.val().length === 0));
    });

    postalCode.on("blur", function () {
        let $this = $(this);
        validationPerOneAction($this, ($this.val().length === 0));
    });

    year.on("blur", function () {
        let $this = $(this);
        validationPerOneAction($this, ($this.val() > 2001));
    });

    //clear inputs on focus
    $(".form__item-input").on("focus", function () {
        let $this = $(this);
        if ($this.hasClass("error")) {
            $(this).val("");
            $this.parent().find(".error-msg").removeClass("active__error-msg");
        }
    });

    //clear select on focus
    $(".form__item-select").on("focus", function () {
        let $this = $(this);
        if ($this.hasClass("error")) {
            $(this).val();
            $this.parent().find(".error-msg").removeClass("active__error-msg");
        }
    });

    //btn question active
    $(".form__info-btn").click(function (event) {
        let $this = $(this);
        event.preventDefault();
        $this.parent().find(".form__btn-info").toggleClass("active__btn-info");
    });

    $("#registerForm").submit(function(e) {

        e.preventDefault();

        $(".form__block input, select").removeClass("error");
        $(".form__block input, select").removeClass("valid");

        validateFields = () => {
            let validateYear = true;
            let validateEmail = true;
            let validatePassword = true;
            let validatePostalCode = true;

            smallFunctionForValidateFields = (i, findClass) => {
                $(i).addClass("error");
                $(i).parent().find(findClass).addClass("active__error-msg");
            };

            if (year.val() > 2001) {
                smallFunctionForValidateFields("#year", ".error-msg");
                validateYear = false;
            }

            if (email.val().length === 0) {
                smallFunctionForValidateFields("#email", ".error-msg--empty");
                validateEmail = false;
            } else if (!(email.val().indexOf("@") > -1)) {
                smallFunctionForValidateFields("#email", ".error-msg--wrong");
                validateEmail = false;
            }

            if (password.val().length === 0) {
                smallFunctionForValidateFields("#password", ".error-msg");
                validatePassword = false;
            }

            if (postalCode.val().length === 0) {
                smallFunctionForValidateFields("#postalCode", ".error-msg");
                validatePostalCode = false;
            }

            if (validateYear && validateEmail && validatePassword && validatePostalCode) {
                return true;
            }
        };

        if (validateFields()) {
            console.log("Form is valid!");
            year.val("2019");
            email.val("");
            password.val("");
            postalCode.val("");
        } else {
            console.log('Validation form error!');
        }

    })
});var content={"htmlLang":"ru","title":"Reg Form Task","googleFonts":"https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap"};
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzY3JpcHQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuXG4gICAgbGV0IHllYXIgPSAkKFwiI3llYXJcIiksXG4gICAgICAgIGVtYWlsID0gJChcIiNlbWFpbFwiKSxcbiAgICAgICAgcGFzc3dvcmQgPSAkKFwiI3Bhc3N3b3JkXCIpLFxuICAgICAgICBwb3N0YWxDb2RlID0gJChcIiNwb3N0YWxDb2RlXCIpO1xuXG4gICAgYWRkQW5kUmVtb3ZlQ2xhc3NlcyA9IChpLCBhZGQsIHJlbW92ZSkgPT4ge1xuICAgICAgICBpLmFkZENsYXNzKGFkZCk7XG4gICAgICAgIGkucmVtb3ZlQ2xhc3MocmVtb3ZlKTtcbiAgICB9O1xuXG4gICAgdmFsaWRhdGlvblBlck9uZUFjdGlvbiA9IChpLCB2YWx1ZSkgPT4ge1xuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIGFkZEFuZFJlbW92ZUNsYXNzZXMoaSwgXCJlcnJvclwiLCBcInZhbGlkXCIpO1xuICAgICAgICAgICAgaS5wYXJlbnQoKS5maW5kKFwiLmVycm9yLW1zZ1wiKS5hZGRDbGFzcyhcImFjdGl2ZV9fZXJyb3ItbXNnXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYWRkQW5kUmVtb3ZlQ2xhc3NlcyhpLCBcInZhbGlkXCIsIFwiZXJyb3JcIik7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLy9jaGVjayBpbnB1dHMgYXJlIGVtcHR5IG9yIHZhbGlkXG4gICAgZW1haWwub24oXCJibHVyXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbGV0ICR0aGlzID0gJCh0aGlzKTtcbiAgICAgICAgaWYgKCR0aGlzLnZhbCgpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgYWRkQW5kUmVtb3ZlQ2xhc3NlcygkdGhpcywgXCJlcnJvclwiLCBcInZhbGlkXCIpO1xuICAgICAgICAgICAgJHRoaXMucGFyZW50KCkuZmluZChcIi5lcnJvci1tc2ctLWVtcHR5XCIpLmFkZENsYXNzKFwiYWN0aXZlX19lcnJvci1tc2dcIik7XG4gICAgICAgIH0gZWxzZSBpZiAoISgkdGhpcy52YWwoKS5pbmRleE9mKFwiQFwiKSA+IC0xKSkge1xuICAgICAgICAgICAgYWRkQW5kUmVtb3ZlQ2xhc3NlcygkdGhpcywgXCJlcnJvclwiLCBcInZhbGlkXCIpO1xuICAgICAgICAgICAgJHRoaXMucGFyZW50KCkuZmluZChcIi5lcnJvci1tc2ctLXdyb25nXCIpLmFkZENsYXNzKFwiYWN0aXZlX19lcnJvci1tc2dcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhZGRBbmRSZW1vdmVDbGFzc2VzKCR0aGlzLCBcInZhbGlkXCIsIFwiZXJyb3JcIik7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHBhc3N3b3JkLm9uKFwiYmx1clwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxldCAkdGhpcyA9ICQodGhpcyk7XG4gICAgICAgIHZhbGlkYXRpb25QZXJPbmVBY3Rpb24oJHRoaXMsICgkdGhpcy52YWwoKS5sZW5ndGggPT09IDApKTtcbiAgICB9KTtcblxuICAgIHBvc3RhbENvZGUub24oXCJibHVyXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbGV0ICR0aGlzID0gJCh0aGlzKTtcbiAgICAgICAgdmFsaWRhdGlvblBlck9uZUFjdGlvbigkdGhpcywgKCR0aGlzLnZhbCgpLmxlbmd0aCA9PT0gMCkpO1xuICAgIH0pO1xuXG4gICAgeWVhci5vbihcImJsdXJcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICBsZXQgJHRoaXMgPSAkKHRoaXMpO1xuICAgICAgICB2YWxpZGF0aW9uUGVyT25lQWN0aW9uKCR0aGlzLCAoJHRoaXMudmFsKCkgPiAyMDAxKSk7XG4gICAgfSk7XG5cbiAgICAvL2NsZWFyIGlucHV0cyBvbiBmb2N1c1xuICAgICQoXCIuZm9ybV9faXRlbS1pbnB1dFwiKS5vbihcImZvY3VzXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbGV0ICR0aGlzID0gJCh0aGlzKTtcbiAgICAgICAgaWYgKCR0aGlzLmhhc0NsYXNzKFwiZXJyb3JcIikpIHtcbiAgICAgICAgICAgICQodGhpcykudmFsKFwiXCIpO1xuICAgICAgICAgICAgJHRoaXMucGFyZW50KCkuZmluZChcIi5lcnJvci1tc2dcIikucmVtb3ZlQ2xhc3MoXCJhY3RpdmVfX2Vycm9yLW1zZ1wiKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy9jbGVhciBzZWxlY3Qgb24gZm9jdXNcbiAgICAkKFwiLmZvcm1fX2l0ZW0tc2VsZWN0XCIpLm9uKFwiZm9jdXNcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICBsZXQgJHRoaXMgPSAkKHRoaXMpO1xuICAgICAgICBpZiAoJHRoaXMuaGFzQ2xhc3MoXCJlcnJvclwiKSkge1xuICAgICAgICAgICAgJCh0aGlzKS52YWwoKTtcbiAgICAgICAgICAgICR0aGlzLnBhcmVudCgpLmZpbmQoXCIuZXJyb3ItbXNnXCIpLnJlbW92ZUNsYXNzKFwiYWN0aXZlX19lcnJvci1tc2dcIik7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vYnRuIHF1ZXN0aW9uIGFjdGl2ZVxuICAgICQoXCIuZm9ybV9faW5mby1idG5cIikuY2xpY2soZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIGxldCAkdGhpcyA9ICQodGhpcyk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICR0aGlzLnBhcmVudCgpLmZpbmQoXCIuZm9ybV9fYnRuLWluZm9cIikudG9nZ2xlQ2xhc3MoXCJhY3RpdmVfX2J0bi1pbmZvXCIpO1xuICAgIH0pO1xuXG4gICAgJChcIiNyZWdpc3RlckZvcm1cIikuc3VibWl0KGZ1bmN0aW9uKGUpIHtcblxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgJChcIi5mb3JtX19ibG9jayBpbnB1dCwgc2VsZWN0XCIpLnJlbW92ZUNsYXNzKFwiZXJyb3JcIik7XG4gICAgICAgICQoXCIuZm9ybV9fYmxvY2sgaW5wdXQsIHNlbGVjdFwiKS5yZW1vdmVDbGFzcyhcInZhbGlkXCIpO1xuXG4gICAgICAgIHZhbGlkYXRlRmllbGRzID0gKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHZhbGlkYXRlWWVhciA9IHRydWU7XG4gICAgICAgICAgICBsZXQgdmFsaWRhdGVFbWFpbCA9IHRydWU7XG4gICAgICAgICAgICBsZXQgdmFsaWRhdGVQYXNzd29yZCA9IHRydWU7XG4gICAgICAgICAgICBsZXQgdmFsaWRhdGVQb3N0YWxDb2RlID0gdHJ1ZTtcblxuICAgICAgICAgICAgc21hbGxGdW5jdGlvbkZvclZhbGlkYXRlRmllbGRzID0gKGksIGZpbmRDbGFzcykgPT4ge1xuICAgICAgICAgICAgICAgICQoaSkuYWRkQ2xhc3MoXCJlcnJvclwiKTtcbiAgICAgICAgICAgICAgICAkKGkpLnBhcmVudCgpLmZpbmQoZmluZENsYXNzKS5hZGRDbGFzcyhcImFjdGl2ZV9fZXJyb3ItbXNnXCIpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgaWYgKHllYXIudmFsKCkgPiAyMDAxKSB7XG4gICAgICAgICAgICAgICAgc21hbGxGdW5jdGlvbkZvclZhbGlkYXRlRmllbGRzKFwiI3llYXJcIiwgXCIuZXJyb3ItbXNnXCIpO1xuICAgICAgICAgICAgICAgIHZhbGlkYXRlWWVhciA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZW1haWwudmFsKCkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgc21hbGxGdW5jdGlvbkZvclZhbGlkYXRlRmllbGRzKFwiI2VtYWlsXCIsIFwiLmVycm9yLW1zZy0tZW1wdHlcIik7XG4gICAgICAgICAgICAgICAgdmFsaWRhdGVFbWFpbCA9IGZhbHNlO1xuICAgICAgICAgICAgfSBlbHNlIGlmICghKGVtYWlsLnZhbCgpLmluZGV4T2YoXCJAXCIpID4gLTEpKSB7XG4gICAgICAgICAgICAgICAgc21hbGxGdW5jdGlvbkZvclZhbGlkYXRlRmllbGRzKFwiI2VtYWlsXCIsIFwiLmVycm9yLW1zZy0td3JvbmdcIik7XG4gICAgICAgICAgICAgICAgdmFsaWRhdGVFbWFpbCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAocGFzc3dvcmQudmFsKCkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgc21hbGxGdW5jdGlvbkZvclZhbGlkYXRlRmllbGRzKFwiI3Bhc3N3b3JkXCIsIFwiLmVycm9yLW1zZ1wiKTtcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZVBhc3N3b3JkID0gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChwb3N0YWxDb2RlLnZhbCgpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHNtYWxsRnVuY3Rpb25Gb3JWYWxpZGF0ZUZpZWxkcyhcIiNwb3N0YWxDb2RlXCIsIFwiLmVycm9yLW1zZ1wiKTtcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZVBvc3RhbENvZGUgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHZhbGlkYXRlWWVhciAmJiB2YWxpZGF0ZUVtYWlsICYmIHZhbGlkYXRlUGFzc3dvcmQgJiYgdmFsaWRhdGVQb3N0YWxDb2RlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKHZhbGlkYXRlRmllbGRzKCkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRm9ybSBpcyB2YWxpZCFcIik7XG4gICAgICAgICAgICB5ZWFyLnZhbChcIjIwMTlcIik7XG4gICAgICAgICAgICBlbWFpbC52YWwoXCJcIik7XG4gICAgICAgICAgICBwYXNzd29yZC52YWwoXCJcIik7XG4gICAgICAgICAgICBwb3N0YWxDb2RlLnZhbChcIlwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdWYWxpZGF0aW9uIGZvcm0gZXJyb3IhJyk7XG4gICAgICAgIH1cblxuICAgIH0pXG59KTt2YXIgY29udGVudD17XCJodG1sTGFuZ1wiOlwicnVcIixcInRpdGxlXCI6XCJSZWcgRm9ybSBUYXNrXCIsXCJnb29nbGVGb250c1wiOlwiaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3M/ZmFtaWx5PVJvYm90bzo0MDAsNzAwJmRpc3BsYXk9c3dhcFwifTsiXSwiZmlsZSI6InNjcmlwdC5qcyJ9

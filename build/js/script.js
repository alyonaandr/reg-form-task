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

    // email.on("blur", function () {
    //     let $this = $(this);
    //     if ($this.val().length === 0) {
    //         addAndRemoveClasses($this, "error", "valid");
    //         $this.parent().find(".error-msg--empty").addClass("active__error-msg");
    //     } else if (!($this.val().indexOf("@") > -1)) {
    //         addAndRemoveClasses($this, "error", "valid");
    //         $this.parent().find(".error-msg--wrong").addClass("active__error-msg");
    //     } else {
    //         addAndRemoveClasses($this, "valid", "error");
    //     }
    // });
    // add regExp
    let emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    email.on("blur", function () {
        let $this = $(this);
        let emailValid = emailRegExp.test($this.val());

        if ($this.val().length === 0) {
            addAndRemoveClasses($this, "error", "valid");
            $this.parent().find(".error-msg--empty").addClass("active__error-msg");
        } else if (!emailValid) {
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

    year.on("blur", function () {
        let $this = $(this);
        validationPerOneAction($this, ($this.val() > 2001));
    });

    postalCode.on("keyup", function () {
        let $this = $(this);
        for (i = 0; i < $this.val().length; i++) {

            $this.parent().find(".error-msg--wrong-few").removeClass("active__error-msg");
            $this.parent().find(".error-msg--wrong-lot").removeClass("active__error-msg");

            addAndRemoveClasses($this, "error", "valid");

            if (($this.val().length < 5) && ($this.val().length !== 0)) {
                $this.parent().find(".error-msg--wrong-few").addClass("active__error-msg");
            } else if ($this.val().length > 30) {
                $this.parent().find(".error-msg--wrong-lot").addClass("active__error-msg");
            } else {
                addAndRemoveClasses($this, "valid", "error");
            }
        }
    });
    postalCode.on("blur", function () {
        let $this = $(this);
        $this.parent().find(".error-msg--wrong-few").removeClass("active__error-msg");
        $this.parent().find(".error-msg--wrong-lot").removeClass("active__error-msg");
        if ($this.val().length === 0) {
            addAndRemoveClasses($this, "error", "valid");
            $this.parent().find(".error-msg--empty").addClass("active__error-msg");
        } else {
            addAndRemoveClasses($this, "valid", "error");
        }
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

    // btn question active
    $(".form__info-btn").click(function (event) {
        let $this = $(this);
        event.preventDefault();
        $this.parent().find(".form__btn-info").toggleClass("active__btn-info");
    });
    $(".form__info-btn").on("mouseover", function () {
        let $this = $(this);
        let active = $this.parent().find(".form__btn-info").hasClass("active__btn-info");
        if (active !== true) {
            $this.parent().find(".form__btn-info").addClass("active__btn-info");
        }
    });
    $(".form__info-btn").on("mouseout", function () {
        let $this = $(this);
        let noactive = $this.parent().find(".form__btn-info").hasClass("active__btn-info");
        if (noactive === true) {
            $this.parent().find(".form__btn-info").removeClass("active__btn-info");
        }
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
            } else if (!(emailRegExp.test(email.val()))) {
                smallFunctionForValidateFields("#email", ".error-msg--wrong");
                validateEmail = false;
            }

            if (password.val().length === 0) {
                smallFunctionForValidateFields("#password", ".error-msg");
                validatePassword = false;
            }

            if (postalCode.val().length === 0) {
                smallFunctionForValidateFields("#postalCode", ".error-msg--empty");
                validatePostalCode = false;
            } else if ((postalCode.val().length < 5) && (postalCode.val().length !== 0)) {
                smallFunctionForValidateFields("#postalCode", ".error-msg--wrong-few");
                validateEmail = false;
            } else if (postalCode.val().length > 30) {
                smallFunctionForValidateFields("#postalCode", ".error-msg--wrong-lot");
                validateEmail = false;
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

    });
});var content={"htmlLang":"ru","title":"Reg Form Task","googleFonts":"https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap"};
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzY3JpcHQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuXG4gICAgbGV0IHllYXIgPSAkKFwiI3llYXJcIiksXG4gICAgICAgIGVtYWlsID0gJChcIiNlbWFpbFwiKSxcbiAgICAgICAgcGFzc3dvcmQgPSAkKFwiI3Bhc3N3b3JkXCIpLFxuICAgICAgICBwb3N0YWxDb2RlID0gJChcIiNwb3N0YWxDb2RlXCIpO1xuXG4gICAgYWRkQW5kUmVtb3ZlQ2xhc3NlcyA9IChpLCBhZGQsIHJlbW92ZSkgPT4ge1xuICAgICAgICBpLmFkZENsYXNzKGFkZCk7XG4gICAgICAgIGkucmVtb3ZlQ2xhc3MocmVtb3ZlKTtcbiAgICB9O1xuXG4gICAgdmFsaWRhdGlvblBlck9uZUFjdGlvbiA9IChpLCB2YWx1ZSkgPT4ge1xuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIGFkZEFuZFJlbW92ZUNsYXNzZXMoaSwgXCJlcnJvclwiLCBcInZhbGlkXCIpO1xuICAgICAgICAgICAgaS5wYXJlbnQoKS5maW5kKFwiLmVycm9yLW1zZ1wiKS5hZGRDbGFzcyhcImFjdGl2ZV9fZXJyb3ItbXNnXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYWRkQW5kUmVtb3ZlQ2xhc3NlcyhpLCBcInZhbGlkXCIsIFwiZXJyb3JcIik7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLy9jaGVjayBpbnB1dHMgYXJlIGVtcHR5IG9yIHZhbGlkXG5cbiAgICAvLyBlbWFpbC5vbihcImJsdXJcIiwgZnVuY3Rpb24gKCkge1xuICAgIC8vICAgICBsZXQgJHRoaXMgPSAkKHRoaXMpO1xuICAgIC8vICAgICBpZiAoJHRoaXMudmFsKCkubGVuZ3RoID09PSAwKSB7XG4gICAgLy8gICAgICAgICBhZGRBbmRSZW1vdmVDbGFzc2VzKCR0aGlzLCBcImVycm9yXCIsIFwidmFsaWRcIik7XG4gICAgLy8gICAgICAgICAkdGhpcy5wYXJlbnQoKS5maW5kKFwiLmVycm9yLW1zZy0tZW1wdHlcIikuYWRkQ2xhc3MoXCJhY3RpdmVfX2Vycm9yLW1zZ1wiKTtcbiAgICAvLyAgICAgfSBlbHNlIGlmICghKCR0aGlzLnZhbCgpLmluZGV4T2YoXCJAXCIpID4gLTEpKSB7XG4gICAgLy8gICAgICAgICBhZGRBbmRSZW1vdmVDbGFzc2VzKCR0aGlzLCBcImVycm9yXCIsIFwidmFsaWRcIik7XG4gICAgLy8gICAgICAgICAkdGhpcy5wYXJlbnQoKS5maW5kKFwiLmVycm9yLW1zZy0td3JvbmdcIikuYWRkQ2xhc3MoXCJhY3RpdmVfX2Vycm9yLW1zZ1wiKTtcbiAgICAvLyAgICAgfSBlbHNlIHtcbiAgICAvLyAgICAgICAgIGFkZEFuZFJlbW92ZUNsYXNzZXMoJHRoaXMsIFwidmFsaWRcIiwgXCJlcnJvclwiKTtcbiAgICAvLyAgICAgfVxuICAgIC8vIH0pO1xuICAgIC8vIGFkZCByZWdFeHBcbiAgICBsZXQgZW1haWxSZWdFeHAgPSAvXlthLXpBLVowLTkuISMkJSYnKisvPT9eX2B7fH1+LV0rQFthLXpBLVowLTktXSsoPzpcXC5bYS16QS1aMC05LV0rKSokLztcbiAgICBlbWFpbC5vbihcImJsdXJcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICBsZXQgJHRoaXMgPSAkKHRoaXMpO1xuICAgICAgICBsZXQgZW1haWxWYWxpZCA9IGVtYWlsUmVnRXhwLnRlc3QoJHRoaXMudmFsKCkpO1xuXG4gICAgICAgIGlmICgkdGhpcy52YWwoKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGFkZEFuZFJlbW92ZUNsYXNzZXMoJHRoaXMsIFwiZXJyb3JcIiwgXCJ2YWxpZFwiKTtcbiAgICAgICAgICAgICR0aGlzLnBhcmVudCgpLmZpbmQoXCIuZXJyb3ItbXNnLS1lbXB0eVwiKS5hZGRDbGFzcyhcImFjdGl2ZV9fZXJyb3ItbXNnXCIpO1xuICAgICAgICB9IGVsc2UgaWYgKCFlbWFpbFZhbGlkKSB7XG4gICAgICAgICAgICBhZGRBbmRSZW1vdmVDbGFzc2VzKCR0aGlzLCBcImVycm9yXCIsIFwidmFsaWRcIik7XG4gICAgICAgICAgICAkdGhpcy5wYXJlbnQoKS5maW5kKFwiLmVycm9yLW1zZy0td3JvbmdcIikuYWRkQ2xhc3MoXCJhY3RpdmVfX2Vycm9yLW1zZ1wiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFkZEFuZFJlbW92ZUNsYXNzZXMoJHRoaXMsIFwidmFsaWRcIiwgXCJlcnJvclwiKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgcGFzc3dvcmQub24oXCJibHVyXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbGV0ICR0aGlzID0gJCh0aGlzKTtcbiAgICAgICAgdmFsaWRhdGlvblBlck9uZUFjdGlvbigkdGhpcywgKCR0aGlzLnZhbCgpLmxlbmd0aCA9PT0gMCkpO1xuICAgIH0pO1xuXG4gICAgeWVhci5vbihcImJsdXJcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICBsZXQgJHRoaXMgPSAkKHRoaXMpO1xuICAgICAgICB2YWxpZGF0aW9uUGVyT25lQWN0aW9uKCR0aGlzLCAoJHRoaXMudmFsKCkgPiAyMDAxKSk7XG4gICAgfSk7XG5cbiAgICBwb3N0YWxDb2RlLm9uKFwia2V5dXBcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICBsZXQgJHRoaXMgPSAkKHRoaXMpO1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgJHRoaXMudmFsKCkubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICAgICAgJHRoaXMucGFyZW50KCkuZmluZChcIi5lcnJvci1tc2ctLXdyb25nLWZld1wiKS5yZW1vdmVDbGFzcyhcImFjdGl2ZV9fZXJyb3ItbXNnXCIpO1xuICAgICAgICAgICAgJHRoaXMucGFyZW50KCkuZmluZChcIi5lcnJvci1tc2ctLXdyb25nLWxvdFwiKS5yZW1vdmVDbGFzcyhcImFjdGl2ZV9fZXJyb3ItbXNnXCIpO1xuXG4gICAgICAgICAgICBhZGRBbmRSZW1vdmVDbGFzc2VzKCR0aGlzLCBcImVycm9yXCIsIFwidmFsaWRcIik7XG5cbiAgICAgICAgICAgIGlmICgoJHRoaXMudmFsKCkubGVuZ3RoIDwgNSkgJiYgKCR0aGlzLnZhbCgpLmxlbmd0aCAhPT0gMCkpIHtcbiAgICAgICAgICAgICAgICAkdGhpcy5wYXJlbnQoKS5maW5kKFwiLmVycm9yLW1zZy0td3JvbmctZmV3XCIpLmFkZENsYXNzKFwiYWN0aXZlX19lcnJvci1tc2dcIik7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCR0aGlzLnZhbCgpLmxlbmd0aCA+IDMwKSB7XG4gICAgICAgICAgICAgICAgJHRoaXMucGFyZW50KCkuZmluZChcIi5lcnJvci1tc2ctLXdyb25nLWxvdFwiKS5hZGRDbGFzcyhcImFjdGl2ZV9fZXJyb3ItbXNnXCIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBhZGRBbmRSZW1vdmVDbGFzc2VzKCR0aGlzLCBcInZhbGlkXCIsIFwiZXJyb3JcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBwb3N0YWxDb2RlLm9uKFwiYmx1clwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxldCAkdGhpcyA9ICQodGhpcyk7XG4gICAgICAgICR0aGlzLnBhcmVudCgpLmZpbmQoXCIuZXJyb3ItbXNnLS13cm9uZy1mZXdcIikucmVtb3ZlQ2xhc3MoXCJhY3RpdmVfX2Vycm9yLW1zZ1wiKTtcbiAgICAgICAgJHRoaXMucGFyZW50KCkuZmluZChcIi5lcnJvci1tc2ctLXdyb25nLWxvdFwiKS5yZW1vdmVDbGFzcyhcImFjdGl2ZV9fZXJyb3ItbXNnXCIpO1xuICAgICAgICBpZiAoJHRoaXMudmFsKCkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBhZGRBbmRSZW1vdmVDbGFzc2VzKCR0aGlzLCBcImVycm9yXCIsIFwidmFsaWRcIik7XG4gICAgICAgICAgICAkdGhpcy5wYXJlbnQoKS5maW5kKFwiLmVycm9yLW1zZy0tZW1wdHlcIikuYWRkQ2xhc3MoXCJhY3RpdmVfX2Vycm9yLW1zZ1wiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFkZEFuZFJlbW92ZUNsYXNzZXMoJHRoaXMsIFwidmFsaWRcIiwgXCJlcnJvclwiKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy9jbGVhciBpbnB1dHMgb24gZm9jdXNcbiAgICAkKFwiLmZvcm1fX2l0ZW0taW5wdXRcIikub24oXCJmb2N1c1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxldCAkdGhpcyA9ICQodGhpcyk7XG4gICAgICAgIGlmICgkdGhpcy5oYXNDbGFzcyhcImVycm9yXCIpKSB7XG4gICAgICAgICAgICAkKHRoaXMpLnZhbChcIlwiKTtcbiAgICAgICAgICAgICR0aGlzLnBhcmVudCgpLmZpbmQoXCIuZXJyb3ItbXNnXCIpLnJlbW92ZUNsYXNzKFwiYWN0aXZlX19lcnJvci1tc2dcIik7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vY2xlYXIgc2VsZWN0IG9uIGZvY3VzXG4gICAgJChcIi5mb3JtX19pdGVtLXNlbGVjdFwiKS5vbihcImZvY3VzXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbGV0ICR0aGlzID0gJCh0aGlzKTtcbiAgICAgICAgaWYgKCR0aGlzLmhhc0NsYXNzKFwiZXJyb3JcIikpIHtcbiAgICAgICAgICAgICQodGhpcykudmFsKCk7XG4gICAgICAgICAgICAkdGhpcy5wYXJlbnQoKS5maW5kKFwiLmVycm9yLW1zZ1wiKS5yZW1vdmVDbGFzcyhcImFjdGl2ZV9fZXJyb3ItbXNnXCIpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBidG4gcXVlc3Rpb24gYWN0aXZlXG4gICAgJChcIi5mb3JtX19pbmZvLWJ0blwiKS5jbGljayhmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgbGV0ICR0aGlzID0gJCh0aGlzKTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgJHRoaXMucGFyZW50KCkuZmluZChcIi5mb3JtX19idG4taW5mb1wiKS50b2dnbGVDbGFzcyhcImFjdGl2ZV9fYnRuLWluZm9cIik7XG4gICAgfSk7XG4gICAgJChcIi5mb3JtX19pbmZvLWJ0blwiKS5vbihcIm1vdXNlb3ZlclwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxldCAkdGhpcyA9ICQodGhpcyk7XG4gICAgICAgIGxldCBhY3RpdmUgPSAkdGhpcy5wYXJlbnQoKS5maW5kKFwiLmZvcm1fX2J0bi1pbmZvXCIpLmhhc0NsYXNzKFwiYWN0aXZlX19idG4taW5mb1wiKTtcbiAgICAgICAgaWYgKGFjdGl2ZSAhPT0gdHJ1ZSkge1xuICAgICAgICAgICAgJHRoaXMucGFyZW50KCkuZmluZChcIi5mb3JtX19idG4taW5mb1wiKS5hZGRDbGFzcyhcImFjdGl2ZV9fYnRuLWluZm9cIik7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICAkKFwiLmZvcm1fX2luZm8tYnRuXCIpLm9uKFwibW91c2VvdXRcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICBsZXQgJHRoaXMgPSAkKHRoaXMpO1xuICAgICAgICBsZXQgbm9hY3RpdmUgPSAkdGhpcy5wYXJlbnQoKS5maW5kKFwiLmZvcm1fX2J0bi1pbmZvXCIpLmhhc0NsYXNzKFwiYWN0aXZlX19idG4taW5mb1wiKTtcbiAgICAgICAgaWYgKG5vYWN0aXZlID09PSB0cnVlKSB7XG4gICAgICAgICAgICAkdGhpcy5wYXJlbnQoKS5maW5kKFwiLmZvcm1fX2J0bi1pbmZvXCIpLnJlbW92ZUNsYXNzKFwiYWN0aXZlX19idG4taW5mb1wiKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgJChcIiNyZWdpc3RlckZvcm1cIikuc3VibWl0KGZ1bmN0aW9uKGUpIHtcblxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgJChcIi5mb3JtX19ibG9jayBpbnB1dCwgc2VsZWN0XCIpLnJlbW92ZUNsYXNzKFwiZXJyb3JcIik7XG4gICAgICAgICQoXCIuZm9ybV9fYmxvY2sgaW5wdXQsIHNlbGVjdFwiKS5yZW1vdmVDbGFzcyhcInZhbGlkXCIpO1xuXG4gICAgICAgIHZhbGlkYXRlRmllbGRzID0gKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHZhbGlkYXRlWWVhciA9IHRydWU7XG4gICAgICAgICAgICBsZXQgdmFsaWRhdGVFbWFpbCA9IHRydWU7XG4gICAgICAgICAgICBsZXQgdmFsaWRhdGVQYXNzd29yZCA9IHRydWU7XG4gICAgICAgICAgICBsZXQgdmFsaWRhdGVQb3N0YWxDb2RlID0gdHJ1ZTtcblxuICAgICAgICAgICAgc21hbGxGdW5jdGlvbkZvclZhbGlkYXRlRmllbGRzID0gKGksIGZpbmRDbGFzcykgPT4ge1xuICAgICAgICAgICAgICAgICQoaSkuYWRkQ2xhc3MoXCJlcnJvclwiKTtcbiAgICAgICAgICAgICAgICAkKGkpLnBhcmVudCgpLmZpbmQoZmluZENsYXNzKS5hZGRDbGFzcyhcImFjdGl2ZV9fZXJyb3ItbXNnXCIpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgaWYgKHllYXIudmFsKCkgPiAyMDAxKSB7XG4gICAgICAgICAgICAgICAgc21hbGxGdW5jdGlvbkZvclZhbGlkYXRlRmllbGRzKFwiI3llYXJcIiwgXCIuZXJyb3ItbXNnXCIpO1xuICAgICAgICAgICAgICAgIHZhbGlkYXRlWWVhciA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZW1haWwudmFsKCkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgc21hbGxGdW5jdGlvbkZvclZhbGlkYXRlRmllbGRzKFwiI2VtYWlsXCIsIFwiLmVycm9yLW1zZy0tZW1wdHlcIik7XG4gICAgICAgICAgICAgICAgdmFsaWRhdGVFbWFpbCA9IGZhbHNlO1xuICAgICAgICAgICAgfSBlbHNlIGlmICghKGVtYWlsUmVnRXhwLnRlc3QoZW1haWwudmFsKCkpKSkge1xuICAgICAgICAgICAgICAgIHNtYWxsRnVuY3Rpb25Gb3JWYWxpZGF0ZUZpZWxkcyhcIiNlbWFpbFwiLCBcIi5lcnJvci1tc2ctLXdyb25nXCIpO1xuICAgICAgICAgICAgICAgIHZhbGlkYXRlRW1haWwgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHBhc3N3b3JkLnZhbCgpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHNtYWxsRnVuY3Rpb25Gb3JWYWxpZGF0ZUZpZWxkcyhcIiNwYXNzd29yZFwiLCBcIi5lcnJvci1tc2dcIik7XG4gICAgICAgICAgICAgICAgdmFsaWRhdGVQYXNzd29yZCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAocG9zdGFsQ29kZS52YWwoKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICBzbWFsbEZ1bmN0aW9uRm9yVmFsaWRhdGVGaWVsZHMoXCIjcG9zdGFsQ29kZVwiLCBcIi5lcnJvci1tc2ctLWVtcHR5XCIpO1xuICAgICAgICAgICAgICAgIHZhbGlkYXRlUG9zdGFsQ29kZSA9IGZhbHNlO1xuICAgICAgICAgICAgfSBlbHNlIGlmICgocG9zdGFsQ29kZS52YWwoKS5sZW5ndGggPCA1KSAmJiAocG9zdGFsQ29kZS52YWwoKS5sZW5ndGggIT09IDApKSB7XG4gICAgICAgICAgICAgICAgc21hbGxGdW5jdGlvbkZvclZhbGlkYXRlRmllbGRzKFwiI3Bvc3RhbENvZGVcIiwgXCIuZXJyb3ItbXNnLS13cm9uZy1mZXdcIik7XG4gICAgICAgICAgICAgICAgdmFsaWRhdGVFbWFpbCA9IGZhbHNlO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChwb3N0YWxDb2RlLnZhbCgpLmxlbmd0aCA+IDMwKSB7XG4gICAgICAgICAgICAgICAgc21hbGxGdW5jdGlvbkZvclZhbGlkYXRlRmllbGRzKFwiI3Bvc3RhbENvZGVcIiwgXCIuZXJyb3ItbXNnLS13cm9uZy1sb3RcIik7XG4gICAgICAgICAgICAgICAgdmFsaWRhdGVFbWFpbCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodmFsaWRhdGVZZWFyICYmIHZhbGlkYXRlRW1haWwgJiYgdmFsaWRhdGVQYXNzd29yZCAmJiB2YWxpZGF0ZVBvc3RhbENvZGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBpZiAodmFsaWRhdGVGaWVsZHMoKSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJGb3JtIGlzIHZhbGlkIVwiKTtcbiAgICAgICAgICAgIHllYXIudmFsKFwiMjAxOVwiKTtcbiAgICAgICAgICAgIGVtYWlsLnZhbChcIlwiKTtcbiAgICAgICAgICAgIHBhc3N3b3JkLnZhbChcIlwiKTtcbiAgICAgICAgICAgIHBvc3RhbENvZGUudmFsKFwiXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1ZhbGlkYXRpb24gZm9ybSBlcnJvciEnKTtcbiAgICAgICAgfVxuXG4gICAgfSk7XG59KTt2YXIgY29udGVudD17XCJodG1sTGFuZ1wiOlwicnVcIixcInRpdGxlXCI6XCJSZWcgRm9ybSBUYXNrXCIsXCJnb29nbGVGb250c1wiOlwiaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3M/ZmFtaWx5PVJvYm90bzo0MDAsNzAwJmRpc3BsYXk9c3dhcFwifTsiXSwiZmlsZSI6InNjcmlwdC5qcyJ9

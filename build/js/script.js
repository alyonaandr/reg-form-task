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
            } else if (!(email.val().indexOf("@") > -1)) {
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzY3JpcHQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuXG4gICAgbGV0IHllYXIgPSAkKFwiI3llYXJcIiksXG4gICAgICAgIGVtYWlsID0gJChcIiNlbWFpbFwiKSxcbiAgICAgICAgcGFzc3dvcmQgPSAkKFwiI3Bhc3N3b3JkXCIpLFxuICAgICAgICBwb3N0YWxDb2RlID0gJChcIiNwb3N0YWxDb2RlXCIpO1xuXG4gICAgYWRkQW5kUmVtb3ZlQ2xhc3NlcyA9IChpLCBhZGQsIHJlbW92ZSkgPT4ge1xuICAgICAgICBpLmFkZENsYXNzKGFkZCk7XG4gICAgICAgIGkucmVtb3ZlQ2xhc3MocmVtb3ZlKTtcbiAgICB9O1xuXG4gICAgdmFsaWRhdGlvblBlck9uZUFjdGlvbiA9IChpLCB2YWx1ZSkgPT4ge1xuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIGFkZEFuZFJlbW92ZUNsYXNzZXMoaSwgXCJlcnJvclwiLCBcInZhbGlkXCIpO1xuICAgICAgICAgICAgaS5wYXJlbnQoKS5maW5kKFwiLmVycm9yLW1zZ1wiKS5hZGRDbGFzcyhcImFjdGl2ZV9fZXJyb3ItbXNnXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYWRkQW5kUmVtb3ZlQ2xhc3NlcyhpLCBcInZhbGlkXCIsIFwiZXJyb3JcIik7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLy9jaGVjayBpbnB1dHMgYXJlIGVtcHR5IG9yIHZhbGlkXG4gICAgZW1haWwub24oXCJibHVyXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbGV0ICR0aGlzID0gJCh0aGlzKTtcbiAgICAgICAgaWYgKCR0aGlzLnZhbCgpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgYWRkQW5kUmVtb3ZlQ2xhc3NlcygkdGhpcywgXCJlcnJvclwiLCBcInZhbGlkXCIpO1xuICAgICAgICAgICAgJHRoaXMucGFyZW50KCkuZmluZChcIi5lcnJvci1tc2ctLWVtcHR5XCIpLmFkZENsYXNzKFwiYWN0aXZlX19lcnJvci1tc2dcIik7XG4gICAgICAgIH0gZWxzZSBpZiAoISgkdGhpcy52YWwoKS5pbmRleE9mKFwiQFwiKSA+IC0xKSkge1xuICAgICAgICAgICAgYWRkQW5kUmVtb3ZlQ2xhc3NlcygkdGhpcywgXCJlcnJvclwiLCBcInZhbGlkXCIpO1xuICAgICAgICAgICAgJHRoaXMucGFyZW50KCkuZmluZChcIi5lcnJvci1tc2ctLXdyb25nXCIpLmFkZENsYXNzKFwiYWN0aXZlX19lcnJvci1tc2dcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhZGRBbmRSZW1vdmVDbGFzc2VzKCR0aGlzLCBcInZhbGlkXCIsIFwiZXJyb3JcIik7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHBhc3N3b3JkLm9uKFwiYmx1clwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxldCAkdGhpcyA9ICQodGhpcyk7XG4gICAgICAgIHZhbGlkYXRpb25QZXJPbmVBY3Rpb24oJHRoaXMsICgkdGhpcy52YWwoKS5sZW5ndGggPT09IDApKTtcbiAgICB9KTtcblxuICAgIHllYXIub24oXCJibHVyXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbGV0ICR0aGlzID0gJCh0aGlzKTtcbiAgICAgICAgdmFsaWRhdGlvblBlck9uZUFjdGlvbigkdGhpcywgKCR0aGlzLnZhbCgpID4gMjAwMSkpO1xuICAgIH0pO1xuXG4gICAgcG9zdGFsQ29kZS5vbihcImtleXVwXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbGV0ICR0aGlzID0gJCh0aGlzKTtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8ICR0aGlzLnZhbCgpLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgICAgICR0aGlzLnBhcmVudCgpLmZpbmQoXCIuZXJyb3ItbXNnLS13cm9uZy1mZXdcIikucmVtb3ZlQ2xhc3MoXCJhY3RpdmVfX2Vycm9yLW1zZ1wiKTtcbiAgICAgICAgICAgICR0aGlzLnBhcmVudCgpLmZpbmQoXCIuZXJyb3ItbXNnLS13cm9uZy1sb3RcIikucmVtb3ZlQ2xhc3MoXCJhY3RpdmVfX2Vycm9yLW1zZ1wiKTtcblxuICAgICAgICAgICAgYWRkQW5kUmVtb3ZlQ2xhc3NlcygkdGhpcywgXCJlcnJvclwiLCBcInZhbGlkXCIpO1xuXG4gICAgICAgICAgICBpZiAoKCR0aGlzLnZhbCgpLmxlbmd0aCA8IDUpICYmICgkdGhpcy52YWwoKS5sZW5ndGggIT09IDApKSB7XG4gICAgICAgICAgICAgICAgJHRoaXMucGFyZW50KCkuZmluZChcIi5lcnJvci1tc2ctLXdyb25nLWZld1wiKS5hZGRDbGFzcyhcImFjdGl2ZV9fZXJyb3ItbXNnXCIpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICgkdGhpcy52YWwoKS5sZW5ndGggPiAzMCkge1xuICAgICAgICAgICAgICAgICR0aGlzLnBhcmVudCgpLmZpbmQoXCIuZXJyb3ItbXNnLS13cm9uZy1sb3RcIikuYWRkQ2xhc3MoXCJhY3RpdmVfX2Vycm9yLW1zZ1wiKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYWRkQW5kUmVtb3ZlQ2xhc3NlcygkdGhpcywgXCJ2YWxpZFwiLCBcImVycm9yXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG4gICAgcG9zdGFsQ29kZS5vbihcImJsdXJcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICBsZXQgJHRoaXMgPSAkKHRoaXMpO1xuICAgICAgICAkdGhpcy5wYXJlbnQoKS5maW5kKFwiLmVycm9yLW1zZy0td3JvbmctZmV3XCIpLnJlbW92ZUNsYXNzKFwiYWN0aXZlX19lcnJvci1tc2dcIik7XG4gICAgICAgICR0aGlzLnBhcmVudCgpLmZpbmQoXCIuZXJyb3ItbXNnLS13cm9uZy1sb3RcIikucmVtb3ZlQ2xhc3MoXCJhY3RpdmVfX2Vycm9yLW1zZ1wiKTtcbiAgICAgICAgaWYgKCR0aGlzLnZhbCgpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgYWRkQW5kUmVtb3ZlQ2xhc3NlcygkdGhpcywgXCJlcnJvclwiLCBcInZhbGlkXCIpO1xuICAgICAgICAgICAgJHRoaXMucGFyZW50KCkuZmluZChcIi5lcnJvci1tc2ctLWVtcHR5XCIpLmFkZENsYXNzKFwiYWN0aXZlX19lcnJvci1tc2dcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhZGRBbmRSZW1vdmVDbGFzc2VzKCR0aGlzLCBcInZhbGlkXCIsIFwiZXJyb3JcIik7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vY2xlYXIgaW5wdXRzIG9uIGZvY3VzXG4gICAgJChcIi5mb3JtX19pdGVtLWlucHV0XCIpLm9uKFwiZm9jdXNcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICBsZXQgJHRoaXMgPSAkKHRoaXMpO1xuICAgICAgICBpZiAoJHRoaXMuaGFzQ2xhc3MoXCJlcnJvclwiKSkge1xuICAgICAgICAgICAgJCh0aGlzKS52YWwoXCJcIik7XG4gICAgICAgICAgICAkdGhpcy5wYXJlbnQoKS5maW5kKFwiLmVycm9yLW1zZ1wiKS5yZW1vdmVDbGFzcyhcImFjdGl2ZV9fZXJyb3ItbXNnXCIpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvL2NsZWFyIHNlbGVjdCBvbiBmb2N1c1xuICAgICQoXCIuZm9ybV9faXRlbS1zZWxlY3RcIikub24oXCJmb2N1c1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxldCAkdGhpcyA9ICQodGhpcyk7XG4gICAgICAgIGlmICgkdGhpcy5oYXNDbGFzcyhcImVycm9yXCIpKSB7XG4gICAgICAgICAgICAkKHRoaXMpLnZhbCgpO1xuICAgICAgICAgICAgJHRoaXMucGFyZW50KCkuZmluZChcIi5lcnJvci1tc2dcIikucmVtb3ZlQ2xhc3MoXCJhY3RpdmVfX2Vycm9yLW1zZ1wiKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gYnRuIHF1ZXN0aW9uIGFjdGl2ZVxuICAgICQoXCIuZm9ybV9faW5mby1idG5cIikuY2xpY2soZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIGxldCAkdGhpcyA9ICQodGhpcyk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICR0aGlzLnBhcmVudCgpLmZpbmQoXCIuZm9ybV9fYnRuLWluZm9cIikudG9nZ2xlQ2xhc3MoXCJhY3RpdmVfX2J0bi1pbmZvXCIpO1xuICAgIH0pO1xuICAgICQoXCIuZm9ybV9faW5mby1idG5cIikub24oXCJtb3VzZW92ZXJcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICBsZXQgJHRoaXMgPSAkKHRoaXMpO1xuICAgICAgICBsZXQgYWN0aXZlID0gJHRoaXMucGFyZW50KCkuZmluZChcIi5mb3JtX19idG4taW5mb1wiKS5oYXNDbGFzcyhcImFjdGl2ZV9fYnRuLWluZm9cIik7XG4gICAgICAgIGlmIChhY3RpdmUgIT09IHRydWUpIHtcbiAgICAgICAgICAgICR0aGlzLnBhcmVudCgpLmZpbmQoXCIuZm9ybV9fYnRuLWluZm9cIikuYWRkQ2xhc3MoXCJhY3RpdmVfX2J0bi1pbmZvXCIpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgJChcIi5mb3JtX19pbmZvLWJ0blwiKS5vbihcIm1vdXNlb3V0XCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbGV0ICR0aGlzID0gJCh0aGlzKTtcbiAgICAgICAgbGV0IG5vYWN0aXZlID0gJHRoaXMucGFyZW50KCkuZmluZChcIi5mb3JtX19idG4taW5mb1wiKS5oYXNDbGFzcyhcImFjdGl2ZV9fYnRuLWluZm9cIik7XG4gICAgICAgIGlmIChub2FjdGl2ZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgJHRoaXMucGFyZW50KCkuZmluZChcIi5mb3JtX19idG4taW5mb1wiKS5yZW1vdmVDbGFzcyhcImFjdGl2ZV9fYnRuLWluZm9cIik7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgICQoXCIjcmVnaXN0ZXJGb3JtXCIpLnN1Ym1pdChmdW5jdGlvbihlKSB7XG5cbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICQoXCIuZm9ybV9fYmxvY2sgaW5wdXQsIHNlbGVjdFwiKS5yZW1vdmVDbGFzcyhcImVycm9yXCIpO1xuICAgICAgICAkKFwiLmZvcm1fX2Jsb2NrIGlucHV0LCBzZWxlY3RcIikucmVtb3ZlQ2xhc3MoXCJ2YWxpZFwiKTtcblxuICAgICAgICB2YWxpZGF0ZUZpZWxkcyA9ICgpID0+IHtcbiAgICAgICAgICAgIGxldCB2YWxpZGF0ZVllYXIgPSB0cnVlO1xuICAgICAgICAgICAgbGV0IHZhbGlkYXRlRW1haWwgPSB0cnVlO1xuICAgICAgICAgICAgbGV0IHZhbGlkYXRlUGFzc3dvcmQgPSB0cnVlO1xuICAgICAgICAgICAgbGV0IHZhbGlkYXRlUG9zdGFsQ29kZSA9IHRydWU7XG5cbiAgICAgICAgICAgIHNtYWxsRnVuY3Rpb25Gb3JWYWxpZGF0ZUZpZWxkcyA9IChpLCBmaW5kQ2xhc3MpID0+IHtcbiAgICAgICAgICAgICAgICAkKGkpLmFkZENsYXNzKFwiZXJyb3JcIik7XG4gICAgICAgICAgICAgICAgJChpKS5wYXJlbnQoKS5maW5kKGZpbmRDbGFzcykuYWRkQ2xhc3MoXCJhY3RpdmVfX2Vycm9yLW1zZ1wiKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGlmICh5ZWFyLnZhbCgpID4gMjAwMSkge1xuICAgICAgICAgICAgICAgIHNtYWxsRnVuY3Rpb25Gb3JWYWxpZGF0ZUZpZWxkcyhcIiN5ZWFyXCIsIFwiLmVycm9yLW1zZ1wiKTtcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZVllYXIgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGVtYWlsLnZhbCgpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHNtYWxsRnVuY3Rpb25Gb3JWYWxpZGF0ZUZpZWxkcyhcIiNlbWFpbFwiLCBcIi5lcnJvci1tc2ctLWVtcHR5XCIpO1xuICAgICAgICAgICAgICAgIHZhbGlkYXRlRW1haWwgPSBmYWxzZTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIShlbWFpbC52YWwoKS5pbmRleE9mKFwiQFwiKSA+IC0xKSkge1xuICAgICAgICAgICAgICAgIHNtYWxsRnVuY3Rpb25Gb3JWYWxpZGF0ZUZpZWxkcyhcIiNlbWFpbFwiLCBcIi5lcnJvci1tc2ctLXdyb25nXCIpO1xuICAgICAgICAgICAgICAgIHZhbGlkYXRlRW1haWwgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHBhc3N3b3JkLnZhbCgpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHNtYWxsRnVuY3Rpb25Gb3JWYWxpZGF0ZUZpZWxkcyhcIiNwYXNzd29yZFwiLCBcIi5lcnJvci1tc2dcIik7XG4gICAgICAgICAgICAgICAgdmFsaWRhdGVQYXNzd29yZCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAocG9zdGFsQ29kZS52YWwoKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICBzbWFsbEZ1bmN0aW9uRm9yVmFsaWRhdGVGaWVsZHMoXCIjcG9zdGFsQ29kZVwiLCBcIi5lcnJvci1tc2ctLWVtcHR5XCIpO1xuICAgICAgICAgICAgICAgIHZhbGlkYXRlUG9zdGFsQ29kZSA9IGZhbHNlO1xuICAgICAgICAgICAgfSBlbHNlIGlmICgocG9zdGFsQ29kZS52YWwoKS5sZW5ndGggPCA1KSAmJiAocG9zdGFsQ29kZS52YWwoKS5sZW5ndGggIT09IDApKSB7XG4gICAgICAgICAgICAgICAgc21hbGxGdW5jdGlvbkZvclZhbGlkYXRlRmllbGRzKFwiI3Bvc3RhbENvZGVcIiwgXCIuZXJyb3ItbXNnLS13cm9uZy1mZXdcIik7XG4gICAgICAgICAgICAgICAgdmFsaWRhdGVFbWFpbCA9IGZhbHNlO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChwb3N0YWxDb2RlLnZhbCgpLmxlbmd0aCA+IDMwKSB7XG4gICAgICAgICAgICAgICAgc21hbGxGdW5jdGlvbkZvclZhbGlkYXRlRmllbGRzKFwiI3Bvc3RhbENvZGVcIiwgXCIuZXJyb3ItbXNnLS13cm9uZy1sb3RcIik7XG4gICAgICAgICAgICAgICAgdmFsaWRhdGVFbWFpbCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodmFsaWRhdGVZZWFyICYmIHZhbGlkYXRlRW1haWwgJiYgdmFsaWRhdGVQYXNzd29yZCAmJiB2YWxpZGF0ZVBvc3RhbENvZGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBpZiAodmFsaWRhdGVGaWVsZHMoKSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJGb3JtIGlzIHZhbGlkIVwiKTtcbiAgICAgICAgICAgIHllYXIudmFsKFwiMjAxOVwiKTtcbiAgICAgICAgICAgIGVtYWlsLnZhbChcIlwiKTtcbiAgICAgICAgICAgIHBhc3N3b3JkLnZhbChcIlwiKTtcbiAgICAgICAgICAgIHBvc3RhbENvZGUudmFsKFwiXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ1ZhbGlkYXRpb24gZm9ybSBlcnJvciEnKTtcbiAgICAgICAgfVxuXG4gICAgfSk7XG59KTt2YXIgY29udGVudD17XCJodG1sTGFuZ1wiOlwicnVcIixcInRpdGxlXCI6XCJSZWcgRm9ybSBUYXNrXCIsXCJnb29nbGVGb250c1wiOlwiaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3M/ZmFtaWx5PVJvYm90bzo0MDAsNzAwJmRpc3BsYXk9c3dhcFwifTsiXSwiZmlsZSI6InNjcmlwdC5qcyJ9
